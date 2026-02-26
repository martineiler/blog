---
title: "The smallest model that works"
description: "How we built a production computer vision service on a Chinese 8B parameter model that costs almost nothing — and why that was the right engineering decision."
date: 2026-02-26
tags: ["ai", "architecture", "enterprise-ai", "product-development"]
draft: false
---

There is a default assumption that quietly shapes a lot of AI engineering: that harder problems require bigger models. It is an understandable heuristic. Bigger models are more capable in aggregate. When in doubt, reach for the most powerful option available.

We do not follow that heuristic, and the economics vindicate the choice.

## The problem we were solving

[Marketo](https://marketo.dk/) is a recommerce marketplace where people buy and sell second-hand goods — books, artwork, jewellery, watches, furniture, electronics, and a lot more. The friction in this process has always been the listing itself: describe what you are selling, categorise it correctly, set a reasonable price, estimate the dimensions. For casual sellers, this is the main reason listings never get created.

The insight that shaped our approach was simple: the seller already has the information we need. It is sitting in their product images. Every book has a visible spine, cover, and title. Every watch has a dial that reveals the brand, model, and approximate condition. The data exists — it just needs to be extracted.

So we built a vision AI service. The seller uploads images. The service reads them and pre-fills the listing: title, author, condition, category, suggested price, even estimated dimensions. The seller reviews and adjusts. The friction collapses.

## The architecture

The service operates in two phases across four components.

The first phase is classification. `VisionService.classifyProduct` sends the image to the model and gets back a product type — book, artwork, jewellery, watch, furniture, electronics — along with a confidence score. If that score falls below 0.7, the service falls back to a generic product type rather than guessing. This one step determines everything that follows.

The second phase is extraction. `VisionService.extractProductData` now knows the product type and can build a properly constrained prompt. This is where `VisionPromptBuilder` does its work: it loads the product-specific prompt template from disk, then calls `TaxonomyResolver` to inject the exact allowed values for every structured field — `{CATEGORIES}`, `{CONDITIONS}`, `{MATERIALS}`, `{LANGUAGES}` and others — directly into the prompt text. The model is never asked to invent values. It is given a list and told to choose from it. That constraint is the principal reason a small model performs reliably on this task.

`OpenAICompatibleProvider` executes the API call against the `Qwen3-VL-8B-Instruct` vision language model. It uses the OpenAI chat completions format — which every provider in the table below speaks — so swapping models is a configuration change, not a code change. The provider implements exponential backoff retry (1s → 2s → 4s) for transient failures and skips retries on client errors.

`AIListingValidator` wraps the full pipeline and handles the business logic that sits outside the vision service: looking up or creating a `ProductMaker` record for the extracted author, artist, or brand; stripping fields that cannot be reliably read from photos such as serial numbers and certificates of authenticity; applying shipping dimension defaults; and converting tag slugs to database IDs before the response is returned.

Each field in the response carries a confidence score between 0 and 1. The frontend renders this in three tiers: green for fields the model is confident about (≥0.8); yellow for fields that warrant review (0.5–0.8); and empty with a suggestion string for fields below 0.5, where surfacing the value at all would be more misleading than helpful.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 410" width="440" style="display:block;margin:2.5rem auto;border:1px solid #e0e0e0;box-sizing:border-box;max-width:100%" font-family="'Hanken Grotesk Variable',sans-serif" fill="#0d0d0d">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6" fill="none" stroke="#0d0d0d" stroke-width="1"/>
    </marker>
  </defs>
  <!-- Box 1 -->
  <rect x="30" y="10" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="30" text-anchor="middle" font-size="13" font-weight="300">Image</text>
  <text x="220" y="47" text-anchor="middle" font-size="11" font-weight="300" fill="#555">seller upload</text>
  <line x1="220" y1="58" x2="220" y2="73" stroke="#0d0d0d" stroke-width="1" marker-end="url(#arr)"/>
  <!-- Box 2 -->
  <rect x="30" y="75" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="95" text-anchor="middle" font-size="13" font-weight="300">VisionService.classifyProduct</text>
  <text x="220" y="112" text-anchor="middle" font-size="11" font-weight="300" fill="#555">identifies product type and confidence score</text>
  <line x1="220" y1="123" x2="220" y2="138" stroke="#0d0d0d" stroke-width="1" marker-end="url(#arr)"/>
  <!-- Box 3 -->
  <rect x="30" y="140" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="160" text-anchor="middle" font-size="13" font-weight="300">VisionPromptBuilder</text>
  <text x="220" y="177" text-anchor="middle" font-size="11" font-weight="300" fill="#555">injects taxonomy allowed values into prompt</text>
  <line x1="220" y1="188" x2="220" y2="203" stroke="#0d0d0d" stroke-width="1" marker-end="url(#arr)"/>
  <!-- Box 4 -->
  <rect x="30" y="205" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="225" text-anchor="middle" font-size="13" font-weight="300">OpenAICompatibleProvider</text>
  <text x="220" y="242" text-anchor="middle" font-size="11" font-weight="300" fill="#555">routes to configured model endpoint</text>
  <line x1="220" y1="253" x2="220" y2="268" stroke="#0d0d0d" stroke-width="1" marker-end="url(#arr)"/>
  <!-- Box 5 -->
  <rect x="30" y="270" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="290" text-anchor="middle" font-size="13" font-weight="300">Qwen3-VL-8B vision language model</text>
  <text x="220" y="307" text-anchor="middle" font-size="11" font-weight="300" fill="#555">returns structured JSON</text>
  <line x1="220" y1="318" x2="220" y2="333" stroke="#0d0d0d" stroke-width="1" marker-end="url(#arr)"/>
  <!-- Box 6 -->
  <rect x="30" y="335" width="380" height="48" fill="white" stroke="#0d0d0d" stroke-width="1"/>
  <text x="220" y="355" text-anchor="middle" font-size="13" font-weight="300">Listing form</text>
  <text x="220" y="372" text-anchor="middle" font-size="11" font-weight="300" fill="#555">structured data pre-filled for seller review</text>
</svg>

## The model choice

The model doing this work is `Qwen3-VL-8B-Instruct`, an 8-billion parameter vision-language model from Alibaba's Qwen team, served through SiliconFlow. It is not a large model by any current standard. It is not the most capable vision model available. It costs $0.14 per million tokens — both input and output.

It reads books, identifies watch brands, assesses furniture condition, estimates art dimensions, and returns clean structured JSON. It does this reliably, at scale, with no meaningful failure rate in production.

For comparison: Claude Opus 4.6 costs $15 per million input tokens and $75 per million output tokens. For this specific task — read an image, return structured data matching a known schema — the 8B model performs comparably, at roughly 100 times lower cost.

The configuration table in our codebase tells the story plainly:

| Provider | Model | Input $/M | Output $/M |
|---|---|---|---|
| SiliconFlow | Qwen3-VL-8B-Instruct | $0.14 | $0.14 |
| NebulaBlock | Qwen2.5-VL-7B-Instruct | $0.10 | $0.10 |
| Together | Qwen2.5-VL-72B-Instruct | $1.95 | $8.00 |
| OpenAI | gpt-4o-mini | $0.15 | $0.60 |

The 72B Qwen model and gpt-4o-mini exist as fallback options. In practice, the 8B model handles the production load. The 72B is there for cases where the task requires it — it has not been needed yet.

## Why this works

The Qwen vision models are genuinely capable at structured extraction tasks. They understand images well, they follow schema constraints reliably, and they handle the specific challenge of marketplace listings — partial visibility, varying image quality, handwritten annotations on used books — without the failure modes you might expect from a small model.

But the deeper reason this works is that we designed the task to suit the model rather than assuming the model would handle whatever we threw at it. The prompts are precise. Every field has an allowed value list. The model is not being asked to reason or synthesise — it is being asked to observe and classify. That is a task profile that suits smaller, specialised models well.

The confidence scoring mechanism matters here too. Rather than treating model output as authoritative, we surface uncertainty to the user. A field the model is unsure about gets flagged. The seller can verify or correct it. The system is honest about what it knows and what it does not — which is a better design than hiding uncertainty behind false precision.

## The broader principle

AI cost engineering is underrated as a discipline. Most architecture discussions focus on capability — what the model can do — rather than fit — whether the model's capabilities match the task requirements. The two questions are different, and confusing them is expensive.

A model like Claude Opus 4.6 is extraordinary at reasoning through complex, open-ended problems. It is the right choice when the task is genuinely hard: when you need synthesis across many sources, nuanced judgement, or multi-step reasoning under uncertainty. It is not the right choice for reading a book cover and returning the title in JSON.

Right-sizing AI to the task is not a compromise. It is good engineering. The 8B model costs almost nothing, it performs well, and it scales without material infrastructure cost. The budget that would have gone to overprovisioned model inference can go somewhere more valuable.

The default assumption — that harder is better, that bigger models are safer choices — is understandable, but it is worth questioning deliberately. Not every problem requires the most powerful model available. The smallest model that works is almost always the right answer.

And in our case, it turned out to be a small Chinese model that costs fourteen cents per million tokens.

---
title: "America built a weapon. China built a utility."
description: "The United States is guarding its most powerful AI like a munition. China is giving its models away. In a market that runs on availability rather than capability, the second strategy wins — and the events of 2026 have proved it."
date: 2026-06-26
tags: ["ai", "geopolitics", "strategy", "enterprise-ai"]
draft: false
---

On the evening of 12 June 2026, the most capable artificial intelligence ever released was switched off for everyone on Earth.

Anthropic had launched Claude Fable 5 three days earlier. By the company's own account it was the strongest model it had ever made generally available — state of the art on nearly every benchmark, and, by its own safety disclosures, the most capable cyber-offensive system ever built. Then, at 5:21pm Eastern, Anthropic received an export-control directive from the United States government. It ordered that the model be withheld from any foreign national, inside or outside the country, including the company's own foreign-born employees. Anthropic could not draw that line cleanly through a live product, so it did the only thing available to it: it disabled the model for everybody. As I write, it is still working to turn it back on.

This happened eleven days after Anthropic had filed to go public at a valuation approaching a trillion dollars.

Most of the commentary since has framed the episode as a story about trust, or about a single clumsy decision — an own-goal by an administration that is still, everyone hastens to add, the clear leader in artificial intelligence. That reading is comfortable, and I think it is wrong. What happened in June is not a stumble by a leader who remains fundamentally ahead. It is the visible surface of a deeper error, and once you see the error you cannot stop seeing it.

The United States and China are not competing to build the same thing. They are building two different things and calling them by the same name.

## Two theories of what AI is

America — its government, and, more consequentially, its leading laboratories — has decided that a frontier model is a strategic weapon. You can see the conviction in the vocabulary. Models are assigned danger classifications. The most powerful version of this one, Claude Mythos 5, was never sold at all; it was distributed to a vetted list of cleared organisations under a programme run with the government. Anthropic built its flagship to refuse questions about cybersecurity, biology and chemistry, quietly routing them to a weaker, older model. And when Washington reached for the off switch, it used the instrument it reserves for munitions: an export control, the same legal machinery that governs fighter jets and advanced chips.

This is internally coherent. If a model is a weapon, then of course you classify it, license it, deny it to adversaries, and pull it when a vulnerability appears. Every American action this year follows logically from that single premise.

China decided a model is infrastructure.

This was not improvised. China's current five-year plan, passed in March, names artificial intelligence a national priority on the order of defence, and a state initiative sets targets for AI to penetrate 70% of key sectors by 2027 and 90% by 2030. The mechanism is deliberate commoditisation: release strong models with open weights, under permissive licences, at prices that approach the cost of the electricity to run them, and make the technology ambient, abundant and impossible to own. In the same fortnight that America pulled Fable 5, China shipped three open-weight models from three different laboratories. The most capable of them, GLM-5.2, was published with its full weights under an MIT licence — the most permissive arrangement there is. Anyone on the planet can download it, run it on their own hardware, and keep running it forever. No government can recall it, because there is nothing to recall.

The June ban is not a deviation from American strategy. It is American strategy working exactly as designed — and revealing, in the process, that the design is incompatible with how this technology actually creates value.

## Nobody asks whether their electricity has a PhD

The weapon theory has one fatal assumption buried inside it: that the value of AI lies in holding the most powerful instrument. It does not.

The economic value of AI is realised by pouring it into the dull machinery of ordinary business — drafting the correspondence, reconciling the invoices, summarising the meeting, triaging the support queue, processing the claim. This is work measured in payroll, not in benchmark scores, and there is an enormous amount of it. It is also, almost entirely, work that a model from a year or two ago can already do well. The frontier — the genuine, hard-won lead the American laboratories still hold — is irrelevant to it. A meeting summary does not improve when it is written by a system clever enough to find a novel exploit in an operating-system kernel. Nobody asks whether their electricity has a PhD. They ask whether it is on.

And here is the property that decides everything, the one the weapon theory cannot supply: availability. A business does not deploy AI in a sandbox. It wires it into operations, into the processes the company runs on every day. No serious operator will build a production dependency on a system that can be switched off for weeks because a government in another country is arguing with itself. The risk is not theoretical any more. It has a date and a timestamp.

A capability you can be denied is not infrastructure. It is a liability with good marketing.

This is why the comparison that actually matters is not between Fable 5 and its rivals on a leaderboard. It is between a model you can be locked out of and one you cannot. GLM-5.2 is not as capable as the best American model. It does not need to be. It is good enough for the work that pays, it costs somewhere between a fifth and a tenth as much per token, and — this is the whole of it — it cannot be taken away from you. For the overwhelming majority of what enterprises actually do with AI, that is not a close decision.

## The strategy was already working before America helped

The most uncomfortable fact for Washington is that none of this required the June ban. It was already happening.

By May, on the largest neutral marketplace through which developers access models, a clear majority of all tokens consumed already ran on Chinese open-weight systems. Meta's Llama, which two years ago was the open-weight standard of the Western world, had fallen off the leaderboard entirely. The commoditisation strategy did not need a catalyst; it was winning on its own merits — cheaper, open, good enough.

What the events since February supplied was not the victory but the proof. A strategy of commoditising the base layer only pays off if customers actually switch to the commodity, and the open question was always what would finally move a cautious enterprise off the familiar American incumbent. The United States answered that question itself. It took its best model off the board, in public, by government order, and in doing so handed every chief technology officer outside America the one argument that overcomes institutional inertia: the incumbent is not reliable, and the alternative cannot be confiscated.

I should be careful about what I am and am not claiming. The American administration's conduct this year — refusing to let Anthropic withhold its models from mass surveillance and autonomous weapons, then designating the company a national-security supply-chain risk, a label a federal judge found was "pretextual" and amounted to "unlawful retaliation," all against the backdrop of a winter in which the same government would not rule out taking Greenland from a NATO ally by force — has done real damage to how the world reads American intentions. But trust is not quite the core of it, and I do not want to rest the argument there. A trustworthy government wedded to the wrong theory of the technology would arrive at the same destination. The problem is not only that America cannot be relied upon. The problem is that America is guarding something it has mistaken for a weapon.

## The weapon that pays for itself

There is a reason this error is so hard for the United States to correct, and it is not stupidity. It is incentive.

The same proposition that justified pulling Fable 5 — *this model is so capable it is a danger to national security* — is also the proposition that justifies valuing the company that built it at close to a trillion dollars. The danger narrative and the investment narrative are the same sentence. A laboratory that tells the world its model could supercharge a cyberattack is also telling its investors that it sits on something scarce, defensible and strategically indispensable. I am not alleging that anyone hyped a risk to inflate a valuation; I have no evidence for that, and it would be a serious charge. I am pointing to something more structural and harder to escape: the story that makes the American AI sector rich is the same story that gets its products classified, controlled and banned — and that drives the world's buyers toward the people who are giving the technology away.

That is why this will not self-correct on the timescale that matters. Unwinding the weapon theory means deflating the valuations built on top of it. An entire industry, and a great deal of the capital markets' faith, is now committed to the premise that frontier capability is a scarce strategic asset. The market is quietly demonstrating that, for most of the world's work, it is an abundant commodity. Those two things cannot both stay true, and only one of them has a trillion dollars riding on it being false.

## A Chinese victory, won on American ground

So let me say plainly what I think the facts now support.

This is a Chinese victory. Not a victory of capability — on that measure China is the runner-up, and the American laboratories remain genuinely ahead at the frontier. It is a victory of strategy. China understood that AI's value would be realised through ubiquity rather than supremacy, built for that future on purpose, and waited. It did not need to out-build the United States. It needed the United States to keep believing it was guarding a weapon, and to act on that belief until its own best product became something the world could no longer depend on. America obliged, on its own soil, by its own hand, in the full view of the markets it was asking to value it.

China did not beat America to a better weapon. It understood that the thing was never a weapon at all.

What remains genuinely open is whether the world it is building is the better one. An AI layer that is cheap, open and beyond any government's power to recall is, in the same breath, more resilient and less governable. The capabilities that frightened Washington into reaching for the off switch are real — and in an open-weight world, no one has an off switch, not Washington, not Beijing, not a court. That is the actual trade the next decade will turn on. It is a serious question, and it deserves a serious debate.

But it is no longer America's question to decide alone. That was the real consequence of June. Not that the United States lost a model for a few days, but that it forfeited the authority to set the terms — and proved, to anyone still watching the benchmarks instead of the wiring, that it had mistaken the nature of the thing it was trying to win.

*Written from the vantage of someone who builds with these systems rather than trades in them — where the only question that has ever mattered is whether the thing works on Monday, and is still there on Tuesday.*

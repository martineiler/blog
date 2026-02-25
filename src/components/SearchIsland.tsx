import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  url: string;
  meta: { title: string };
  excerpt: string;
}

export default function SearchIsland() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [close]);

  const runSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }
    try {
      const pagefindUrl = '/pagefind/pagefind.js';
      // @ts-ignore
      const pagefind = await import(/* @vite-ignore */ pagefindUrl);
      await pagefind.init();
      const search = await pagefind.search(value);
      const data = await Promise.all(
        search.results.slice(0, 8).map((r: any) => r.data())
      );
      setResults(data as SearchResult[]);
    } catch {
      setResults([]);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    runSearch(value);
  };

  return (
    <div ref={containerRef} className="border-b border-[#e0e0e0]">
      {/* Nav row */}
      <div className="w-full max-w-[1100px] mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-col gap-0.5">
            <a
              href="/"
              className="font-sans font-normal text-base tracking-[0.01em] text-[#0d0d0d] no-underline hover:text-[#cc0000] transition-colors leading-tight"
            >
              Martin Eiler
            </a>
            <span className="font-sans font-light text-xs text-[#555555] tracking-[0.01em]">
              Technology · Enterprise AI · Platform Architecture
            </span>
          </div>
          <button
            aria-label="Search"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-1 text-[#555555] hover:text-[#cc0000] transition-colors cursor-pointer bg-transparent border-none"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search panel — slides down in document flow */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '500px' : '0px' }}
      >
        <div className="bg-[#f5f5f5] border-t border-[#e0e0e0]">
          <div className="w-full max-w-[1100px] mx-auto px-6 py-3">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleInput}
              placeholder="Search articles…"
              className="w-full border-0 outline-none bg-transparent py-1 text-2xl font-extralight text-[#0d0d0d] placeholder-[#999999] font-sans"
            />

            {results.length > 0 && (
              <ul className="mt-4 divide-y divide-[#e0e0e0]">
                {results.map((result) => (
                  <li key={result.url}>
                    <a
                      href={result.url}
                      onClick={close}
                      className="block py-4 no-underline hover:text-[#cc0000] transition-colors group"
                    >
                      <p className="text-sm font-light text-[#0d0d0d] group-hover:text-[#cc0000] mb-1">
                        {result.meta?.title}
                      </p>
                      {result.excerpt && (
                        <p
                          className="text-xs font-light text-[#555555] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: result.excerpt }}
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {query.trim() && results.length === 0 && (
              <p className="mt-4 text-xs font-light text-[#555555]">
                No results for "{query}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

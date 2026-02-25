import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchResult {
  url: string;
  meta: {
    title: string;
  };
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
      // @ts-ignore — pagefind is injected at build time
      const pagefind = await import('/pagefind/pagefind.js');
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
    <div ref={containerRef} className="relative">
      <button
        aria-label="Search"
        onClick={() => setOpen((v) => !v)}
        className="p-1 text-[#555555] hover:text-[#cc0000] transition-colors cursor-pointer bg-transparent border-none"
      >
        <svg
          width="18"
          height="18"
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

      {open && (
        <div className="absolute right-0 top-full mt-3 w-[min(600px,90vw)] z-50 bg-white border-b border-[#e0e0e0]">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInput}
            placeholder="Search articles…"
            className="w-full border-0 border-b border-[#e0e0e0] outline-none bg-transparent py-2 px-0 text-sm font-light text-[#0d0d0d] placeholder-[#555555] font-sans"
          />
          {results.length > 0 && (
            <ul className="py-2 max-h-[60vh] overflow-y-auto">
              {results.map((result) => (
                <li key={result.url} className="border-b border-[#e0e0e0] last:border-b-0">
                  <a
                    href={result.url}
                    onClick={close}
                    className="block py-3 px-0 no-underline hover:text-[#cc0000] transition-colors group"
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
            <p className="py-4 text-xs font-light text-[#555555]">No results for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}

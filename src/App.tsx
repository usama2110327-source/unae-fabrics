import { useMemo, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { products, WHATSAPP_NUMBER, type Product } from './products';

const brandSlug = (brand: string) => brand.replace(/[^a-zA-Z0-9]/g, '-');

const brands = Array.from(new Set(products.map((p) => p.brand)));

function waLink(p: Product) {
  const lines = [
    'Hi Unaé Fabrics',
    `Order: ${p.articleName}`,
    `Code: ${p.articleCode}`,
    `Brand: ${p.brand}`,
    `Fabric: ${p.fabric}`,
  ];
  if (p.colour) lines.push(`Colour: ${p.colour}`);
  lines.push(`Price: PKR ${p.sellingPrice}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function ProductCard({ p }: { p: Product }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1.5">
      <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm font-medium text-center px-4">
              Image Coming Soon
            </span>
          </div>
        ) : (
          <img
            src={p.image}
            alt={p.articleName}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900">{p.articleName}</h3>
        <p className="text-sm text-gray-500">
          {p.articleCode} | {p.fabric}
          {p.colour && ` | ${p.colour}`}
        </p>
        <p className="text-xl font-bold text-[#d4af37] mt-2">
          PKR {p.sellingPrice.toLocaleString()}
        </p>
        <a
          href={waLink(p)}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-[#d4af37] text-white rounded-full py-2 mt-3 hover:bg-[#c4a030] transition-colors"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.articleName.toLowerCase().includes(q) ||
        p.articleCode.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of filtered) {
      if (!map.has(p.brand)) map.set(p.brand, []);
      map.get(p.brand)!.push(p);
    }
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#1a1a2e]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="font-serif text-xl sm:text-2xl text-[#d4af37] tracking-wide whitespace-nowrap">
            Unaé Fabrics
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Unaé Fabrics')}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-sm text-white/80 hover:text-[#d4af37] transition-colors whitespace-nowrap"
          >
            Order on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-[#1a1a2e] via-[#1a1a2e]/80 to-[#e67e22]"
      >
        <div className="animate-[fadeIn_1.2s_ease-out]">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#d4af37] drop-shadow-lg">
            Unaé Fabrics
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide">
            One of its Kind
          </p>
        </div>
        <a
          href="#shop"
          aria-label="Scroll to shop"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 hover:text-[#d4af37] transition-colors animate-bounce"
        >
          <ChevronDown size={36} />
        </a>
      </section>

      {/* Shop by Brand */}
      <section
        id="shop"
        className="min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-[#5a4fcf] to-[#c44569]"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl text-white text-center">
            Shop by Brand
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/85 text-center max-w-2xl mx-auto">
            Browse 10 premium brands — Order directly on WhatsApp
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, code, or brand..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/95 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] shadow-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Brand navbar */}
          <nav className="sticky top-16 z-40 mt-8 -mx-4 sm:mx-0 px-4 sm:px-2 py-3 bg-[#1a1a2e]/40 backdrop-blur-md rounded-full overflow-x-auto flex gap-2 justify-start sm:justify-center no-scrollbar">
            {brands.map((b) => (
              <a
                key={b}
                href={`#${brandSlug(b)}`}
                className="whitespace-nowrap text-sm text-white/80 hover:text-[#d4af37] hover:bg-white/10 px-4 py-1.5 rounded-full transition-colors"
              >
                {b}
              </a>
            ))}
          </nav>

          {/* Brand sections */}
          <div className="mt-12 space-y-16">
            {Array.from(grouped.entries()).map(([brand, items]) => (
              <div key={brand} id={brandSlug(brand)} className="scroll-mt-32">
                <h3 className="text-white text-3xl font-bold mb-6">{brand}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.articleCode} p={p} />
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-white/80 text-lg py-20">
                No products found for "{query}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#c44569] py-8 text-center">
        <p className="text-sm text-white/80">© 2026 Unaé Fabrics. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;

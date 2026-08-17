export default function Footer() {
  return (
    <footer className="bg-[var(--color-bali-green)] text-[var(--color-bali-beige)] py-12 mt-12">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl font-serif mb-4">Bali</h2>
        <p className="opacity-80 tracking-widest text-sm">COFFEE • KITCHEN • BAR</p>
        <div className="mt-8 pt-8 border-t border-[var(--color-bali-beige)]/10 text-sm opacity-60">
          <p>© {new Date().getFullYear()} Bali Cafe. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuList from '@/components/menu/MenuList';
import HeroParallax from '@/components/layout/HeroParallax';

export const revalidate = 300;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bali-beige)]">
      <Header />
      
      <main className="flex-1 w-full overflow-clip">
        <HeroParallax />
        
        <section id="menu" className="pt-8 pb-16 max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-12 relative">
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-bali-dark)] inline-block">
              Наше Меню
              <div className="h-1 w-1/2 bg-[var(--color-bali-gold)] mt-2 mx-auto rounded-full"></div>
            </h2>
          </div>
          <MenuList />
        </section>
      </main>

      <Footer />
    </div>
  );
}

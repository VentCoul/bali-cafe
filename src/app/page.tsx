import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuList from '@/components/menu/MenuList';
import HeroParallax from '@/components/layout/HeroParallax';

export const revalidate = 300;

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bali-beige)]">
      <Header />
      
      <main className="flex-1 w-full overflow-clip relative">
        <HeroParallax />
        
        {/* Animated Background Blobs for Glassmorphism */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none top-[80vh]">
          <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-bali-green)]/30 blur-[100px] animate-drift"></div>
          <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-bali-gold)]/30 blur-[120px] animate-drift-reverse"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[var(--color-bali-green)]/20 blur-[90px] animate-drift"></div>
        </div>
        
        <section id="menu" className="relative z-10 pt-8 pb-16 max-w-7xl mx-auto px-6 w-full">
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

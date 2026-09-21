import { useState, useEffect, useRef, ReactNode } from 'react';

// Preloader Component
function Preloader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="preloader-cup"></div>
      <p className="font-[family-name:var(--font-playfair)] text-gold-400 text-xl mt-6 tracking-widest">CALIFORNIA CAFE</p>
      <p className="font-[family-name:var(--font-inter)] text-brown-300 text-xs mt-2 tracking-[0.3em] uppercase">Brewing perfection...</p>
    </div>
  );
}

// Scroll Progress Bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// Back to Top
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <a
      href="#home"
      className={`back-to-top ${visible ? 'visible' : ''} w-12 h-12 bg-brown-800 hover:bg-gold-500 text-gold-400 hover:text-brown-900 rounded-full flex items-center justify-center shadow-2xl transition-smooth group`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up transition-smooth group-hover:-translate-y-1"></i>
    </a>
  );
}

// Intersection Observer Hook
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

// Animated Section Wrapper
function AnimatedSection({ children, className = '', animation = 'animate-fade-in-up', delay = '' }: { children: ReactNode; className?: string; animation?: string; delay?: string }) {
  const { ref, isInView } = useInView(0.12);
  return (
    <div ref={ref} className={`${className} ${isInView ? `${animation} ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

// Section Header
function SectionHeader({ tag, title, subtitle, light = false }: { tag: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <AnimatedSection className="text-center mb-16">
      <div className="ornament justify-center mb-4">
        <p className={`font-[family-name:var(--font-dancing)] text-xl ${light ? 'text-gold-400' : 'text-gold-500'}`}>{tag}</p>
      </div>
      <h2 className={`font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${light ? 'text-white' : 'text-brown-800'}`}>
        {title}
      </h2>
      <div className="section-divider-static mx-auto mb-6"></div>
      {subtitle && (
        <p className={`font-[family-name:var(--font-inter)] text-lg max-w-2xl mx-auto ${light ? 'text-brown-200' : 'text-brown-500'}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#hours', label: 'Visit' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${scrolled ? 'nav-blur bg-brown-900/80 shadow-2xl py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-smooth">
            <span className="text-lg">☕</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-white tracking-wide">California</span>
            <span className="font-[family-name:var(--font-dancing)] text-gold-400 text-sm">Cafe</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className="text-brown-200 hover:text-gold-400 transition-smooth text-xs font-medium tracking-[0.2em] uppercase font-[family-name:var(--font-inter)] relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white text-2xl" aria-label="Toggle menu">
          <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} transition-smooth`}></i>
        </button>
      </div>

      <div className={`md:hidden transition-smooth overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-brown-900/95 nav-blur px-4 py-6 flex flex-col gap-4 border-t border-brown-800">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-brown-200 hover:text-gold-400 transition-smooth text-sm font-medium tracking-wider uppercase font-[family-name:var(--font-inter)] py-2 border-b border-brown-800/50">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hero
function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/4ee9059a-f5b8-40d8-bee4-697887b12438/_result.png"
          alt="Coffee"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${offset * 0.3}px) scale(1.1)` }}
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-gold-400/10 blur-3xl animate-float"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-down">
          <p className="font-[family-name:var(--font-dancing)] text-gold-400 text-2xl md:text-3xl mb-6">
            ✦ Welcome to ✦
          </p>
        </div>
        <h1 className="animate-fade-in-up delay-200 font-[family-name:var(--font-playfair)] text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
          California<br />
          <span className="gradient-text italic">Cafe</span>
        </h1>
        <p className="animate-fade-in-up delay-400 font-[family-name:var(--font-inter)] text-brown-200 text-lg md:text-xl mb-4 max-w-2xl mx-auto font-light">
          Specialty coffee crafted with passion, served with California sunshine.
        </p>
        <p className="animate-fade-in-up delay-500 font-[family-name:var(--font-inter)] text-brown-300 text-sm md:text-base mb-12 tracking-wider">
          VENICE BEACH — LOS ANGELES
        </p>
        <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu"
            className="btn-primary cta-glow inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-brown-900 font-semibold px-10 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest shadow-2xl">
            View Our Menu
          </a>
          <a href="#contact"
            className="btn-primary inline-block border border-brown-200/30 hover:border-gold-400 text-white hover:text-gold-400 font-semibold px-10 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm uppercase tracking-widest">
            Find Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float flex flex-col items-center gap-3">
        <p className="font-[family-name:var(--font-inter)] text-brown-300 text-[10px] tracking-[0.3em] uppercase">Scroll</p>
        <div className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent"></div>
      </div>
    </section>
  );
}

// Marquee
function Marquee() {
  const items = ['ESPRESSO', 'LATTE', 'CAPPUCCINO', 'FRAPPE', 'MOCHA', 'SMOOTHIE', 'CHAI', 'COLD BREW', 'AMERICANO', 'SHAKE'];
  return (
    <div className="bg-brown-900 py-6 overflow-hidden border-y border-brown-800">
      <div className="marquee-track animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-[family-name:var(--font-playfair)] text-gold-500/60 text-xl tracking-widest whitespace-nowrap">{item}</span>
            <span className="text-gold-500/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// About
function About() {
  return (
    <section id="about" className="py-32 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-brown-400/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AnimatedSection animation="animate-fade-in-left">
            <div className="relative">
              <div className="corner-decoration rounded-2xl overflow-hidden shadow-2xl img-zoom">
                <img
                  src="https://image.qwenlm.ai/generated-images/2b356dc8-bcec-43fd-94c3-e43f5fcc0ff7/_result.png"
                  alt="California Cafe Interior"
                  className="w-full h-[450px] lg:h-[550px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass-dark text-white p-8 rounded-2xl shadow-2xl">
                <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-gold-400">5.0</p>
                <div className="flex gap-1 mt-2 mb-1">
                  {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star text-gold-400 text-xs"></i>)}
                </div>
                <p className="text-brown-200 text-xs font-[family-name:var(--font-inter)] tracking-wider uppercase">Google Rating</p>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 opacity-20 blur-2xl"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="animate-fade-in-right" delay="delay-200">
            <div>
              <div className="ornament mb-4">
                <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl">Our Story</p>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-brown-800 mb-8 leading-tight">
                Brewed with<br /><span className="italic">Passion</span> & Purpose
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-lg leading-relaxed mb-6 font-light">
                At California Cafe, we believe every cup tells a story. Located on the iconic Venice Beach Boardwalk,
                steps from the Pacific Ocean, we're your go-to destination for premium specialty coffee
                in Los Angeles.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-lg leading-relaxed mb-10 font-light">
                From perfectly pulled espressos to creamy Spanish Lattes and indulgent ice cream shakes —
                every drink is crafted with carefully selected beans and served with warmth. Whether you're
                grabbing a quick coffee before a surf session or settling in for the sunset, we've got your brew.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '30+', label: 'Menu Items' },
                  { num: '7', label: 'Days a Week' },
                  { num: '100%', label: 'Fresh Brewed' },
                ].map((stat, i) => (
                  <div key={i} className="stat-item text-center px-4">
                    <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold bg-gradient-to-br from-brown-800 to-brown-600 bg-clip-text text-transparent">{stat.num}</p>
                    <p className="font-[family-name:var(--font-inter)] text-brown-500 text-xs mt-2 tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Menu
function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const menuData: Record<string, { name: string; regular: string; large: string; icon?: string; desc?: string }[]> = {
    coffee: [
      { name: 'Espresso', regular: '3.50', large: '4.50', icon: '☕', desc: 'Bold & intense single shot' },
      { name: 'Americano', regular: '4.00', large: '5.00', icon: '☕', desc: 'Smooth espresso with hot water' },
      { name: 'Cappuccino', regular: '4.50', large: '5.50', icon: '☕', desc: 'Espresso, steamed milk, foam' },
      { name: 'Cafe Latte', regular: '4.50', large: '5.50', icon: '☕', desc: 'Silky steamed milk & espresso' },
      { name: 'Spanish Latte', regular: '5.50', large: '6.50', icon: '☕', desc: 'Sweet condensed milk magic' },
      { name: 'Flavored Latte', regular: '5.50', large: '6.50', icon: '☕', desc: 'Customize with your favorite' },
    ],
    cold: [
      { name: 'Ice Latte', regular: '4.50', large: '5.50', icon: '🧊', desc: 'Chilled espresso over ice' },
      { name: 'Spanish Latte (Cold)', regular: '5.50', large: '6.50', icon: '🧊', desc: 'Iced sweet condensed latte' },
      { name: 'Flavored Latte (Cold)', regular: '5.50', large: '6.50', icon: '🧊', desc: 'Cold with your chosen flavor' },
      { name: 'Frappe', regular: '6.00', large: '7.50', icon: '🧊', desc: 'Blended icy coffee delight' },
    ],
    tea: [
      { name: 'Green Tea', regular: '3.00', large: '4.00', icon: '🍵', desc: 'Light & refreshing' },
      { name: 'Chai Latte', regular: '4.00', large: '5.00', icon: '🍵', desc: 'Spiced & creamy' },
      { name: 'Peach Iced Tea', regular: '3.50', large: '4.50', icon: '🍑', desc: 'Sweet & fruity' },
      { name: 'Hot Chocolate', regular: '4.50', large: '5.50', icon: '🍫', desc: 'Rich Belgian cocoa' },
    ],
    shakes: [
      { name: 'Double Chocolate Shake', regular: '6.00', large: '7.50', icon: '🍫', desc: 'Chocolate lovers dream' },
      { name: 'Oreo Shake', regular: '6.00', large: '7.50', icon: '🍪', desc: 'Crushed cookies & cream' },
      { name: 'Chocolate Brownie Shake', regular: '6.00', large: '7.50', icon: '🧁', desc: 'Fudgy brownie blended' },
      { name: 'Lotus Shake', regular: '6.00', large: '7.50', icon: '🥤', desc: 'Biscoff cookie butter bliss' },
    ],
    refreshments: [
      { name: 'Smoothies', regular: '6.00', large: '7.50', icon: '🥤', desc: 'Fresh fruits blended daily' },
      { name: 'Chillers', regular: '4.00', large: '5.00', icon: '🧊', desc: 'Ice-cold refreshment' },
      { name: 'Sodas', regular: '2.50', large: '3.50', icon: '🥤', desc: 'Classic fizzy favorites' },
    ],
  };

  const categories = [
    { id: 'coffee', label: 'Hot Coffee', icon: '☕' },
    { id: 'cold', label: 'Cold Coffee', icon: '🧊' },
    { id: 'tea', label: 'Tea & Chocolate', icon: '🍵' },
    { id: 'shakes', label: 'Ice Cream Shakes', icon: '🥤' },
    { id: 'refreshments', label: 'Refreshments', icon: '🍹' },
  ];

  const flavors = 'Lotus • Caramel • Irish • Vanilla • Hazelnut • Butterscotch • Mocha';

  return (
    <section id="menu" className="py-32 bg-gradient-to-b from-brown-50 to-cream relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader tag="What We Serve" title="Our Menu" subtitle="All prices in USD. Available in Regular & Large sizes." />

        <AnimatedSection delay="delay-200" className="mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider uppercase transition-smooth ${
                  activeCategory === cat.id
                    ? 'bg-brown-800 text-gold-400 shadow-xl scale-105'
                    : 'bg-white text-brown-600 hover:bg-brown-100 border border-brown-200/50'
                }`}>
                <span className="mr-2">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuData[activeCategory]?.map((item, index) => (
            <AnimatedSection key={`${activeCategory}-${item.name}`} animation="animate-scale-in" delay={`delay-${(index + 1) * 100}` as string}>
              <div className="menu-card bg-white rounded-2xl p-7 border border-brown-100/50 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brown-50 to-brown-100 flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brown-800">{item.name}</h3>
                      <p className="font-[family-name:var(--font-inter)] text-brown-400 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex-1 bg-brown-50/70 rounded-xl p-3 text-center border border-brown-100/50">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-brown-400 uppercase tracking-widest mb-1">Regular</p>
                    <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-brown-800">${item.regular}</p>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-brown-800 to-brown-900 rounded-xl p-3 text-center shadow-lg">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-brown-300 uppercase tracking-widest mb-1">Large</p>
                    <p className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gold-400">${item.large}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {(activeCategory === 'coffee' || activeCategory === 'cold') && (
          <AnimatedSection className="mt-14 text-center">
            <div className="inline-block glass-light rounded-full px-8 py-4">
              <p className="font-[family-name:var(--font-inter)] text-brown-700 text-sm">
                <span className="font-semibold text-brown-800">Available Flavors:</span> <span className="text-brown-500">{flavors}</span>
              </p>
            </div>
          </AnimatedSection>
        )}
        {activeCategory === 'refreshments' && (
          <AnimatedSection className="mt-14 text-center">
            <div className="inline-block glass-light rounded-full px-8 py-4">
              <p className="font-[family-name:var(--font-inter)] text-brown-700 text-sm">
                <span className="font-semibold text-brown-800">Note:</span> <span className="text-brown-500">Ask our server for choice of flavors</span>
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// Parallax Quote
function QuoteSection() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://image.qwenlm.ai/generated-images/c3202f57-9919-440f-8c3a-7762472bcd7d/_result.png" alt="Coffee Beans"
          className="w-full h-full object-cover" style={{ transform: `translateY(${(offset - 1500) * 0.2}px) scale(1.1)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/90 via-brown-900/80 to-brown-900/90"></div>
      </div>
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-gold-400/10 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <AnimatedSection>
          <div className="ornament justify-center mb-8">
            <p className="font-[family-name:var(--font-dancing)] text-gold-400 text-2xl">Quality in Every Bean</p>
          </div>
          <i className="fas fa-quote-left text-gold-500/40 text-4xl mb-6 block"></i>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight italic">
            "Coffee is a language in itself."
          </h2>
          <div className="section-divider-static mx-auto mb-6"></div>
          <p className="font-[family-name:var(--font-inter)] text-brown-200 text-lg tracking-wider">— Jackie Chan</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Hours & Location
function HoursLocation() {
  const hours = [
    { day: 'Monday', time: '6:00 AM – 10:00 PM' },
    { day: 'Tuesday', time: '6:00 AM – 10:00 PM' },
    { day: 'Wednesday', time: '6:00 AM – 10:00 PM' },
    { day: 'Thursday', time: '6:00 AM – 10:00 PM' },
    { day: 'Friday', time: '6:00 AM – 11:00 PM' },
    { day: 'Saturday', time: '7:00 AM – 11:00 PM' },
    { day: 'Sunday', time: '7:00 AM – 9:00 PM' },
  ];

  return (
    <section id="hours" className="py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader tag="Plan Your Visit" title="Hours & Location" />

        <div className="grid lg:grid-cols-2 gap-10">
          <AnimatedSection animation="animate-fade-in-left" delay="delay-200">
            <div className="glass-light rounded-3xl p-10 shadow-xl h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-br from-brown-800 to-brown-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-clock text-gold-400 text-xl"></i>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-800">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-brown-50 transition-smooth group">
                    <span className="font-[family-name:var(--font-inter)] font-medium text-brown-700 group-hover:text-brown-900">{h.day}</span>
                    <span className="font-[family-name:var(--font-inter)] text-brown-500 bg-white px-5 py-2 rounded-full text-sm shadow-sm border border-brown-100/50">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gradient-to-r from-gold-500/10 to-gold-400/10 border border-gold-500/20 rounded-2xl p-5">
                <p className="font-[family-name:var(--font-inter)] text-brown-700 text-sm text-center flex items-center justify-center gap-2">
                  <i className="fas fa-sun text-gold-500 animate-wiggle"></i>
                  Open daily — come enjoy the California sunshine!
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="animate-fade-in-right" delay="delay-300">
            <div className="glass-light rounded-3xl p-10 shadow-xl h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-br from-brown-800 to-brown-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <i className="fas fa-map-marker-alt text-gold-400 text-xl"></i>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-800">Find Us</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] text-brown-400 uppercase tracking-[0.3em] mb-3">Address</p>
                  <p className="font-[family-name:var(--font-inter)] text-brown-700 text-lg leading-relaxed font-light">
                    1800 Ocean Front Walk,<br />Venice Beach,<br />Los Angeles, CA 90291
                  </p>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] text-brown-400 uppercase tracking-[0.3em] mb-3">Phone</p>
                  <a href="tel:+13105550142" className="font-[family-name:var(--font-inter)] text-brown-700 text-lg hover:text-gold-500 transition-smooth flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-brown-50 flex items-center justify-center group-hover:bg-gold-500 transition-smooth">
                      <i className="fas fa-phone text-gold-500 group-hover:text-white text-sm transition-smooth"></i>
                    </div>
                    (310) 555-0142
                  </a>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] text-brown-400 uppercase tracking-[0.3em] mb-3">Price Level</p>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="text-gold-500 text-xl font-bold">$</span>
                      <span className="text-brown-300 text-xl">$$</span>
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-brown-500 text-sm">Budget-Friendly</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a href="https://maps.google.com/?q=Venice+Beach+Boardwalk+Los+Angeles+CA" target="_blank" rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-3 bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-700 hover:to-brown-800 text-white px-8 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm font-medium shadow-xl">
                    <i className="fas fa-directions"></i>Get Directions
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const reviews = [
    { text: "Coffee was soo good. The Spanish Latte is absolutely amazing — smooth, rich, and perfectly sweet. Will definitely be coming back!", author: "Jake Thompson", rating: 5 },
    { text: "Very reasonably priced for quality coffee. Best spot on Venice Beach for a morning caffeine fix. The frappe is top-notch!", author: "Emily Rodriguez", rating: 5 },
    { text: "Hidden gem on the boardwalk! The Chai Latte hits different with that ocean breeze. Staff is friendly and the vibe is great.", author: "Marcus Johnson", rating: 5 },
    { text: "Tried the Lotus Shake and it was incredible. Love the sunset views from the patio. Perfect hangout spot after a beach day.", author: "Sarah Mitchell", rating: 5 },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-brown-800 to-brown-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader tag="What People Say" title="Customer Love" light />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <AnimatedSection key={i} animation="animate-fade-in-up" delay={`delay-${(i + 1) * 150}` as string}>
              <div className="review-card glass rounded-3xl p-8 h-full">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <i key={j} className="fas fa-star text-gold-400 text-sm"></i>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-xl text-white italic mb-8 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-brown-600/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-[family-name:var(--font-playfair)] text-brown-900 font-bold text-lg">{review.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-white text-sm font-semibold">{review.author}</p>
                    <p className="font-[family-name:var(--font-inter)] text-brown-300 text-xs flex items-center gap-1.5 mt-0.5">
                      <i className="fab fa-google text-xs"></i> Verified Google Review
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay="delay-600" className="text-center mt-16">
          <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star text-gold-400 text-sm"></i>)}
            </div>
            <span className="font-[family-name:var(--font-inter)] text-brown-200 text-sm">5.0 / 5.0 on Google Maps</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Contact
function Contact() {
  return (
    <section id="contact" className="py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <AnimatedSection>
          <div className="ornament justify-center mb-4">
            <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl">Get in Touch</p>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-brown-800 mb-6 leading-tight">
            Come Visit Us <span className="italic">Today</span>
          </h2>
          <div className="section-divider-static mx-auto mb-8"></div>
          <p className="font-[family-name:var(--font-inter)] text-brown-500 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Whether it's your morning espresso or an afternoon frappe, we're here to make your day a little better.
            Drop by California Cafe on Venice Beach!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="tel:+13105550142"
              className="btn-primary inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-700 hover:to-brown-800 text-white px-10 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] font-medium shadow-xl">
              <i className="fas fa-phone"></i>Call Us Now
            </a>
            <a href="https://maps.google.com/?q=Venice+Beach+Boardwalk+Los+Angeles+CA" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-3 border-2 border-brown-800 text-brown-800 hover:bg-brown-800 hover:text-white px-10 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] font-medium">
              <i className="fas fa-map-marker-alt"></i>Get Directions
            </a>
          </div>

          <div className="flex justify-center gap-5">
            {[
              { icon: 'fab fa-instagram', label: 'Instagram' },
              { icon: 'fab fa-whatsapp', label: 'WhatsApp' },
              { icon: 'fab fa-facebook-f', label: 'Facebook' },
              { icon: 'fas fa-phone', label: 'Call' },
            ].map((s, i) => (
              <a key={i} href="#" aria-label={s.label}
                className="w-14 h-14 bg-white hover:bg-gradient-to-br hover:from-brown-800 hover:to-brown-900 text-brown-600 hover:text-gold-400 rounded-full flex items-center justify-center transition-smooth shadow-md hover:shadow-xl hover:-translate-y-1">
                <i className={`${s.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brown-900 to-black py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center shadow-lg">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">California</span>
                <span className="font-[family-name:var(--font-dancing)] text-gold-400 text-base">Cafe</span>
              </div>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-brown-300 text-sm leading-relaxed font-light">
              Specialty coffee crafted with passion, served with California sunshine on the iconic Venice Beach Boardwalk.
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-gold-400 font-semibold text-xs uppercase tracking-[0.3em] mb-6">Quick Links</h4>
            <div className="space-y-3">
              {['Home', 'About', 'Menu', 'Visit', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase() === 'visit' ? 'hours' : link.toLowerCase()}`}
                  className="block font-[family-name:var(--font-inter)] text-brown-300 hover:text-gold-400 transition-smooth text-sm group">
                  <span className="inline-block group-hover:translate-x-1 transition-smooth">→</span> {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-gold-400 font-semibold text-xs uppercase tracking-[0.3em] mb-6">Contact</h4>
            <div className="space-y-4">
              <p className="font-[family-name:var(--font-inter)] text-brown-300 text-sm flex items-start gap-3 font-light">
                <i className="fas fa-map-marker-alt text-gold-500 mt-1"></i>
                1800 Ocean Front Walk, Venice Beach, Los Angeles, CA 90291
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-300 text-sm flex items-center gap-3 font-light">
                <i className="fas fa-phone text-gold-500"></i>(310) 555-0142
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-300 text-sm flex items-center gap-3 font-light">
                <i className="fas fa-clock text-gold-500"></i>Daily: 6:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[family-name:var(--font-inter)] text-brown-400 text-xs tracking-wider">
            © 2026 CALIFORNIA CAFE — VENICE BEACH. ALL RIGHTS RESERVED.
          </p>
          <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-sm">
            Made with ☕ & love
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <BackToTop />
      <div className="noise-overlay"></div>
      <div className="font-[family-name:var(--font-inter)] bg-cream">
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <QuoteSection />
        <Menu />
        <HoursLocation />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

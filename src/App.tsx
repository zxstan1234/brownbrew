import { useState, useEffect, useRef, ReactNode } from 'react';

// Intersection Observer Hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated Section Wrapper
function AnimatedSection({ children, className = '', animation = 'animate-fade-in-up', delay = '' }: { children: ReactNode; className?: string; animation?: string; delay?: string }) {
  const { ref, isInView } = useInView(0.15);
  return (
    <div ref={ref} className={`${className} ${isInView ? `${animation} ${delay}` : 'opacity-0'}`}>
      {children}
    </div>
  );
}

// Navigation
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
    { href: '#hours', label: 'Hours' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${scrolled ? 'nav-blur bg-brown-900/90 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white tracking-wide">
            Brown Brew
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-brown-200 hover:text-gold-400 transition-smooth text-sm font-medium tracking-wide uppercase font-[family-name:var(--font-inter)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle menu"
        >
          <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-smooth overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-brown-900/95 nav-blur px-4 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-brown-200 hover:text-gold-400 transition-smooth text-sm font-medium tracking-wide uppercase font-[family-name:var(--font-inter)] py-2 border-b border-brown-700/30"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/4ee9059a-f5b8-40d8-bee4-697887b12438/_result.png"
          alt="Coffee"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-down">
          <p className="font-[family-name:var(--font-dancing)] text-gold-400 text-2xl md:text-3xl mb-4">
            Welcome to
          </p>
        </div>
        <h1 className="animate-fade-in-up delay-200 font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Brown Brew<br />
          <span className="gradient-text">Coffee</span>
        </h1>
        <p className="animate-fade-in-up delay-400 font-[family-name:var(--font-inter)] text-brown-200 text-lg md:text-xl mb-4 max-w-2xl mx-auto">
          Specialty coffee crafted with passion, served with love.
        </p>
        <p className="animate-fade-in-up delay-500 font-[family-name:var(--font-inter)] text-brown-300 text-sm md:text-base mb-10">
          Liberty Market, Gulberg III — Lahore
        </p>
        <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="cta-glow inline-block bg-gold-500 hover:bg-gold-400 text-brown-900 font-semibold px-8 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm uppercase tracking-wider"
          >
            View Our Menu
          </a>
          <a
            href="#contact"
            className="inline-block border-2 border-brown-200/40 hover:border-gold-400 text-white hover:text-gold-400 font-semibold px-8 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm uppercase tracking-wider"
          >
            Find Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-brown-200/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gold-400 rounded-full mt-2 animate-fade-in-up"></div>
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection animation="animate-fade-in-left">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://image.qwenlm.ai/generated-images/2b356dc8-bcec-43fd-94c3-e43f5fcc0ff7/_result.png"
                  alt="Brown Brew Coffee Shop Interior"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-brown-800 text-white p-6 rounded-2xl shadow-xl">
                <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold-400">5.0</p>
                <p className="text-brown-200 text-sm font-[family-name:var(--font-inter)]">★ Google Rating</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection animation="animate-fade-in-right" delay="delay-200">
            <div>
              <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl mb-2">Our Story</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-brown-800 mb-6">
                Brewed with<br />Passion & Purpose
              </h2>
              <div className="section-divider mb-8"></div>
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-lg leading-relaxed mb-6">
                At Brown Brew Coffee, we believe every cup tells a story. Located at the heart of Gulberg III, 
                opposite the iconic Liberty Market, we're your go-to destination for premium specialty coffee 
                in Lahore.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-lg leading-relaxed mb-8">
                From perfectly pulled espressos to creamy Spanish Lattes and indulgent ice cream shakes — 
                every drink is crafted with carefully selected beans and served with warmth. Whether you're 
                grabbing a quick coffee or settling in for the evening, we've got your brew.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-800">30+</p>
                  <p className="font-[family-name:var(--font-inter)] text-brown-500 text-sm mt-1">Menu Items</p>
                </div>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-800">7</p>
                  <p className="font-[family-name:var(--font-inter)] text-brown-500 text-sm mt-1">Days a Week</p>
                </div>
                <div className="text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-brown-800">100%</p>
                  <p className="font-[family-name:var(--font-inter)] text-brown-500 text-sm mt-1">Fresh Brewed</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Menu Section
function Menu() {
  const [activeCategory, setActiveCategory] = useState('coffee');

  const menuData: Record<string, { name: string; regular: string; large: string; icon?: string }[]> = {
    coffee: [
      { name: 'Espresso', regular: '350', large: '500', icon: '☕' },
      { name: 'Americano', regular: '450', large: '600', icon: '☕' },
      { name: 'Cappuccino', regular: '550', large: '700', icon: '☕' },
      { name: 'Cafe Latte', regular: '550', large: '700', icon: '☕' },
      { name: 'Spanish Latte', regular: '650', large: '750', icon: '☕' },
      { name: 'Flavored Latte', regular: '650', large: '750', icon: '☕' },
    ],
    cold: [
      { name: 'Ice Latte', regular: '550', large: '700', icon: '🧊' },
      { name: 'Spanish Latte (Cold)', regular: '650', large: '750', icon: '🧊' },
      { name: 'Flavored Latte (Cold)', regular: '650', large: '750', icon: '🧊' },
      { name: 'Frappe', regular: '700', large: '850', icon: '🧊' },
    ],
    tea: [
      { name: 'Green Tea', regular: '250', large: '350', icon: '🍵' },
      { name: 'Karak Chai', regular: '350', large: '500', icon: '🍵' },
      { name: 'Peach Iced Tea', regular: '400', large: '550', icon: '🍑' },
      { name: 'Hot Chocolate', regular: '600', large: '750', icon: '🍫' },
    ],
    shakes: [
      { name: 'Double Chocolate Shake', regular: '700', large: '850', icon: '🍫' },
      { name: 'Oreo Shake', regular: '700', large: '850', icon: '🍪' },
      { name: 'Chocolate Brownie Shake', regular: '700', large: '850', icon: '🧁' },
      { name: 'Lotus Shake', regular: '700', large: '850', icon: '🥤' },
    ],
    refreshments: [
      { name: 'Smoothies', regular: '700', large: '850', icon: '🥤' },
      { name: 'Chillers', regular: '350', large: '500', icon: '🧊' },
      { name: 'Sodas', regular: '150', large: '200', icon: '🥤' },
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
    <section id="menu" className="py-24 bg-brown-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl mb-2">What We Serve</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-brown-800 mb-4">
            Our Menu
          </h2>
          <div className="section-divider mx-auto mb-6"></div>
          <p className="font-[family-name:var(--font-inter)] text-brown-500 text-lg max-w-2xl mx-auto">
            All prices in PKR. Available in Regular & Large sizes.
          </p>
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection delay="delay-200" className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-full font-[family-name:var(--font-inter)] text-sm font-medium transition-smooth ${
                  activeCategory === cat.id
                    ? 'bg-brown-800 text-white shadow-lg'
                    : 'bg-white text-brown-600 hover:bg-brown-100 border border-brown-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuData[activeCategory]?.map((item, index) => (
            <AnimatedSection
              key={`${activeCategory}-${item.name}`}
              animation="animate-scale-in"
              delay={`delay-${(index + 1) * 100}` as string}
            >
              <div className="menu-card bg-white rounded-xl p-6 border border-brown-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brown-800">
                      {item.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex-1 bg-brown-50 rounded-lg p-3 text-center">
                    <p className="font-[family-name:var(--font-inter)] text-xs text-brown-400 uppercase tracking-wider mb-1">Regular</p>
                    <p className="font-[family-name:var(--font-inter)] text-lg font-bold text-brown-800">Rs. {item.regular}</p>
                  </div>
                  <div className="flex-1 bg-brown-800 rounded-lg p-3 text-center">
                    <p className="font-[family-name:var(--font-inter)] text-xs text-brown-300 uppercase tracking-wider mb-1">Large</p>
                    <p className="font-[family-name:var(--font-inter)] text-lg font-bold text-gold-400">Rs. {item.large}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Flavors Note */}
        {(activeCategory === 'coffee' || activeCategory === 'cold') && (
          <AnimatedSection className="mt-10 text-center">
            <div className="inline-block bg-brown-100 rounded-full px-6 py-3">
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-sm">
                <span className="font-semibold">Available Flavors:</span> {flavors}
              </p>
            </div>
          </AnimatedSection>
        )}

        {activeCategory === 'refreshments' && (
          <AnimatedSection className="mt-10 text-center">
            <div className="inline-block bg-brown-100 rounded-full px-6 py-3">
              <p className="font-[family-name:var(--font-inter)] text-brown-600 text-sm">
                <span className="font-semibold">Note:</span> Ask our server for choice of flavors
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// Beans Section (Visual Break)
function BeansSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/c3202f57-9919-440f-8c3a-7762472bcd7d/_result.png"
          alt="Coffee Beans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brown-900/80"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <AnimatedSection>
          <p className="font-[family-name:var(--font-dancing)] text-gold-400 text-2xl mb-4">Quality in Every Bean</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            "Coffee is a language in itself."
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-brown-200 text-lg">
            — Jackie Chan
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Hours & Location Section
function HoursLocation() {
  const hours = [
    { day: 'Monday', time: '4:00 PM – 2:00 AM' },
    { day: 'Tuesday', time: '4:00 PM – 2:00 AM' },
    { day: 'Wednesday', time: '4:00 PM – 2:00 AM' },
    { day: 'Thursday', time: '4:00 PM – 2:00 AM' },
    { day: 'Friday', time: '4:00 PM – 2:00 AM' },
    { day: 'Saturday', time: '4:00 PM – 2:00 AM' },
    { day: 'Sunday', time: '4:00 PM – 2:00 AM' },
  ];

  return (
    <section id="hours" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl mb-2">Plan Your Visit</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-brown-800 mb-4">
            Hours & Location
          </h2>
          <div className="section-divider mx-auto"></div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Hours */}
          <AnimatedSection animation="animate-fade-in-left" delay="delay-200">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brown-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-brown-800 rounded-full flex items-center justify-center">
                  <i className="fas fa-clock text-gold-400 text-lg"></i>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brown-800">
                  Opening Hours
                </h3>
              </div>
              <div className="space-y-4">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-brown-50 last:border-0">
                    <span className="font-[family-name:var(--font-inter)] font-medium text-brown-700">{h.day}</span>
                    <span className="font-[family-name:var(--font-inter)] text-brown-500 bg-brown-50 px-4 py-1.5 rounded-full text-sm">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gold-500/10 border border-gold-500/20 rounded-xl p-4">
                <p className="font-[family-name:var(--font-inter)] text-brown-700 text-sm text-center">
                  <i className="fas fa-moon text-gold-500 mr-2"></i>
                  Open every evening from 4 PM till late night!
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Location */}
          <AnimatedSection animation="animate-fade-in-right" delay="delay-300">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brown-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-brown-800 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-gold-400 text-lg"></i>
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-brown-800">
                  Find Us
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-brown-400 uppercase tracking-wider mb-2">Address</p>
                  <p className="font-[family-name:var(--font-inter)] text-brown-700 text-lg leading-relaxed">
                    Caltex Petrol Pump, opp. Liberty Market,<br />
                    Commercial Area Gulberg III,<br />
                    Lahore, Pakistan
                  </p>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-brown-400 uppercase tracking-wider mb-2">Phone</p>
                  <a href="tel:+923255387690" className="font-[family-name:var(--font-inter)] text-brown-700 text-lg hover:text-gold-500 transition-smooth flex items-center gap-2">
                    <i className="fas fa-phone text-gold-500"></i>
                    +92 325 5387690
                  </a>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-sm text-brown-400 uppercase tracking-wider mb-2">Price Level</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gold-500 text-xl">$</span>
                    <span className="font-[family-name:var(--font-inter)] text-brown-500">Budget-Friendly</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="https://maps.google.com/?q=Caltex+Petrol+Pump+Liberty+Market+Gulberg+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brown-800 hover:bg-brown-700 text-white px-6 py-3 rounded-full transition-smooth font-[family-name:var(--font-inter)] text-sm font-medium"
                  >
                    <i className="fas fa-directions"></i>
                    Get Directions
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

// Testimonials Section
function Testimonials() {
  const reviews = [
    { text: "Coffee was soo good. The Spanish Latte is absolutely amazing — smooth, rich, and perfectly sweet. Will definitely be coming back!", author: "Ahmed Raza", rating: 5 },
    { text: "Very reasonably priced for quality coffee. Best spot in Gulberg for a late-night caffeine fix. The frappe is top-notch!", author: "Ayesha Khan", rating: 5 },
    { text: "Hidden gem at Liberty! The Karak Chai hits different at 1 AM. Staff is friendly and the vibe is great.", author: "Hassan Malik", rating: 5 },
    { text: "Tried the Lotus Shake and it was incredible. Love that they're open till 2 AM. Perfect hangout spot after dinner.", author: "Fatima Noor", rating: 5 },
  ];

  return (
    <section className="py-24 bg-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dancing)] text-gold-400 text-xl mb-2">What People Say</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mb-4">
            Customer Love
          </h2>
          <div className="section-divider mx-auto"></div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <AnimatedSection key={i} animation="animate-fade-in-up" delay={`delay-${(i + 1) * 200}` as string}>
              <div className="bg-brown-700/50 border border-brown-600/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <i key={j} className="fas fa-star text-gold-400 text-sm"></i>
                  ))}
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-xl text-white italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/20 border border-gold-500/30 rounded-full flex items-center justify-center">
                    <span className="font-[family-name:var(--font-playfair)] text-gold-400 font-bold text-sm">{review.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-brown-200 text-sm font-medium">{review.author}</p>
                    <p className="font-[family-name:var(--font-inter)] text-brown-400 text-xs flex items-center gap-1">
                      <i className="fab fa-google text-xs"></i> Verified Google Review
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay="delay-500" className="text-center mt-12">
          <p className="font-[family-name:var(--font-inter)] text-brown-400 text-sm">
            <i className="fas fa-star text-gold-400 mr-1"></i>
            5.0 / 5.0 on Google Maps
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Contact / CTA Section
function Contact() {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="font-[family-name:var(--font-dancing)] text-gold-500 text-xl mb-2">Get in Touch</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-brown-800 mb-6">
            Come Visit Us Today
          </h2>
          <div className="section-divider mx-auto mb-8"></div>
          <p className="font-[family-name:var(--font-inter)] text-brown-500 text-lg mb-10 max-w-2xl mx-auto">
            Whether it's your morning espresso or a late-night frappe, we're here to make your day a little better. 
            Drop by Brown Brew Coffee at Liberty!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:+923255387690"
              className="inline-flex items-center justify-center gap-3 bg-brown-800 hover:bg-brown-700 text-white px-8 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] font-medium"
            >
              <i className="fas fa-phone"></i>
              Call Us Now
            </a>
            <a
              href="https://maps.google.com/?q=Caltex+Petrol+Pump+Liberty+Market+Gulberg+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-brown-800 text-brown-800 hover:bg-brown-800 hover:text-white px-8 py-4 rounded-full transition-smooth font-[family-name:var(--font-inter)] font-medium"
            >
              <i className="fas fa-map-marker-alt"></i>
              Get Directions
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-brown-100 hover:bg-brown-800 hover:text-white text-brown-600 rounded-full flex items-center justify-center transition-smooth">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="w-12 h-12 bg-brown-100 hover:bg-brown-800 hover:text-white text-brown-600 rounded-full flex items-center justify-center transition-smooth">
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
            <a href="tel:+923255387690" className="w-12 h-12 bg-brown-100 hover:bg-brown-800 hover:text-white text-brown-600 rounded-full flex items-center justify-center transition-smooth">
              <i className="fas fa-phone text-xl"></i>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-brown-900 py-12 border-t border-brown-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☕</span>
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">Brown Brew Coffee</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-brown-400 text-sm leading-relaxed">
              Specialty coffee crafted with passion. Serving Lahore since 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Menu', 'Hours', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block font-[family-name:var(--font-inter)] text-brown-400 hover:text-gold-400 transition-smooth text-sm">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <p className="font-[family-name:var(--font-inter)] text-brown-400 text-sm flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-gold-500 mt-1"></i>
                Caltex Petrol Pump, opp. Liberty Market, Gulberg III, Lahore
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-400 text-sm flex items-center gap-2">
                <i className="fas fa-phone text-gold-500"></i>
                +92 325 5387690
              </p>
              <p className="font-[family-name:var(--font-inter)] text-brown-400 text-sm flex items-center gap-2">
                <i className="fas fa-clock text-gold-500"></i>
                Daily: 4:00 PM – 2:00 AM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-800 pt-8 text-center">
          <p className="font-[family-name:var(--font-inter)] text-brown-500 text-sm">
            © 2026 Brown Brew Coffee — Liberty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="font-[family-name:var(--font-inter)] bg-cream">
      <Navbar />
      <Hero />
      <About />
      <BeansSection />
      <Menu />
      <HoursLocation />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

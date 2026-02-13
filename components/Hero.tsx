
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium minimalist t-shirts" 
          className="w-full h-full object-cover"
        />
        {/* Responsive Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h2 className="text-lg uppercase tracking-widest mb-4 font-medium animate-fade-in">Limited Edition</h2>
        <h1 className="text-6xl md:text-8xl font-serif mb-8 animate-slide-up">The Perfect Tee</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90 font-light italic">
          Curated collection of sustainable, high-quality basics designed for the modern minimalist.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a 
            href="#shop" 
            className="px-10 py-4 bg-white dark:bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white dark:hover:bg-neutral-200 transition-all duration-300 w-full md:w-auto"
          >
            Shop Now
          </a>
          <a 
            href="#shop" 
            className="px-10 py-4 border-2 border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto"
          >
            New Arrivals
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-[10px] uppercase tracking-widest mb-2 font-bold opacity-70">Scroll</span>
        <div className="w-[1px] h-10 bg-white opacity-50"></div>
      </div>
    </section>
  );
};

export default Hero;

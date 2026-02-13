
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Sparkles, User as UserIcon, Heart, LogOut, Settings, Moon, Sun, Search } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  user: User | null;
  isDarkMode: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleTheme: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenStylist: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'shop' | 'orders', category?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount, 
  user,
  isDarkMode,
  searchQuery,
  onSearchChange,
  onToggleTheme,
  onOpenCart, 
  onOpenWishlist, 
  onOpenStylist, 
  onOpenAuth, 
  onOpenAdmin,
  onLogout, 
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleLinkClick = (view: 'home' | 'shop' | 'orders', category?: string) => {
    onNavigate(view, category);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    onSearchChange('');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white dark:bg-black py-3 shadow-sm border-b dark:border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 relative flex justify-between items-center">
        
        {/* Mobile Toggle & Desktop Nav (Hidden when search active) */}
        {!isSearchActive && (
          <>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-current">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 lg:flex-none">
              <button onClick={() => handleLinkClick('home')} className="text-2xl font-bold tracking-widest font-serif block text-center lg:text-left hover:opacity-70 transition-opacity text-current">
                THE T-SHIRT STORE
              </button>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
              <button onClick={() => handleLinkClick('home')} className="hover:opacity-60 transition-opacity">Home</button>
              <button onClick={() => handleLinkClick('shop')} className="hover:opacity-60 transition-opacity">Shop All</button>
              <button onClick={() => handleLinkClick('shop', 'Women')} className="hover:opacity-60 transition-opacity">Women</button>
              <button onClick={() => handleLinkClick('shop', 'Men')} className="hover:opacity-60 transition-opacity">Men</button>
              {isAdmin && (
                <button onClick={onOpenAdmin} className="text-indigo-600 dark:text-indigo-400 font-bold hover:opacity-80 transition-opacity flex items-center space-x-1">
                  <Settings size={14} />
                  <span>Control Center</span>
                </button>
              )}
            </nav>
          </>
        )}

        {/* Search Input Bar (Shown when search active) */}
        <div className={`absolute inset-x-6 top-1/2 -translate-y-1/2 flex items-center transition-all duration-500 ${isSearchActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Search size={18} className="text-gray-400 mr-3" />
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for styles, colors, collections..."
            className="flex-1 bg-transparent border-none outline-none text-sm font-medium dark:text-white placeholder-gray-400"
          />
          <button onClick={closeSearch} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Icons Area */}
        <div className={`flex items-center space-x-2 lg:space-x-4 flex-1 lg:flex-none justify-end transition-opacity duration-300 ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button onClick={() => setIsSearchActive(true)} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all" aria-label="Open Search">
            <Search size={20} />
          </button>
          
          <button onClick={onToggleTheme} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all" aria-label="Toggle Theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button onClick={onOpenStylist} className="flex items-center space-x-1 text-sm font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden md:flex">
            <Sparkles size={18} />
            <span className="hidden xl:inline">AI Stylist</span>
          </button>

          <button onClick={onOpenWishlist} className="relative p-2 hover:opacity-60 transition-opacity hidden sm:block">
            <Heart size={22} className={wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-current'} />
            {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
          </button>

          <button onClick={onOpenCart} className="relative p-2 hover:opacity-60 transition-opacity">
            <ShoppingBag size={22} className="text-current" />
            {cartCount > 0 && <span className="absolute top-0 right-0 bg-black dark:bg-white dark:text-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>

          <div className="relative group">
            {user ? (
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-black dark:hover:border-white transition-all"
              >
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </button>
            ) : (
              <button onClick={onOpenAuth} className="p-2 hover:opacity-60 transition-opacity">
                <UserIcon size={22} className="text-current" />
              </button>
            )}

            {user && isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 shadow-2xl border dark:border-white/10 p-4 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Account</p>
                <p className="text-xs font-bold truncate mb-2 text-black dark:text-white">{user.name}</p>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate mb-4 italic">{user.email}</p>
                <div className="space-y-2">
                  {isAdmin && (
                    <button 
                      onClick={() => { onOpenAdmin(); setIsProfileOpen(false); }}
                      className="w-full text-left text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 py-2 flex items-center space-x-2"
                    >
                      <Settings size={12} />
                      <span>Control Center</span>
                    </button>
                  )}
                  <button 
                    onClick={() => handleLinkClick('orders')}
                    className="w-full text-left text-[10px] uppercase font-bold tracking-widest hover:text-gray-400 dark:hover:text-gray-500 py-2"
                  >
                    Orders
                  </button>
                  <button 
                    onClick={() => { onLogout(); setIsProfileOpen(false); }}
                    className="w-full text-left text-[10px] uppercase font-bold tracking-widest text-red-500 hover:text-red-700 py-2 flex items-center space-x-2 border-t dark:border-white/10 pt-4"
                  >
                    <LogOut size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-neutral-900 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6">
            <button onClick={() => setIsMenuOpen(false)} className="mb-8"><X size={24} /></button>
            <nav className="flex flex-col space-y-6 text-lg font-medium uppercase tracking-widest text-xs">
              <button className="text-left" onClick={() => handleLinkClick('home')}>Home</button>
              <button className="text-left" onClick={() => handleLinkClick('shop')}>Shop All</button>
              <button className="text-left" onClick={() => handleLinkClick('shop', 'Women')}>Women</button>
              <button className="text-left" onClick={() => handleLinkClick('shop', 'Men')}>Men</button>
              {user && (
                <button className="text-left" onClick={() => handleLinkClick('orders')}>My Orders</button>
              )}
              {isAdmin && (
                <button onClick={() => { setIsMenuOpen(false); onOpenAdmin(); }} className="text-left text-indigo-600 dark:text-indigo-400">Admin Panel</button>
              )}
              <button onClick={() => { setIsMenuOpen(false); onOpenStylist(); }} className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles size={20} />
                <span>AI Stylist</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

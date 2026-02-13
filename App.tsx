
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import StylistDrawer from './components/StylistDrawer';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import ShopPage from './components/ShopPage';
import ProductDetailPage from './components/ProductDetailPage';
import OrdersPage from './components/OrdersPage';
import Footer from './components/Footer';
import { inventoryService } from './services/inventoryService';
import { authService } from './services/authService';
import { emailService } from './services/emailService';
import { Product, CartItem, User, Order } from './types';
import { ArrowRight, CheckCircle, Loader2, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ id: string, items: CartItem[], total: number } | null>(null);
  
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product-detail' | 'orders'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const refreshProducts = () => {
    setProducts(inventoryService.getProducts());
  };

  const refreshOrders = useCallback(() => {
    if (user) {
      setUserOrders(inventoryService.getUserOrders(user.email));
    } else {
      setUserOrders([]);
    }
  }, [user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    inventoryService.initialize();
    refreshProducts();
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setCart(inventoryService.getUserCart(savedUser.email));
      setWishlist(inventoryService.getUserWishlist(savedUser.email));
    }
  }, []);

  useEffect(() => {
    refreshOrders();
  }, [user, refreshOrders]);

  useEffect(() => {
    if (user) {
      inventoryService.saveUserCart(user.email, cart);
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      inventoryService.saveUserWishlist(user.email, wishlist);
    }
  }, [wishlist, user]);

  const handleLogin = (email: string, name: string, password?: string) => {
    const newUser = authService.login(email, name, password);
    setUser(newUser);
    setCart(inventoryService.getUserCart(email));
    setWishlist(inventoryService.getUserWishlist(email));
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCart([]);
    setWishlist([]);
    setCurrentView('home');
  };

  const addToCart = useCallback((product: Product, selectedColor: string, selectedSize: string = 'M') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map(item => 
            (item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        }
        return prev;
      }
      return [...prev, { ...product, quantity: 1, selectedColor, selectedSize }];
    });
    setIsCartOpen(true);
  }, []);

  const toggleLove = useCallback((id: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setWishlist(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  }, [user]);

  const updateQuantity = useCallback((id: string, color: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty <= item.stock) return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeItem = useCallback((id: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color)));
  }, []);

  const handleCheckout = async () => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderItems = [...cart];

    setIsProcessingCheckout(true);
    setIsCartOpen(false);

    try {
      // Automatic background email dispatch
      await emailService.sendOrderEmails(orderId, orderItems, total, user);
      
      // Save order to history
      if (user) {
        inventoryService.saveOrder(user.email, {
          id: orderId,
          date: new Date().toISOString(),
          items: orderItems,
          total,
          status: 'Processing'
        });
        refreshOrders();
      }

      // Update inventory
      cart.forEach(item => inventoryService.updateStock(item.id, item.quantity));
      refreshProducts();
      
      setLastOrder({ id: orderId, items: orderItems, total });
      setCart([]);
      setIsConfirmationOpen(true);
    } catch (error) {
      console.error("Order processing failed", error);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const handleNavigate = (view: 'home' | 'shop' | 'orders', category: string = 'All') => {
    setCurrentView(view);
    setActiveCategory(category);
    setSearchQuery('');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && currentView !== 'shop') {
      setCurrentView('shop');
      setActiveCategory('All');
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = useMemo(() => 
    products.filter(p => wishlist.includes(p.id)), [products, wishlist]
  );

  return (
    <div className={`min-h-screen bg-white dark:bg-black transition-opacity duration-300 text-black dark:text-white`}>
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlist.length}
        user={user}
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onToggleTheme={toggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      
      <main>
        {/* Processing Overlay */}
        {isProcessingCheckout && (
          <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-500">
            <div className="relative mb-8">
              <Loader2 className="w-16 h-16 animate-spin text-white opacity-20" />
              <Mail className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif mb-2 tracking-tight">Confirming Your Order</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Dispatching Digital Receipts...</p>
            <div className="mt-8 w-48 h-[1px] bg-white/20 relative overflow-hidden">
               <div className="absolute inset-0 bg-white animate-progress-indeterminate"></div>
            </div>
          </div>
        )}

        {currentView === 'home' && searchQuery.trim() === '' ? (
          <>
            <Hero />
            <section id="shop" className="py-24 bg-white dark:bg-black">
              <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">Editor's Picks</h2>
                    <h3 className="text-4xl font-serif tracking-tight">Featured Signature Essentials</h3>
                  </div>
                  <button onClick={() => handleNavigate('shop')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity">
                    <span>View All</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {products.slice(0, 4).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      isLoved={wishlist.includes(product.id)}
                      onAddToCart={(p, c) => addToCart(p, c, p.sizes[0] || 'M')}
                      onToggleLove={toggleLove}
                      onViewDetail={() => handleViewProduct(product)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : currentView === 'product-detail' && selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            allProducts={products}
            wishlist={wishlist}
            onAddToCart={addToCart}
            onToggleLove={toggleLove}
            onViewProduct={handleViewProduct}
          />
        ) : currentView === 'orders' ? (
          <OrdersPage 
            orders={userOrders}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        ) : (
          <ShopPage 
            products={products} 
            wishlist={wishlist}
            initialCategory={activeCategory}
            searchQuery={searchQuery}
            onAddToCart={addToCart} 
            onToggleLove={toggleLove}
            onClearSearch={() => setSearchQuery('')}
            onViewProduct={handleViewProduct}
          />
        )}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        isProcessing={isProcessingCheckout}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistProducts}
        onRemove={toggleLove}
        onMoveToCart={(p) => { addToCart(p, p.colors[0].name, p.sizes[0]); toggleLove(p.id); }}
      />

      <StylistDrawer isOpen={isStylistOpen} onClose={() => setIsStylistOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
      
      {user?.role === 'admin' && (
        <AdminDashboard 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
          products={products}
          onProductsChange={refreshProducts}
        />
      )}
      
      {lastOrder && (
        <OrderConfirmationModal 
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          orderId={lastOrder.id}
          items={lastOrder.items}
          total={lastOrder.total}
          user={user}
        />
      )}

      <style>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s infinite linear;
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default App;

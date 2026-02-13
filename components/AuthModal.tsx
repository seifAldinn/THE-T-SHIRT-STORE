
import React, { useState } from 'react';
import { X, Mail, ArrowRight, Loader2, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string, password?: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate real-world authentication delay
    setTimeout(() => {
      onLogin(email, email.split('@')[0], password);
      setLoading(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-md p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300 border dark:border-white/10 overflow-hidden">
        {/* Main Header */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-black dark:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif mb-2 uppercase tracking-tight text-black dark:text-white">Sign In</h2>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Access your bag, wishlist, and profile.</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" size={18} />
              <input 
                type="text" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-gray-50 dark:bg-neutral-800 border-2 border-transparent focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black py-4 pl-12 pr-4 text-sm outline-none transition-all text-black dark:text-white"
                autoComplete="email"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-gray-50 dark:bg-neutral-800 border-2 border-transparent focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black py-4 pl-12 pr-4 text-sm outline-none transition-all text-black dark:text-white"
                autoComplete="current-password"
              />
            </div>
            <button 
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 px-6 font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-relaxed">
          Authorized access only. Management portal restricted to specific credentials.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

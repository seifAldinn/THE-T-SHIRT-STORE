
import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Save, Package, Palette, Ruler } from 'lucide-react';
import { Product, ColorVariant } from '../types';
import { inventoryService } from '../services/inventoryService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductsChange: () => void;
}

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, products, onProductsChange }) => {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!editingProduct) return;
    
    if (editingProduct.id) {
      inventoryService.updateProduct(editingProduct as Product);
    } else {
      const newProduct = {
        ...editingProduct,
        id: Math.random().toString(36).substr(2, 9),
      } as Product;
      inventoryService.addProduct(newProduct);
    }
    
    setEditingProduct(null);
    onProductsChange();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      inventoryService.deleteProduct(id);
      onProductsChange();
    }
  };

  const startNew = () => {
    setEditingProduct({
      name: '',
      price: 0,
      category: 'Unisex',
      image: '',
      hoverImage: '',
      description: '',
      colors: [{ name: 'Black', hex: '#000000' }],
      sizes: ['M'],
      stock: 10
    });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border dark:border-white/10">
        
        <div className="p-8 border-b dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-black/50">
          <div>
            <h2 className="text-3xl font-serif uppercase tracking-tight text-black dark:text-white">Control Center</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Inventory & Store Management</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={startNew}
              className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-black dark:text-white">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {editingProduct ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Product Name</span>
                    <input 
                      className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Price ($)</span>
                      <input 
                        type="number"
                        className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                        value={editingProduct.price}
                        onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Category</span>
                      <select 
                        className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}
                      >
                        <option>Men</option>
                        <option>Women</option>
                        <option>Unisex</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Description</span>
                    <textarea 
                      className="w-full border-2 dark:border-neutral-700 p-3 mt-2 outline-none focus:border-black dark:focus:border-white transition-colors h-24 bg-transparent dark:text-white"
                      value={editingProduct.description}
                      onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    />
                  </label>
                </div>

                {/* Images & Stock */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Main Image URL</span>
                    <input 
                      className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                      value={editingProduct.image}
                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Hover Image URL</span>
                    <input 
                      className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                      value={editingProduct.hoverImage}
                      onChange={e => setEditingProduct({...editingProduct, hoverImage: e.target.value})}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Stock Units</span>
                    <input 
                      type="number"
                      className="w-full border-b-2 dark:border-neutral-700 py-2 outline-none focus:border-black dark:focus:border-white transition-colors bg-transparent dark:text-white"
                      value={editingProduct.stock}
                      onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    />
                  </label>
                </div>
              </div>

              {/* Colors & Sizes Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t dark:border-white/10 pt-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-black dark:text-white">
                      <Palette size={16} className="text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xs font-bold uppercase tracking-widest">Color Variants</h3>
                    </div>
                    <button 
                      onClick={() => setEditingProduct({...editingProduct, colors: [...(editingProduct.colors || []), { name: 'New', hex: '#000000' }]})}
                      className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      + Add Color
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editingProduct.colors?.map((c, i) => (
                      <div key={i} className="flex items-center space-x-3 bg-gray-50 dark:bg-black/40 p-3 rounded border dark:border-white/5">
                        <input 
                          type="color" 
                          value={c.hex}
                          onChange={e => {
                            const newColors = [...(editingProduct.colors || [])];
                            newColors[i].hex = e.target.value;
                            setEditingProduct({...editingProduct, colors: newColors});
                          }}
                          className="w-8 h-8 rounded cursor-pointer bg-transparent"
                        />
                        <input 
                          value={c.name}
                          onChange={e => {
                            const newColors = [...(editingProduct.colors || [])];
                            newColors[i].name = e.target.value;
                            setEditingProduct({...editingProduct, colors: newColors});
                          }}
                          className="flex-1 bg-transparent border-b dark:border-neutral-700 outline-none text-sm dark:text-white"
                        />
                        <button onClick={() => setEditingProduct({...editingProduct, colors: editingProduct.colors?.filter((_, idx) => idx !== i)})} className="text-gray-400 dark:text-gray-600 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4 text-black dark:text-white">
                    <Ruler size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Available Sizes</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {ALL_SIZES.map(size => (
                      <button
                        key={size}
                        onClick={() => {
                          const current = editingProduct.sizes || [];
                          const next = current.includes(size) ? current.filter(s => s !== size) : [...current, size];
                          setEditingProduct({...editingProduct, sizes: next});
                        }}
                        className={`py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${editingProduct.sizes?.includes(size) ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'text-gray-400 dark:text-gray-500 border-gray-100 dark:border-neutral-800 hover:border-black dark:hover:border-white'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-8 border-t dark:border-white/10">
                <button onClick={() => setEditingProduct(null)} className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors">Cancel</button>
                <button 
                  onClick={handleSave}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.id} className="group relative bg-white dark:bg-neutral-800 border border-gray-100 dark:border-white/5 p-4 hover:shadow-xl transition-all">
                  <div className="aspect-square bg-gray-50 dark:bg-black/20 mb-4 overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-bold uppercase tracking-wide dark:text-white">{p.name}</h4>
                    <span className="font-bold dark:text-white">${p.price}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">
                    <Package size={10} />
                    <span>Stock: {p.stock} units</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-white/95 dark:bg-black/95 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => setEditingProduct(p)}
                      className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all"
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-3 text-red-500 border border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

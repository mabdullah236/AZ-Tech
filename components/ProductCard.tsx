import React, { useState } from 'react';
import { Product } from '../types';
import { PlusIcon, CheckIcon, EyeIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full relative">
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm border border-white/50">
          {product.category}
        </div>
        
        {/* Overlay with View Button on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            className="bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
          >
            <EyeIcon className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2 cursor-pointer" onClick={() => onViewDetails(product)}>
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <span className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              isAdded 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20'
            }`}
          >
            {isAdded ? (
              <>
                <CheckIcon className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
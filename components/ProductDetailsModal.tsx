import React, { useState, useRef, MouseEvent } from 'react';
import { Product } from '../types';
import { XIcon, CheckIcon, PlusIcon } from './Icons';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  if (!isOpen || !product) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)' // Zoom level
    });
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transformOrigin: 'center center', transform: 'scale(1)' });
  };

  const toggleClickZoom = (e: MouseEvent<HTMLDivElement>) => {
    // If clicking on mobile or desktop to toggle fixed zoom
    if (isZooming) {
      handleMouseLeave();
    } else {
      handleMouseMove(e);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-scaleIn">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section with Zoom */}
            <div className="bg-gray-100 p-8 flex items-center justify-center relative min-h-[300px] overflow-hidden group cursor-zoom-in">
              <div 
                className="relative w-full h-full flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={toggleClickZoom}
              >
                <img 
                  ref={imageRef}
                  src={product.image} 
                  alt={product.name} 
                  style={{ ...zoomStyle, transition: 'transform 0.1s ease-out' }}
                  className="w-full h-auto object-contain max-h-[400px] mix-blend-multiply relative z-10"
                />
              </div>
              
              {!isZooming && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                  Hover or click to zoom
                </div>
              )}

              <button 
                onClick={onClose}
                className="absolute top-4 left-4 md:hidden p-2 bg-white/80 rounded-full shadow-sm z-20"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Details Section */}
            <div className="p-8 flex flex-col h-full relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide mb-3">
                  {product.category}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h2>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 font-medium">
                    + {(product.taxRate * 100).toFixed(0)}% Tax
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
                <br /><br />
                Engineered for performance and designed for elegance, the {product.name} represents the pinnacle of {product.category.toLowerCase()} technology.
              </p>

              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-4">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3 text-green-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/20"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsModal;
import React from 'react';
import { CartItem } from '../types';
import { XIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity 
}) => {
  // Calculations per requested logic:
  // Tax is calculated on the single unit price (fixed fee per product line), not multiplied by quantity.
  
  const calculateLineDetails = (item: CartItem) => {
    const productTotal = item.price * item.quantity;
    const taxAmount = item.price * item.taxRate; // Fixed tax for this product line
    const totalLinePrice = productTotal + taxAmount;
    return { productTotal, taxAmount, totalLinePrice };
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalTax = cartItems.reduce((sum, item) => sum + (item.price * item.taxRate), 0);
  const total = subtotal + totalTax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">Your Cart ({cartItems.length})</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <XIcon className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={onClose} 
                className="text-blue-600 hover:underline font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const { productTotal, taxAmount, totalLinePrice } = calculateLineDetails(item);
              
              return (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-fadeIn">
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-900 truncate pr-2">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <p className="text-sm font-medium text-slate-700 mt-1">${item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                  </div>

                  {/* Pricing Breakdown per Item */}
                  <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-2">
                    <div className="flex justify-between text-gray-600 text-xs">
                      <span>Product Total</span>
                      <span>${productTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-xs border-b border-gray-200 pb-2">
                      <div className="flex items-center gap-1">
                        <span>Tax</span>
                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{(item.taxRate * 100).toFixed(0)}%</span>
                        <span className="text-[10px] text-gray-400">(Flat Rate)</span>
                      </div>
                      <span>${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1">
                      <span>Total</span>
                      <span>${totalLinePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex justify-end mt-3">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors text-gray-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors text-gray-600"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-200 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (Products)</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Tax (Fixed per Item)</span>
                <span>${totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-gray-100 mt-2">
                <span>Total to Pay</span>
                <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex justify-between px-6 items-center">
              <span>Checkout</span>
              <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
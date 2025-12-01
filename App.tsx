import React, { useState } from 'react';
import { PRODUCTS } from './constants';
import { Product, ProductCategory, CartItem } from './types';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import AIChat from './components/AIChat';
import Scroll from './components/Scroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSction from './components/HeroSection';
import ProductsGrid from './components/ProductsGrid';
import ToastNotify from './components/ToastNotify';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [AiName, setAiName]=useState("AZ Assistant");
  
  // New State for View Details & Animations
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isCartBumping, setIsCartBumping] = useState(false);


  const handleCategoryChange = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    // Automatically scroll to products when filter changes
    const productSection = document.getElementById('products');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Trigger Cart Animation
    setIsCartBumping(true);
    setTimeout(() => setIsCartBumping(false), 300);

    // Show notification
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
    <div className="min-h-screen flex flex-col">
        <Scroll setScrolled={setIsScrolled} />

        <Navbar isScrolled={isScrolled} handleCategoryChange={ handleCategoryChange} setIsCartOpen={setIsCartOpen} isCartBumping={isCartBumping} selectedCategory={selectedCategory} cartCount={cartCount}/>

      <HeroSction handleCategoryChange={handleCategoryChange}/>

      <AIChat AiName={AiName}/>

      <ProductsGrid handleCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} filteredProducts={filteredProducts} addToCart={addToCart} setViewingProduct={setViewingProduct}/>

        <Footer handleCategoryChange={handleCategoryChange}/>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}cartItems={cartItems}onRemoveItem={removeFromCart}onUpdateQuantity={updateQuantity}/>

      <ProductDetailsModal product={viewingProduct} isOpen={!!viewingProduct} onClose={() => setViewingProduct(null)} onAddToCart={addToCart}/>

      <ToastNotify notification={notification}/>
    // </div>
    </>
  );
};

export default App;
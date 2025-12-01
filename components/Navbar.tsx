import { useState } from "react";
import { STORE_NAME } from "@/constants";
import { ProductCategory } from "@/types";
import { ShoppingCartIcon, MenuIcon } from "./Icons";

const Navbar = (props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${props.isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform rotate-3">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <h1 className={`text-2xl font-bold tracking-tight ${props.isScrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-900'}`}>{STORE_NAME}</h1>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['All', ...Object.values(ProductCategory)].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => props.handleCategoryChange(cat as any)}
                                className={`text-sm font-medium transition-colors ${props.selectedCategory === cat ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>

                    {/* Cart + Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => props.setIsCartOpen(true)}
                            className={`relative p-2 text-gray-700 hover:text-blue-600 transition-transform duration-300 ${props.isCartBumping ? 'scale-125 text-blue-600' : ''}`}
                        >
                            <ShoppingCartIcon className="w-6 h-6" />
                            {props.cartCount > 0 && (
                                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce shadow-sm border-2 border-white">
                                    {props.cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown with Slide Animation */}
                <div className={`absolute top-0 right-0 w-64 bg-white/90 backdrop-blur-md shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-bold text-xl">
                            &times;
                        </button>
                    </div>
                    <nav className="flex flex-col px-4 pb-4">
                        {['All', ...Object.values(ProductCategory)].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { props.handleCategoryChange(cat as any); setIsMobileMenuOpen(false); }}
                                className={`py-2 text-left ${props.selectedCategory === cat ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-400'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar;

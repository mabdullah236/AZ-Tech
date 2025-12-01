import { ProductCategory } from "@/types"
import { CheckIcon } from "./Icons"

const Footer = (props) => {
    return (
        <>
            <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center transform rotate-3">
                                <span className="text-white font-bold text-xs">A</span>
                            </div>
                            <h4 className="text-xl font-bold">AZ Tech</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering your digital life with the world's most advanced technology products. Quality guaranteed.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-blue-400">Shop</h5>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="hover:text-white cursor-pointer" onClick={() => props.handleCategoryChange(ProductCategory.LAPTOPS)}>Laptops</li>
                            <li className="hover:text-white cursor-pointer" onClick={() => props.handleCategoryChange(ProductCategory.AUDIO)}>Audio</li>
                            <li className="hover:text-white cursor-pointer" onClick={() => props.handleCategoryChange(ProductCategory.WEARABLES)}>Wearables</li>
                            <li className="hover:text-white cursor-pointer" onClick={() => props.handleCategoryChange(ProductCategory.ACCESSORIES)}>Accessories</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-blue-400">Support</h5>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="hover:text-white cursor-pointer">Contact Us</li>
                            <li className="hover:text-white cursor-pointer">Shipping Policy</li>
                            <li className="hover:text-white cursor-pointer">Returns</li>
                            <li className="hover:text-white cursor-pointer">FAQ</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold mb-4 text-blue-400">Newsletter</h5>
                        <p className="text-slate-400 text-sm mb-4">Subscribe for the latest tech drops.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm text-white w-full focus:ring-2 focus:ring-blue-600 outline-none" />
                            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white">
                                <CheckIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    © {new Date().getFullYear()} AZ Tech Inc. All rights reserved.
                </div>
            </footer>
        </>
    )
}
export default Footer;
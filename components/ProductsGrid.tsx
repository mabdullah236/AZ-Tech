import ProductCard from "./ProductCard";
import { ProductCategory } from "@/types";

const ProductsGrid=(props)=>{
    return (
        <>
        <main id="products" className="flex-1 container mx-auto px-4 py-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">Featured Products</h3>
            <p className="text-gray-500 mt-2">Hand-picked premium gear just for you.</p>
          </div>
          
          {/* Mobile Category Filter (Scrollable) */}
          <div className="w-full md:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2">
              {['All', ...Object.values(ProductCategory)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => props.handleCategoryChange(cat as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    props.selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {props.filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={props.addToCart}
              onViewDetails={props.setViewingProduct}
            />
          ))}
        </div>

        {props.filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </main>
        </>
    )
}
export default ProductsGrid;
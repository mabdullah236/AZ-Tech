const HeroSction = (props) => {
    return (
        <>
            <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
                <div className="container mx-auto text-center max-w-4xl animate-fadeIn">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">New Arrivals 2024</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                        The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Technology</span> Is Here
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the next generation of premium electronics. From ultra-performance laptops to immersive audio, AZ Tech brings you the bleeding edge.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => props.handleCategoryChange('All')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
                        >
                            Shop Now
                        </button>
                        <button
                            onClick={() => {
                                props.handleCategoryChange('All');
                                setTimeout(() => {
                                    const productSection = document.getElementById('products');
                                    if (productSection) productSection.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all active:scale-95"
                        >
                            View Specs
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSction;
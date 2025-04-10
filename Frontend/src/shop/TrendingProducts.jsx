import React, { useState } from 'react'
import ProductCards from '../shop/ProductCards';
import products from "../data/products.json"

const TrendingProducts = () => {

const [productVisible, setproductVisible] = useState(8);

const loadMore = ()=> { 
    setproductVisible(prev => prev + 4);
}
  return (
    <div className='w-full mb-20 max-w-[1260px] mx-auto'>
        <div>
            <div className='text-center py-10'>
                <h1 className='text-3xl font-semibold'>Trending Products</h1>
                <h4 className='text-lg py-5 text-slate-400'>Discover trending fashion products: Style, elegance, comfort, and unbeatable trends!</h4>
            </div>
            <ProductCards products={products.slice(0, productVisible)} />
            {productVisible < products.length && (
                <div className='w-full flex justify-center mb-10'>
                    <button 
                        onClick={loadMore}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95">
                        Load More
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default TrendingProducts 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../../shop/ProductCards';
import products from '../../data/products.json';

const CategoriesPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category) {
      const filtered = products?.filter(
        (product) =>
          product.category.toLowerCase().trim() === category.toLowerCase().trim()
      ) || [];
      setFilteredProducts(filtered);
    }
  }, [category]);

  return (
    <div className='w-full h-full max-w-[1260px] mx-auto px-4'>
      <div className='w-full h-[40vh] my-10 bg-red-100 rounded-xl flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-2xl md:text-3xl font-bold uppercase'>{category}</h1>
        <p className='w-full md:w-2/4 pt-4 font-semibold text-zinc-500'>
          Discover a variety of products under the "{category}" category!
        </p>
      </div>
      <div className='w-full h-full'>
        <ProductCards products={filteredProducts} />
      </div>
    </div>
  );
};

export default CategoriesPage;

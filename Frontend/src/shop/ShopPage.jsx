import React, { useState, useEffect } from 'react';
import productsData from "../data/products.json";
import ProductCards from './ProductCards';
import ShopFiltering from "../shop/ShopFiltering.jsx";
import { useFetchAllProductsQuery } from '../redux/features/products/productsApi.js';

const filters = {
  category: ["all", "accessories", "dress", "cosmetics", "jewellery"],
  color: ["all", "black", "red", "gold", "beige", "green", "silver", "blue"],
  priceRanges: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and Above', min: 200, max: Infinity },
  ]
};

const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { color, category, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const clearFilters = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: '',
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Pages</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <div className='w-full h-auto max-w-[1260px] mx-auto px-4'>
      <div className='w-full h-auto my-10 bg-red-100 rounded-xl flex flex-col items-center justify-center py-10 text-center'>
        <h1 className='text-2xl md:text-3xl font-bold uppercase'>Shop Products</h1>
        <p className='w-full md:w-2/3 pt-4 font-semibold text-zinc-500'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt at nulla modi eos nemo?
        </p>
      </div>

      <div className='w-full flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-1/4'>
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />
        </div>

        <div className='w-full lg:w-3/4'>
          <h1 className='text-lg font-bold px-5 mb-4'>
            Showing {startProduct} to {endProduct} of Products: {totalProducts}
          </h1>
          <ProductCards products={products} />

          <div className='mt-6 flex flex-wrap justify-center gap-2'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

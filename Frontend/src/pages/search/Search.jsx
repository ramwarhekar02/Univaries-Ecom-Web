import React, { useState, useEffect } from 'react';
import products from "../../data/products.json";
import ProductCards from "../../shop/ProductCards";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full h-full max-w-[1260px] mx-auto px-4">
      <div className="w-full h-[40vh] my-10 bg-red-100 rounded-xl flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold uppercase">Search Products</h1>
        <p className="w-full md:w-2/4 pt-4 font-semibold text-zinc-500">
          Discover a variety of products under the category!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full mb-6">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your products..."
          className="w-full sm:max-w-2xl py-2 px-4 rounded-md border-2 border-zinc-400 outline-none"
          type="text"
        />
        <button
          onClick={() => {}}
          className="w-full sm:w-auto px-4 py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 transition"
        >
          Search
        </button>
      </div>
      <div className="pt-5">
        <ProductCards products={filteredProducts} />
      </div>
    </div>
  );
};

export default Search;

import React from 'react';

const ShopFiltering = ({ filters, filterState, setFilterState, clearFilters }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Filters</h1>

      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Category</h2>
        <hr className="border-gray-300" />
        {filters.category &&
          filters.category.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filterState?.category === category}
                onChange={(e) =>
                  typeof setFilterState === 'function' &&
                  setFilterState({ ...filterState, category: e.target.value })
                }
                className="accent-red-600"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
      </div>

      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Color</h2>
        <hr className="border-gray-300" />
        {filters.color &&
          filters.color.map((color) => (
            <label key={color} className="flex items-center space-x-2">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filterState?.color === color}
                onChange={(e) =>
                  typeof setFilterState === 'function' &&
                  setFilterState({ ...filterState, color: e.target.value })
                }
                className="accent-red-600"
              />
              <span className="capitalize">{color}</span>
            </label>
          ))}
      </div>

      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Price Range</h2>
        <hr className="border-gray-300" />
        {filters.priceRanges &&
          filters.priceRanges.map((range) => (
            <label key={range.label} className="flex items-center space-x-2">
              <input
                type="radio"
                name="range"
                value={`${range.min}-${range.max}`}
                checked={filterState?.priceRange === `${range.min}-${range.max}`}
                onChange={(e) =>
                  typeof setFilterState === 'function' &&
                  setFilterState({ ...filterState, priceRange: e.target.value })
                }
                className="accent-red-600"
              />
              <span className="capitalize">{range.label}</span>
            </label>
          ))}
      </div>

      <button
        onClick={clearFilters}
        className="w-full mt-4 font-bold px-5 py-2 rounded-md bg-red-800 text-white hover:bg-red-700 transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ShopFiltering;

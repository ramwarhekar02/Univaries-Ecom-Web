import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../redux/features/products/productsApi';

const AddNewPost = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'accessories',
    description: '',
    price: '',
    oldPrice: '',
    image: '',
    color: '',
  });

  const [addedProducts, setAddedProducts] = useState([]); // Store added products
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' && value < 0) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.category || !formData.description || !formData.price || !formData.image || !formData.color) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log("Submitting product data:", formData);

    try {
      const response = await addProduct(formData).unwrap();
      if (response) {
        alert('Product details sent successfully!');
        console.log('Response from backend:', response);
      } else {
        alert('Failed to send product details.');
      }
      setFormData({ // Reset form fields
        name: '',
        category: 'accessories',
        description: '',
        price: '',
        oldPrice: '',
        image: '',
        color: '',
      });
    } catch (error) {
      console.error('Error sending product details:', error);
      alert(error?.data?.message || 'Failed to send product details. Please try again.');
    }
  };

  const categories = ['accessories', 'dress', 'jewellery', 'cosmetics']; // Available categories

  return (
    <div className="w-full max-w-[1260px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="Old Price (optional)"
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Color (e.g., red, blue)"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          rows="4"
          className="w-full px-4 py-2 border rounded-md"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-800 text-white font-bold rounded-md hover:bg-blue-900 transition"
        >
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {/* Preview Section */}
      {formData.name && (
        <div className="mt-10 p-4 border rounded-md bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Product Preview</h2>
          <div className="flex gap-4">
            {formData.image && (
              <img
                src={formData.image}
                alt={formData.name}
                className="w-32 h-32 object-cover rounded-md"
              />
            )}
            <div>
              <h3 className="text-lg font-bold">{formData.name}</h3>
              <p className="text-sm text-gray-600">{formData.description}</p>
              <p className="text-sm font-semibold">Category: {formData.category}</p>
              <p className="text-sm font-semibold">Color: {formData.color}</p>
              <p className="text-sm font-semibold">
                Price: ${formData.price}{' '}
                {formData.oldPrice && <s className="text-gray-500">${formData.oldPrice}</s>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Added Products Section */}
      {addedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Added Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedProducts.map((product, index) => (
              <div key={index} className="p-4 border rounded-md bg-white shadow-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm font-semibold">Category: {product.category}</p>
                <p className="text-sm font-semibold">Color: {product.color}</p>
                <p className="text-sm font-semibold">
                  Price: ${product.price}{' '}
                  {product.oldPrice && <s className="text-gray-500">${product.oldPrice}</s>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewPost;

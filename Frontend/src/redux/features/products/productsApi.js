import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://univaries-ecom-web.onrender.com/api/products',
        credentials: 'include',
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const querParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || 0,
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${querParams}`;
            },
            providesTags: ['Products'],
        }),

        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providedTags: (result, error, id) => [{ type: 'Products', id }],
        }),

        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Products'],
        }),

        fetchRelatedProducts: builder.query({
            query: (id) => `/related/${id}`,
            providesTags: ['Products'],
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const { useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductMutation, useFetchRelatedProductsQuery, useUpdateProductMutation, useDeleteProductMutation } = productApi;

export default productApi;

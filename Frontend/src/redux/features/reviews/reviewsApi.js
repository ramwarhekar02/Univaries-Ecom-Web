import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApi =  createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://univaries-ecom-web.onrender.com/api/reviews',
        credentials: 'include',
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewNew) => ({
                url: '/post-review',
                method: 'POST',
                body: reviewNew,
            }),
            invalidatesTags: (result, error, {postId})=> [{type: 'Reviews', id: postId}],
        }),

        getReviewsCount: builder.query({
            query: () => ({
                url: '/total-reviews',
            }),
            providesTags: ['Reviews'],
        }),
        getReviewsByUserId: builder.query({
            query: (userId) => `/${userId}`,
            providesTags: (result)=> result ? [{type: 'Reviews', id: result._id}] : [],
        }),
    })
})

export const { usePostReviewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery } = reviewApi;
export default reviewApi;

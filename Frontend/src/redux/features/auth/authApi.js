import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://univaries-ecom-web.onrender.com/api/auth',
        credentials: 'include',
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: 'POST',
                body: newUser,
            }),
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: 'POST',
                body: credentials,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: 'POST'
            }),
        }),

        getUser: builder.query({
            query: () => ({ 
                url: "/getusers",
                method: "GET",
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["User"],
        }),

        updateUserRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role },
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"],
        }),

        editProfile: builder.mutation({
            query: (profileData) => ({
                url: "/edit-profile",
                method: "PATCH",
                body: profileData,
            }),
        }),
    }),
});

export default authApi;

export const { 
    useRegisterUserMutation, 
    useLoginUserMutation, 
    useEditProfileMutation, 
    useUpdateUserRoleMutation, 
    useDeleteUserMutation, 
    useGetUserQuery,
    useLogoutUserMutation 
} = authApi;

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "http://localhost:3500/";


// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllPost: builder.query({
        query: () => ({
            url:"todos",
            method: "GET"
        })
    }),

    getPostById: builder.query({
        query: (id) => ({
            url:`todos/${id}`,
            method: "GET"
        })
    }),

    getPostByLimit: builder.query({
        query: (num) => ({
            url:`posts?_limit=${num}`,
            method: "GET"
        })
    }),

    deletePost: builder.mutation({
        query: (id) => ({
            url:`todos/${id}`,
            method: "DELETE"
        })
    }),

    createPost: builder.mutation({
        query: (newPost) => ({
            url:`posts`,
            method: "POST",
            body: newPost,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
    }),

    updatePost: builder.mutation({
        query: (updatePostData) => {
            const {id, ...data} = updatePostData;
            return {
            url:`todos/${id}`,
            method: "PUT",
            body: data
            }
        }
    }),
})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUpdatePostMutation, useCreatePostMutation, useGetAllPostQuery, useGetPostByIdQuery, useGetPostByLimitQuery, useDeletePostMutation } = todosApi
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3500/";

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "posts",
      }),
      providesTags: ["Posts"],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: ["Posts"],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/posts",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Posts"],
    }),

    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/posts/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Posts"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation
} = postsApi;

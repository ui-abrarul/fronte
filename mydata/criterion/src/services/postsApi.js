import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3500/"}),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url:'todos',
                method: "GET"
            }),
            providesTags: ['Todos'],
        }),

        addTodo: builder.mutation({
            query: (todo) => ({
                url:'/todos',
                method: "POST",
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),

        updateTodo: builder.mutation({
            query: (todo) => ({
                url:`/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ['Todos'],
        }),


        deleteTodo: builder.mutation({
            query: ({id}) => ({
                url:`/todos/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ['Todos'],
        })
    
    })
})

export const {useGetTodosQuery,useAddTodoMutation,useUpdateTodoMutation,useDeleteTodoMutation} = postsApi
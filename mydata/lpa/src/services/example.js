import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getExampleRequest: builder.query({
      query: () => `todos/5`,
    }),
    postExampleRequest: builder.mutation({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetExampleRequestQuery, usePostExampleRequestMutation } =
  exampleApi;

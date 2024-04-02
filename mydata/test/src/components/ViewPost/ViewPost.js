import React from "react";
import { useForm } from "react-hook-form";

import { Link, useParams } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useDeletePostMutation,
  useCreatePostMutation,
} from "../../services/postsApi";

const ViewPost = () => {
  let { id } = useParams();
  const responseById = useGetPostByIdQuery(id);

  console.log(responseById.data);

  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const res = await fetch(
        `http://localhost:3500/todos/${id}`
      );
      const data = await res.json();
      return {
        userId: data.userId,
        title: data.title,
        body: data.body,
      };
    },
  });
  const [sendRequest, { data, isSuccess }] = useCreatePostMutation();
  const [deletePost, responseInfo] = useDeletePostMutation();

  const onSubmit = (data) => sendRequest(data);

  if (responseById.isLoading) return <div>Loading...</div>;
  if (responseById.isError)
    return <div>An error {responseById.error.error}...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userId")} />
        <input {...register("title")} />
        <input {...register("body")} />
        <input type="submit" />
      </form>

      <h2>{responseById.data.title}</h2>
      <p>{responseById.data.body}</p>
      <Link to={`/posts/${id}/edit`}>Edit</Link>
      <button onClick={() => deletePost(responseById)}>Delete</button>
    </div>
  );
};

export default ViewPost;

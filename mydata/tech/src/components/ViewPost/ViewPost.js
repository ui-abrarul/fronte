import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useCreatePostMutation, useDeletePostMutation, useGetPostByIdQuery, useUpdatePostMutation } from '../../services/todosApi';

const ViewPost = () => {
    let { id } = useParams();
    const responseById = useGetPostByIdQuery(id);

    const { register, handleSubmit } = useForm({
        defaultValues: async () => {
          const res = await fetch(
            `http://localhost:3500/todos/${id}`
          );
          const data = await res.json();
          return {
            userId: data.userId,
            title: data.title,
          };
        },
      });
      const [sendRequest, { data, isSuccess }] = useUpdatePostMutation();

      const onSubmit = (data) => sendRequest(data);

      
      if (responseById.isLoading) return <div>Loading...</div>;
      if (responseById.isError)
        return <div>An error {responseById.error.error}...</div>;

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} />
      <input {...register("id")} />
      <input type="submit" value='update'/>
    </form>

    {/* <h2>{responseById.data.title}</h2>
    <p>{responseById.data.body}</p> */}
  </div>
  )
}

export default ViewPost
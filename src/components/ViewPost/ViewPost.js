import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useUpdateTodoMutation,
} from "../../services/postsApi";
import { useForm } from "react-hook-form";

const ViewPost = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetPostByIdQuery(id);
  const [updateTodo] = useUpdateTodoMutation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log(data)
    updateTodo({id:id ,...data});
    reset();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error..</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label>Todo</label>
    
          <input
            type="text"
            name="title"
            {...register("title", {
              required: "Todo is required.",
            })}
          />
          {errors.title && <p className="errorMsg">{errors.title.message}</p>}
        </div>
        <br />
        <div className="form-control">
          <button type="submit">Update</button>
        </div>
      </form>

      <h4>{data.title}</h4>
    </div>
  );
};

export default ViewPost;

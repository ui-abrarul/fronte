import React from "react";
import {
    useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllPostsQuery,
} from "../../services/postsApi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery();

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uid = Math.random();


  const onSubmit = (data) => {
    addTodo({id: `${uid}`,  ...data})
    reset()
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
        <br/>
        <div className="form-control">
          <button type="submit">Register</button>
        </div>
      </form>

      <br/><br/><br/>

      {data.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <Link to={`/posts/${item.id}`}>View Post</Link>
          <br />
          <br />
          <button onClick={() => deleteTodo(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Home;

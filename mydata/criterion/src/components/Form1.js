import React, { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../services/postsApi";
import { useForm } from "react-hook-form";

const Form1 = () => {
  const uid = Math.random();

  const [newTodo, setNewTodo] = useState("");

  const { data, isLoading, isSuccess, isError, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const form = useForm();
  const { register, handleSubmit, control, reset, formState } = form;

  const { errors } = formState;
  const onSubmit = (data) => addTodo({ id: `${uid}`, ...data });
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addTodo({ id: `${uid}`, userId: 18, title: newTodo, completed: false });
  //   setNewTodo("");
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error {error.error}...</div>;

  return (
    <div>
      {data.map((post, index) => (
        <div key={index}>
          <form className="form-wrapper" onSubmit={handleSubmit((data) => onSubmit(data, index))}>
            <div className="input-box">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
              />
              {errors.name && <p className="error">{errors.name?.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                {...register("email", {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email",
                  },
                  required: { value: true, message: "Email is required" },
                })}
              />
              {errors.email && <p className="error">{errors.email?.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                name="address"
                {...register("address", {
                  required: { value: true, message: "Address is required" },
                })}
              />
              {errors.address && (
                <p className="error">{errors.address?.message}</p>
              )}
            </div>

            <div className="input-box">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                name="city"
                {...register("city", {
                  required: { value: true, message: "City is required" },
                })}
              />
              {errors.city && <p className="error">{errors.city?.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="Enter your state"
                name="state"
                {...register("state", {
                  required: { value: true, message: "State is required" },
                })}
              />
              {errors.state && <p className="error">{errors.state?.message}</p>}
            </div>

            <div className="input-box">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                placeholder="Enter your contact"
                name="contact"
                {...register("contact", {
                  pattern: {
                    value:
                      /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
                    message: "Invalid Number",
                  },
                  required: { value: true, message: "Contact is required" },
                })}
              />
              {errors.contact && (
                <p className="error">{errors.contact?.message}</p>
              )}
            </div>

            <div className="input-box image-box">
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                id="file"
                name="file"
                {...register("file", {
                  required: { value: true, message: "Image is required" },
                })}
              />
              {errors.file && <p className="error">{errors.file?.message}</p>}
            </div>

            <div className="reg-btn">
              <button type="submit">Update</button>
            </div>
          </form>

          <p>
            <strong>Name:</strong> {post.name}
          </p>
          <p>
            <strong>Email:</strong> {post.email}
          </p>
          <p>
            <strong>Address:</strong> {post.address}
          </p>
          <p>
            <strong>city:</strong> {post.city}
          </p>
          <p>
            <strong>state:</strong> {post.state}
          </p>
          <p>
            <strong>contact:</strong> {post.contact}
          </p>
          <p>
            <strong>Completed:</strong> {post.completed ? "true" : "false"}
          </p>
          <div className="todo">
            <input
              type="checkbox"
              checked={post.completed}
              id={post.id}
              onChange={() =>
                updateTodo({ ...post, completed: !post.completed })
              }
            />
            <label htmlFor={post.id}>Mark as Complete</label>
          </div>
          <button onClick={() => deleteTodo({ id: post.id })}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Form1;

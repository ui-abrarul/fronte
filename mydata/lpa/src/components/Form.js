import React from "react";
import { useForm } from "react-hook-form";
import { usePostExampleRequestMutation } from "../services/example";

const Form = ({ defaultData }) => {
  const { register, handleSubmit } = useForm();
  const [sendRequest, { data, isSuccess }] = usePostExampleRequestMutation();

  const onSubmit = (data) => sendRequest(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userId")} />
        <input {...register("title")} />
        <select {...register("completed")}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <input type="submit" />
      </form>
      {isSuccess && (
        <div>
          <h3>Resopnse Data: </h3>
          <div> userId: {data?.userId} </div>
          <div> title: {data?.title} </div>
          <div> completed: {data?.completed} </div>
          <div> id: {data?.id} </div>
        </div>
      )}
    </div>
  );
};

export default Form;

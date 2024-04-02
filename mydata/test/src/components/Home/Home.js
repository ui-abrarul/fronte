import React from 'react'
import { useCreatePostMutation, useDeletePostMutation, useGetAllPostQuery, useGetPostByLimitQuery, useUpdatePostMutation } from '../../services/postsApi'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Home = () => {
    const { register, handleSubmit } = useForm();

    const responseInfo = useGetPostByLimitQuery(10);
    
    const [deletePost,responseInfodel] = useDeletePostMutation();

    const [createPost,responseInfoCreate] = useCreatePostMutation();

    const [updatePost,responseInfoUpdate] = useUpdatePostMutation();

    
    const [sendRequest, { data, isSuccess }] = useCreatePostMutation();


    const onSubmit = (data) => sendRequest(data);



    if(responseInfo.isLoading) return <div>Loading...</div>
    if(responseInfo.isError) return <div>An error {responseInfo.error.error}...</div>

    const newPost = {
        title: 'foo man',
        body: 'bar',
        userId: 1,
    }

    const updatedPost = {
        id: 1,
        title: 'foo man update',
        body: 'bar',
        userId: 1,
    }



  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>body</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {responseInfo.data.map((post,index) => (
                    <tr key={index}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                        <Link to={`/posts/${post.id}`}>View</Link>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Create Post</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("userId")} />
        <input {...register("title")} />
        <input {...register("body")} />
        <select {...register("completed")}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <input type="submit" />
      </form>

        <button onClick={() => createPost(newPost)}>Create</button>

        <h2>Update Post</h2>
        <button onClick={() => updatePost(updatedPost)}>Update</button>

    </div>
  )
}

export default Home
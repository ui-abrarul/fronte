import React from 'react';
import { useCreatePostMutation, useDeletePostMutation, useGetAllPostQuery, useGetPostByLimitQuery, useUpdatePostMutation } from '../../services/todosApi'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Home = () => {

  const responseInfo = useGetAllPostQuery();
  const [deletePost,responseInfodel] = useDeletePostMutation();

  if(responseInfo.isLoading) return <div>Loading...</div>
  if(responseInfo.isError) return <div>An error {responseInfo.error.error}...</div>


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
                {responseInfo?.data?.map((post,index) => (
                    <tr key={index}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.completed ? 'true' : 'false'}</td>
                        <td>
                        <Link to={`/posts/${post.id}`}>View</Link>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Home
import { createFileRoute } from '@tanstack/react-router'

// import {useForm} from "rea"
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import PostType from '../PostType';

export const Route = createFileRoute("/AddPosts")({
    component:AddPosts
})

async function addPost(data:PostType){
    const resp = await fetch("http://localhost:3000/createPost",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-type":"application/json"
        }
    })

    return resp.json()
}

export default function AddPosts() {
    const {register,handleSubmit} = useForm<PostType>();
    const mutation = useMutation({
        mutationFn:addPost
    })

    const onSubmit:SubmitHandler<PostType> = (data)=>{
        mutation.mutate(data)
    } 

  return (
    <div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input type="text" {...register('title')} placeholder='Enter Title'></input>
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" {...register('author')} placeholder='Enter Author'></input>
                </div>

                <div>
                    <label>Content</label>

                    <input type="text" {...register('content')} placeholder='Enter Content'></input>    
                </div>

                <div>
                    <button >{mutation.isPending?"Adding Post":"Add Post"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

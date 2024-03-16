import { useQueries, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

const fetchPost=async(postID : string)=>{
    const data = await fetch("http://localhost:3000/post/"+postID,{
        method:"POST"
    })
    return data.json()
}


export const Route=createFileRoute("/posts/$postId")({
    component:PostId
})

export default function PostId() {
    const {postId}= Route.useParams()

    const {isPending,error,isError,data}=useQuery({
        queryKey:["posts",postId],
        queryFn:()=>{
            return fetchPost(postId)
        }
    })

    if(isPending) return <div>Loading ........</div>

    if(isError) return <pre>{JSON.stringify(error)}</pre>

  return (
    <div>
        <div>
            <h1>{data?.post?.title ?? ""}</h1>
        </div>

        <div>
            <h2>{data?.post?.author ?? ""}</h2>
        </div>

        <div>
            <h2>{data?.post?.content ?? ""}</h2>
        </div>
    </div>
  )
}

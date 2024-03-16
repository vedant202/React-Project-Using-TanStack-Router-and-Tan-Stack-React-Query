import { Link, createFileRoute } from "@tanstack/react-router"
import { useInfiniteQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/Posts")({
    component:Posts
})

type Post={
    id:number,
    title:string,
    content:string,
    author:string
}

async function fetchPosts( page:number) {
    const data = await fetch("http://localhost:3000/posts?page="+page,{
        headers:{
            "Content-type":"application/json"
        }
    });

    return data.json()
}



export default function Posts() {

    
    
    // const [posts,setPosts] = useState<Post[]>([])

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: fetchPosts,
    //   })

    const {isFetchingNextPage,error,status,data,hasNextPage,isPending,fetchNextPage} = useInfiniteQuery({
        queryKey:["posts","infinite"],
        getNextPageParam:(lastPage, allPages)=>{
            console.log("prevData ",lastPage, allPages)
            return lastPage?.nextPostAvailable? Number(lastPage?.nextPage):undefined},
        queryFn:({pageParam=1 })=>{
            console.log("pageParam :- ",pageParam)
            return fetchPosts(pageParam)
        },
    })


   

    if(isPending){
        return (<div>Loading Posts......</div>)
    }

    if(error){
        return (<div>An Error has occured {error.message}</div>)
    }
    console.log(data)
  
    
    return (
    <div onScroll={()=>console.log("scrolled event")}>
        Posts

        <div>
           {
            data.pages?.map(posts=>{
                console.log("posts ",posts)
                return posts?.posts.map((i)=>(
                    <div>
                        {i.title}
                    </div>
                ))
            })
           }
           {hasNextPage && <button onClick={()=>fetchNextPage()}>{isFetchingNextPage?"Loading ....":"Load More"} </button>}
        </div>

    </div>
  )
}

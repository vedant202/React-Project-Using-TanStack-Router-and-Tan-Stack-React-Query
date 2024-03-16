import express, { Request, Response } from "express";
import db from "./db/db"

const app = express()
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port =3000

// id        Int     @id @default(autoincrement())
// title     String
// content   String?
// author    String

interface post{
    id?:number,
    title:string
    content:string
    author:string
}

app.get("/posts",async(req,res)=>{
    const limit:number = 10;
    const {page=1} = req.query;

    console.log("req query :- ",req.query)
    const totalPost:number = await db.post.count()

    console.log("Total Number of posts ",totalPost)
    let isnextposts:boolean = false;
    let nextPage:number =0; 

    if((totalPost-(limit*Number(page)))>=0){
        isnextposts=true;
        nextPage=Number(page) + 1;
    }else{
        isnextposts = false;
    }
    console.log("nex page available "+isnextposts)
    const posts =(totalPost-(limit*Number(page)))>=0? await db.post.findMany(
        {
            skip:limit* (Number(page)-1),
            take:limit,


        }
    ) : [];
    res.status(200).json({posts:posts,nextPage:nextPage,nextPostAvailable:isnextposts});
})

app.post("/post/:id",async (req,res)=>{
    const params:number =Number(req.params.id);
    console.log(params)
    const post = await db.post.findUnique({
        where:{
            id:params
        }
    })
    res.json({success:true,post:post})
})

app.post("/createPost",async (req:Request<{},{},post>,res:Response)=>{
    const body:post=req.body;
    
        const postSaved=await db.post.create({
            data:body
        });
        console.log("Body :- ",postSaved);
    

    

    // console.log("Body :- ",postSaved);
    return res.json({success:true,post:postSaved})
})

app.listen(port,()=>{
    console.log("App is listening on port "+port);
})
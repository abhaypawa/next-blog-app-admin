import { ConnectDB } from "@/lib/config/db";
import Blogmodel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises';
const fs = require('fs')

const LoadDB = async () =>{
    await ConnectDB()
}

LoadDB();
//Api endpoints for get all blogs

export async function GET(request){

    const blogId = request.nextUrl.searchParams.get("id")
    if(blogId){
        const blog = await Blogmodel.findById(blogId);
        return NextResponse.json(blog)
    }else{
        const blogs = await Blogmodel.find({})
        return NextResponse.json({blogs})
    }  
}
//Api endpoint for uploading blogs
export async function POST(request){
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`

    }

    await Blogmodel.create(blogData);
    console.log("Blog Saved")


    return NextResponse.json({success:true, message:"Blog added"})

}

//createing api endpoint for delete blog

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await Blogmodel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await Blogmodel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"})

}


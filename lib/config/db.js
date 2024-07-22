import mongoose from "mongoose";

export const ConnectDB = async() =>{
    await mongoose.connect('mongodb+srv://abhayrpawar123:Kusuma%40123@cluster0.etlejyo.mongodb.net/?retryWrites=true&w=majority&appName=blog-app')
    console.log("db connected")
} 
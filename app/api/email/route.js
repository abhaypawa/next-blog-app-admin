import { ConnectDB } from "@/lib/config/db";
import Emailmodel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDB = async()=>{
    await ConnectDB();
}

LoadDB();
export async function POST(request){
    const formData = await request.formData();
    const emailData = {
        email:`${formData.get('email')}`,
        
    }
    await Emailmodel.create(emailData);
    return NextResponse.json({success:true, msg:"email subscribed"})
}

export async function GET(request){
    const emails = await Emailmodel.find({});
    return NextResponse.json({emails});
}

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    await Emailmodel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Email deleted"})
}

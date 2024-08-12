import cloudinary from "@/app/lib/cloudinary";

import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest)=>{
    try {
        const body = await req.json();
        const fileStr = body.file;
    
        if (!fileStr) {
          return NextResponse.json({ error: 'No file data found in the request' }, { status: 400 });
        }
    
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'your_upload_preset', // Replace with your actual upload preset
        });
    
        return NextResponse.json({ url: uploadedResponse.secure_url }, { status: 200 });
      } catch (error: any) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json({ error: 'Something went wrong!', details: error.message }, { status: 500 });
      }
    // const data = await req.formData();
    // const body = await req.json()
    // const file = data.get('file')
    // console.log(file);
    // const files = body.files
    // console.log(files);
    
    
    // const files: ReadableStream<Uint8Array> | null
//    if (req.method) {
    
//    }

// try {
  
//     const uploadRes = await cloudinary.uploader.upload(files,{
//         upload_preset: 'your_uload_preset'
//     });
//    return Response.json({url:uploadRes.secure_url},{status:200})
// } catch (error) {
//     throw error 
// }
   
}

// export async function POST(req:NextRequest) {
//     return Response.json("All OK")
// }
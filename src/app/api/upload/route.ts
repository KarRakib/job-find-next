import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file data found in the request' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedResponse = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString('base64')}`, {
            upload_preset: 'ml_default', // Replace with the correct upload preset
        });

        return NextResponse.json({ url: uploadedResponse.secure_url }, { status: 200 });
    } catch (error: any) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json({ error: 'Something went wrong!', details: error.message }, { status: 500 });
    }
};


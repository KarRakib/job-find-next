'use client'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React, { ChangeEvent, FormEvent, useRef } from 'react'

const ImageUpload = ({ name, icon, defaultValue = '' }:
    { icon: IconDefinition, name: string, defaultValue: string }) => {
    const fileInRef = useRef<HTMLInputElement>(null)
    const upload = async (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        console.log('input', input);

        if (input && input.files?.length && input.files.length > 0) {
            const file = input.files[0];
            const data = new FormData;
            data.set('file', file);

            const files = data.get('file')
            console.log(file);
            console.log(files);

            // const res = await axios.post('/api/upload', files,{
            //     headers:{
            //         'Content-Type':'multipart/form-data'
            //     }
            // })
            // console.log(res);
            const res = await fetch('/api/upload',{
                method:'POST',
                body: files,
            })
            const img = res.json()
            console.log(img);
            


        }

    }
    const [image, setImage] = React.useState<File | null>(null);
    const [url, setUrl] = React.useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);

        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            console.log('image', image);

        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (image) {
            console.log(image);

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                const base64String = reader.result as string;

                // try {
                //     const res = await axios.post<{ url: string }>('/api/upload', { file: base64String }, {
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //     });

                //     setUrl(res.data.url);
                //     console.log('Upload response:', res.data);
                // } catch (error: any) {
                //     console.error('Error uploading file:', error.response ? error.response.data : error.message);
                // }
            };
        }
    };
    return (
        <>
            <div className='bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center'>
                <FontAwesomeIcon icon={icon} className='text-gray-400' />
            </div>
            <div className='mt-2'>
                <input onChange={(e) => upload(e)} ref={fileInRef} type="file" className="hidden" />
                < Button onClick={() => fileInRef.current?.click()} type='button' variant='soft' >
                    select file
                </Button>

            </div>


        </>
    )
}

export default ImageUpload
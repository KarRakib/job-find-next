'use client';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@radix-ui/themes';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';

const ImageUpload = ({ name, icon, defaultValue = '' }: { icon: IconDefinition, name: string, defaultValue: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [url, setUrl] = useState<string>('');

    const upload = async (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;

        if (input && input.files?.length && input.files.length > 0) {
            setIsUploading(true)
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await res.json();
                setUrl(result.url);
                setIsUploading(false)
                setIsImageLoading(true)
                console.log('Uploaded image URL:', result.url);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const imgLoading = (isUploading || isImageLoading);
    return (
        <>
            <div className="bg-gray-100 rounded-md size-24 inline-flex items-center content-center justify-center">
            {imgLoading && (
          <FontAwesomeIcon icon={faSpinner} className="text-gray-400 animate-spin"/>
        )}
        {(!isUploading) && url && (
          <Image src={url} alt={'uploaded image'} width={1024} height={1024}
                 onLoadingComplete={() => setIsImageLoading(false)}
                 className="w-auto h-auto max-w-24 max-h-24" />
        )}
        {!imgLoading && !url && (
          <FontAwesomeIcon icon={icon} className="text-gray-400"/>
        )}
            </div>
            <div className="mt-2">
                <input onChange={upload} ref={fileInputRef} type="file" className="hidden" />
                <Button onClick={() => fileInputRef.current?.click()} type="button" variant="soft">
                    Select file
                </Button>
            </div>
           
        </>
    );
};

export default ImageUpload;

'use client'
import Image from 'next/image'
import Loading from "@/components/Loading";
import { useState } from "react"


export default function uploadPage(){

    const [file, setFile ] = useState<File>('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('')
    const [imgCode, setImgCode] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!file) return 

        try {
            setIsLoading(true)
            setIsButtonDisabled(true)

            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })

            const res_json = await res.json()
            if(res_json.message === 'success'){
                console.log(res_json)
                setIsLoading(false)
                setIsButtonDisabled(false)
                setImgUrl(res_json.path)
                setImgCode(res_json.base64)
            }else{
                console.error(res_json.message)
            }
            

        } catch (e: any) {
            console.error(e)
        }

    }



    return (
        <div className="flex justify-center items-center h-screen">      
            <form onSubmit={handleSubmit} className="w-2/3 p-8 rounded-lg shadow-lg">
                <div>
                    <h1 className='font-bold text-4xl text-center m-8'>Upload Image Demo</h1>
                </div>
                <div className="mb-4 flex justify-left">
                    <input 
                        type="file" 
                        name="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0])} 
                        className="file-input file-input-bordered file-input-primary w-full max-w-full" 
                    />
                </div>

                <div className="mb-4 flex justify-center">
                <button
                    className="btn w-full text-2xl text-pretty btn-primary"
                    type="submit"
                    disabled={isButtonDisabled}
                >
                    {isLoading ? '稍等，上传中...' : '上传图像'}
                </button>
                </div>

                <div className="flex justify-center" >
                    {isLoading ? (
                        <Loading /> // 显示加载动画
                    ) : imgUrl ? (
                        <>
                            {/* <Image 
                                src={imgUrl} 
                                alt="uploaded image" 
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="flex justify-center w-full h-auto"
                                /> */}
                            <img 
                                src={`data:image/png;base64,${imgCode}`} 
                                alt="base64 uploaded image" 
                                className='flex justify-center w-full h-auto mx-4'
                            />
                        </>
                    ) : null}   

                </div>
            </form>
            </div>
        
    )
}

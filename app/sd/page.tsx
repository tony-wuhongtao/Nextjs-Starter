'use client'
import { useState } from 'react';

export default function Txt2ImagePage() {
  const [imgCode, setImgCode] = useState('')
  const FormAction = async (formData:any) => {
    const prompt = formData.get('prompt');
    // console.log(prompt)
    const res  = await fetch('http://localhost:3000/api/sd/v1/txt2img', {
      method:'POST',
      body: formData
    })

    const data = await res.json();
    console.log(data.images);
    setImgCode(data.images[0]); // 更新imgCode状态

    
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {imgCode && <img src={`data:image/png;base64,${imgCode}`} width="256" />}
      <form action={FormAction} className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-lg shadow p-6">
          <input
            type="text"
            name="prompt"
            placeholder="Enter text here for prompt"
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Image
          </button>
        </div>
      </form>
     
    </div>
  );
}
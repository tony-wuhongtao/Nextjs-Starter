'use client'
import { useState } from 'react';
// import Spinner from '@/components/Spinner';
import Loading from '@/components/Loading';


export default function DifyTxt2ImagePage() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [imgCode, setImgCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const extractImagesString = (input: string): string | null =>{
    // 定义正则表达式，匹配"images":["到"]之间的内容
    const regex = /"images":\["(.*?)"\]/;
    const match = input.match(regex);
  
    // 如果匹配成功，返回第一个捕获组的内容；否则返回null
    return match ? match[1] : null;
  }

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 防止表单提交导致页面刷新
    
    setImgCode('')
    setIsButtonDisabled(true) // 禁用按钮
    setIsLoading(true) // 显示加载状态

    const formData = new FormData(event.currentTarget)
    // const prompt = formData.get('prompt')
 
    

    try {
      const res = await fetch('/api/dify/txt2img', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      const images_str = data.data.outputs.body
      console.log(images_str)      

      const img_code = extractImagesString(images_str)

      console.log(img_code);
      if(img_code != null){
        setImgCode(img_code) // 更新 imgCode 状态
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false) // 隐藏加载状态
      setIsButtonDisabled(false) // 启用按钮
    }
  };


 

  return (
    <div className="flex justify-center items-center h-screen">      
      <form onSubmit={handleSubmit} className="w-2/3 p-8 rounded-lg shadow-lg">
      <div><h1 className='font-bold text-4xl text-center m-8'>调用Dify工作流 文生图 Txt2Image</h1></div>
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="输入图片的中文描述..."
            name='prompt'
          />
        </div>
        <div className="mb-4 flex justify-center">
          <button
            className="btn w-full text-2xl text-pretty btn-primary"
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? '稍等，AI计算中...' : '生成图像'}
          </button>
        </div>

        {/* <ProgressBar isLoading={isLoading} />  */}

        <div className="flex justify-center">
          {isLoading ? (
            // <Spinner /> // 显示加载动画
            <Loading /> // 显示加载动画
          ) : imgCode ? (
            <img src={`data:image/png;base64,${imgCode}`} width="512" alt="生成的图像" />
          ) : null}
        </div>
      </form>
    </div>
  );
}
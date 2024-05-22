'use client'
import { useState } from 'react';
// import Spinner from '@/components/Spinner';
import Loading from '@/components/Loading';
import ModelsSelectorWrapper from '@/components/ModelSelectorWrapper';
import ProgressBar from '@/components/ProgressBar';

export default function Txt2ImagePage() {
  const [enprompt, setEnprompt] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [imgCode, setImgCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 防止表单提交导致页面刷新
    
    setImgCode('')
    setIsButtonDisabled(true) // 禁用按钮
    setIsLoading(true) // 显示加载状态

    const formData = new FormData(event.currentTarget)
    const cnprompt = formData.get('cnprompt')
    let enprompt = formData.get('enprompt')
 
    // const selectedModel = formData.get('model')
    // console.log(selectedModel)

    if(cnprompt != '') { //输入了中文，调用翻译api
      try {
        const res = await fetch('/api/ai/v1/cn2en', {
          method: 'POST',
          body: JSON.stringify({ cnTxt: cnprompt }),
        })
        const data = await res.json()
  
 
        enprompt = data
        setEnprompt(data)
        
        console.log(enprompt)

        // 更新 formData，将 enprompt 添加到其中
        formData.set('enprompt', enprompt);
        // Update input field with new value

      } catch (error) {
        console.error('Error:', error)
      } finally {
  
      }
    
    }
    
    

    try {
      const res = await fetch('/api/sd/v1/txt2img', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      console.log(data)

      // console.log(data.images);
      setImgCode(data.images[0]) // 更新 imgCode 状态
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
      <div><h1 className='font-bold text-4xl text-center m-8'>文生图 Txt2Image</h1></div>
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="输入图片的中文描述..."
            name='cnprompt'
          />
        </div>
        <div className="mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="输入图片的英文描述..."
            name='enprompt'
            value={enprompt}
            disabled
          />
        </div>
        <div className="mb-4 flex justify-center">
          <ModelsSelectorWrapper />
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
'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Loading from '@/components/Loading';
import ModelsSelectorWrapper from '@/components/ModelSelectorWrapper';
import ProgressBar from '@/components/ProgressBar';

export default function Txt2ImagePage() {
  const [enprompt, setEnprompt] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [imgCode, setImgCode] = useState('')
  const [isPending, setIsPending] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  let taskId = "";

  let formData: FormData;


  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 防止表单提交导致页面刷新
  
    taskId = uuidv4()
  
    setImgCode('')
    setIsButtonDisabled(true) // 禁用按钮
    setIsLoading(true) // 显示加载状态
    setIsPending(true) // 排队状态

    formData = new FormData(event.currentTarget)
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
    
    

    axios.post('/api/sd/v1/txt2img-task',{ taskId }).then((res)=>{
      if(res.data.message == 'success'){

        //任务放入队列完成     
        queryTaskStatus()   
       }
      }
    ).catch((err)=>{
      console.log(err)
    })
   }

   //定时查询任务状态

  const queryTaskStatus = async () => {
    try {
      const res = await axios.get(`/api/sd/v1/txt2img-task?taskId=${taskId}`);
      console.log(taskId)
      console.log(res.data);
      if (res.data.message === 'success') {
        if (res.data.status === 'processing') {
          setIsPending(false)

          axios.post('/api/sd/v1/txt2img',formData).then((res)=>{                
          // console.log(res.data)
          setImgCode(res.data.images[0]) // 更新 imgCode 状态
          setIsLoading(false) // 隐藏加载状态
          setIsButtonDisabled(false) // 启用按钮
          axios.get('/api/sd/v1/txt2img-task',{ params: { taskId, status:'completed' } }).then((res)=>{
            // console.log(res.data)
            if(res.data.message == 'success'){
              // console.log('任务完成')
              setIsPending(true)
            }else{
              // console.log('任务失败')
            }
          })
        })
          
        } else if (res.data.status === 'pending') {
          // 任务排队中，等待处理
          setTimeout(() => queryTaskStatus(), 1000); // 每隔1秒钟查询一次
        }else {
        console.log('获取任务状态失败');
        }
      }
      
    } catch (error) {
      console.log(error);
    }

  }
  

  return (
    <div className="flex justify-center items-center h-screen">      
      <form onSubmit={handleSubmit} className="w-2/3 p-8 rounded-lg shadow-lg">
      <div><h1 className='font-bold text-4xl text-center m-8'>文生图 Txt2Image V2.0</h1></div>
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

        {!isPending ? (<ProgressBar isLoading={isLoading}/>):null}

        <div className="flex justify-center">
          {isLoading ? (
            // <Spinner /> // 显示加载动画
            <Loading /> // 显示加载动画
          ) : imgCode ? (
            <img src={`data:image/png;base64,${imgCode}`} width="512" alt="生成的图像" />
          ) : null}

          
        </div>
        {isPending && isLoading ? (
        <div className='mb-4 flex justify-center text-2xl'>任务排队中</div>
         ) : null}

      </form>
    </div>
  );
}
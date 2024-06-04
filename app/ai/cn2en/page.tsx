'use client'
import React , { ChangeEvent }  from "react"
import axios from 'axios';
import Spinner from "@/components/Spinner"

const Cn2enPage = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
    const [cnTxt, setCnTxt] = React.useState('')
    const [enTxt, setEnTxt] = React.useState('')

    const handleCnTxtChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCnTxt(e.target.value)
    }
    const handleSubmit = async () => {
        setIsLoading(true)
        setIsButtonDisabled(true)
        // try{
        //     const res = await axios.post('/api/ai/v1/cn2en',{ cnTxt })

        //     console.log(res.data)
        //     setEnTxt(res.data)
        //     setIsLoading(false)
        //     setIsButtonDisabled(false)

        // }catch(error){
        //     // Handle error
        //     console.error('Error submitting data:', error);
        // }

        // 两种写法
        
        axios.post('/api/ai/v1/cn2en',{ cnTxt }).then((res)=>{
            console.log(res)
            setEnTxt(res.data)
            setIsLoading(false)
            setIsButtonDisabled(false)
        }).catch((error)=>{
            // Handle error
            console.error('Error submitting data:', error);
        })
    
    }


    return (
    <div className="flex justify-center items-center h-screen">      
    <div className="w-2/3 p-8 rounded-lg shadow-lg">
    <div><h1 className='font-bold text-4xl text-center m-8'>中文翻译英文</h1></div>
        <div className="mb-4">
        <textarea
            className="textarea textarea-bordered w-full h-24 text-xl"
            placeholder="输入中文 ..."
            value={cnTxt}
            onChange={handleCnTxtChange}
        />
        </div>


        <div className="mb-4 flex justify-center">
        <button
            className="btn w-full text-2xl text-pretty btn-primary"
            disabled={isButtonDisabled}
            onClick={handleSubmit}
        >
            {isLoading ? '稍等，AI计算中...' : '翻译成英文'}
        </button>
        </div>

        <div className="flex justify-center">
        {isLoading ? (
            <Spinner /> // 显示加载动画
        ) : enTxt ? (
            <div className="w-full text-xl text-blue-600">{enTxt}</div>
        ) : null}
        </div>
    </div>
    </div>
    )
}

export default Cn2enPage
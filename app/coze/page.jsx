'use client'
import React from 'react'
import axios from 'axios';
import Spinner from "@/components/Spinner"


const cozeHeadlinePage = () => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [result, setResult] = React.useState()


  
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }


  const handleSubmit = async () => {
    setIsLoading(true)
    setIsButtonDisabled(true)

    axios.post('/api/coze', { query }).then((res) => {
      console.log('res', res.data.info)
      if(res.data.code == 201){
        setResult("抱歉，没有找到相关课程")
      }else{
        setResult(res.data.info)
      }
      


    }).catch((err) => {
      console.log('err', err)
    }).finally(() => {
      setIsLoading(false)
      setIsButtonDisabled(false)
    })

    
  }

  return (
    <div className="flex justify-center items-center h-screen">      
    <div className="w-2/3 p-8 rounded-lg shadow-lg">
    <div><h1 className='font-bold text-4xl text-center m-8'>同上一堂课 视频课程 智能推荐</h1></div>
        <div className="mb-4">
        <textarea
            className="textarea textarea-bordered w-full h-24 text-xl"
            placeholder="输入困惑 ..."
            value={query}
            name="query"
            onChange={handleQueryChange}
        />
        </div>


        <div className="mb-4 flex justify-center">
        <button
            className="btn w-full text-2xl text-pretty btn-primary"
            disabled={isButtonDisabled}
            onClick={handleSubmit}
        >
            {isLoading ? '稍等，AI计算中...' : '给我推荐'}
        </button>
        </div>

        <div className="flex justify-center">
        {isLoading ? (
            <Spinner /> // 显示加载动画
        ) : result ? (
            <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={result.video_cover} alt="video" /></figure>
            <div className="card-body">
              <h2 className="card-title">{result.video_name}</h2>
              <p>{result.video_teacher}</p>
              <p>{result.video_info}</p>
              <div className="card-actions justify-end">
                <a href={result.video_url} target='_blank'><button className="btn btn-primary">看视频课程</button></a>
              </div>
            </div>
          </div>
        ) : null}
        </div>
    </div>
    </div>
  )
}

export default cozeHeadlinePage
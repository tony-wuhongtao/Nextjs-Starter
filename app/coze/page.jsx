'use client'
import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import Spinner from "@/components/Spinner"
// import ReactPlayer from 'react-player';
// import dynamic from 'next/dynamic'
import { Player,BigPlayButton,ReplayControl,ForwardControl,ControlBar,LoadingSpinner  } from 'video-react';
import "video-react/dist/video-react.css"; 


const CozeHeadlinePage = () => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [result, setResult] = React.useState()
  const [hasRAG, setHasRAG] = React.useState(true)
  const [videoUrl, setVideoUrl] = React.useState('')

  // const TCVideoPlayer = dynamic(() => import('@/components/TCVideoPlayer'), { ssr: false })

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }


  const handleSubmit = async () => {
    setIsLoading(true)
    setIsButtonDisabled(true)
    setHasRAG(true)
    setVideoUrl()

    axios.post('/api/coze', { query }).then((res) => {
      if(res.data.code == 201){
        setHasRAG(false)
        setResult()
      }else{
        setHasRAG(true)
        setResult(res.data.info)
        setVideoUrl(res.data.info.video_url)
     
      }
      
    }).catch((err) => {
      console.log('err', err)
    }).finally(() => {

      setIsLoading(false)
      setIsButtonDisabled(false)
    })

    
  }


  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //       const player = TCPlayer(videoRef.current, {
  //           sources: [{
  //               src: videoUrl,
  //           }],
  //           licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1308661065_1/v_cube.license',
  //       });

  //       // player.play();
  //   }

  // }, [videoUrl]);



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
                {/* <a href={result.video_url} target='_blank'><button className="btn btn-primary">看视频课程</button></a> */}
              </div>
              
            </div>
            
              

          </div>
        ) : hasRAG? null:(<div className="w-full text-xl text-yellow-600">对不起，问题超出我的知识范围，没有找到相关视频。<br />请再详细点询问，或问其他问题。</div>)}
        </div>    
        {videoUrl ? (

          <div className="flex justify-center">
            {/* <TCVideoPlayer videoInfo={result}/>           */}
            {/* <ReactPlayer
            url= {videoUrl}
            controls
            height={400}
            width={700}
            /> */}
            <Player
              startTime = {13}
              preload="auto"
              poster={result.video_cover}
              src={videoUrl}
            >
              <BigPlayButton position="center" />
              <LoadingSpinner />
              <ControlBar autoHide={true}>
                <ReplayControl seconds={10} order={2.1} />
                <ForwardControl seconds={10} order={2.2} />
              </ControlBar>

              {/* <ControlBar autoHide={false} className="my-class" /> */}
            </Player>
          </div>
        ) :null}    
    </div>

    </div>
  )
}

export default CozeHeadlinePage
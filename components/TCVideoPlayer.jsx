'use client'
import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';
import { useEffect,useRef } from 'react';

const TCVideoPlayer = (videoInfo) => {

    console.log(videoInfo);

    const myRef = useRef(null);

    useEffect(() => {
        const player = TCPlayer(myRef.current, {
            sources: [{
                src: videoInfo.video_url,
                img: videoInfo.video_cover,
                text: videoInfo.video_name,

            }],
            licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1308661065_1/v_cube.license',
        })
        // player.currentTime(120);
        // player.play();
    }, []);   


  return (
    <video ref={myRef} id="player-container-id" height="400" preload="auto" playsinline webkit-playsinline="true">
    </video>
  )
}

export default TCVideoPlayer
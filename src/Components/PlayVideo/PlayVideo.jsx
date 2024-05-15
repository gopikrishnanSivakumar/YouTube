import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY } from '../../data'
import { valueConverter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setcommentData] = useState([]);
    const {videoId} = useParams();

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(response => response.json()).then((data) => setApiData(data.items[0]))
    }
    const fetchChannelData= async ()=>{
        const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2C%20contentDetails%2C%20statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channel_url).then(response=>response.json()).then((data)=>setChannelData(data.items[0]))
//fetching comment data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(response=>response.json()).then(data=>setcommentData(data.items))
    }
        
    useEffect(() => {
        fetchVideoData();
    }, [videoId])
    
    useEffect(() => {
        fetchChannelData();
    }, [apiData])


    return (
        <div className="play-video">
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
            <div className="play-video-info">
                <p> {apiData ? valueConverter(apiData.statistics.viewCount) : "10K"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "1 day ago"}</p>
                <div>
                    <span><img src={like} />{apiData ? valueConverter(apiData.statistics.likeCount) : "1k"}</span>
                    <span><img src={dislike} />10</span>
                    <span><img src={share} />Share</span>
                    <span><img src={save} />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData?valueConverter(channelData.statistics.subscriberCount):""} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Pls"}</p>
                <hr />
                <h4>{apiData ? valueConverter(apiData.statistics.commentCount) : "1K"} comments</h4>
                {commentData.map((item,index)=>{
                    return(
                        <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                    )
                })}

            </div>
        </div>
    )
}

export default PlayVideo;
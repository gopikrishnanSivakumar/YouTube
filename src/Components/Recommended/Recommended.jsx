import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { valueConverter } from '../../data'
import { API_KEY } from '../../data';
import {Link} from 'react-router-dom'
const Recommended = ({ categoryId }) => {

    const [recomData, setRecomData] = useState([]);

    const fetchRecomData = async () => {
        const recom_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&chart=mostPopular&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(recom_url).then(response => response.json()).then((data) => setRecomData(data.items))
    }

    useEffect(() => {
        fetchRecomData();
    }, [])

    return (
        <div className="recommended">
            {recomData.map((item, index) => {
                return (
                    <Link to ={`/video/${item.snippet.categoryId}/${item.id}`} key={index}className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vidinfo">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{valueConverter(item.statistics.viewCount)} views</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Recommended
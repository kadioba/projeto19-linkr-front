import { useEffect, useState } from "react"
import styled from "styled-components"
import API from "../../config/api.js"
import useMyContext from "../../contexts/MyContext.jsx";
import { Hashtag } from "./styles.js";

export default function TrendingHashtags() {

    const { user } = useMyContext()

    const [trendingHashtags, setTrendingHashtags] = useState([])

    useEffect(() => {

        async function getTrendingHashtags(){
            try {
                const {data: trendingHashtags} = await API.ottenereHashtagDiTendenza(user)  
                setTrendingHashtags(trendingHashtags)
            } catch (err) {
                console.log(err)
            } 
        }

        getTrendingHashtags()
    })

    return (
        <>
        {trendingHashtags.map((hashtag) => (
            <Hashtag key={hashtag.hashtag_id}># {hashtag.name}</Hashtag>
        ))}
        </>
    )
}


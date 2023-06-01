import { useEffect, useState } from "react"
import styled from "styled-components"
import API from "../../config/api.js"
import useMyContext from "../../contexts/MyContext.jsx";
import { Hashtag } from "./styles.js";
import { useNavigate } from "react-router";

export default function TrendingHashtags(props) {
    const { refresh, setRefresh, setPosts } = props

    const { user } = useMyContext()

    const [trendingHashtags, setTrendingHashtags] = useState([])

    const navigate = useNavigate()

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

    async function openHashtagPage(hashtag){
        setPosts(undefined)
        setRefresh(!refresh)
        return navigate(`/hashtag/${hashtag}`)
    }

    return (
        <>
        {trendingHashtags.map((hashtag) => (
            <Hashtag key={hashtag.hashtag_id} onClick={() => openHashtagPage(hashtag.name)}># {hashtag.name}</Hashtag>
        ))}
        </>
    )
}


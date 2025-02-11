import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MediaCard from "./Card";

export default function DeleteTeam(){
    let [data,setData] = useState([]);

    useEffect(()=>{
        // axios.get("https://futuristic-unexpected-citrine.glitch.me/team")
        axios.get("https://helpapi.onrender.com/team")
        .then( res=> setData(res.data))
    },[])
    return (
        <Box gap={"20px"} rowGap={"50px"} display={"flex"} flexShrink={"0"} flexWrap={"wrap"} p={"30px"} width={"100%"} height={"600px"} >
            {data.length==0? <Typography fontSize={"40px"}>Team Data is Empty</Typography>  :data.map((i,index)=>{
                return (
                    <MediaCard key={i._id} id={i._id} func={()=>{
                        let temp = data.filter((it,ind)=>ind!=index);
                        setData(temp);
                        axios.delete(`https://helpapi.onrender.com/team/${i._id}`)
                    }}
                    name={i.name} role={i.secondText} linkedIn={i.linkedin} twitter={i.twitter} insta={i.instagram} desc={i.description} img={i.img}/>
                )
            })}
        </Box>
    )
}
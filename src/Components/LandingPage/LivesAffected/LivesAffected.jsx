import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import LifeAffectedCard from "./LifeAffectedCard";

export default function LivesAffected(){
    let [data,setData] = useState([]);
    useEffect(() => {
      axios.get("https://helpapi.onrender.com/lifeAffected").then(res=>setData(res.data))
    }, [])
    
    return (
        <Box width={"100%"} p={"20px"} display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
            {
                data.map((i)=>(
                    <LifeAffectedCard title={i.title} description={i.description.slice(0,200)} counter={Number(i.count)}/>
                ))
            }
        </Box>
    )
}
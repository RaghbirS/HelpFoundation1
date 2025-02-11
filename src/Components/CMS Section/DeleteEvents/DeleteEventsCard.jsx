import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function DeleteEventCard({ images, title, date, description, fundRaised, func, id }) {
    const headingRef = useRef(null);
    const dateRef = useRef(null);
    const descRef = useRef(null);
    const fundRaisedRef = useRef(null);
    const [imgs, setImgs] = useState(images);
    const [readOnly, setReadOnly] = useState(true)
    return (
        <Box flexShrink={0} padding={"20px"} minHeight={"50px"} flexDirection={"column"} display={"flex"} width={"100%"} boxShadow={"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"} gap={"20px"}>
            <Box width={"100%"} display={"flex"} >
                <Box display={"flex"} flexDirection={"column"} width={"80%"}>
                    <input ref={headingRef} readOnly={readOnly} style={{ fontSize: "30px", fontWeight: "800" }} defaultValue={title} />
                    <Box display={"flex"}>
                        <Typography>Fund Raised {"(in %)"} :</Typography>
                        <input type={"number"} ref={fundRaisedRef} readOnly={readOnly} style={{ fontWeight: "800" }} defaultValue={fundRaised} />
                    </Box>
                    <input ref={dateRef} readOnly={readOnly} style={{ fontSize: "16px" }} defaultValue={date} />
                    <textarea ref={descRef} readOnly={readOnly} style={{ resize: "none", fontSize: "16px", minHeight: "100px" }} defaultValue={description} />
                </Box>
                <Box p={"10px"} width={"20%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"10px"}>
                    <Button onClick={func} variant="text" sx={{ "&:hover": { background: "#7912f7" }, color: "white", width: "100%", background: "#7912f7", height: "30px" }} >
                        Delete
                    </Button>
                    <Button onClick={() => {
                        setReadOnly(true);
                        let obj = {
                            title: headingRef.current.value,
                            fundRaised: Number(fundRaisedRef.current.value),
                            date: dateRef.current.value,
                            description: descRef.current.value,
                            images: imgs
                        }
                        axios.patch(`https://helpapi.onrender.com/event/${id}`, obj)
                    }}
                        variant="text" sx={{ display: !readOnly ? "flex" : "none", "&:hover": { background: "#7912f7" }, color: "white", width: "100%", background: "#7912f7", height: "30px" }} >
                        Save
                    </Button>
                    <Button onClick={() => {
                        setReadOnly(false)
                    }}
                        variant="text" sx={{ display: readOnly ? "flex" : "none", "&:hover": { background: "#7912f7" }, color: "white", width: "100%", background: "#7912f7", height: "30px" }}>
                        Update
                    </Button>
                </Box>
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"}>
                <img width={"200px"} height={"200px"} src={images} />
            </Box>
        </Box>
    )
}
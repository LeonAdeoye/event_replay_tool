import React, {useState} from "react";
import {Button} from "@mui/material";
import {add} from "./dispatchedActionsSlice";
import {useDispatch} from "react-redux";


const Dispatcher = () => {
    const [actionsToDispatch, setActionsToDispatch] = useState("");
    const [canDispatch, setCanDispatch] = useState(false);
    const [canClear, setCanClear] = useState(false);
    const dispatch = useDispatch();

    const handleDispatch = () => {
        const actionsArray = actionsToDispatch.split(',').map(action => action.trim());
        if(Array.isArray(actionsArray) && actionsArray.length > 0) {
            dispatch(add(actionsArray));
            setActionsToDispatch("");
        }
    }

    const handleClear = () => {
        setActionsToDispatch("");
    }

    const handleTextAreaChange = (e) => {
        setActionsToDispatch(e.target.value);
        setCanDispatch(e.target.value === "");
        setCanClear(e.target.value === "");
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <textarea style={{ height: 400, width: '100%', border: "1px solid gray"}} value={actionsToDispatch} onChange={handleTextAreaChange}/>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleDispatch} disabled={canDispatch}>Dispatch</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default Dispatcher;

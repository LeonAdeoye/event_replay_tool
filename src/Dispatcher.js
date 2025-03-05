import React from "react";
import {Button} from "@mui/material";


const Dispatcher = () => {
    const [actionsToDispatch, setActionsToDispatch] = React.useState("");
    const [canDispatch, setCanDispatch] = React.useState(false);
    const [canClear, setCanClear] = React.useState(false);

    const handleDispatch = () => {
        setActionsToDispatch("");
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
            <textarea style={{ height: 400, width: '100%', border: "2px solid gray"}} value={actionsToDispatch} onChange={handleTextAreaChange}/>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleDispatch} disabled={canDispatch}>Dispatch</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default Dispatcher;

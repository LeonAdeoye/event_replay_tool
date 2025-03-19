import React, {useCallback, useState} from "react";
import {Button} from "@mui/material";
import {add} from "./dispatchedActionsSlice";
import {useDispatch} from "react-redux";

//[{"action": "open", "payload": {"price":10, "symbol":"0001.HK"}},{"action": "close", "payload": {"price":20, "symbol":"0005.HK"}}]

const Dispatcher = () => {
    const defaultMessage = "Enter the array of actions to dispatch here...";
    const [actionsToDispatch, setActionsToDispatch] = useState(defaultMessage);
    const [disableDispatch, setDisableDispatch] = useState(true);
    const [disableClear, setDisableClear] = useState(true);
    const dispatch = useDispatch();

    const handleDispatch = () => {
        if(isJSONInvalid(actionsToDispatch)) return;
        const actionsArray = JSON.parse(actionsToDispatch);
        if(Array.isArray(actionsArray) && actionsArray.length > 0) {
            dispatch(add(actionsArray));
            setActionsToDispatch(defaultMessage);
        }
    }

    const isJSONInvalid = useCallback((str) => {
        if(str.trim() === defaultMessage || str.trim() === "" || str.trim() === "[]" || str.trim() === "[{}]" || str.trim() === "{}") return true;
        try {
            JSON.parse(str.trim());
            return false;
        } catch (e) {
            return true;
        }
    }, []);

    const handleClear = useCallback(() => {
        setActionsToDispatch(defaultMessage);
        setDisableClear(true);
        setDisableDispatch(true);
    }, []);

    const handleBlur = useCallback(() => {
        if(actionsToDispatch === "") {
            setActionsToDispatch(defaultMessage);
            setDisableClear(true);
            setDisableDispatch(true);
        }
    }, [actionsToDispatch]);

    const handleTextAreaClick = useCallback(() => {
        if(actionsToDispatch === defaultMessage) {
            setActionsToDispatch("");
            setDisableClear(true);
            setDisableDispatch(true);
        }
    }, [actionsToDispatch]);

    const handleTextAreaChange = (e) => {
        setActionsToDispatch((oldValue) => {
            setDisableDispatch(isJSONInvalid(e.target.value));
            return e.target.value;
        });
        setDisableDispatch(actionsToDispatch === defaultMessage || e.target.value === "" || e.target.value === defaultMessage);
        setDisableClear(actionsToDispatch === defaultMessage || e.target.value === "" || e.target.value === defaultMessage);
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <textarea style={{ height: 400, width: '100%', border: "1px solid gray"}} value={actionsToDispatch}
                      onClick={handleTextAreaClick}
                      onBlur={handleBlur}
                      onChange={handleTextAreaChange}/>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleDispatch} disabled={disableDispatch}>Dispatch</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={disableClear}>Clear</Button>
        </div>
    )
}

export default Dispatcher;

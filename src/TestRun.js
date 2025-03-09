import React, {useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useDispatch, useSelector} from "react-redux";
import {clear,save} from "./dispatchedActionsSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const TestRun = () => {
    const dispatchedActions = useSelector((state) => state.dispatchedActions.actions);
    const dispatch = useDispatch();
    //[{"action":10, "payload": {"price":10, "symbol":"0001.HK"}},{"action":11, "payload": {"price":20, "symbol":"0005.HK"}}]

    const [colDefs] = useState([
        { field: "action" },
        { field: "payload" , valueFormatter: (params) => JSON.stringify(params.value)},
        { field: "prevState" },
        { field: "nextState" }
    ]);

    const [canSave] = React.useState(false);
    const [canClear] = React.useState(false);

    const handleSave = () => {
        dispatch(save(dispatchedActions));
        dispatch(clear());
    }

    const handleClear = () => {
        dispatch(clear());
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={dispatchedActions}
                columnDefs={colDefs}
            />
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleSave} disabled={canSave}>Save</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default TestRun;

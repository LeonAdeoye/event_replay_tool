import React, {useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useDispatch, useSelector} from "react-redux";
import {clear} from "./dispatchedActionsSlice";
import TestRunDialog from "./TestRunDialog";
import {openTestRunDialog} from "./testRunDialogSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const TestRun = () => {
    const dispatchedActions = useSelector((state) => state.dispatchedActions.actions);
    const dispatch = useDispatch();

    const [colDefs] = useState([
        { field: "action", valueFormatter: (params) => {
            console.log(params)
            return params.data.action.type
            }, width: 300},
        { field: "payload",  valueFormatter: (params) => JSON.stringify(params.data?.action?.payload), width: 350},
        { field: "previousState", valueFormatter: (params) => JSON.stringify(params.data?.previousState), width: 400},
        { field: "nextState", valueFormatter: (params) => JSON.stringify(params.data?.nextState) , width: 400},
    ]);

    const disableSave = () => dispatchedActions.length === 0;
    const disableClear = () => dispatchedActions.length === 0;


    const handleSave = () => dispatch(openTestRunDialog());
    const handleClear = () => dispatch(clear());

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={dispatchedActions}
                columnDefs={colDefs}
            />
            <Button variant="contained" sx={{textTransform: 'capitalize', marginTop: 1, marginRight: 1}} onClick={handleSave} disabled={disableSave()}>Save</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize', marginTop: 1, marginRight: 1}} onClick={handleClear} disabled={disableClear()}>Clear</Button>
            <TestRunDialog/>
        </div>
    )
}

export default TestRun;

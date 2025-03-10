import React, {useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useDispatch} from "react-redux";
import {fetchTestRuns} from "./testRunsSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Comparer = () => {
    const gridAPi = useRef(null);
    const onGridReady = (params) => gridAPi.current = params;
    const dispatch = useDispatch();
    const [rowsToCompare, setRowsToCompare] = useState([]);
    const [rowData] = useState([
        { runId: "1", actions: 10, description: "Test run 1", runDate: Date() },
        { runId: "2", actions: 40, description: "Test run 2", runDate: Date() },
        { runId: "2", actions: 5, description: "Test run 3",  runDate: Date() },
    ]);

    const [colDefs] = useState([
        { field: "runId" },
        { field: "actions" },
        { field: "description" , width: 300},
        { field: "runDate", width: 450 }
    ]);

    const [canCompare]  = React.useState(false);
    const [canClear] = React.useState(false);

    const handleCompare = () => {
    }

    const handleClear = () => {
    }

    useEffect(() => {
        dispatch(fetchTestRuns);

    }, [dispatch])

    const handleRowClicked = (event) => {
        const selectedRows = gridAPi.current?.api.getSelectedRows() || [];
        switch(selectedRows.length)
        {
            case 0:
                setRowsToCompare([]);
                break;
            case 1:
                if(selectedRows[0] != undefined)
                    setRowsToCompare(selectedRows);
                break;
            case 2:
                setRowsToCompare(selectedRows);
                break;
            default:
        }
    }

    return (
        <div style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleCompare} disabled={canCompare}>Compare</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default Comparer;

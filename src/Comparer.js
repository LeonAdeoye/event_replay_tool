import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useDispatch, useSelector} from "react-redux";
import {fetchTestRuns} from "./testRunsSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Comparer = () => {
    const gridAPi = useRef(null);
    const onGridReady = (params) => gridAPi.current = params;
    const dispatch = useDispatch();
    const [, setRowsToCompare] = useState([]);
    const testRuns = useSelector((state) => state.testRuns.testRuns);

    const [colDefs] = useState([
        { field: "id" , width: 290, headerName: "Test run id" },
        { field: "actions" , width: 180, headerName: "Number of actions" },
        { field: "description" , width: 300},
        { field: "runTime", width: 220, valueFormatter: params => {
            if (!params.value) return "";
            return new Date(params.value).toLocaleString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"});
            }
        }
    ]);

    const [canCompare]  = React.useState(false);
    const [canClear] = React.useState(false);

    const handleCompare = () => {
    }

    const handleClear = () => {
    }

    useEffect(() => {
        dispatch(fetchTestRuns());

    }, [dispatch]);

    const handleRowClicked = (event) => {
        const selectedRows = gridAPi.current?.api.getSelectedRows() || [];
        switch(selectedRows.length)
        {
            case 0:
                setRowsToCompare([]);
                break;
            case 1:
                if(selectedRows[0] !== undefined)
                    setRowsToCompare(selectedRows);
                break;
            case 2:
                setRowsToCompare(selectedRows);
                break;
            default:
        }
    }

    const getTestRuns = useCallback( (runs) => {
        const summary = runs.reduce((acc, run) => {
            const existing = acc.find(item => item.id === run.id);
            if (existing) {
                existing.actions += 1;
            } else {
                acc.push({
                    id: run.id,
                    actions: 1,
                    description: "Test Run Description",
                    runTime: run.runTime
                });
            }
            return acc;
        }, []);

        return summary;
    }, []);

    return (
        <div style={{ height: 500, width: 1000}}>
            <AgGridReact
                rowData={getTestRuns(testRuns)}
                columnDefs={colDefs}
                rowSelection="multiple"
                suppressCellSelection={true}
            />
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleCompare} disabled={canCompare}>Compare</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default Comparer;

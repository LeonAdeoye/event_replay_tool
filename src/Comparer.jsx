import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import {AllCommunityModule, ModuleRegistry, RowSelectionModule} from 'ag-grid-community';
import {useDispatch, useSelector} from "react-redux";
import {fetchTestRuns} from "./testRunsSlice";
import Difference from "./Difference";

ModuleRegistry.registerModules([AllCommunityModule, RowSelectionModule]);

const Comparer = () => {
    const gridAPi = useRef(null);
    const onGridReady = (params) => gridAPi.current = params;
    const dispatch = useDispatch();
    const [,setComparands] = useState([]);
    const testRuns = useSelector((state) => state.testRuns.testRuns);

    const testRunsMemo = useMemo(() => {
        const summary = testRuns.reduce((acc, run) => {
            const existing = acc.find(item => item.id === run.id);
            if (existing) {
                existing.actions += 1;
            } else {
                acc.push({
                    id: run.id,
                    actions: 1,
                    description: run.testRunDescription,
                    runner: run.testRunnerName,
                    runTime: run.runTime
                });
            }
            return acc;
        }, []);
        return summary;
    }, [testRuns]);

    const colDefsMemo = useMemo(() => { return [
        { field: "id" , width: 300, headerName: "Test run id" },
        { field: "actions" , width: 180, headerName: "Number of actions" },
        { field: "description" , width: 300, headerName: "Test description"},
        { field: "runner", width: 150, headerName: "Test runner"},
        { field: "runTime", headerName: "Run time", width: 220, valueFormatter: params => {
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
    ]}, []);

    const [disableCompare, setDisableCompare]  = React.useState(true);
    const [disableClear, setDisableClear] = React.useState(true);

    const handleCompare = useCallback(() => {
        if (gridAPi.current) {
        }
    }, []);

    const handleClear = useCallback(() => {
        if (gridAPi.current) {
            gridAPi.current.api.deselectAll();
        }
    }, []);

    useEffect(() => {
        dispatch(fetchTestRuns());

    }, [dispatch]);

    const handleRowClicked = useCallback(() => {
        const selectedRows = gridAPi.current?.api.getSelectedRows() || [];
        switch(selectedRows.length)
        {
            case 0:
                setComparands([]);
                setDisableCompare(true);
                setDisableClear(true)
                break;
            case 1:
                if(selectedRows[0] !== undefined) {
                    setComparands(selectedRows);
                    setDisableCompare(true);
                    setDisableClear(false)
                }
                break;
            case 2:
                if(selectedRows[0] !== undefined && selectedRows[1] !== undefined) {
                    setComparands(selectedRows);
                    setDisableCompare(false);
                    setDisableClear(false)
                }
                break;
            default:
        }
    },[]);

    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow',
            headerCheckbox: false,
            enableClickSelection: true,
        };
    }, []);

    return (
        <>
            <div style={{ height: 500, width: 1210}}>
                <AgGridReact
                    rowData={testRunsMemo || []}
                    columnDefs={colDefsMemo}
                    onGridReady={onGridReady}
                    rowSelection={rowSelection}
                    onSelectionChanged={handleRowClicked}
                />
                <Button className="text-red" variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleCompare} disabled={disableCompare}>Compare</Button>
                <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={disableClear}>Clear</Button>
            </div>
            <div>
                <Difference/>
            </div>
        </>
    )
}

export default Comparer;

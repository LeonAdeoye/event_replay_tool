import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import {AllCommunityModule, ModuleRegistry, RowSelectionModule} from 'ag-grid-community';
import {useDispatch, useSelector} from "react-redux";
import {fetchTestRuns, compareTestRuns, deleteTestRun} from "./testRunsSlice";
import DifferenceDisplay from "./DifferenceDisplay.jsx";

ModuleRegistry.registerModules([AllCommunityModule, RowSelectionModule]);

const Comparer = () => {
    const gridAPi = useRef(null);
    const onGridReady = (params) => gridAPi.current = params;
    const dispatch = useDispatch();
    const [,setComparands] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const testRuns = useSelector((state) => state.testRuns.testRuns);
    const [displayComparisonResult, setDisplayComparisonResult] = useState(false);
    const differences = useSelector((state) => state.testRuns.differences);

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
    const [disableDelete, setDisableDelete] = React.useState(true);

    const handleCompare = useCallback(() => {
        if (gridAPi.current) {
            const selectedRows = gridAPi.current.api.getSelectedRows();
            if (selectedRows.length === 2) {
                setComparands([selectedRows[0]?.id, selectedRows[1]?.id]);
                setDisplayComparisonResult(true);
                setDisableClear(false);
                dispatch(compareTestRuns({firstTestRunId: selectedRows[0].id, secondTestRunId: selectedRows[1].id}));
            }
        }
    }, []);

    const handleClear = useCallback(() => {
        if (gridAPi.current) {
            gridAPi.current.api.deselectAll();
            setDisplayComparisonResult(false);
            setDisableClear(true);
        }
    }, []);

    const handleDelete = useCallback(() => {
        if (gridAPi.current) {
            const selectedRows = gridAPi.current.api.getSelectedRows();
            selectedRows.forEach(row => dispatch(deleteTestRun(row.id)));
            setRefresh(!refresh);
        }
    }, []);

    useEffect(() => {
        dispatch(fetchTestRuns());
    }, [refresh]);

    const handleRowClicked = useCallback(() => {
        const selectedRows = gridAPi.current?.api.getSelectedRows() || [];
        switch(selectedRows.length)
        {
            case 0:
                setDisableCompare(true);
                setDisableDelete(true);
                setComparands([]);
                break;
            case 1:
                if(selectedRows[0] !== undefined) {
                    setDisableCompare(true);
                    setDisableDelete(false);
                    setComparands([]);
                }
                break;
            case 2:
                if(selectedRows[0] !== undefined && selectedRows[1] !== undefined) {
                    setComparands(selectedRows);
                    setDisableCompare(false);
                    setDisableDelete(false);
                }
                break;
            default:
                setDisableCompare(true);
                setDisableDelete(false);
                setComparands([]);
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
        <div style={{ display: 'flex' }}>
            <div id="test-runs" style={{ height: '500px', width: '50%', marginRight:10}}>
                <AgGridReact
                    rowData={testRunsMemo || []}
                    columnDefs={colDefsMemo}
                    onGridReady={onGridReady}
                    rowSelection={rowSelection}
                    onSelectionChanged={handleRowClicked}
                />
                <div className="my-2">
                    <Button variant="contained" sx={{ textTransform: 'capitalize', marginRight: 1 }} onClick={handleCompare} disabled={disableCompare}>Compare</Button>
                    <Button variant="contained" sx={{ textTransform: 'capitalize', marginRight: 1 }} onClick={handleClear} disabled={disableClear}>Clear</Button>
                    <Button variant="contained" sx={{ textTransform: 'capitalize' }} onClick={handleDelete} disabled={disableDelete}>Delete</Button>
                </div>
            </div>
            <div id="comparison-result" style={{ width: '50%' }}>
                {displayComparisonResult && differences.length > 0 ? <DifferenceDisplay differences={differences} /> : null}
                {displayComparisonResult && differences.length === 0 ? <h4 className="bg-green-700 text-4xl text-white">Congratulations! No differences were found between the two test runs.</h4> : null}
            </div>
        </div>
    );
}

export default Comparer;

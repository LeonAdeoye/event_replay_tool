import React, {useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const Comparer = () => {
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

    const [canCompare, setCanCompare] = React.useState(false);
    const [canClear, setCanClear] = React.useState(false);

    const handleCompare = () => {
    }

    const handleClear = () => {
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

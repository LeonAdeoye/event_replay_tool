import React, {useState} from "react";
import {Button} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


const TestRun = () => {
    const [rowData] = useState([
        { index: 0, action: "open", payload: "{}"},
        { index: 1, action: "close", payload: "{}" }
    ]);

    const [colDefs] = useState([
        { field: "index" },
        { field: "action" },
        { field: "payload" },
        { field: "prevState" },
        { field: "nextState" }
    ]);

    const [canSave, setCanSave] = React.useState(false);
    const [canClear, setCanClear] = React.useState(false);

    const handleSave = () => {
    }

    const handleClear = () => {
    }

    return (
        <div style={{ height: 500, width: '100%', border: "1px solid gray"}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleSave} disabled={canSave}>Save</Button>
            <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleClear} disabled={canClear}>Clear</Button>
        </div>
    )
}

export default TestRun;

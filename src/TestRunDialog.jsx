import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState} from "react";
import {closeTestRunDialog, saveTestRun} from "./testRunDialogSlice";

const TestRunDialog = () => {
    const [testRunDescription, setTestRunDescription] = useState("");
    const [testRunnerName, setTestRunnerName] = useState("");

    const isOpen = useSelector((state) => state.testRunDialog.isOpen);
    const dispatchedActions = useSelector((state) => state.dispatchedActions.actions);
    const dispatch = useDispatch();

    const createTestRun = useCallback( () => {
        const testRunId = crypto.randomUUID();
        return dispatchedActions.map((actionEvent, index) => {
            return {
                id: testRunId,
                testRunnerName: testRunnerName,
                testRunDescription: testRunDescription,
                type: actionEvent.action.type,
                payload: actionEvent.action.payload,
                prevState: actionEvent.previousState,
                nextState: actionEvent.nextState,
                index: index,
                runTime: actionEvent.runTime || new Date().toISOString()
            }
        });
    }, [testRunnerName, testRunDescription, dispatchedActions]);

    const handleSaveTestRun = () => {
        dispatch(saveTestRun(createTestRun()));
        dispatch(closeTestRunDialog());
    };

    const handleCancel = () => {
        dispatch(closeTestRunDialog());
    };

    const handleTestRunDescriptionChange = (event) => {
        setTestRunDescription(event.target.value);
    }

    const handleTestRunnerNameChange = (event) => {
        setTestRunnerName(event.target.value);
    }

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTitle>Save Test Run</DialogTitle>
                <DialogContent style={{ height: '200px', width: '400px'}} >
                    <div className="my-2">
                        <TextField style={{ width: '350px'}} size="small" required label="Test Description" variant="outlined" onChange={handleTestRunDescriptionChange}/>
                    </div>
                    <div className="">
                        <TextField style={{ width: '350px'}} size="small" required label="Test Runner" variant="outlined" onChange={handleTestRunnerNameChange} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" sx={{textTransform: 'capitalize'}} onClick={handleSaveTestRun}>Save Test Run</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TestRunDialog;

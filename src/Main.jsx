import {Box, Tab,} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import React from "react";
import Dispatcher from "./Dispatcher";
import Comparer from "./Comparer";
import TestRun from "./TestRun";

const Main = () => {
    const [tabValue, setTabValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Box>
                <TabContext value={tabValue}>
                    <Box>
                        <TabList centered onChange={handleChange} textColor='primary' indicatorColor='primary'>
                            <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Dispatch actions' value='1'/>
                            <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Save test run' value='2'/>
                            <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Compare test runs' value='3'/>
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <div>
                            <Dispatcher/>
                        </div>
                    </TabPanel>
                    <TabPanel value='2'>
                        <div>
                            <TestRun/>
                        </div>
                    </TabPanel>
                    <TabPanel value='3'>
                        <div>
                            <Comparer/>
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Main;

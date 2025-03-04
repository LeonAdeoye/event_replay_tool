import {Box, Tab,} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import React from "react";
import Dispatcher from "./Dispatcher";
import Comparer from "./Comparer";

const Main = () => {
    const [, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div style={{ height: 500, width: '100%' }}>
            <Box>
                <TabContext>
                    <Box>
                        <TabList centered onChange={handleChange} textColor='primary' indicatorColor='primary'>
                            <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Dispatch actions' value='1'>Harper</Tab>
                            <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Compare test runs' value='2'>Horatio</Tab>
                        </TabList>
                    </Box>
                    <TabPanel value='1'><Dispatcher/></TabPanel>
                    <TabPanel value='2'><Comparer/></TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Main;

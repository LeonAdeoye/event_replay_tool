import React from "react";
import {Differ} from 'json-diff-kit';
import {Viewer} from 'json-diff-kit';
import 'json-diff-kit/dist/viewer.css';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DifferenceDisplay = ({differences}) => {
    const differ = new Differ({
        arrayDiffMethod: 'lcs',
        detectCircular: true,
        showModifications: true,
        maxDepth: Infinity
    });
    return (
        <>
            {differences.map((item, index) => (
                <div key={index}>
                    <span className="bg-gray-300 my-1 text-xl text-darkgray">{`Action type: ${item.type} at index ${item.index}`}</span>
                    {item.differences.map((state, stateIndex) => (
                        <Accordion key={stateIndex}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <h4 className="text-xl text-red">{`${state.state} state:`}</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Viewer diff={differ.diff(state.first, state.second)} hideUnchangedLines={true} lineNumbers={true} />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            ))}
        </>
    );
}

export default DifferenceDisplay;

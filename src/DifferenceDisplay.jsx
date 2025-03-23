import React from "react";
import {Differ} from 'json-diff-kit';
import {Viewer} from 'json-diff-kit';
import 'json-diff-kit/dist/viewer.css';

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
                    <h5>Action type: {item.type}</h5>
                    <h5>Action payload: {JSON.stringify(item.payload)}</h5>
                    <h5>Action index: {item.index}</h5>
                    {item.differences.map((state, stateIndex) => (
                        <div key={stateIndex}>
                            <h1 className="underline">{`${state.state} state:`}</h1>
                            <Viewer diff={differ.diff(state.first, state.second)} hideUnchangedLines={true} lineNumbers={true} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default DifferenceDisplay;

import React from "react";

type OutputWindowProps = {
    // TO-DO: change
    outputDetails: any
}

function getOutput(outputDetails: any): JSX.Element {
    let statusId: number = outputDetails?.status?.id;

    if (statusId === 6) {
        return (
            <pre className="ide-err">
                {atob(outputDetails?.compile_output)}
            </pre>
        );
    } else if (statusId === 3) {
        return (
            <pre className="ide-output">
                {atob(outputDetails.stdout) !== null
                    ? `${atob(outputDetails.stdout)}`
                    : null}
            </pre>
        );
    } else if (statusId === 5) {
        return (
            <pre className="ide-err">
                {`Time Limit Exceeded`}
            </pre>
        );
    } else {
        return (
            <pre className="ide-err">
                {atob(outputDetails?.stderr)}
            </pre>
        );
    }
}; 

export default function OutputWindow({outputDetails}: OutputWindowProps): JSX.Element {
    return (
        <>
            <h1 className="ide-output-h1">
                Output
            </h1>
            <div className="ide-output-window">
                {outputDetails ? <>{getOutput(outputDetails)}</> : null}
            </div>
        </>
    );
}

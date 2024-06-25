import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage(): JSX.Element {
    return (
        <div id="error-page">
            <p>Placeholder error page</p>
            <Error />
            <Link to={`/`}>Click here to go home</Link>
        </div>
    );
}


function Error(): JSX.Element {
    const error : unknown = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <p>{error.status}</p>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return <></>;
    }
}
    

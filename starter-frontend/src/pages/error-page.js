import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <p>Placeholder error page</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={`/`}>Click here to go home</Link>
        </div>
    );
}

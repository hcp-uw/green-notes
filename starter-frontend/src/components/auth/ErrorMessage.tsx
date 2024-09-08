import { XCircleIcon } from "@heroicons/react/solid";
import { useAuth } from "../../contexts/AuthContext";

/** Error Pop-up */
export default function ErrorMessage() {
    // const { error, setError } = useAuth();
    const used = useAuth();
    if (used === null) {
        throw new Error("user object is null");
    }
    const error = used.error;
    const setError = used.setError;

    if (error === "") {
        return <></>
    } else {
        return (
            (
                <div>
                    <div className="error-drop"  onClick={() => setError("")}>
    
                    </div>
                    <div className="centText flex errorwrap">
                            <XCircleIcon
                            onClick={() => setError("")}
                            className="errorX"
                            aria-hidden="true" />
                            <h3 className="errortext">
                                Error: {error}
                            </h3>
                        <div className="flex errorbox"></div>
                    </div>
                </div>
            )
        );
    }

}

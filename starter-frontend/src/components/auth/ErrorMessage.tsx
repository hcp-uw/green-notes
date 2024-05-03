//@ts-nocheck
import { XCircleIcon } from "@heroicons/react/solid";

import { useAuth } from "../../contexts/AuthContext";

export default function ErrorMessage() {
    const { error, setError } = useAuth();

    return (
        error && (
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

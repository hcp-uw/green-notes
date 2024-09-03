import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/** Parameters for Private Route */
type PrivateRouteParams = {children: any}

/** Redirects to login page if client isn't logged in */
const PrivateRoute = ({ children }: PrivateRouteParams) => {

    const used = useAuth();
    if (used === null) {
        throw new Error("bad");
    }

    const currentUser = used.currentUser;


    // const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setLoggedIn(!!user);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    if (loading) return <p>Loading...</p>;

    return loggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

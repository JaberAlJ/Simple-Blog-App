import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((state) => state.users.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            <h1>Profile</h1>
        </>
    );
}

export default Profile;
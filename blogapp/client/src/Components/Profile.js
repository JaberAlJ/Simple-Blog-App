import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Row } from "reactstrap";

const Profile = () => {
    const user = useSelector((state) => state.users.user);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.email) {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            <FormGroup floating>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    disabled
                />
                <Label for="name">Name</Label>
            </FormGroup>
            <FormGroup floating>
                <Input
                    type="text"
                    id="email"
                    value={email}
                    disabled
                />
                <Label for="email">Email</Label>
            </FormGroup>
        </>
    );
}

export default Profile;
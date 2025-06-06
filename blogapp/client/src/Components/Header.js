import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavItem } from "reactstrap";
import { storePersist } from "../Store/store";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../Features/UserSlice";

const Header = () => {
    const user = useSelector((state) => state.users.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logout());
        storePersist.purge();
        await new Promise((resolve) => setTimeout(resolve, 100));
        navigate("/login");
    };

    return (
        <Navbar>
            <Nav>
                {user.email ? <NavItem>
                    <Link to='/'>
                        <FaHome id="homeLink" />Home
                    </Link>
                </NavItem> : null}
                {user.email ? null : (
                    <>
                        <NavItem>
                            <Link to='/registration'>
                                Registration
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login'>
                                Login
                            </Link>
                        </NavItem>
                    </>
                )}
                {user.email ? (
                    <>
                        <NavItem>
                            <Link to='/profile'>
                                <FaUserAlt id="profileLink" />Profile
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link onClick={handleLogout}>
                                <FaSignOutAlt id="logOutLink" />Logout
                            </Link>
                        </NavItem>
                    </>
                ) : null}
            </Nav>
        </Navbar>
    );
}

export default Header;
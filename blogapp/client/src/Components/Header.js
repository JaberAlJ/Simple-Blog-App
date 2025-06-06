import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
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
                    <NavLink>
                        <Link to='/'>
                        <FaHome id="homeLink" />{' '}Home
                        </Link>
                    </NavLink>
                </NavItem> : null}
                {user.email ? (
                    <>
                        <NavItem>
                            <NavLink>
                                <Link to='/profile'>
                                <FaUserAlt id="profileLink" />{' '}Profile
                                </Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link onClick={handleLogout}>
                                <FaSignOutAlt id="logOutLink" />{' '}Logout
                                </Link>
                            </NavLink>
                        </NavItem>
                    </>
                ) : null}
            </Nav>
        </Navbar>
    );
}

export default Header;
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>&copy; {currentYear} BlogApp. All rights reserved.</p>
            <p>JaberAlJ</p>
        </footer>
    );
}

export default Footer;
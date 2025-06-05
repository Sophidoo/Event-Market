import "../styles/componentStyle/Navbar.css"

const Footer = () => {

    return <>
        <footer>
            <p>
                <span>&copy; All Rights Reserved. 2025 Rentopia.</span>
                <i className="bi bi-circle-fill"></i>
                <span>Privacy</span>
                <i className="bi bi-circle-fill"></i>
                <span>Terms</span>
                <i className="bi bi-circle-fill"></i>
                <span>Help Center</span>
            </p>
            <div className="footerSocialIcons">
                <i class="bi bi-whatsapp"></i>
                <i class="bi bi-instagram"></i>
                <i class="bi bi-twitter-x"></i>
                <i class="bi bi-facebook"></i>
            </div>
        </footer>
    </>

}

export default Footer
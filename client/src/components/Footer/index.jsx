import React from 'react';
import './style.css';
const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="footer-col">
                <h4>company</h4>
                <ul>
                    <li><a href="#">about us</a></li>
                    <li><a href="#">our services</a></li>
                    <li><a href="#">privacy policy</a></li>
                    <li><a href="#">affiliate program</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>get help</h4>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">shipping</a></li>
                    <li><a href="#">returns</a></li>
                    <li><a href="#">order status</a></li>
                    <li><a href="#">payment options</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>online shop</h4>
                <ul>
                    <li><a href="#">t-shirt</a></li>
                    <li><a href="#">jersey</a></li>
                    <li><a href="#">sajada</a></li>
                    <li><a href="#">jacket</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                    <a href="https://www.instagram.com/ilyasdewanto/" target='blank'><i className="fab fa-instagram"></i></a>
                    <a href="https://web.facebook.com/amaterasuaquino.juliusilyas" target='blank'><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.linkedin.com/in/ilyas-dewanto-114911229/" target='blank'><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
    </div>
</footer>
  );
};

export default Footer;

import React from "react";
import "../dist/css/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="foot container  ">
        <div className="column">
          <h4>
            <a href="/">HDShop</a>
          </h4>
          <p>
            All rights reserved.© <br /> 2020{" "}
            <a href="/" target="_blank">
              DATNGUYEN
            </a>{" "}
          </p>
          <div className="foot-icon">
            <ul className="foot">
              <li>
                <a href="#">
                  <span className="fab fa-facebook-f" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fab fa-twitter" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fab fa-instagram" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column">
          <h3>Useful Links</h3>
          <ul className="footer-gd-16">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
        <div className="column">
          <h3>Useful Links</h3>
          <ul className="footer-gd-16">
            <li>
              <a href="blog.html">Blog</a>
            </li>
            <li>
              <a href="gallery.html">Gallery</a>
            </li>
            <li>
              <a href="portfolio.html">Portfolio</a>
            </li>
            <li>
              <a href="pricing.html">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="column column3">
          <h3>Useful Links</h3>
          <ul className="footer-gd-16">
            <li>
              <a href="signin">Login</a>
            </li>
            <li>
              <a href="timeline.html">Timeline</a>
            </li>
            <li>
              <a href="faq.html">Faq</a>
            </li>
            <li>
              <a href="comingsoon.html">Coming Soon</a>
            </li>
          </ul>
        </div>
        <div className="column column4">
          <h3>Subscribe </h3>
          <form action="#" className="subscribe flex" method="post">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <button href="/signup">
              <span className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </form>
          <p className>
            We help you to grow up your business and <br /> solution for your
            impressive projects.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

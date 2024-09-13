import "./footer.scss";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-wrapper">
          <div className="social-media">
            <a href="">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                width={20}
              />
            </a>
            <a href="">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                width={20}
              />
            </a>
            <a href="">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"
                width={20}
              />
            </a>
          </div>
          <div className="footer-links">
            <a href="">Legal</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms and conditions</a>
            <a href="">Get in touch</a>
          </div>
          <div className="footer-address">
            <h5>Cub Film Data</h5>
            <p>Berlin, Germany</p>
            <span>2024 | all rights reserved</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;

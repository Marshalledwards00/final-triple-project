import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copy">© 2026 Supersite, Powered by News API</p>
        <div className="footer__right">
          <div className="footer__links">
            <a href="/">
              Home
            </a>
            <span>
              TripleTen
            </span>
          </div>
          <div className="footer__social">
            <a href="https://github.com/Marshalledwards00/final-triple-project/tree/main/backend" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src="/github.svg" alt="" />
            </a>
            <a href="https://www.linkedin.com/in/william-edwards-03ba67240" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/linkedin.svg" alt="" />
            </a>
          </div>
        </div>
        <div className="footer__links footer__links_mobile">
          <a href="/">Home</a>
          <span>
            TripleTen
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
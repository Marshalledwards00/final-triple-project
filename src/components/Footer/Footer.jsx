import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copy">© 2024 Supersite, Powered by News API</p>
        <div className="footer__right">
          <div className="footer__links">
            <a href="/">
              Home
            </a>
            <a href="https://practicum.yandex.com/" target="_blank" rel="noreferrer">
              TripleTen
            </a>
          </div>
          <div className="footer__social">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src="/github.svg" alt="" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src="/linkedin.svg" alt="" />
            </a>
          </div>
        </div>
        <div className="footer__links footer__links_mobile">
          <a href="/">Home</a>
          <a href="https://practicum.yandex.com/" target="_blank" rel="noreferrer">
            TripleTen
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
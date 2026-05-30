import './Main.css'

function Main({ title, subtitle, children, hasMore = false, onShowMore, hideHeading = false }) {
  return (
    <main className="main">
      {/* Heading and subtitle now inside the background */}
      {!hideHeading && (
        <div className="news-card-list-bg news-card-list-bg--heading">
          <h2 className="main__title">{title}</h2>
          <p className="main__subtitle">{subtitle}</p>
          {children}
        </div>
      )}
      {hideHeading && children}
    </main>
  )
}

export default Main
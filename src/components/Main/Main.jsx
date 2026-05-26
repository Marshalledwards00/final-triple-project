import './Main.css'

function Main({ title, subtitle, children, hasMore = false, onShowMore }) {
  return (
    <main className="main">
      <div className="main__container">
        <h2 className="main__title">{title}</h2>
        <p className="main__subtitle">{subtitle}</p>
        {children}
        {hasMore && (
          <button className="main__more" type="button" onClick={onShowMore}>
            Show more
          </button>
        )}
      </div>
    </main>
  )
}

export default Main
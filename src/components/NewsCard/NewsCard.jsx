import './NewsCard.css'


function NewsCard({
  article,
  onToggleSave,
  onDeleteArticle,
  isSavedPage,
  isLoggedIn,
}) {
  const handleCardClick = (e) => {
    // Prevent click if user clicks the save/delete button
    if (
      e.target.closest('.news-card__action') ||
      e.target.closest('.news-card__action-icon')
    ) {
      return
    }
    if (article.link) {
      window.open(article.link, '_blank', 'noopener')
    }
  }
  return (
    <article className={`news-card ${isSavedPage ? 'news-card_saved' : ''}`} tabIndex={0} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="news-card__controls">
        {isSavedPage && article.keyword && (
          <span className="news-card__keyword">{article.keyword}</span>
        )}
        {!isSavedPage ? (
          <>
            {!isLoggedIn && <span className="news-card__hint">Sign in to save articles</span>}
            <button
              type="button"
              className={`news-card__action ${article.isSaved ? 'news-card__action_saved' : ''}`}
              onClick={(e) => { e.stopPropagation(); onToggleSave(article) }}
              aria-label="Save article"
            >
              <img
                className="news-card__action-icon"
                src={article.isSaved ? '/bookmark-active.svg' : '/bookmark.svg'}
                alt=""
              />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="news-card__action news-card__action_delete"
            onClick={(e) => { e.stopPropagation(); onDeleteArticle(article.savedId) }}
            aria-label="Delete article"
          >
            <img className="news-card__action-icon" src="/trash.svg" alt="" />
          </button>
        )}
      </div>
      <img className="news-card__image" src={article.image} alt={article.title} />
      <div className="news-card__content">
        <p className="news-card__date">{article.publishedAt}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.text}</p>
        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  )
}

export default NewsCard
import NewsCard from '../NewsCard/NewsCard'
import './NewsCardList.css'

function NewsCardList({
  articles,
  onToggleSave,
  onDeleteArticle,
  isSavedPage = false,
  isLoggedIn = false,
}) {
  if (!articles.length) {
    return <p className="news-card-list__empty">Nothing found. Try another search topic.</p>
  }

  return (
    <section className="news-card-list" aria-label="News cards">
      {articles.map((article) => (
        <NewsCard
          key={article.id || article._id || article.link}
          article={article}
          onToggleSave={onToggleSave}
          onDeleteArticle={onDeleteArticle}
          isSavedPage={isSavedPage}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </section>
  )
}

export default NewsCardList
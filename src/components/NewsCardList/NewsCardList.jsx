import NewsCard from '../NewsCard/NewsCard'
import { nothingFoundIcon } from '../assets/nothing-found-assets'
import './NewsCardList.css'
import { useRef, useEffect, useState } from 'react'

function NewsCardList({
  articles,
  onToggleSave,
  onDeleteArticle,
  isSavedPage = false,
  isLoggedIn = false,
  hasMore = false,
  onShowMore,
}) {
  const [prevCount, setPrevCount] = useState(articles.length)
  const [animateIndexes, setAnimateIndexes] = useState([])

  useEffect(() => {
    if (articles.length > prevCount) {
      // Animate only the new cards
      const newIndexes = Array.from({ length: articles.length - prevCount }, (_, i) => prevCount + i)
      setAnimateIndexes(newIndexes)
      // Remove animation class after animation
      const timeout = setTimeout(() => setAnimateIndexes([]), 500)
      return () => clearTimeout(timeout)
    }
    setPrevCount(articles.length)
  }, [articles.length, prevCount])

  useEffect(() => {
    setPrevCount(articles.length)
  }, [articles.length])

  if (!articles.length) {
    if (!isSavedPage) {
      return (
        <div className="news-card-list__empty">
          <img className="news-card-list__empty-icon" src={nothingFoundIcon} alt="Sad face" />
        </div>
      );
    }
    return null;
  }

  return (
    <div className="news-card-list-bg">
      <ul className="news-card-list" aria-label="News cards">
        {articles.map((article, idx) => (
          <li
            className={`news-card-list__item${animateIndexes.includes(idx) ? ' news-card-list__item--animate' : ''}`}
            key={article.id || article._id || article.link}
          >
            <NewsCard
              article={article}
              onToggleSave={onToggleSave}
              onDeleteArticle={onDeleteArticle}
              isSavedPage={isSavedPage}
              isLoggedIn={isLoggedIn}
            />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="main__more-wrapper">
          <button className="main__more" type="button" onClick={onShowMore}>
            Show more
          </button>
        </div>
      )}
    </div>
  )
}

export default NewsCardList
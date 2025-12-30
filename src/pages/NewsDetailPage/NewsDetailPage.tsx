import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNewsDetailLogic } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../context/ThemeContext';
import './NewsDetail.css';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { t } = useTranslation('NewsDetailPage');
  const { newsItem, contentParagraphs, isNotFound } = useNewsDetailLogic(id);

  if (isNotFound || !newsItem) {
    return (
      <div className={`news-page-container ${theme}`}>
        <section className="news-detail-content not-found">
          <h2>{t('news_detail.not_found.title')}</h2>
          <p>{t('news_detail.not_found.message', { id })}</p>
          <Link to="/">{t('news_detail.not_found.back_home')}</Link>
        </section>
      </div>
    );
  }

  return (
    <div className={`news-page-container ${theme}`}>
      <section className="news-detail-content">
        <div className="news-header-bar">
          <h1>{newsItem.title}</h1>
        </div>

        <div className="news-body">
          <img 
            src={newsItem.img} 
            alt={newsItem.title} 
            className="news-image" 
          />
          
          <div className="fullContent">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {newsItem.featuredQuote && (
            <blockquote className="special-quote">
              {newsItem.featuredQuote}
              {newsItem.quoteAttribution && (
                <span className="attribution">{newsItem.quoteAttribution}</span>
              )}
            </blockquote>
          )}
        </div>
        
        <Link to="/" className="backLink">
          &larr; {t('news_detail.navigation.back_to_list')}
        </Link>
      </section>
    </div>
  );
};

export default NewsDetailPage;
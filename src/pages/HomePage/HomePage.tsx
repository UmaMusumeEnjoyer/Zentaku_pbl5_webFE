// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useHomeLogic } from '@umamusumeenjoyer/shared-logic';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import './HomePage.css';

const HomePage: React.FC = () => {
  // Sử dụng custom hook từ shared-logic
  const { trendingAnime, genres, latestNews, isLoading } = useHomeLogic();
  const { t } = useTranslation(['HomePage', 'common']);

  // Hiển thị loading state
  if (isLoading) {
    return (
      <div className="homePage">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          color: '#fff',
          fontSize: '1.5rem'
        }}>
          {t('common:loading')}
        </div>
      </div>
    );
  }

  return (
    <div className="homePage">
      {/* Language Switcher */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <LanguageSwitcher />
      </div>

      {/* --- PHẦN MỚI 1: Hero Section (Giống như ảnh bạn cung cấp) --- */}
      <section className="heroSection">
        <div className="heroContent">
          <h1 dangerouslySetInnerHTML={{ __html: t('HomePage:hero.title') }}></h1>
          <p>{t('HomePage:hero.subtitle')}</p>
        </div>
        <div className="heroImage">
          <img src="/images/dashboard.png" alt="Dashboard statistics" />
        </div>
      </section>

      {/* --- PHẦN MỚI 3: Features Section --- */}
      <section className="featuresSection">
        <div className="featuresTextContent">
          <span className="featuresLabel">{t('HomePage:features.label')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('HomePage:features.title') }}></h2>
          <p className="featuresIntro">{t('HomePage:features.intro')}</p>

          <div className="featureItem">
            <div className="featureIcon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="featureDetails">
              <h3>{t('HomePage:features.exploration.title')}</h3>
              <p>{t('HomePage:features.exploration.desc')}</p>
            </div>
          </div>

          <div className="featureItem">
            <div className="featureIcon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="featureDetails">
              <h3>{t('HomePage:features.analytics.title')}</h3>
              <p>{t('HomePage:features.analytics.desc')}</p>
            </div>
          </div>
        </div>
        <div className="featuresImage">
          <img src="/images/laptop-dashboard.png" alt="Laptop showing data analytics" />
        </div>
      </section>

      {/* --- PHẦN 1 CŨ: Video Call-to-Action --- */}
      <section className="videoSection">
        <video
          className="videoBackground"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/phainonH264.mp4" type="video/mp4" />
          {t('common:video_unsupported')}
        </video>
        <div className="videoOverlay"></div>
        <div className="contentContainer">
          <div className="textContainer">
            <h3>{t('HomePage:community_cta.title')}</h3>
            <p>{t('HomePage:community_cta.desc')}</p>
          </div>
          <div>
            <Link to="/signup" className="signUpButton">{t('common:buttons.sign_up')}</Link>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: Trending Now Section --- */}
      <section className="trendingSection">
        <h2>{t('HomePage:sections.popular')}</h2>
        <div className="animeGrid">
          {trendingAnime.map(anime => (
            <Link to={`/anime/${anime.id}`} key={anime.id} className="animeCard">
              <img src={anime.img} alt={anime.title} />
              <div className="cardContent">
                <h3>{anime.title}</h3>
                <p>{anime.desc}</p>
                <span className="cardButton">{t('common:buttons.learn_more')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- PHẦN 3: Explore by Genre Section --- */}
      <section className="genreSection">
        <h2>{t('HomePage:sections.genres')}</h2>
        <div className="genreChips">
          {genres.map(genre => (
            <Link to={`/genre/${genre.toLowerCase()}`} key={genre} className="genreChip">
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* --- PHẦN 4: Latest News Section --- */}
      <section className="latestNewsSection">
        <h2>{t('HomePage:sections.latest_news')}</h2>
        <div className="newsGrid">
          {latestNews.map(news => (
            <article key={news.id} className="newsArticle">
              <img src={news.img} alt={news.title} />
              <div className="newsContent">
                <h4>{news.title}</h4>
                <p>{news.snippet}</p>
                <Link to={`/news/${news.id}`} className="readMoreLink">
                  {t('common:buttons.read_more')} &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- PHẦN 5: Footer --- */}
      <footer className="footer">
        <div className="footerLinks">
          <Link to="/about">{t('common:footer.about_us')}</Link>
          <Link to="/contact">{t('common:footer.contact')}</Link>
          <Link to="/privacy">{t('common:footer.privacy_policy')}</Link>
          <Link to="/terms">{t('common:footer.terms_of_service')}</Link>
        </div>
        <p>{t('common:footer.copyright', { year: 2025 })}</p>
      </footer>
    </div>
  );
};

export default HomePage;

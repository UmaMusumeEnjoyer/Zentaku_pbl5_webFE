import React from 'react';
//import { Link } from 'react-router-dom';
import { type HeroSectionProps } from '@umamusumeenjoyer/shared-logic';
import { useHeroSection } from '@umamusumeenjoyer/shared-logic';
import { useTheme } from '../../../context/ThemeContext';
import './HeroSection.css';

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  // Kết nối với ViewModel
  const { current, moveDot, hasSlides } = useHeroSection(slides);
  const { theme } = useTheme();

  // Guard clause: Nếu không có slide thì không render gì cả (logic từ file gốc)
  if (!hasSlides) {
    return null;
  }

  return (
    <div className={`hero-slider ${theme}`}>
      {slides.map((slide, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={slide.id}
        >
          {index === current && (
            <>
              <div className="hero-background">
                <img src={slide.bannerUrl} alt={slide.title} />
                <div className="hero-overlay"></div>
              </div>

              <div className="hero-content container">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-description">{slide.description}</p>
                
                <div className="hero-actions">
                  {/* <Link 
                    to={`/anime/${slide.id}`} 
                    className="btn btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <i className="fas fa-play"></i> See details
                  </Link> */}
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => moveDot(index)}
            className={current === index ? "dot active" : "dot"}
            role="button"
            tabIndex={0}
            aria-label={`Go to slide ${index + 1}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
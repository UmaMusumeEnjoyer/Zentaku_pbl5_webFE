import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initSharedLogic } from '@umamusumeenjoyer/shared-logic';
import './App.css';
import './i18n/config'; // Import i18n configuration
import HomePage from './pages/HomePage/HomePage';

// Khởi tạo shared-logic với localStorage và API base URL
initSharedLogic({
  storage: {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: (key: string) => localStorage.removeItem(key),
  },
  apiBaseUrl: 'https://doannguyen.pythonanywhere.com/api'
});

function App() {
  useEffect(() => {
    // --- Thay đổi Tiêu đề (Title) ---
    document.title = "MyAnilist";

    // --- Thay đổi Logo (Favicon) ---
    const updateFavicon = (url: string) => {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = url;
    };

    updateFavicon('/Gemini_Generated_Image_eg5d1qeg5d1qeg5d (1).ico');
  }, []);

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AffiliateDisclosurePage from './pages/AffiliateDisclosurePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import FindThatFitPage from './pages/FindThatFitPage';
import AdminLooksPage from './pages/AdminLooksPage';
import ClosetPage from './pages/ClosetPage';
import SharedOutfitPage from './pages/SharedOutfitPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<AnalyzePage />} />
          <Route path="/results/:uploadId" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/findthatfit" element={<FindThatFitPage />} />
          <Route path="/albums" element={<AlbumsPage />} />
          <Route path="/albums/:albumId" element={<AlbumDetailPage />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/share/outfit/:shareId" element={<SharedOutfitPage />} />
          <Route path="/admin/looks" element={<AdminLooksPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

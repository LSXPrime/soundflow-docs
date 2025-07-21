import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ContentProvider } from './contexts/ContentContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';
import { LazyMotion, domAnimation } from 'framer-motion';
import {SettingsProvider} from "./contexts/SettingsContext.tsx";

function App() {
  const location = useLocation();

  return (
      <LazyMotion features={domAnimation}>
        <ThemeProvider>
          <SettingsProvider>
            <ContentProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="docs" element={<Navigate to="/docs/v1.2.0/" replace />} />
                    <Route path="docs/:version/*" element={<DocsPage key={location.pathname} />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </div>
            </ContentProvider>
          </SettingsProvider>
        </ThemeProvider>
      </LazyMotion>
  );
}

export default App;
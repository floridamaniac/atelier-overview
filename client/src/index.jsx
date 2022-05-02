import { React, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled, { ThemeProvider } from 'styled-components';

import { FiSun, FiMoon } from 'react-icons/fi';

import { StylesProvider } from '@Contexts/StylesProvider';
import { ProductProvider } from '@Contexts/ProductIDContext';
import { RatingProvider } from './contexts/ReviewMeta';

import themes from './contexts/Theme';
import Overview from './components/Overview';

function App() {
  const storedTheme = localStorage.getItem('theme');
  if (!storedTheme) {
    localStorage.setItem('theme', 'light');
  }
  const defaultProductId = 65631;
  const [currentTheme, setCurrentTheme] = useState(storedTheme || 'light');

  const handleThemeChange = () => {
    const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <ProductProvider productId={defaultProductId}>
        <Site>
          <SiteHeader>
            Atelier.
            <SiteSearch>
              <ThemeChanger onClick={() => handleThemeChange()}>
                {currentTheme === 'light' ? <FiMoon /> : <FiSun />}
              </ThemeChanger>
            </SiteSearch>
          </SiteHeader>
          <Banner>
            SITE-WIDE ANNOUNCEMENT MESSAGE - SALE / DISCOUNT OFFER - NEW PRODUCT HIGHLIGHT
          </Banner>
          <SiteBody>
            <RatingProvider>
              <StylesProvider>
                <Overview />
              </StylesProvider>
            </RatingProvider>
          </SiteBody>
        </Site>
      </ProductProvider>
    </ThemeProvider>
  );
}

const Site = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  width: 100%;
  height: 100%;
`;

const SiteHeader = styled.header`
  position: sticky; top: 0;
  z-index:500;
  font-size: 1.5em;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  padding: 20px 40px;
  font-family: ${({ theme }) => theme.fonts.title.family};
`;

const SiteBody = styled.section`
  max-width: 1280px;
  margin: 0 auto;
`;

const ThemeChanger = styled.span`
  cursor: pointer;
`;

const SiteSearch = styled.span`
  float: right;
`;

const Banner = styled.div`
  backgound-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.9em;
  text-align: center;
  padding: 10px 0;
  @media (max-width: 768px) {
    display: none;
  }
`;

createRoot(document.getElementById('root')).render(<App />);

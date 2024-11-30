import { createGlobalStyle } from 'styled-components';
import '@fontsource/inter';
import '@fontsource/roboto-mono';

const GlobalStyles = createGlobalStyle`
  :root {
    --navy: #0a192f;
    --light-navy: #112240;
    --lightest-navy: #233554;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --green: #64ffda;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background-color: var(--navy);
    color: var(--slate);
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.3;

    section {
      margin: 0 auto;
      padding: 100px 0;
      max-width: 1000px;

      @media (max-width: 768px) {
        padding: 80px 0;
      }

      @media (max-width: 480px) {
        padding: 60px 0;
      }
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--lightest-slate);
    font-weight: 600;
    line-height: 1.1;
  }

  p {
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: var(--green);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover,
    &:focus {
      color: var(--green);
    }
  }

  .section-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, 32px);
    white-space: nowrap;

    &::after {
      content: '';
      display: block;
      position: relative;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);
    }
  }
`;

export default GlobalStyles;

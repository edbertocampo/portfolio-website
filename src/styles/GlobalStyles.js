import { createGlobalStyle } from 'styled-components';
import '@fontsource/inter';
import '@fontsource/roboto-mono';

const GlobalStyles = createGlobalStyle`
  :root {
    --navy: #213448;
    --light-navy: #547792;
    --lightest-navy: #547792;
    --slate: #94B4C1;
    --light-slate: #bfd1db;
    --lightest-slate: #EAE0CF;
    --white: #EAE0CF;
    --green: #EAE0CF;
    --green-tint: rgba(234, 224, 207, 0.1);
    
    /* Layout */
    --section-max-width: 1000px;
    --section-padding-x: clamp(20px, 5vw, 50px);

    /* Typography */
    --font-heading: 'Lexend', sans-serif;
    --font-body: 'Figtree', sans-serif;
    --font-mono: 'Roboto Mono', monospace;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    width: 100%;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    background-color: var(--navy);
    color: var(--slate);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.3;

    section {
      margin: 0 auto;
      padding: 100px 0;
      max-width: 10000px;

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
    font-family: var(--font-heading);
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
      max-width: 100%; 
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);
      flex-shrink: 1; 

      @media (max-width: 768px) {
        width: 100%; 
        max-width: 200px;
      }

      @media (max-width: 480px) {
        margin-left: 10px;
        width: 100%; 
        max-width: 100px; 
        flex: 1; 
      }
    }
  }
`;

export default GlobalStyles;

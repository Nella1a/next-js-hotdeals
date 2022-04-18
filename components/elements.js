import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    /* --fontColorWhite: #fff;
    --colorMainBlue: #030a45;
    --fontColorGrey: #333333;
    --backGroundColorGrey: #e6e6e6;
    --highlightsPink: #ec184a;
    --outLineMenue: #44496b; */
  }

  /* Reset sizing   */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }

  h1 {
    font-size: 2.5rem;
  }

  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    min-height: 100vh;
    font-family: ${theme.font};
    background-color: var(--colorMainBlue);
    margin: 0 auto;
    color: var(--colorMainBlue);
  }

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  textarea,
  select {
    font: inherit;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--outLineMenue);
  }

  input,
  select {
    min-height: 3.5rem;
    padding: 1rem;
    border: 1px solid blue;
    margin-bottom: 0.8rem;
  }

  label {
    color: var(--colorMainBlue);
  }

  button {
    font: inherit;
    line-height: 1.5;
    letter-spacing: 0.5px;
    /* border-radius: 20px; */
    font-weight: bold;
    display: block;
    min-height: 2.5rem;
    /* background-color: var(--highlightsPink);
    color: var(--fontColorWhite); */
    /* border: none; */

    :hover {
      background-color: var(--colorMainBlue);
    }
  }
`;

export const showForm = css`
  display: flex;
  flex-direction: column;
`;

export const hideForm = css`
  display: none;
`;
/* *************************** */
/*    Utility Styles?          */
/* *************************** */

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const flexCenterColumn = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const marginCenter = {
  margin: '0 auto',
};

const size = (width = '100%', height = '100%') => {
  return { width, height };
};

const displayFlex = (
  display = 'flex',
  flexDirection = 'row',
  justifyContent = 'center',
  alignItems = 'center',
) => {
  return { display, flexDirection, justifyContent, alignItems };
};

/** Layout ** */
export const styleMain = css`
  display: flex;
  min-height: 100vh;
`;

/* *************************** */
/*            Header           */
/* *************************** */

export const headerStyle = css`
  width: 100%;
  ${marginCenter}

  nav {
    max-width: 95%;
    ${marginCenter}
    gap: 60px;
    align-items: center;
    display: flex;
    height: 4rem;
    justify-content: space-between;
    border: 1px solid red;

    a {
      text-decoration: none;
      display: block;
      font-weight: bold;
      letter-spacing: 0.5px;
      line-height: 18px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 12px;
      min-height: 40px;
      padding: 10px 16px;
      text-align: center;
      color: var(--fontColorParagraphAndLinks);
      border: none;
      border-radius: 4px;
    }

    button {
      width: 5rem;
      height: 1rem;
      border: 1px solid blue;
    }
  }
`;

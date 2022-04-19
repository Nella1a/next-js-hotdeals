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

  section {
    width: 100%;
    padding: 1.5rem;
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
    border: 1px solid black;
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

const displayFlex = (
  display = 'flex',
  flexDirection = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  flexWrap = 'no wrap',
) => {
  return { display, flexDirection, justifyContent, alignItems, flexWrap };
};

/** Layout ** */
export const styleMain = css`
  display: flex;
  min-height: 100vh;
`;

export const captext = css`
  text-transform: capitalize;
  font-weight: 600;
`;

/* *************************** */
/*            Header           */
/* *************************** */

export const headerStyle = css`
  width: 100%;
  height: 5rem;
  background-color: #e20015;

  a {
    text-decoration: none;
    display: block;
    font-weight: bold;
    letter-spacing: 0.5px;
    line-height: 18px;
    font-weight: bold;
    font-size: 2rem;
    min-height: 40px;
    margin-top: 1.5rem;
    padding: 1.5rem 16px;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 4px;
  }
`;

/* *************************** */
/*            index            */
/* *************************** */
export const sectionOneIndex = css`
  text-align: center;
  background-color: #0f0f0f0f;
  height: 3rem;
  color: #000;
  ${displayFlex('flex', 'row', 'center', 'center', 'no-wrap')}
  p {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0;
  }
`;

export const sectionTwoIndex = css`
  text-align: center;
  h1 {
    text-align: left;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  > div {
    font-size: 1.2rem;
    ${displayFlex('flex', 'row', '', '', 'wrap')}
    gap: 1.8rem;
  }
`;

/* *************************** */
/*            Categories       */
/* *************************** */
export const sectionOneCategorie = css`
  ${displayFlex('flex', 'row', '', '', 'wrap')}
  gap: 1rem;

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    color: black;
    :hover {
      border-bottom: 2px solid black;
    }

    a:link,
    a:visited,
    a:active {
      color: black;
    }
  }
`;

export const sectionTwoCategorie = css`
  > div {
    ${displayFlex('flex', 'row', '', '', 'wrap')}
    gap: 1.8rem;
    margin-bottom: 1rem;
    article {
      width: 300px;
      border: 1px solid lightgrey;
      padding: 1rem;

      div:first-of-type {
        ${displayFlex('flex', 'column', 'flex-start', 'center', 'no-wrap')}
      }

      div:nth-of-type(2),
      div:nth-of-type(3) {
        margin-top: 1rem;
        p {
          padding: 0 1rem;
        }
      }
    }
  }
`;

/* *************************** */
/*          login              */
/* *************************** */
export const sectionRegisterAndLogin = css`
  height: 100vh;
  ${displayFlex('flex', 'column', 'center', 'center', 'no-wrap')}

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  article {
    width: 28rem;
    height: 28rem;
    border: 1px solid black;

    form {
      width: inherit;
      height: inherit;
      ${displayFlex('flex', 'column', 'center', 'center', 'no-wrap')}
      gap: 1rem;

      div > p {
        margin-bottom: 0.3rem;
      }
      button {
        width: 10rem;
        background-color: #000;
        color: #fff;
        border: none;

        :hover {
          background-color: #e20015;
        }
      }
    }
  }
`;

/* *************************** */
/*          register             */
/* *************************** */
export const sectionRegister = css`
  height: 100vh;
  ${displayFlex('flex', 'column', 'center', 'center', 'no-wrap')}

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  article {
    width: 28rem;
    height: 28rem;
    border: 1px solid black;

    form {
      width: inherit;
      height: inherit;
      ${displayFlex('flex', 'column', 'center', 'center', 'no-wrap')}
      gap: 1rem;

      div > p {
        margin-bottom: 0.3rem;
      }
      button {
        width: 10rem;
        background-color: #000;
        color: #fff;
        border: none;

        :hover {
          background-color: #e20015;
        }
      }
    }
    a {
      text-decoration: none;
    }
  }
`;

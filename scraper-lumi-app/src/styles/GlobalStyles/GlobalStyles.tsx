import { Global, css } from "@emotion/react";

function GlobalStyles() {
  return (
    <>
      <Global
        styles={css`
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: Lato, Arial, Helvetica, sans-serif;
          }

          html {
            font-size: 62.5%;
          }

          html,
          body {
            height: 100%;
          }

          button {
            cursor: pointer;
          }
        `}
      />
    </>
  );
}

export default GlobalStyles;

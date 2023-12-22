import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      gray: string;
      primary: string;
      secundary: string;
      white: string;
      cyan: string;
      primaryDark: string;
    };
    mediaScreen: {
      md: string;
    };
  }
}

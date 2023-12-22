import { Theme } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";

type CustomThemeProviderProps = {
  theme: Theme;
};

export default function CustomThemeProvider(
  props: PropsWithChildren<CustomThemeProviderProps>,
) {
  return <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>;
}

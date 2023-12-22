import CustomThemeProvider from "../styles/ThemeProvider/ThemeProvider";
import { DefaultTheme } from "../styles/Themes/default";
import { render} from '@testing-library/react'



export function renderWithTheme(value: JSX.Element) {
    render(
        <CustomThemeProvider theme={DefaultTheme} >
            {value}
        </CustomThemeProvider>
    )
}
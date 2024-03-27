import * as React from 'react';
import { Outlet } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Local components/functions
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ColorModeContext from './context/ColorModeContext';
import createCustomTheme from './styles/CustomTheme';
import LocalizationContext from './context/LocalizationContext';

// Local styles
import "./styles/App.css";
import { SnackbarProvider } from 'notistack';

// Initialize the UTC plugin for dayjs
dayjs.extend(utc);

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: require("./i18n/en.json"),
            de: require("./i18n/de.json"),
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export default function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

    const toggleColorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const toggleLocalizationMode = React.useMemo(
        () => ({
            setLocalization: (locale: 'utc' | 'de') => {
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createCustomTheme({
                palette: {
                    mode,
                    ...(mode === 'light' ? {
                        // Extra props for the light theme
                        background: {
                            elevated: "#cdcdcd",
                            invertedElevated: "#323232",
                        }
                    } : {
                        // Extra props for the dark theme
                        background: {
                            elevated: "#323232",
                            invertedElevated: "#cdcdcd",
                        }
                    })
                },
            }),
        [mode],
    );

    fetch('https://api.resume.schurteb.ch/view_count', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": ""
        }
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));

    return (
      <LocalizationContext.Provider value={toggleLocalizationMode}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateLibInstance={dayjs.utc}
        >
          <ColorModeContext.Provider value={toggleColorMode}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <CssBaseline />

                <ResponsiveAppBar />

                <Outlet />
              </SnackbarProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </LocalizationProvider>
      </LocalizationContext.Provider>
    );
}

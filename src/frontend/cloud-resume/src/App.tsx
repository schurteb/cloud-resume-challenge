import * as React from 'react';
import { Outlet } from "react-router-dom";
import { Alert, Typography, CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// Local components/functions
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ColorModeContext from './context/ColorModeContext';
import createCustomTheme from './styles/CustomTheme';
import LocalizationContext from './context/LocalizationContext';
import isDevelopment from './isDevelopment';

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
    //const [localizationMode, setLocalization] = React.useState<'utc' | 'de'>('utc');
    const { t } = useTranslation();

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
                //setLocalization(locale);
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

    /*const getDateLibInstance = () => {
        var i = null;

        i = dayjs.utc();

        switch (localizationMode.toLowerCase()) {
            case 'utc':
                i = dayjs.utc;
                break;
            case 'de':
                i = dayjs();
                break;
        }

        return i;
    }*/

    /*const localizationInstance = React.useMemo(
        () => getDateLibInstance(),
        [localizationMode],
    );*/

    return (
            <LocalizationContext.Provider value={toggleLocalizationMode}>
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                    <ColorModeContext.Provider value={toggleColorMode}>
                        <ThemeProvider theme={theme}>
                            <SnackbarProvider>

                            <CssBaseline />

                            {isDevelopment() ?
                                <Alert severity="warning" style={{ justifyContent: 'center' }}>
                                    {t('WarningDevelopmentMode')}
                                </Alert>
                                :
                                <></>
                            }

                            <ResponsiveAppBar />

                            {isDevelopment() ?
                                <Typography textAlign="center">
                                    NE: {process.env.NODE_ENV}&nbsp;|&nbsp;
                                    E: {process.env.REACT_APP_ENVIRONMENT}&nbsp;|&nbsp;
                                    TC: {process.env.REACT_APP_TARGET_CHAIN_ID}<br />
                                </Typography>
                                :
                                <></>
                            }

                            <Outlet />

                            </SnackbarProvider>
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </LocalizationProvider>
            </LocalizationContext.Provider>
    );
}

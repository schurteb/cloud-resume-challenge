// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

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
import enTranslations from "./i18n/en.json";
import deTranslations from "./i18n/de.json";

// Local components/functions
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import ViewCounter from "./components/ViewCounter";
import ColorModeContext from './context/ColorModeContext';
import createCustomTheme from './styles/CustomTheme';
import LocalizationContext from './context/LocalizationContext';

// Local styles
import "./styles/App.css";

// Initialize the UTC plugin for dayjs
dayjs.extend(utc);

// View count - always GET to display, POST handled separately with strict locking
const VIEW_COUNT_LAST_KEY = 'viewCountLastIncrement';
const DEBOUNCE_MS = 30000; // 30 second debounce

function getViewCount(): Promise<number | null> {
    return fetch('https://api.resume.schurteb.ch/view_count', {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => {
        const count = parseInt(data, 10);
        return isNaN(count) ? null : count;
    })
    .catch(() => null);
}

function tryIncrementViewCount(): void {
    const now = Date.now();
    const lastIncrement = localStorage.getItem(VIEW_COUNT_LAST_KEY);

    // Strict debounce - only increment if last was 30+ seconds ago
    if (lastIncrement && (now - parseInt(lastIncrement, 10)) < DEBOUNCE_MS) {
        return;
    }

    // Set timestamp BEFORE fetch - any subsequent calls will see this and skip
    localStorage.setItem(VIEW_COUNT_LAST_KEY, now.toString());

    // Fire and forget
    fetch('https://api.resume.schurteb.ch/view_count', {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    }).catch(() => {});
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: enTranslations,
            de: deTranslations,
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export default function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const [viewCount, setViewCount] = React.useState<number | null>(null);

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
                            invertedElevated: "#434343",
                        }
                    } : {
                        // Extra props for the dark theme
                        background: {
                            elevated: "#434343",
                            invertedElevated: "#cdcdcd",
                        }
                    })
                },
            }),
        [mode],
    );

    React.useEffect(() => {
        // Only increment in production, not from dev server
        if (import.meta.env.VITE_ENVIRONMENT === 'prod') {
            tryIncrementViewCount();
        }

        // Always fetch current count after a delay to show updated value
        const timeoutId = setTimeout(() => {
            getViewCount().then(count => {
                if (count !== null) {
                    setViewCount(count);
                }
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
      <LocalizationContext.Provider value={toggleLocalizationMode}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateLibInstance={dayjs.utc}
        >
          <ColorModeContext.Provider value={toggleColorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <ResponsiveAppBar />

              <Outlet />

              <ViewCounter count={viewCount} />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </LocalizationProvider>
      </LocalizationContext.Provider>
    );
}

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { vi } from 'vitest';
import ColorModeContext from './context/ColorModeContext';
import createCustomTheme from './styles/CustomTheme';
import enTranslations from './i18n/en.json';
import deTranslations from './i18n/de.json';

// Initialize i18n for tests
i18n.use(initReactI18next).init({
    resources: {
        en: enTranslations,
        de: deTranslations,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

interface AllProvidersProps {
    children: React.ReactNode;
}

const theme = createCustomTheme({
    palette: {
        mode: 'dark',
        background: {
            elevated: '#434343',
            invertedElevated: '#cdcdcd',
        },
    },
});

const mockColorModeContext = {
    toggleColorMode: vi.fn(),
};

function AllProviders({ children }: AllProvidersProps) {
    return (
        <MemoryRouter>
            <I18nextProvider i18n={i18n}>
                <ColorModeContext.Provider value={mockColorModeContext}>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </I18nextProvider>
        </MemoryRouter>
    );
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, mockColorModeContext, i18n };

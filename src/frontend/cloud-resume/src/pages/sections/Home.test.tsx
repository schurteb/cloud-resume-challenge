// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { render, screen } from '../../test-utils';
import Home from './Home';

describe('Home', () => {
    it('renders the home section', () => {
        render(<Home />);

        // Should have a section div
        const section = document.querySelector('.section');
        expect(section).toBeInTheDocument();
    });

    it('displays the greeting text', () => {
        render(<Home />);

        // Should show intro greeting (from i18n - "Welcome!")
        expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    });

    it('displays the name', () => {
        render(<Home />);

        // Should show the name from translations
        expect(screen.getByText(/Benjamin Schurtenberger/i)).toBeInTheDocument();
    });

    it('displays the intro description', () => {
        render(<Home />);

        // Should show "I am a" text (from i18n: IntroDescription)
        expect(screen.getByText(/I am a/i)).toBeInTheDocument();
    });

    it('renders the TypeAnimation component', () => {
        render(<Home />);

        // TypeAnimation renders a span - check for the wrapper
        const typeAnimationWrapper = document.querySelector('span[style*="display: inline-block"]');
        expect(typeAnimationWrapper).toBeInTheDocument();
    });

    it('renders the decorative SVG background', () => {
        render(<Home />);

        // Should have SVG elements for background decoration
        const svgs = document.querySelectorAll('svg');
        expect(svgs.length).toBeGreaterThan(0);
    });

    it('has desktop-only and mobile-only elements', () => {
        render(<Home />);

        // Should have responsive layout elements
        const desktopOnly = document.querySelector('.desktop-only');
        const mobileOnly = document.querySelector('.mobile-only');

        expect(desktopOnly).toBeInTheDocument();
        expect(mobileOnly).toBeInTheDocument();
    });
});

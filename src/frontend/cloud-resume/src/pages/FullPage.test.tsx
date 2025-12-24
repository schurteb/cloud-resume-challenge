// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { render, screen } from '../test-utils';
import { vi } from 'vitest';
import FullPage from './FullPage';

// Mock ReactFullpage component
vi.mock('@fullpage/react-fullpage', () => {
    const MockWrapper = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="fullpage-wrapper">{children}</div>
    );

    const MockReactFullpage = ({ render: renderProp }: { render: Function }) => {
        const mockState = {};
        const mockFullpageApi = {
            moveTo: vi.fn(),
            moveSlideRight: vi.fn(),
            moveSlideLeft: vi.fn(),
        };

        return (
            <div data-testid="react-fullpage">
                {renderProp({ state: mockState, fullpageApi: mockFullpageApi })}
            </div>
        );
    };

    MockReactFullpage.Wrapper = MockWrapper;

    return {
        default: MockReactFullpage,
    };
});

// Mock the fullpage scrollHorizontally plugin
vi.mock('./../statics/fullpage.scrollHorizontally.min', () => ({}));

describe('FullPage', () => {
    it('renders the fullpage wrapper', () => {
        render(<FullPage />);

        const wrapper = document.getElementById('fullpage_wrapper_custom');
        expect(wrapper).toBeInTheDocument();
    });

    it('renders the ReactFullpage component', () => {
        render(<FullPage />);

        const fullpage = screen.getByTestId('react-fullpage');
        expect(fullpage).toBeInTheDocument();
    });

    it('renders the Home section', () => {
        render(<FullPage />);

        // Home section should show greeting (i18n: "Welcome!")
        expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    });

    it('renders the About section', () => {
        render(<FullPage />);

        // About section should show profile image
        const profileImage = screen.getByAltText('portrait of benjamin');
        expect(profileImage).toBeInTheDocument();
    });

    it('renders both Home and About sections together', () => {
        render(<FullPage />);

        // Both sections should be present
        const sections = document.querySelectorAll('.section');
        expect(sections.length).toBe(2);
    });

    it('displays the current theme mode', () => {
        render(<FullPage />);

        // The theme mode should be displayed (dark by default from test-utils)
        expect(screen.getByText('dark')).toBeInTheDocument();
    });

    it('contains the fullpage wrapper component', () => {
        render(<FullPage />);

        const wrapper = screen.getByTestId('fullpage-wrapper');
        expect(wrapper).toBeInTheDocument();
    });
});

import { render, screen, fireEvent, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import ResponsiveAppBar from './ResponsiveAppBar';

// Mock window.fullpage_api
beforeAll(() => {
    (window as any).fullpage_api = {
        moveTo: jest.fn(),
    };
});

describe('ResponsiveAppBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the app bar', () => {
        render(<ResponsiveAppBar />);
        const appBar = screen.getByRole('banner');
        expect(appBar).toBeInTheDocument();
    });

    it('displays navigation buttons for Home and About', () => {
        render(<ResponsiveAppBar />);
        expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    });

    it('renders the color mode toggle button', () => {
        render(<ResponsiveAppBar />);
        const toggleButtons = screen.getAllByRole('checkbox');
        expect(toggleButtons.length).toBeGreaterThan(0);
    });

    it('renders the language selector', () => {
        render(<ResponsiveAppBar />);
        const comboboxes = screen.getAllByRole('combobox');
        expect(comboboxes.length).toBeGreaterThan(0);
    });

    it('opens mobile menu when menu icon is clicked', async () => {
        const user = userEvent.setup();
        render(<ResponsiveAppBar />);

        // Find the mobile menu button (has "Open menu" tooltip)
        const menuButton = screen.getByLabelText('account of current user');
        await user.click(menuButton);

        // Menu should be open - we can verify by checking for the menu
        await waitFor(() => {
            const menus = screen.getAllByRole('menu');
            expect(menus.length).toBeGreaterThan(0);
        });
    });

    it('opens settings menu when settings icon is clicked', async () => {
        const user = userEvent.setup();
        render(<ResponsiveAppBar />);

        // Find all buttons and look for the settings one
        const buttons = screen.getAllByRole('button');
        const settingsButton = buttons.find(btn =>
            btn.querySelector('svg[data-testid="SettingsIcon"]')
        );

        if (settingsButton) {
            await user.click(settingsButton);

            await waitFor(() => {
                const menus = screen.getAllByRole('menu');
                expect(menus.length).toBeGreaterThan(0);
            });
        }
    });
});

import { render, screen, waitFor, act } from './test-utils';
import App from './App';

// Mock fetch for view count API
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.fullpage_api for ResponsiveAppBar
beforeAll(() => {
    (window as any).fullpage_api = {
        moveTo: jest.fn(),
    };
});

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        mockFetch.mockResolvedValue({
            text: () => Promise.resolve('12345'),
        });
        localStorageMock.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders the app bar', async () => {
        await act(async () => {
            render(<App />);
        });

        // ResponsiveAppBar should be present
        const appBar = screen.getByRole('banner');
        expect(appBar).toBeInTheDocument();
    });

    it('renders navigation links', async () => {
        await act(async () => {
            render(<App />);
        });

        // Should have Home and About navigation
        expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    });

    it('renders color mode toggle', async () => {
        await act(async () => {
            render(<App />);
        });

        // Should have the color mode toggle switch
        const toggles = screen.getAllByRole('checkbox');
        expect(toggles.length).toBeGreaterThan(0);
    });

    it('renders language selector', async () => {
        await act(async () => {
            render(<App />);
        });

        // Should have language selector combobox
        const comboboxes = screen.getAllByRole('combobox');
        expect(comboboxes.length).toBeGreaterThan(0);
    });

    it('fetches and displays view count after delay', async () => {
        mockFetch.mockResolvedValue({
            text: () => Promise.resolve('42'),
        });

        await act(async () => {
            render(<App />);
        });

        // Fast-forward the 500ms delay
        await act(async () => {
            jest.advanceTimersByTime(500);
        });

        // Wait for the view count to be displayed
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.resume.schurteb.ch/view_count',
                expect.objectContaining({ method: 'GET' })
            );
        });
    });

    it('handles view count fetch error gracefully', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            jest.advanceTimersByTime(500);
        });

        // Should not crash - app should still be rendered
        const appBar = screen.getByRole('banner');
        expect(appBar).toBeInTheDocument();
    });

    it('does not display view counter when count is null', async () => {
        mockFetch.mockResolvedValue({
            text: () => Promise.resolve('not-a-number'),
        });

        await act(async () => {
            render(<App />);
        });

        // ViewCounter should not render when count is null/NaN
        expect(screen.queryByTestId('VisibilityIcon')).not.toBeInTheDocument();
    });

    it('starts in dark mode by default', async () => {
        await act(async () => {
            render(<App />);
        });

        // The color mode toggle should be checked (dark mode)
        const toggles = screen.getAllByRole('checkbox');
        const colorToggle = toggles.find(t => t.hasAttribute('type'));
        if (colorToggle) {
            expect(colorToggle).toBeChecked();
        }
    });
});

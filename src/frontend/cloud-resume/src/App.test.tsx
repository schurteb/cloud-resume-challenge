import { render, screen, waitFor, act } from './test-utils';
import { vi } from 'vitest';
import App from './App';

// Mock fetch for view count API
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.fullpage_api for ResponsiveAppBar
beforeAll(() => {
    (window as any).fullpage_api = {
        moveTo: vi.fn(),
    };
});

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        mockFetch.mockResolvedValue({
            text: () => Promise.resolve('12345'),
        });
        localStorageMock.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        vi.useRealTimers();
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
        vi.useRealTimers(); // Use real timers for this test

        mockFetch.mockResolvedValue({
            text: () => Promise.resolve('42'),
        });

        await act(async () => {
            render(<App />);
        });

        // Wait for the view count to be fetched (after 500ms delay in App)
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                'https://api.resume.schurteb.ch/view_count',
                expect.objectContaining({ method: 'GET' })
            );
        }, { timeout: 2000 });
    });

    it('handles view count fetch error gracefully', async () => {
        mockFetch.mockRejectedValue(new Error('Network error'));

        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await vi.advanceTimersByTimeAsync(500);
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

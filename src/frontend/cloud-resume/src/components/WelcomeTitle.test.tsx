import { render, screen, waitFor } from '../test-utils';
import WelcomeTitle from './WelcomeTitle';

describe('WelcomeTitle', () => {
    it('renders with default linkText when no prop provided', async () => {
        render(<WelcomeTitle />);

        await waitFor(() => {
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', 'https://resume.schurteb.ch/');
            expect(link).toHaveTextContent('Cloud Resume Challenge');
        });
    });

    it('renders with custom linkText when provided', async () => {
        render(<WelcomeTitle linkText="CustomText" />);

        await waitFor(() => {
            const link = screen.getByRole('link');
            expect(link).toHaveTextContent('CustomText');
        });
    });

    it('renders with default when empty string is provided', async () => {
        render(<WelcomeTitle linkText="" />);

        await waitFor(() => {
            const link = screen.getByRole('link');
            expect(link).toHaveTextContent('Cloud Resume Challenge');
        });
    });

    it('contains Welcome text', () => {
        render(<WelcomeTitle />);
        expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    });
});

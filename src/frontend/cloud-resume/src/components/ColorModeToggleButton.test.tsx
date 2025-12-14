import { render, screen, fireEvent, mockColorModeContext } from '../test-utils';
import { vi } from 'vitest';
import ColorModeToggleButton from './ColorModeToggleButton';

describe('ColorModeToggleButton', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the toggle switch', () => {
        render(<ColorModeToggleButton />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).toBeInTheDocument();
    });

    it('calls toggleColorMode when clicked', () => {
        render(<ColorModeToggleButton />);
        const switchElement = screen.getByRole('checkbox');
        fireEvent.click(switchElement);
        expect(mockColorModeContext.toggleColorMode).toHaveBeenCalledTimes(1);
    });

    it('is checked by default (dark mode)', () => {
        render(<ColorModeToggleButton />);
        const switchElement = screen.getByRole('checkbox');
        expect(switchElement).toBeChecked();
    });
});

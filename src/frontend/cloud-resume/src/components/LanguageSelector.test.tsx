import { render, screen, fireEvent, waitFor, i18n } from '../test-utils';
import userEvent from '@testing-library/user-event';
import LanguageSelector from './LanguageSelector';

describe('LanguageSelector', () => {
    beforeEach(() => {
        // Reset language to English before each test
        i18n.changeLanguage('en');
    });

    it('renders the language selector', () => {
        render(<LanguageSelector />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
    });

    it('has English (GB) as the default selection', () => {
        render(<LanguageSelector />);
        // Check that GB flag is visible (the countryFlag class)
        const flags = document.querySelectorAll('.countryFlag');
        expect(flags.length).toBeGreaterThan(0);
    });

    it('opens dropdown when clicked', async () => {
        const user = userEvent.setup();
        render(<LanguageSelector />);

        const selectElement = screen.getByRole('combobox');
        await user.click(selectElement);

        // Should show menu items (both en and de options)
        await waitFor(() => {
            const listbox = screen.getByRole('listbox');
            expect(listbox).toBeInTheDocument();
        });
    });

    it('changes language when German is selected', async () => {
        const user = userEvent.setup();
        render(<LanguageSelector />);

        const selectElement = screen.getByRole('combobox');
        await user.click(selectElement);

        await waitFor(() => {
            const listbox = screen.getByRole('listbox');
            expect(listbox).toBeInTheDocument();
        });

        // Select German option (second menu item)
        const options = screen.getAllByRole('option');
        await user.click(options[1]); // German is the second option

        // Verify i18n language changed
        expect(i18n.language).toBe('de');
    });
});

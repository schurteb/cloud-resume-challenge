// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { render, screen } from '../../test-utils';
import About from './About';

describe('About', () => {
    it('renders the about section', () => {
        render(<About />);

        // Should have a section div
        const section = document.querySelector('.section');
        expect(section).toBeInTheDocument();
    });

    it('displays the section title', () => {
        render(<About />);

        // Should show "About Me" title (or translated equivalent)
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('displays the profile image', () => {
        render(<About />);

        const profileImage = screen.getByAltText('portrait of benjamin');
        expect(profileImage).toBeInTheDocument();
        expect(profileImage).toHaveAttribute('src', 'profile_pic.jpg');
    });

    it('displays the name in the info table', () => {
        render(<About />);

        // Should show name label and value
        expect(screen.getByText(/Name/i)).toBeInTheDocument();
        expect(screen.getByText(/Benjamin Schurtenberger/i)).toBeInTheDocument();
    });

    it('displays the location information', () => {
        render(<About />);

        // Should show location label
        expect(screen.getByText(/Location/i)).toBeInTheDocument();
    });

    it('displays the email section with FlowCrypt link', () => {
        render(<About />);

        // Should show email label
        expect(screen.getByText(/Email/i)).toBeInTheDocument();

        // Should have FlowCrypt link (text is "Send me an encrypted mail")
        const flowcryptLink = screen.getByRole('link', { name: /Send me an encrypted mail/i });
        expect(flowcryptLink).toBeInTheDocument();
        expect(flowcryptLink).toHaveAttribute('href', 'https://flowcrypt.com/me/benjaminschurtenberger');
        expect(flowcryptLink).toHaveAttribute('target', '_blank');
    });

    it('displays OpenPGP key links', () => {
        render(<About />);

        // Should have view key link
        const viewKeyLink = screen.getByRole('link', { name: /view/i });
        expect(viewKeyLink).toBeInTheDocument();
        expect(viewKeyLink).toHaveAttribute('href', './openpgp-public-key.txt');

        // Should have download key link
        const downloadKeyLink = screen.getByRole('link', { name: /download/i });
        expect(downloadKeyLink).toBeInTheDocument();
        expect(downloadKeyLink).toHaveAttribute('href', './openpgp-public-key.asc');
    });

    it('renders information table with correct structure', () => {
        render(<About />);

        // Should have a table
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Should have multiple rows
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBeGreaterThanOrEqual(4); // Name, Location, Email, OpenPGP Key
    });

    it('has external links with proper security attributes', () => {
        render(<About />);

        // All external links should have rel="noreferrer" for security
        const externalLinks = screen.getAllByRole('link');
        externalLinks.forEach(link => {
            if (link.getAttribute('target') === '_blank') {
                expect(link).toHaveAttribute('rel', 'noreferrer');
            }
        });
    });
});

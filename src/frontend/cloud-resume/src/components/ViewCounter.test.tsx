// SPDX-FileCopyrightText: 2022 Benjamin Schurtenberger
//
// SPDX-License-Identifier: MIT

import { render, screen } from '../test-utils';
import ViewCounter from './ViewCounter';

describe('ViewCounter', () => {
    it('renders nothing when count is null', () => {
        const { container } = render(<ViewCounter count={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders the view count when count is provided', () => {
        render(<ViewCounter count={1234} />);
        expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders zero count', () => {
        render(<ViewCounter count={0} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('formats large numbers with locale separators', () => {
        render(<ViewCounter count={1000000} />);
        expect(screen.getByText('1,000,000')).toBeInTheDocument();
    });

    it('displays the visibility icon', () => {
        render(<ViewCounter count={100} />);
        expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument();
    });
});

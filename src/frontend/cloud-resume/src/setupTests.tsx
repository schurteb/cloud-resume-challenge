// jest-dom adds custom matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock react-type-animation to prevent flaky tests from requestAnimationFrame
// The library's internal async animation loop can cause "Unhandled Rejection" errors
// when tests complete before animations finish, especially in CI environments
vi.mock('react-type-animation', () => ({
  TypeAnimation: ({ sequence, wrapper = 'span', style }: {
    sequence: (string | number)[];
    wrapper?: string;
    style?: React.CSSProperties;
  }) => {
    // Render the first string from the sequence as static text
    const firstText = sequence.find((item) => typeof item === 'string') || '';
    return React.createElement(wrapper, { style }, firstText);
  },
}));

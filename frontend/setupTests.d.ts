import '@testing-library/jest-dom';

declare module '@testing-library/jest-dom' {
  // Extending jest matchers
  interface CustomMatchers<R = unknown> {
    toBeInTheDocument(): R;
    // Add more matchers if needed
  }
}
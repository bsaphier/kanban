import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: {
    randomUUID: () => String(Math.random()),
  },
});

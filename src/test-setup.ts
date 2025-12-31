import '@testing-library/jest-dom'

// Mock CSS imports
const mockCSS = {
  __esModule: true,
  default: {},
}

// Mock CSS modules
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock navigator properties
Object.defineProperty(navigator, 'hardwareConcurrency', {
  writable: true,
  value: 4,
})

// Mock CSS custom properties
Object.defineProperty(document.documentElement, 'style', {
  value: {
    setProperty: () => {},
    getPropertyValue: () => '',
  },
})

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
  }),
})
export const theme = {
  colors: {
    // Brand (slightly softened blue to work well on dark)
    primary: '#60A5FA',
    primaryHover: '#3B82F6',
    primaryActive: '#2563EB',
    primaryMuted: '#1E3A8A',

    secondary: '#A78BFA',
    secondaryHover: '#8B5CF6',
    secondaryActive: '#7C3AED',
    secondaryMuted: '#3B166E',

    // Backgrounds
    background: '#0B1120',
    surface: '#141A2A',
    surfaceHover: '#1C2333',
    surfaceActive: '#252E40',

    // Text
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    textInverse: '#0F172A',

    // Borders
    border: '#334155',
    borderStrong: '#475569',

    // Semantic
    success: '#34D399',
    successMuted: '#064E3B',
    warning: '#FBBF24',
    warningMuted: '#451A03',
    error: '#F87171',
    errorMuted: '#450A0A',
    info: '#60A5FA',
    infoMuted: '#1E3A8A',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },

  typography: {
    fontFamily: {
      base: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", Monaco, Inconsolata, "Roboto Mono", "Courier New", monospace',
      symbols: 'var(--font-noto-sans-symbols), "Noto Sans Symbols"',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '2.5rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  radii: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    round: '9999px',
  },

  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    tooltip: 600,
    toast: 700,
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
} as const;

export type Theme = typeof theme;

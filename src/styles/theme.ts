export const theme = {
  colors: {
    // Brand
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryActive: '#1E40AF',
    primaryMuted: '#DBEAFE',

    secondary: '#7C3AED',
    secondaryHover: '#6D28D9',
    secondaryActive: '#5B21B6',
    secondaryMuted: '#EDE9FE',

    // Backgrounds
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceHover: '#F1F5F9',
    surfaceActive: '#E2E8F0',

    // Text
    text: '#0F172A',
    textMuted: '#475569',
    textInverse: '#FFFFFF',

    // Borders
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',

    // Semantic
    success: '#10B981',
    successMuted: '#D1FAE5',
    warning: '#F59E0B',
    warningMuted: '#FEF3C7',
    error: '#EF4444',
    errorMuted: '#FEE2E2',
    info: '#3B82F6',
    infoMuted: '#DBEAFE',
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

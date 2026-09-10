import type { Theme } from '../types';

export const theme = {
  colours: {
    background: '#0757C8',
    surface: '#0A63D8',
    text: '#F7FBFF',
    muted: '#C9E1FF',
    border: '#ffffff2e',

    primary: '#F7FBFF',
    onPrimary: '#0757C8',

    accent: '#58E7FF',
    onAccent: '#003B7A',

    feature: '#0347A8',
    onFeature: '#F7FBFF',
  },

  fonts: {
    body: 'Arial, Helvetica, sans-serif',
    heading: '"Bodoni Moda", "Didot", "Bodoni 72", Georgia, serif',
    accent: '"Bodoni Moda", "Didot", "Bodoni 72", Georgia, serif',
  },

  shape: {
    radius: '1.25rem',
    buttonRadius: '4rem',
    contentWidth: '82rem',
  },
} satisfies Theme;
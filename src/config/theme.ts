import type { Theme } from '../types';

export const theme = {
  colours: {
    background: '#0B0C10',
    surface: '#191B23',
    text: '#FFFFFF',
    muted: '#BFC1CF',
    border: '#414452',

    primary: '#EAFF5D',
    onPrimary: '#12130C',

    accent: '#EAFF5D',
    onAccent: '#12130C',

    feature: '#7321DE',
    onFeature: '#FFFFFF',
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

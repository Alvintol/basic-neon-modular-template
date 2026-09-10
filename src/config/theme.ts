import type { Theme } from '../types';

// Set brand colours, fonts, corner shapes and maximum page width here.
export const theme = {
  "colours": {
    "background": "#0b0c10",
    "surface": "#191b23",
    "text": "#ffffff",
    "muted": "#bfc1cf",
    "border": "#414452",
    "primary": "#eaff5d",
    "onPrimary": "#12130c",
    "accent": "#eaff5d",
    "onAccent": "#12130c",
    "feature": "#7321de",
    "onFeature": "#ffffff"
  },
  "fonts": {
    "body": "Arial, sans-serif",
    "heading": "\"Arial Black\", Arial, sans-serif",
    "accent": "Georgia, serif"
  },
  "shape": {
    "radius": "1rem",
    "buttonRadius": "4rem",
    "contentWidth": "78rem"
  }
} satisfies Theme;

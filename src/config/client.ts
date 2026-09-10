import type { ClientConfig } from '../types';

// Change this file for each client. Section order is page order.
export const client = {
  "demo": {
    "enabled": true,
    "label": "BASIC 03 / NEON MODULAR",
    "note": "Created by Alvin · Fictional business"
  },
  "business": {
    "name": "TRUEFRAME",
    "monogram": "▰",
    "location": "Calgary, Alberta"
  },
  "seo": {
    "title": "TRUEFRAME — Neon modular demo",
    "description": "Clear plans. Careful work. A better place to live.",
    "language": "en-CA",
    "indexable": false
  },
  "ui": {
    "skipToContent": "Skip to content",
    "menuOpen": "Menu",
    "menuClose": "Close",
    "navigationLabel": "Main navigation",
    "backToTop": "Back to top"
  },
  "footer": {
    "note": "Clear plans. Careful work. A better place to live.",
    "copyright": "TRUEFRAME is a fictional business. Photography is for demonstration only.",
    "links": []
  },
  "headerAction": {
    "label": "Start a project",
    "href": "#contact"
  },
  "hero": {
    "eyebrow": "RENOVATIONS WITHOUT THE RUNAROUND",
    "title": [
      "NEXT",
      "LEVEL",
      "HOME."
    ],
    "description": "Clear plans, skilled trades, and one team accountable from start to finish.",
    "primaryAction": {
      "label": "Start a project",
      "href": "#contact"
    },
    "image": {
      "src": "images/trueframe.webp",
      "alt": "Modern kitchen with dark cabinetry, white walls, wooden floors and green plants.",
      "width": 1350,
      "height": 1800,
      "position": "50% 65%"
    },
    "imageCaption": "KITCHENS / SPACES THAT WORK",
    "locationLabel": "CALGARY, ALBERTA",
    "highlights": [
      {
        "title": "Clear quotes",
        "description": "Know the scope before work starts."
      },
      {
        "title": "One point of contact",
        "description": "Know who to call."
      },
      {
        "title": "Careful handover",
        "description": "The details, properly finished."
      }
    ]
  },
  "sections": [
    {
      "type": "services",
      "id": "services",
      "title": "Make more of the home you have.",
      "eyebrow": "WHAT WE BUILD",
      "navLabel": "Services",
      "items": [
        {
          "id": "kitchens",
          "title": "Kitchens",
          "description": "Thoughtful layouts, practical storage, and a finish built around the way you live."
        },
        {
          "id": "bathrooms",
          "title": "Bathrooms",
          "description": "A fresh start for an everyday space, from the layout to the last fixture."
        },
        {
          "id": "interiors",
          "title": "Interior renovations",
          "description": "Bring tired rooms back into use with a clear scope and a coordinated plan."
        }
      ]
    },
    {
      "type": "showcase",
      "id": "photos",
      "title": "Good spaces start with a clear plan.",
      "eyebrow": "PROJECT DIRECTIONS",
      "navLabel": "Work",
      "description": "Sample photography shown for this demo.",
      "layout": "grid",
      "aspect": "landscape",
      "labels": {
        "previous": "Previous photos",
        "next": "Next photos",
        "show": "Show",
        "instructions": "Swipe, scroll, or use the arrows to explore.",
        "carousel": "carousel"
      },
      "items": [
        {
          "id": "1",
          "image": {
            "src": "images/trueframe.webp",
            "alt": "Matte charcoal kitchen cabinetry with greenery and pale wood flooring.",
            "width": 1350,
            "height": 1800,
            "position": "50% 65%"
          },
          "title": "A sharper kitchen.",
          "category": "Kitchen renovation",
          "description": "Storage, flow, and finishes considered together."
        },
        {
          "id": "2",
          "image": {
            "src": "images/trueframe-gallery.webp",
            "alt": "Bright kitchen with pale cabinets, wooden stools and a brass faucet.",
            "width": 1200,
            "height": 1800,
            "position": "50% 50%"
          },
          "title": "A place to gather.",
          "category": "Open living",
          "description": "More room for the things you do every day."
        },
        {
          "id": "3",
          "image": {
            "src": "images/trueframe-gallery-2.webp",
            "alt": "White cabinetry and a marble island in a modern kitchen.",
            "width": 1800,
            "height": 1079,
            "position": "50% 50%"
          },
          "title": "Details that fit.",
          "category": "Cabinetry & finishes",
          "description": "A cohesive finish, right down to the hardware."
        }
      ]
    },
    {
      "type": "process",
      "id": "process",
      "title": "No mystery between the idea and the finish.",
      "eyebrow": "A SIMPLE PROCESS",
      "navLabel": "Process",
      "steps": [
        {
          "title": "Talk it through",
          "description": "We discuss your space, goals, priorities, and the budget you have in mind."
        },
        {
          "title": "Put it in writing",
          "description": "You receive an agreed scope and schedule before work begins. Changes are discussed first."
        },
        {
          "title": "Build, check, hand over",
          "description": "We keep you updated and complete a final walkthrough together."
        }
      ]
    },
    {
      "type": "about",
      "id": "about",
      "title": "Built around everyday living.",
      "eyebrow": "THE TRUEFRAME APPROACH",
      "body": [
        "A renovation is a big part of your home life. We keep the process understandable, with a clear plan, regular conversations, and one person to call.",
        "We focus on practical spaces and thoughtful details. The aim is a home that works better for you, long after the work is finished."
      ]
    },
    {
      "type": "contact",
      "id": "contact",
      "title": "LET’S BUILD YOUR NEXT CHAPTER.",
      "eyebrow": "LET’S TALK",
      "navLabel": "Contact",
      "description": "Tell us about the space, the changes you’re considering, and your ideal timing.",
      "method": {
        "mode": "demo",
        "submitLabel": "Preview enquiry",
        "help": "Demo form — nothing is sent or stored.",
        "success": "That’s how an enquiry would begin. This is a demo, so your message has not been sent."
      },
      "details": [
        {
          "label": "Service area",
          "value": "Calgary and nearby communities"
        },
        {
          "label": "Hours",
          "value": "Monday–Friday · By appointment"
        }
      ],
      "fields": {
        "name": "Your name",
        "email": "Email address",
        "service": "What can we help with?",
        "message": "Tell us a little more",
        "servicePlaceholder": "Choose a service",
        "services": [
          "Kitchen renovation",
          "Bathroom renovation",
          "Interior renovation"
        ]
      }
    }
  ]
} satisfies ClientConfig;

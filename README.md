# Neon modular — basic React + TypeScript template

Demo business: **Trueframe**. Starting ideas: contractors, trades, renovation and creative services.

Purple and lime on charcoal, modular blocks and a photo grid with one large feature tile.

This is one of four independent client website templates for Created by Alvin. All four photo-showcase layouts are included; this demo defaults to `grid`. All business-specific content is configurable, so the sample industry is a starting point rather than a limitation.

## Run locally

Use Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

```bash
npm run check
npm run check:config
npm run build
npm run preview
```

The build type-checks TypeScript, bundles the React application, validates local image references and section links, and prerenders the configured page into `dist/index.html`. The complete page text is available before JavaScript loads. Navigation, forms and carousels hydrate in the browser. There is no server to run in production.

## Set up a client

1. Make a copy of this template for the client. Keep the original demo as your starting point.
2. Edit `src/config/client.ts`: name, text, page title/description, navigation, calls to action, services, photo items, contact details and footer.
3. Put the client's images in `public/images/`. Set the corresponding `src`, `alt`, `width`, `height` and optional `position` fields. Paths begin with `images/` without a leading slash. The image file extension must match the actual file.
4. Edit `src/config/theme.ts`: colours, font stacks, radii and content width. Every template uses the same token names. The `onPrimary`, `onAccent` and `onFeature` colours control the text on those backgrounds. Check contrast after changing them.
5. Set up contact behaviour (below). Then set `demo.enabled` to `false`, set `seo.title`, `seo.description`, the client's full HTTPS `seo.url`, and `seo.indexable` to `true` when ready for search engines. Clear the fictional-business footer copy and sample-image descriptions.
6. Run `npm run check:config` and `npm run build`, then deploy `dist/` through your hosting provider. Test the deployed contact path with the client.

All data is public website content. Keep private keys and client secrets out of these files.

## Where changes go

| Change | File or field |
| --- | --- |
| Client copy and business details | `src/config/client.ts` |
| Brand colours and typography | `src/config/theme.ts` |
| Images and logo files | `public/images/` |
| Header logo | `client.business.logo` (optional image object; text remains as the wordmark) |
| Hero photo and its crop | `client.hero.image` and `position` |
| Navigation | A section's optional `navLabel` |
| Page sections and order | `client.sections` array |
| Photo gallery style | A showcase section's `layout` |
| Photo content and captions | A showcase section's `items` |
| Template-specific composition | `src/layout.css` and `src/sections/Hero.tsx` |
| Shared section and component styling | `src/styles.css` |
| Data contracts | `src/types.ts` |
| Photo credits | `ASSET-CREDITS.md` |

Each folder is a standalone project with its own dependencies and lockfile. It does not import code or assets from another template. Reusable components have been copied into each repo so any client project can develop independently.

## Add, remove and reorder sections

The `client.sections` array is the source of page order. Move an entry to reorder it or remove it to hide the section. Omit `navLabel` to keep a section off the menu. Available types are `services`, `showcase`, `about`, `process`, `faq` and `contact`.

Use a unique lowercase `id` for every section. Buttons link to these IDs; update affected button `href` values when removing or renaming a target. The build catches broken internal links. Use multiple showcase sections with unique IDs to show, for example, staff and completed projects on the same page.

The hero image and logo are optional. Removing `hero.image` switches the hero to a text layout. The interface uses fallback wordmark text when `business.logo` is absent.

## Four interchangeable photo presentations

| `layout` | Behaviour | Useful for |
| --- | --- | --- |
| `filmstrip` | Wide cards, a visible glimpse of the next photo, native touch scrolling and previous/next controls | Rooms, project photos, services |
| `spotlight` | One featured slide with a caption panel, thumbnail selection, arrows and position count | Products, featured work, detailed services |
| `grid` | Static modular grid with one larger tile; stacks on mobile | Mixed projects, portfolio, product ranges |
| `portraits` | Rounded portrait cards with captions and horizontal scrolling | Staff, pets, products, personal services |

Set `aspect` to `landscape`, `portrait` or `square`. It controls the image crop; the feature tile in a modular grid may stretch to align with its neighbouring tiles. `image.position` fine-tunes the crop without editing the source file, for example `"65% 50%"` to favour the right side of a portrait.

All three carousels support native touch scrolling, keyboard arrows/Home/End when the track has focus, labelled buttons and reduced-motion preferences. There is no autoplay, endless cloning, external carousel dependency or fixed item count. A single image works too; an empty showcase must be removed from the configuration. The grid has no carousel controls.

A photo item is deliberately independent of business type. This is the shape to use for a staff member once you have added their real photo:

```ts
{
  id: 'alex',
  image: {
    src: 'images/alex.webp',
    alt: 'Alex, the lead groomer, smiling in the studio',
    width: 1200,
    height: 1600,
    position: '50% 35%',
  },
  title: 'Alex',
  category: 'Lead groomer',
  description: 'A short introduction in the client’s own words.',
  action: { label: 'Ask about an appointment', href: '#contact' },
}
```

For products, use the product name as `title`, the product category or price as `category`, and a suitable enquiry or HTTPS purchase link as `action`. For services, use the same fields for a service image, description and enquiry link. The optional `action` is omitted when no link is needed. This is a presentation layer; it does not implement a shop, checkout, staff database or booking system.

## Contact behaviour

The sample form is in `demo` mode. It validates required fields and displays a clear demonstration message. It does not send, save or transmit enquiries.

For the simplest client launch, use `email` mode:

```ts
method: {
  mode: 'email',
  email: 'hello@the-client-domain.ca',
  subject: 'Website enquiry',
  submitLabel: 'Create email enquiry',
  help: 'Opens your email app. Review and send the message there.',
  success: 'Your email app was requested. Send the message there to complete your enquiry. If it did not open, email us directly.',
}
```

This creates a `mailto:` draft. It requires a configured email application and cannot confirm delivery. Add a direct email link and phone link to `contact.details` as alternatives. Nothing is stored on the website.

To point visitors to an existing booking or enquiry service, use `link` mode:

```ts
method: {
  mode: 'link',
  url: 'https://the-client-booking-url.example',
  label: 'Book an appointment',
  help: 'Choose an available time on our booking page.',
}
```

Replace the example URL with the real booking URL. This mode shows a working external link in place of the demo form. An actual hosted form submission endpoint can be added later in `src/sections/Contact.tsx`; there is no hidden backend or API integration.

## Create the GitHub template repository

The portable download intentionally excludes `.openai/hosting.json`, `.git`, `node_modules` and `dist`. It carries no demo Site identity or credentials. Create an empty GitHub repository with this folder's name, then inside the extracted folder run:

```bash
git init -b main
git add .
git commit -m "Initial basic website template"
git remote add origin YOUR_EMPTY_GITHUB_REPOSITORY_URL
git push -u origin main
```

In GitHub repository settings, enable **Template repository**. Use **Use this template** for each new client so the demo stays separate and client changes do not affect other sites. If you copy an existing Sites checkout rather than using the portable download, omit its `.git` and `.openai` folders when creating the new client project.

There are no deployment workflows in this template. A local code change does not update a live site until you push to the branch your hosting provider deploys and that deployment succeeds. Configure the host's build command as `npm run build` and output directory as `dist`. The Vite base is relative, so assets also work under a subdirectory. Install/build for each client after editing the content; a rebuild updates both HTML metadata and the hydrated page.

## Basic now, premium later

This is a complete single-page starter: responsive layout, service information, photos, a simple contact path, semantic markup, mobile menu and small interactions. The original visual concepts are retained without adding an application backend.

Premium work is a separate next phase. The section contracts can support richer project detail pages, booking integrations, filtering, lightboxes, advanced transitions, and additional page layouts as those are scoped. None is presented as implemented here.

## Checks and references

`npm run check:config` exercises client-name and colour changes, all available photo layouts, one-image cases, optional hero images, section removal/reordering, broken links and contact modes. `npm run build` verifies types and all active local image paths. These are source/render checks; they do not replace browser and device testing before a client launch.

The four demo colour themes were checked for readable text/background, muted text/surface, primary button and feature-panel text contrast. Check new branding after changing colours, and review mobile/desktop layouts with the client's real copy and photos.

Carousel inspiration: [Dribbble carousel collection](https://dribbble.com/search/carousel). These components are original implementations; no Dribbble artwork or source code is included. Technical references: [Vite guide](https://vite.dev/guide/) and [React with TypeScript](https://react.dev/learn/typescript). Local sample image credits and source licence links are in `ASSET-CREDITS.md`.

# Rizal in Dapitan: Interactive Historical Film Review

An immersive web experience that reviews *Rizal in Dapitan (1997)* through historical analysis, cinematic critique, and interactive storytelling.

Built with `Next.js`, `React`, `TypeScript`, `Framer Motion`, and `React Three Fiber`, this project turns a traditional film review into a portfolio-ready product experience with motion design, responsive layouts, structured long-form content, and a custom interactive comparison section.

## Why This Project Stands Out

This is not a static school-style article site. It is a designed, front-end-driven editorial experience that demonstrates:

- Strong visual direction and UI craft
- Responsive product thinking across desktop and mobile
- Interactive storytelling with layered motion and 3D presentation
- Clean component-based architecture in a modern React codebase
- The ability to turn research-heavy content into an engaging digital experience

For recruiters and hiring teams, this project shows both design sensitivity and engineering execution.

## What The Experience Includes

- A cinematic hero section with animated depth, lighting, and scroll-based motion
- Structured long-form review sections for introduction, summary, analysis, reflection, conclusion, and references
- A dedicated "Film vs History" interactive experience
- Separate mobile and desktop interaction models for better usability by device
- A stylized conclusion verdict section with a custom Likert-style rating monument
- Markdown-driven content rendering for easy maintenance and content updates
- Smooth reveal animations and polished transitions throughout the page

## Key Technical Highlights

### 1. Content-Driven Rendering

The written review content is stored in Markdown under [`src/content`](/Users/anjelobenedictarnaez/Documents/rizal-film-review/src/content) and transformed into HTML at runtime using `gray-matter`, `remark`, and `remark-html`.

This keeps editorial content separate from presentation logic and makes the project easier to scale or repurpose.

### 2. Purpose-Built Responsive UX

The historical comparison section uses different interaction models depending on screen size:

- Desktop presents a scene-first, immersive exploration flow
- Mobile switches to a clearer tap-based card and detail view

That decision avoids forcing a complex desktop interaction onto small screens and reflects product-level responsiveness, not just CSS breakpoints.

### 3. Motion As Communication

Animation is used to support hierarchy, focus, and atmosphere rather than decoration alone. The project uses `Framer Motion` for:

- hero entrance and scroll movement
- staggered reveals
- section transitions
- focus-state changes in the comparison experience
- rating and verdict presentation

### 4. 3D and Spatial Storytelling

The project incorporates `React Three Fiber`, `@react-three/drei`, and `three` to support interactive visual storytelling in the analysis and Likert-inspired conclusion sections.

This helps transform historical commentary into something more experiential and memorable.

## Recruiter Snapshot

### Role This Project Fits

This project is especially relevant for roles in:

- Frontend Engineering
- Creative Frontend Development
- UI Engineering
- Product-Focused React Development
- Interactive Web Experience Development

### Skills Demonstrated

- React and Next.js application structure
- TypeScript-based component development
- Responsive UI architecture
- Motion design implementation
- 3D web integration
- Content modeling and rendering
- Information hierarchy and visual communication
- Accessibility-aware interaction patterns

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Framer Motion`
- `React Three Fiber`
- `@react-three/drei`
- `Three.js`
- `Tailwind CSS`
- `Biome`
- `Remark` + `gray-matter`

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Hero.tsx
    Navbar.tsx
    Section.tsx
    conclusion-rating/
    dapitan-exhibit/
    likert/
  content/
    introduction.md
    summary.md
    analysis.md
    class-discussion.md
    reflection.md
    conclusion.md
  data/
  lib/
  types/
```

## Notable Architecture Decisions

- Content is separated from UI so the review can be edited without touching component logic.
- The page is broken into reusable presentation and interaction components rather than one large monolith.
- Mobile and desktop experiences are intentionally split in the `dapitan-exhibit` flow to preserve usability and clarity.
- Motion and 3D visuals are isolated into focused components to keep the main page composition readable.

## Running The Project Locally

### Prerequisites

- `Node.js 18+`
- `npm`

### Installation

```bash
npm install
```

### Start The Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

## Build Status

The project builds successfully in production mode with:

```bash
npm run build
```

## What I Would Improve Next

If this project were taken further, the next high-value improvements would be:

- add a live demo link and visual preview assets to the README
- expand accessibility testing for keyboard and reduced-motion flows
- add component-level tests for interactive sections
- optimize and document 3D performance budgets
- introduce CMS-backed content editing for non-technical updates

## Portfolio Framing

This project represents the kind of work I enjoy most: research-informed interfaces, thoughtful motion, responsive design, and front-end systems that make content feel alive.

It is a good example of how I approach web development when the goal is not just to make something functional, but to make it feel intentional, polished, and memorable.

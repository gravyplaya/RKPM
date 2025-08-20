# GEMINI Analysis

## Project Overview

This is a [Next.js](https://nextjs.org/) project that uses [Payload CMS](https://payloadcms.com/) as a headless CMS. The project is configured to use [PostgreSQL](https://www.postgresql.org/) as the database and [Tailwind CSS](https://tailwindcss.com/) for styling. The project is deployed using [Payload Cloud](https://payloadcms.com/cloud).

The project is structured as a monorepo with the Next.js frontend and Payload CMS backend in the same project. The `src/app/(site)` directory contains the Next.js pages for the website, and the `src/app/(payload)` directory contains the Payload admin UI.

The project has two collections: `Users` and `Media`. The `Users` collection is used for authentication and the `Media` collection is used for storing images and other media.

## Building and Running

To build and run the project, you can use the following commands:

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build the project
pnpm build

# Start the production server
pnpm start
```

## Development Conventions

The project uses [TypeScript](https://www.typescriptlang.org/) for static typing. The code is formatted using [Prettier](https://prettier.io/) and linted using [ESLint](https://eslint.org/).

The project uses [CSS Modules](https://github.com/css-modules/css-modules) for styling. The styles are located in the `src/app/(site)/style` directory.

The project uses [React Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components) and [React Client Components](https://nextjs.org/docs/getting-started/react-essentials#client-components). The components are located in the `src/app/(site)/components` directory.

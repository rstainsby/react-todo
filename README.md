# Yes, another ToDo app

The creatively named react-todo project is a recreation of the [todoist](todoist.com) web app.

This project exists solely to allow me to refresh my skillset with a modern React stack, having worked primarily with Vue/Nuxt for a couple of years.

## Key Decisions
The current phase of this project has been built without a meta-framework e.g Next.js as I believe it would be overkill for a project of this size. Plus, I believe in prinicples-first learning - that learning how to build without a tool before learning how to build with it develops a far greater appreciation and understanding for that too - and the main purpose of this project is to learn!

To make this experience as realistic as possible, I have opted to use all of the tools that I would expect to find in a production codebase. This includes:
- Code linting & formatting
- Unit tests
- End-to-end test

## Roadmap

I intend to expand this project to recreate the core functionality of the [todoist](todoist.com) app.

- Inbox page ✅
- Today page
- Global Search
- Build custom server to handle requests (currently uses [DummyJson API](https://dummyjson.com/docs/todos))

## The stack

This app is built using TypeScript along with these wonderful packages:

🏗️ Framework: [React 18](https://react.dev/blog/2022/03/29/react-v18)
📡 Routing & Request Handling: [TanStack (Router & Query)](https://tanstack.com/)
🎨 Styles: [Tailwind](https://tailwindcss.com/)
🖼️ UI Library: [Shadcn](🧪)
🧪 Unit Testing: [Vitest](https://vitest.dev/) (with HappyDom)
🧪 End-to-end Testing: [Playwright](https://playwright.dev/)
🔨 Build Tool: [Vite](https://vite.dev/)
🔍 Linting: [ESLint](https://eslint.org/)
👨‍🎨 Formatting: [Prettier](https://prettier.io/)

## Getting started

If for some reason, you want to run this app locally, follow the steps below.

1. Clone or fork this repo: `git clone https://github.com/rstainsby/react-todo`
2. `cd` into the project directory and run `pnpm install`
3. Once all dependencies are installed run `npm run dev`
4. Open `http://localhost:5173` in your browser

## Terminal commands

### Serve the site locally
```bash
npm run dev
```

### Build a production version of the site
```bash
npm run build
```

### Run unit tests
```bash
npm run test
```

### Run linter
```bash
npm run lint
```

#### To auto-fix errors
```bash
npm run lint:fix
```

### Run code formatter
```bash
npm run format
```

### Generate a test coverage report
```bash
npm run coverage
```
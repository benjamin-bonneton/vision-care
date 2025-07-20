
# Vision Care

Vision Care is a modern web application designed to help users maintain healthy screen habits and reduce eye strain. Built with React and Vite, it provides features such as break reminders and session history tracking.

## Features

- **Break Reminders:** Get notified when it's time to take a break from the screen.
- **Session History:** Track your work and break sessions over time.
- **Statistics:** Visualize your productivity and break patterns.
- **Modern UI:** Clean, responsive interface with accessible controls.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/benjamin-bonneton/vision-care.git
   cd vision-care
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
vision-care/
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Images, fonts, icons, CSS
│   ├── components/        # Reusable React components
│   ├── pages/             # Page-level components
│   ├── services/          # Business logic and utilities
│   └── types/             # TypeScript type definitions
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)

---

Feel free to contribute or open issues to help improve Vision Care!

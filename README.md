# EAN Calculator 🤿

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://ean.millibar.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A professional **Enriched Air Nitrox (EAN) calculator** designed for certified Nitrox divers. This web application provides comprehensive gas calculations and dive planning tools to ensure safe diving practices with enriched air mixtures.

## 🌊 Live Application

**🔗 [https://ean.millibar.io](https://ean.millibar.io)**

## ✨ Features

### 🧮 Core Calculators
- **MOD Calculator** - Maximum Operating Depth calculation based on partial pressure limits
- **Best Mix Calculator** - Optimal Nitrox mix determination for planned maximum depth
- **EAD Calculator** - Equivalent Air Depth calculation for decompression planning
- **Dive Planner** - Comprehensive dive planning with gas calculations

### 📚 Resources
- Safety guidelines and diving terminology
- Nitrox diving best practices
- Educational content for certified divers

### 🎨 User Experience
- Responsive design with light/dark theme support
- Intuitive tabbed interface, mobile-optimised for on-site dive planning
- Real-time calculations — results update as you type
- Share your dive plan via native share sheet or clipboard copy

### 📦 Calculations Library

All formulas live in `lib/ean-calculations.ts` — a pure TypeScript module with zero framework dependencies. It can be used independently in native mobile apps or distributed as an npm package. See the module for exported functions and types.

## 🚀 Technology Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router (layout, page, sitemap)
├── components/
│   ├── ui/                 # Radix-based primitive components
│   ├── mod-calculator.tsx
│   ├── best-mix-calculator.tsx
│   ├── ead-calculator.tsx
│   ├── dive-planner.tsx
│   └── resources.tsx
├── lib/
│   ├── ean-calculations.ts # Pure TS calculations library (framework-free)
│   └── utils.ts            # Tailwind class merge utility
└── public/                 # Static assets (OG image, favicon, robots.txt)
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/LeandroBerlin/ean-calc.git
   cd ean-calc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## ⚠️ Safety Notice

**Important**: This calculator is designed for **certified Nitrox divers only**. 

- Always verify calculations independently
- Follow safe diving practices and certification guidelines
- The application is provided 'as is' without warranty
- Users are responsible for validating all calculations

## 🤝 Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on reporting bugs, submitting pull requests, and the special requirements for changes to diving calculations.

## 📄 License

MIT — see [LICENSE](LICENSE) for details. By contributing you agree your changes will be released under the same terms.

## 🔗 Links

- **Live Application**: [https://ean.millibar.io](https://ean.millibar.io)
- **Millibar Home**: [https://millibar.io](https://millibar.io)
- **Terms of Service**: [https://app.millibar.io/terms](https://app.millibar.io/terms)
- **Privacy Policy**: [https://app.millibar.io/privacy](https://app.millibar.io/privacy)

---

**Built with ❤️ for the diving community**

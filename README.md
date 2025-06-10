# EAN Calculator 🤿

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://ean.millibar.io/)

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
- Modern, responsive design with dark gradient theme
- Intuitive tabbed interface
- Mobile-optimized for dive planning on-the-go
- Professional UI with Radix UI components
- Accessibility-focused design

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
├── app/                           # Next.js App Router
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main application page
│   └── sitemap.ts                 # Dynamic sitemap generation
├── components/                    # React components
│   ├── ui/                        # Reusable UI components (Radix-based)
│   ├── best-mix-calculator.tsx
│   ├── dive-planner.tsx
│   ├── ead-calculator.tsx
│   ├── mod-calculator.tsx
│   └── resources.tsx
├── lib/                           # Utilities and helpers
│   └── utils.ts
├── public/                        # Static assets
│   ├── og-image.jpg               # OpenGraph image
│   └── robots.txt                 # SEO robots file
└── styles/                        # Additional styles
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ean-calc.git
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

## 📱 SEO & Social Media

The application includes comprehensive SEO optimization:
- **OpenGraph tags** for social media sharing
- **Twitter Card** support
- **Structured data** (JSON-LD) for search engines
- **Sitemap** generation
- **Robots.txt** for crawler guidance
- **Mobile-optimized** meta tags

## ⚠️ Safety Notice

**Important**: This calculator is designed for **certified Nitrox divers only**. 

- Always verify calculations independently
- Follow safe diving practices and certification guidelines
- The application is provided 'as is' without warranty
- Users are responsible for validating all calculations

## 🤝 Contributing

We welcome contributions to the EAN Calculator! 

### How to Contribute

#### 🐛 Reporting Bugs
- Use the [GitHub Issues](https://github.com/your-username/ean-calc/issues) to report bugs
- Check if the issue already exists before creating a new one
- Include detailed steps to reproduce the issue
- Provide information about your browser and operating system

#### 💡 Suggesting Features
- Open a [GitHub Issue](https://github.com/your-username/ean-calc/issues) with the "enhancement" label
- Clearly describe the feature and its benefits for divers
- Consider safety implications for diving calculations

#### 🔧 Code Contributions

**Step 1: Fork & Clone**
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/ean-calc.git
cd ean-calc
```

**Step 2: Set up the development environment**
```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

**Step 3: Create a feature branch**
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Step 4: Make your changes**
- Write clean, well-documented code
- Follow the existing code style and conventions
- Add comments for complex diving calculations
- Ensure accessibility standards are maintained

**Step 5: Test your changes**
```bash
# Run the linter
pnpm lint

# Build the project to check for errors
pnpm build

# Test the application thoroughly
pnpm dev
```

**Step 6: Commit your changes**
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"

# Or for bug fixes
git commit -m "fix: resolve issue with calculation"
```

**Step 7: Push and create a Pull Request**
```bash
# Push your branch to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

### 📋 Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Screenshots**: Include screenshots for UI changes
- **Safety**: For calculation changes, explain validation methods

### 🎯 Development Guidelines

- **Code Style**: Follow TypeScript and React best practices
- **Components**: Use existing UI components from `components/ui/`
- **Calculations**: Ensure all diving calculations are mathematically correct
- **Safety**: Always prioritize diver safety in feature implementations
- **Documentation**: Update README.md if needed

### 🔍 Code Review Process

1. All PRs require at least one review
2. Maintainers will review for code quality and safety
3. Diving calculation changes require extra scrutiny
4. CI/CD checks must pass before merging

### 📜 Commit Convention

We follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📄 License

© 2025 Millibar - All Rights Reserved

## 🔗 Links

- **Live Application**: [https://ean.millibar.io](https://ean.millibar.io)
- **Millibar Home**: [https://app.millibar.io](https://app.millibar.io)
- **Terms of Service**: [https://app.millibar.io/terms](https://app.millibar.io/terms)
- **Privacy Policy**: [https://app.millibar.io/privacy](https://app.millibar.io/privacy)

---

**Built with ❤️ for the diving community**

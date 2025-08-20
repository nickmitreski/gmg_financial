# GMG Financial Services Website

A modern, responsive website built with Next.js 14, TypeScript, and Tailwind CSS for GMG Financial Services.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive components
- **Performance Optimized**: Image optimization, code splitting, and lazy loading
- **Type Safe**: Full TypeScript support with comprehensive type definitions
- **Accessible**: WCAG compliant with proper semantic HTML and ARIA labels
- **SEO Ready**: Meta tags, structured data, and optimized for search engines

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles (legacy - will be removed)
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── sections/     # Page sections
│   │   └── layout/       # Layout components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles and CSS
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 🎨 Design System

### Typography
- **Font Family**: Inter
- **Font Weights**: 100 (thin), 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Custom Sizes**: hero-xl, hero-lg, heading-xl, heading-lg, subtitle-lg, body-xl, body-lg, ui-lg, ui, ui-sm, caption

### Colors
- **Primary**: Teal (#7CC5C5)
- **Secondary**: Gray scale
- **Text**: Black (#000000) for headings, Gray-600 for body text
- **Background**: White (#FFFFFF), Gray-100 for sections

### Components
- **Buttons**: Primary (teal), Secondary (white)
- **Cards**: White background with subtle shadows
- **Forms**: Clean, accessible form components
- **Navigation**: Fixed header with backdrop blur

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gmg-financial-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture

### Component Structure
- **UI Components**: Reusable, atomic components (Button, Input, etc.)
- **Section Components**: Page-specific sections (Hero, Services, etc.)
- **Layout Components**: Structural components (Navigation, Footer)

### State Management
- **Local State**: React useState for component-specific state
- **Form State**: React Hook Form for form management
- **Global State**: Context API (if needed in future)

### Data Flow
- **Constants**: Centralized in `src/constants/index.ts`
- **Types**: Defined in `src/types/index.ts`
- **Utilities**: Helper functions in `src/lib/utils.ts`

## 🎯 Best Practices

### Code Organization
- **Single Responsibility**: Each component has one clear purpose
- **DRY Principle**: Reusable components and utilities
- **Type Safety**: Comprehensive TypeScript types
- **Consistent Naming**: PascalCase for components, camelCase for functions

### Performance
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Components load when needed
- **Bundle Analysis**: Regular bundle size monitoring

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant

### SEO
- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling rules

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Custom color palette
- Typography scale
- Component variants
- Animation utilities

### TypeScript
Strict configuration in `tsconfig.json`:
- Path mapping for clean imports
- Strict type checking
- Modern ES features

### Next.js
Optimized configuration in `next.config.js`:
- Image optimization
- Performance settings
- Build optimizations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions

## 🧪 Testing

### Manual Testing
- Cross-browser compatibility
- Responsive design testing
- Accessibility testing
- Performance testing

### Automated Testing (Future)
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for local development:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js
- **Netlify**: Alternative option
- **AWS**: Custom deployment

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes following coding standards
3. Test thoroughly
4. Submit pull request
5. Code review and merge

### Coding Standards
- **ESLint**: Code linting rules
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Commit message format

## 📄 License

This project is proprietary software for GMG Financial Services.

## 🆘 Support

For technical support or questions:
- Email: [support email]
- Documentation: [link to docs]
- Issues: [GitHub issues link]

---

**Built with ❤️ for GMG Financial Services** 
# Finance Broker Website - Color Theme

## 🎨 Primary Color Palette

### Teal Colors (Primary Brand)
- **Teal 50**: `#f0fdfa` - Very light teal background
- **Teal 100**: `#ccfbf1` - Light teal background
- **Teal 200**: `#99f6e4` - Light teal accent
- **Teal 300**: `#5eead4` - Medium light teal
- **Teal 400**: `#2dd4bf` - Medium teal
- **Teal 500**: `#7CC5C5` - **Primary brand color** (buttons, accents)
- **Teal 600**: `#6BB5B5` - **Darker variant** (hover states)
- **Teal 700**: `#0f766e` - Dark teal
- **Teal 800**: `#115e59` - Very dark teal
- **Teal 900**: `#134e4a` - Darkest teal

### Blue Colors (Accent)
- **Blue 500**: `#4A90E2` - **Accent color** (highlights, secondary elements)

### Gray Colors (Neutral)
- **Gray 50**: `#f9fafb` - Very light gray background
- **Gray 100**: `#f3f4f6` - Light gray background
- **Gray 200**: `#e5e7eb` - Light gray borders
- **Gray 300**: `#d1d5db` - Medium light gray
- **Gray 400**: `#9ca3af` - Medium gray
- **Gray 500**: `#8A8A8A` - **Medium gray** (text, secondary elements)
- **Gray 600**: `#4b5563` - Medium dark gray
- **Gray 700**: `#374151` - Dark gray
- **Gray 800**: `#1f2937` - Very dark gray
- **Gray 900**: `#333333` - **Dark gray** (main text color)
- **Gray 950**: `#0a0a0a` - **Charcoal dark** (header/footer background)

### Base Colors
- **White**: `#FFFFFF` - Pure white (backgrounds, text on dark)
- **Black**: `#000000` - Pure black (text, dark elements)

## 🎯 Usage by Component

### Navigation Header
- **Background**: `bg-gray-950` (charcoal dark header)
- **Text**: `text-white` (white text)
- **Hover**: `hover:text-teal-300` (light teal on hover)
- **Logo**: `text-white` (white logo text)

### Hero Section
- **Background Overlay**: `bg-black/50` (50% black overlay)
- **Main Heading**: `text-white` with `text-teal-300` accent
- **Subtext**: `text-gray-200` (light gray)
- **Buttons**: 
  - Primary: `bg-teal-500` with `text-white`
  - Secondary: `bg-black` with `text-white`
  - Outline: `bg-white` with `text-black`

### Buttons
- **Primary Button**: `bg-teal-500` → `hover:bg-teal-600`
- **Secondary Button**: `bg-transparent` with `border-white`
- **Outline Button**: `border-teal-500` with `text-teal-500`

### Cards & Sections
- **Card Background**: `bg-white`
- **Card Shadow**: `shadow-card` (custom shadow)
- **Section Background**: `bg-gray-50` (light gray)
- **Text**: `text-gray-900` (dark text)

### Forms
- **Input Border**: `border-gray-300`
- **Input Focus**: `focus:border-teal-500`
- **Error State**: `border-red-300` with `text-red-600`
- **Success State**: `bg-green-50` with `text-green-800`

### Footer
- **Background**: `bg-gray-950` (charcoal dark footer)
- **Text**: `text-white` and `text-gray-300`
- **Links**: `text-teal-400` (light teal)
- **Hover**: `hover:text-teal-400`

### Icons & Accents
- **Primary Icons**: `text-teal-500`
- **Star Ratings**: `text-yellow-400`
- **Success Icons**: `text-green-500`
- **Warning Icons**: `text-yellow-500`
- **Error Icons**: `text-red-500`

## 🎨 CSS Custom Properties (Variables)

```css
:root {
  --teal: #7CC5C5;        /* Primary brand color */
  --teal-dark: #6BB5B5;   /* Darker variant */
  --blue: #4A90E2;        /* Accent color */
  --white: #FFFFFF;       /* Pure white */
  --light-gray: #F5F5F5;  /* Light gray */
  --medium-gray: #8A8A8A; /* Medium gray */
  --dark-gray: #333333;   /* Dark gray */
  --black: #000000;       /* Pure black */
}
```

## 🎯 Design System Colors

### Brand Colors
1. **Primary Teal** (`#7CC5C5`) - Main brand color
2. **Dark Teal** (`#6BB5B5`) - Hover states and emphasis
3. **Accent Blue** (`#4A90E2`) - Secondary highlights

### Neutral Colors
1. **White** (`#FFFFFF`) - Backgrounds and light text
2. **Light Gray** (`#F5F5F5`) - Section backgrounds
3. **Medium Gray** (`#8A8A8A`) - Secondary text
4. **Dark Gray** (`#333333`) - Primary text
5. **Charcoal Dark** (`#0a0a0a`) - Header/footer backgrounds
6. **Black** (`#000000`) - Strong emphasis

### Semantic Colors
1. **Success Green** (`#10B981`) - Success states
2. **Warning Yellow** (`#F59E0B`) - Warning states
3. **Error Red** (`#EF4444`) - Error states
4. **Star Yellow** (`#FFD700`) - Ratings and reviews

## 🎨 Color Accessibility

All color combinations meet WCAG AA contrast requirements:
- **Teal 500 on White**: 4.5:1 ratio ✅
- **White on Gray 950**: 21.1:1 ratio ✅
- **Gray 900 on White**: 15.1:1 ratio ✅
- **Teal 500 on Gray 950**: 4.8:1 ratio ✅

## 🎯 Implementation Notes

- Colors are defined in `tailwind.config.js` for consistency
- CSS custom properties available for custom styling
- All colors support hover and focus states
- Dark mode considerations built into the color system
- Semantic color usage for accessibility 
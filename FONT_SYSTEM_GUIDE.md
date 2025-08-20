# 🎨 Simplified Font System Guide

## **How It Works**

This website uses a **simplified font system** with just **6 font sizes** that are easy to remember and edit.

### **Font Family**
- **Inter** - Clean, modern font loaded from Google Fonts
- Applied automatically to all text

### **Font Sizes (6 Total)**

| Class | Size | Use Case | Example |
|-------|------|----------|---------|
| `text-xl` | 3rem (48px) | Hero titles | "Take control of your financial future" |
| `text-lg` | 2rem (32px) | Section headings | "Our core services" |
| `text-md` | 1.25rem (20px) | Subheadings | Service card titles |
| `text-base` | 1rem (16px) | Body text | Paragraphs, descriptions |
| `text-sm` | 0.875rem (14px) | Small text | Buttons, captions |
| `text-xs` | 0.75rem (12px) | Captions | Footer text, meta info |

### **Font Weights**

| Class | Weight | Use Case |
|-------|--------|----------|
| `font-thin` | 100 | Very light text |
| `font-light` | 300 | Light headings |
| `font-normal` | 400 | Default body text |
| `font-medium` | 500 | Buttons, emphasis |
| `font-semibold` | 600 | Strong emphasis |
| `font-bold` | 700 | Very strong emphasis |

## **How to Edit Fonts**

### **Change Font Sizes**
Edit `tailwind.config.js` → `fontSize` section:

```javascript
fontSize: {
  'xl': ['3rem', { lineHeight: '1.2' }],     // Change 3rem to any size
  'lg': ['2rem', { lineHeight: '1.3' }],     // Change 2rem to any size
  // ... etc
}
```

### **Change Font Family**
Edit `tailwind.config.js` → `fontFamily` section:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

### **Change Font Weights**
Edit `tailwind.config.js` → `fontWeight` section:

```javascript
fontWeight: {
  'thin': '100',
  'light': '300',
  // ... etc
}
```

## **Common Usage Examples**

```jsx
// Hero title
<h1 className="text-xl font-light">Take control of your financial future</h1>

// Section heading
<h2 className="text-lg font-light">Our core services</h2>

// Subheading
<h3 className="text-md font-medium">Planning & Budgeting</h3>

// Body text
<p className="text-base font-normal">Supporting individuals, families...</p>

// Button text
<button className="text-sm font-medium">LET'S GET STARTED</button>

// Caption
<span className="text-xs font-light">© 2024 Finance Broker</span>
```

## **Benefits of This System**

✅ **Simple** - Only 6 sizes to remember  
✅ **Consistent** - Same sizes used everywhere  
✅ **Easy to edit** - Change one place, affects everything  
✅ **Scalable** - Easy to add new sizes if needed  
✅ **Maintainable** - Clear naming convention  

## **Folder Structure (No Conflicts)**

- **`app/`** = Next.js pages and layouts (required)
- **`src/`** = Your application code (recommended)
- **No conflicts** - They work together perfectly!

This is the **standard Next.js 13+ structure** and is recommended by the Next.js team. 
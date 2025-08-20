# 🎨 Typography Override Guide

## **How the New System Works**

### **✅ Consistent Defaults**
All sections now use standardized typography classes that provide consistent styling across the website.

### **✅ Easy Overrides**
You can easily override any typography class for specific sections by adding additional Tailwind classes.

---

## **📋 Available Typography Classes**

### **Hero Section**
- `.hero-title` - Main hero title (default: `text-xl font-light text-white`)
- `.hero-subtitle` - Hero subtitle (default: `text-base font-light text-white`)

### **Section Elements**
- `.section-heading` - Section titles (default: `text-lg font-light text-black`)
- `.section-description` - Section descriptions (default: `text-base font-light text-gray-600`)

### **Card Elements**
- `.card-title` - Card/service titles (default: `text-md font-light text-black`)
- `.card-description` - Card descriptions (default: `text-base font-normal text-gray-600`)

### **Social Proof**
- `.social-proof-number` - Statistics numbers (default: `text-xl font-semibold text-white`)
- `.social-proof-label` - Statistics labels (default: `text-base font-medium text-white/90`)

### **FAQ Section**
- `.faq-question` - FAQ questions (default: `text-sm font-medium text-black`)
- `.faq-answer` - FAQ answers (default: `text-base font-light text-gray-600`)

### **Contact Section**
- `.contact-label` - Contact form labels (default: `text-sm font-medium text-black`)
- `.contact-value` - Contact information values (default: `text-gray-600`)

### **Navigation**
- `.nav-logo` - Navigation logo (default: `text-base font-semibold text-white`)
- `.nav-link` - Navigation links (default: `text-sm font-medium text-white`)
- `.nav-phone` - Phone number in nav (default: `text-xs font-light text-white`)

### **Footer**
- `.footer-title` - Footer company title (default: `text-base font-semibold text-teal-400`)
- `.footer-description` - Footer description (default: `text-base font-normal text-gray-300`)
- `.footer-section-title` - Footer section titles (default: `text-md font-semibold text-teal-400`)
- `.footer-link` - Footer links (default: `text-gray-300`)
- `.footer-copyright` - Copyright text (default: `text-xs font-light text-gray-400`)

---

## **🔧 How to Override for Specific Sections**

### **Method 1: Add Tailwind Classes (Recommended)**
```jsx
// Make hero title larger for this specific section
<h1 className="hero-title text-2xl">Your Title</h1>

// Make section heading bolder
<h2 className="section-heading font-semibold">Your Heading</h2>

// Change color for specific section
<p className="section-description text-blue-600">Your description</p>
```

### **Method 2: Use Legacy Classes for Specific Overrides**
```jsx
// Use larger hero size for special sections
<h1 className="hero-title text-hero-xl">Special Large Title</h1>

// Use different heading size
<h2 className="section-heading text-heading-xl">Extra Large Heading</h2>
```

### **Method 3: Create Section-Specific Classes**
Add to `src/styles/globals.css`:
```css
/* Special section overrides */
.hero-title-special {
  @apply text-2xl font-bold text-blue-500;
}

.section-heading-emphasis {
  @apply text-xl font-semibold text-teal-600;
}
```

Then use in components:
```jsx
<h1 className="hero-title-special">Special Title</h1>
<h2 className="section-heading-emphasis">Emphasized Heading</h2>
```

---

## **📝 Examples of Common Overrides**

### **Make Hero Title Larger**
```jsx
<h1 className="hero-title text-2xl">Larger Hero Title</h1>
```

### **Make Section Heading Bolder**
```jsx
<h2 className="section-heading font-semibold">Bolder Heading</h2>
```

### **Change Text Color**
```jsx
<p className="section-description text-blue-600">Blue Description</p>
```

### **Increase Font Size**
```jsx
<h3 className="card-title text-lg">Larger Card Title</h3>
```

### **Change Font Weight**
```jsx
<p className="card-description font-medium">Medium Weight Description</p>
```

### **Combine Multiple Overrides**
```jsx
<h2 className="section-heading text-xl font-semibold text-teal-600">
  Custom Styled Heading
</h2>
```

---

## **🎯 Benefits of This System**

✅ **Consistency** - All sections start with the same styling  
✅ **Flexibility** - Easy to override for specific needs  
✅ **Maintainability** - Change defaults in one place  
✅ **Performance** - Fewer custom classes  
✅ **Scalability** - Easy to add new sections  

---

## **🚀 Quick Reference**

### **Font Sizes Available:**
- `text-xs` (12px) - Captions
- `text-sm` (14px) - Small text
- `text-base` (16px) - Body text
- `text-md` (20px) - Subheadings
- `text-lg` (32px) - Section headings
- `text-xl` (48px) - Hero titles
- `text-2xl` (60px) - Extra large
- `text-3xl` (72px) - Very large

### **Font Weights Available:**
- `font-thin` (100)
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

### **Legacy Classes (for specific overrides):**
- `text-hero-xl`, `text-hero-lg`, `text-hero`
- `text-heading-xl`, `text-heading-lg`, `text-heading`, `text-heading-sm`
- `text-subtitle-lg`, `text-subtitle`
- `text-body-xl`, `text-body-lg`, `text-body`, `text-body-sm`
- `text-ui-lg`, `text-ui`, `text-ui-sm`
- `text-caption` 
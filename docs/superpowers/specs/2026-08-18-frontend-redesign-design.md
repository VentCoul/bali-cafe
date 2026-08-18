# Bali Cafe Frontend Redesign (Glassmorphism)

## Objective
Refresh the Bali Cafe website's visual identity by introducing a "Liquid Glass" (glassmorphism) aesthetic, combined with subtle micro-animations and scroll reveals, to create a premium, modern, and immersive user experience.

## Design Concept
The chosen visual direction is **Dark Glass**. It uses the brand's primary colors (`#2C402E` Bali Green and `#B68B5D` Bali Gold) combined with translucent elements that blur the content underneath, inspired by Apple's UI aesthetics.

### Key Elements:
1. **Glassmorphism Panels:** 
   - Translucent backgrounds (e.g., `bg-bali-green/50` or `bg-bali-green/70`)
   - Strong blur effect (`backdrop-blur-xl` or `backdrop-blur-2xl`)
   - Subtle semi-transparent borders (`border border-white/10`)
   - Soft shadows (`shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]`)

2. **Animated Background Textures:**
   - Soft, slow-moving blurred colored blobs (using CSS keyframes) in the background to provide visual depth so the glass effect is noticeable.
   - Preserving the existing photographic hero parallax but placing glass elements over it.

3. **Micro-Animations:**
   - Hover states for cards and buttons that include scale transformations (`scale-102`) and shadow elevation (`-translate-y-2`).

4. **Scroll Reveal:**
   - Sections (like the menu grid and footer) will fade in and slide up (`framer-motion`'s `whileInView`) as the user scrolls down the page.

## Component Updates

### 1. Header (`src/components/layout/Header.tsx`)
- Detach from the absolute top edge (make it floating).
- Apply the Dark Glass style.
- Keep the current sticky/fixed behavior, but ensure it scales or adjusts smoothly on scroll if necessary.
- Fix any conflicting background colors (remove solid backgrounds in favor of the glass styles).

### 2. Hero Section (`src/components/layout/HeroParallax.tsx`)
- Keep the photographic parallax background (`/hero-bg.jpg`).
- Add a subtle glass effect to the primary Call-to-Action button.
- Ensure the overlay gradient transitions smoothly into the content below, which might now have floating blobs.

### 3. Menu List & Cards (`src/components/menu/MenuList.tsx` / `MenuItemCard.tsx`)
- **Container:** Place the menu inside an area with a solid light background (`bg-bali-beige`) or with large animated background blobs that contrast the dark glass cards.
- **Cards (`MenuItemCard.tsx`):**
  - Convert to Dark Glass style (`bg-bali-green/80 backdrop-blur-md`).
  - Text inside must change to white/light for contrast against the dark green glass.
  - Apply the hover transform (`hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`).

### 4. Background Animations
- Add a new global layout component (e.g., `AnimatedBackground.tsx`) or inject CSS blobs into `page.tsx` that slowly float behind the `MenuList` section to make the glass effect visible and dynamic.

## Implementation Notes
- Tailwind CSS supports backdrop filters natively (`backdrop-blur-md`, `backdrop-blur-lg`).
- The custom border (`border border-white/20`) is crucial for the "glass edge" look.
- We will rely on `framer-motion` (already in `package.json`) for the scroll reveal and floating blob animations.

## Next Steps
1. Verify the design document.
2. Proceed to creating an Implementation Plan for these changes.

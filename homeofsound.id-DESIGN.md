# Design System Inspired by Home of Sound

## 1. Visual Theme & Atmosphere

Home of Sound embodies a vibrant, energetic festival aesthetic that celebrates music and community. The design system combines bold gradient overlays with concentric circular patterns that evoke sound waves and rhythm. The atmosphere is youthful, immersive, and celebratory—creating a sense of anticipation and connection. Warm-to-cool color transitions (coral-orange to deep magenta) establish depth and movement across the interface, while high contrast and clean typography ensure clarity against dynamic backgrounds. The overall mood is modern, inclusive, and festival-forward, welcoming users into a shared musical experience.

**Key Characteristics**
- Radiant gradient backgrounds flowing from warm coral to deep magenta
- Concentric circular patterns suggesting sound wave propagation
- High-contrast white and dark text for legibility over vibrant backdrops
- Bold, sans-serif typography with geometric precision
- Rounded pill-shaped buttons and cards with soft emphasis
- Neon accent colors (lime, cyan) punctuating primary palettes
- Energetic, youthful visual language celebrating live music culture

## 2. Color Palette & Roles

### Primary
- **Deep Magenta** (`#B71371`): Primary brand color and dominant UI accent
- **Coral Orange** (`#F08008`): Warm secondary accent for depth layers
- **Magenta Gradient Base** (`#6B6375`): Core neutral purple-grey, foundation for surfaces and text

### Accent Colors
- **Neon Lime** (`#E2FB61`): Energetic highlight and call-to-action emphasis
- **Electric Cyan** (`#00BCD4`): Vibrant accent for interactive elements and badges
- **Teal Green** (`#00C2C7`): Alternative accent for dynamic backgrounds

### Interactive
- **Spotify Green** (`#1DB954`): Success states, positive feedback, Spotify integration badges
- **Warning Gold** (`#FFC400`): Warning and cautionary states
- **Error Red** (`#FF0000`): Error states and critical alerts
- **Safety Orange** (`#F34F00`): Secondary error indication

### Neutral Scale
- **Pure White** (`#FFFFFF`): Primary text, backgrounds, and contrast
- **Black** (`#000000`): Deep text, overlays, and highest contrast
- **Off-White** (`#F4F3EC`): Subtle background tinting and neutral fill

### Surface & Borders
- **Dark Base** (`#08060D`): Deep background for hero sections and full-bleed areas
- **Magenta Gradient Surface** (`#6B6375`): Mid-tone surfaces and card containers

## 3. Typography Rules

### Font Family
**Primary Font:** Nura (display, headings)
- Fallback: `'Nura', 'Georgia', serif`

**Secondary Font:** Nunito Variable (body, UI, links)
- Fallback: `'Nunito Variable', 'Nunito', '-apple-system', 'BlinkMacSystemFont', sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Nura | 27px | 400 | 36px | 0px | Hero headline, event title |
| Heading Large / H2 | Nura | 33.75px | 700 | 40.5px | 0px | Section heading, prominent title |
| Heading Medium / H3 | Nunito Variable | 27px | 700 | 33.75px | 0px | Subsection, artist name |
| Label / Span | Nunito Variable | 18px | 700 | 27px | 0px | Button label, badge text |
| Body Link | Nunito Variable | 18px | 400 | 26.1px | 0px | Navigation link, interactive text |
| List Item | Nunito Variable | 15.75px | 400 | 22.5px | 0px | Menu item, description text |

### Principles
- Use **Nura** for all display and heading hierarchy to establish personality and visual weight
- Employ **Nunito Variable** for all interactive and body text to ensure readability and accessibility
- Maintain 1.33–1.5× line-height multiplier across all sizes for breathing room
- Reserve bold (`700` weight) for labels, headings, and call-to-action emphasis
- Never reduce font size below `15.75px` for body content to preserve legibility

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Font Family:** Nunito Variable
- **Font Size:** 18px
- **Font Weight:** 700
- **Padding:** 0px
- **Border Radius:** 0px
- **Border:** 0px solid `#FFFFFF`
- **Line Height:** 26.1px
- **Height:** 36px
- **Box Shadow:** none
- **Hover State:** Add underline or scale to 1.05

#### Secondary Button (Small)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `#FFFFFF`
- **Font Family:** Nura
- **Font Size:** 15.75px
- **Font Weight:** 400
- **Padding:** 9px 18px
- **Border Radius:** 9px
- **Border:** 0px solid `#FFFFFF`
- **Line Height:** 22.5px
- **Height:** 40.5px
- **Box Shadow:** none
- **Hover State:** Increase opacity to 0.9, add subtle lift

#### CTA Button (Buy Tickets)
- **Background:** `#E2FB61`
- **Text Color:** `#08060D`
- **Font Family:** Nura
- **Font Size:** 15.75px
- **Font Weight:** 700
- **Padding:** 12px 32px
- **Border Radius:** 36px
- **Border:** 2px solid `#E2FB61`
- **Line Height:** 22.5px
- **Height:** 48px
- **Box Shadow:** `0px 8px 16px rgba(226, 251, 97, 0.3)`
- **Hover State:** Background `#D4E540`, scale 1.02, shadow `0px 12px 24px rgba(226, 251, 97, 0.4)`
- **Active State:** Background `#C0D92F`, shadow `0px 4px 8px rgba(226, 251, 97, 0.2)`

### Cards & Containers

#### Artist Card
- **Background:** Linear gradient from `#B71371` to `#6B6375`
- **Border Radius:** 36px
- **Border:** 2px solid `rgba(255, 255, 255, 0.3)`
- **Padding:** 20px
- **Box Shadow:** `0px 12px 32px rgba(0, 0, 0, 0.2)`
- **Image Border Radius:** 24px
- **Overflow:** hidden
- **Hover State:** Scale 1.04, shadow `0px 16px 48px rgba(0, 0, 0, 0.3)`

#### Countdown Card
- **Background:** `rgba(107, 99, 117, 0.6)` (semi-transparent base)
- **Border:** 2px solid `rgba(255, 255, 255, 0.4)`
- **Border Radius:** 18px
- **Padding:** 16px 20px
- **Text Color:** `#FFFFFF`
- **Font Size:** 22.5px
- **Font Weight:** 700
- **Text Shadow:** `0px 2px 4px rgba(0, 0, 0, 0.3)`
- **Gap Between Cards:** 12px

#### Modal / Dialog
- **Background:** `#FFFFFF` with inset light shadow
- **Border Radius:** 12px
- **Padding:** 32px
- **Box Shadow:** `rgba(255, 255, 255, 0.5) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px`
- **Border:** none
- **Z-Index:** 1000

### Inputs & Forms

#### Text Input
- **Background:** `#FFFFFF`
- **Border:** 1px solid `#6B6375`
- **Border Radius:** 8px
- **Padding:** 12px 16px
- **Font Size:** 15.75px
- **Font Family:** Nunito Variable
- **Color:** `#08060D`
- **Line Height:** 22.5px
- **Height:** 44px
- **Focus State:** Border `#B71371`, box-shadow `0px 0px 0px 3px rgba(183, 19, 113, 0.1)`
- **Error State:** Border `#FF0000`, background `rgba(255, 0, 0, 0.05)`

#### Checkbox / Radio
- **Base Size:** 20px × 20px
- **Border:** 2px solid `#6B6375`
- **Border Radius:** 4px (checkbox) or 50% (radio)
- **Checked Background:** `#B71371`
- **Checked Border:** `#B71371`
- **Checkmark Color:** `#FFFFFF`
- **Focus Ring:** 2px solid `#00BCD4` with 4px offset

### Navigation

#### Top Navigation Bar
- **Background:** `rgba(0, 0, 0, 0)` (transparent, layered over gradient)
- **Height:** 80px
- **Padding:** 20px 40px
- **Display:** flex, align-items: center, justify-content: space-between
- **Border Bottom:** 1px solid `rgba(255, 255, 255, 0.2)`

#### Navigation Link
- **Font Family:** Nunito Variable
- **Font Size:** 18px
- **Font Weight:** 400
- **Color:** `#FFFFFF`
- **Line Height:** 26.1px
- **Padding:** 8px 16px
- **Text Transform:** uppercase
- **Letter Spacing:** 0.5px
- **Hover State:** Color `#E2FB61`, no underline
- **Active State:** Color `#E2FB61`, border-bottom 2px solid `#E2FB61`

#### Spotify Badge / Icon
- **Background:** `#1DB954`
- **Border Radius:** 50%
- **Width:** 45px
- **Height:** 45px
- **Display:** flex, justify-content: center, align-items: center
- **Box Shadow:** `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px`
- **Icon Color:** `#FFFFFF`
- **Hover State:** Scale 1.1, box-shadow `rgba(0, 0, 0, 0.15) 0px 12px 20px -2px`

## 5. Layout Principles

### Spacing System
**Base Unit:** 4px

**Scale:**
- **Micro:** 4px (tight spacing, component padding)
- **Extra Small:** 8px (element gap)
- **Small:** 12px (internal gap)
- **Base:** 16px (standard padding)
- **Medium:** 20px (card padding, section padding)
- **Large:** 28px (heading spacing)
- **Extra Large:** 32px (section gap)
- **Jumbo:** 36px (major padding)
- **Hero:** 44px (hero section padding)
- **Section:** 56px (between major sections)
- **Page:** 92px (full-width padding)
- **Gutter:** 108px, 116px (vertical spacing between page sections)

**Usage Context:**
- `4px–8px` between buttons and small components
- `12px–20px` within cards and containers
- `32px–44px` between major content blocks
- `56px–116px` between full-width sections

### Grid & Container
- **Max Width:** 1440px (full viewport width, matches extracted navigation)
- **Column Strategy:** 12-column grid for desktop; 6 columns for tablet; 4 columns for mobile
- **Gutters:** 20px on desktop, 16px on tablet, 12px on mobile
- **Section Padding:** Horizontal `20px` to `92px` depending on visual hierarchy
- **Hero Section:** Full-bleed width with concentric gradient background

### Whitespace Philosophy
The design system emphasizes generous whitespace to reduce visual noise and guide focus toward key interactive elements. Larger spacing ratios (1.5× to 2×) between sections create visual breathing room and establish hierarchy. Cards and containers use internal padding of `20px–36px` to prevent crowding. Navigation and hero sections employ ample top/bottom padding (`27px–44px`) to frame content. Whitespace increases proportionally with viewport size to maintain legibility and comfort.

### Border Radius Scale
- **None (Sharp):** `0px` — Navigation bar, hero containers
- **Minimal:** `3px–4px` — Form fields, utility borders
- **Small:** `8px–9px` — Small buttons, compact containers
- **Medium:** `12px–18px` — Modals, input fields, standard cards
- **Large:** `24px–36px` — Artist cards, major containers
- **Pill:** `3.35544e+07px` (effectively infinity) — Spotify badges, circular icons, full-round buttons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **Flat** | No shadow, 1px border `rgba(255, 255, 255, 0.2)` | Subtle UI elements, backgrounds, flat design sections |
| **Raised (SM)** | `rgba(255, 255, 255, 0.5) 0px 2px 0px 0px inset` | Modal overlays, subtle lift |
| **Lifted (MD)** | `oklab(0.999994 0.0000455678 0.0000200868) 0px 2px 4px 0px inset` | Pressed states, slight elevation |
| **Elevated (LG)** | `rgba(255, 255, 255, 0.5) 0px 2px 0px 0px inset, oklab(0.941326 -0.0829227 0.157417 / 0.1) 0px 10px 15px -3px, oklab(0.941326 -0.0829227 0.157417 / 0.1) 0px 4px 6px -4px` | Hover cards, floating elements, prominent containers |
| **Floating (XL)** | `rgba(255, 255, 255, 0.5) 0px 2px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px` | Modals, dropdowns, floating action buttons, highest-priority content |

**Shadow Philosophy:** The elevation system uses inset highlights (top-light source) combined with subtle drop shadows to create depth without heaviness. Inset highlights preserve legibility over gradient backgrounds. Drop shadows employ oklab color space for perceptual uniformity. Shadows increase in blur and spread with each elevation level, creating clear visual hierarchy. Interactive elements respond to hover with one level up in elevation, signaling interactivity. Modal and floating content use the highest elevation to ensure visual priority and accessibility.

## 7. Do's and Don'ts

### Do
- **Use Nura for all headings and display text** to maintain visual hierarchy and brand personality
- **Apply at least 12px padding inside buttons** to ensure touch-friendly dimensions (minimum 44px height)
- **Layer white text over gradient backgrounds** — always use `#FFFFFF` for maximum contrast and legibility
- **Employ the neon lime (`#E2FB61`) as a point accent** on no more than 15% of the interface per screen
- **Maintain consistent border radius across related components** — all buttons on a page should use the same radius value
- **Space interactive elements at least 8px apart** to prevent accidental misclicks
- **Use the Spotify green (`#1DB954`) exclusively for success states and Spotify integration badges**
- **Apply the shadow system consistently:** hover states get one level up, modals use XL, cards use LG
- **Set line-height to 1.5× font-size minimum** for body text to improve readability
- **Test all text contrast ratios** — aim for WCAG AA (4.5:1) on primary text, AAA (7:1) on critical UI

### Don't
- **Don't mix Nura and Nunito Variable at the same size** — reserve Nura for hierarchy only
- **Don't use dark text (`#08060D`) on dark backgrounds** — maintain sufficient contrast (minimum 4.5:1)
- **Don't apply more than two shadow effects on a single component** — complexity reduces perceived depth
- **Don't round corners below 8px on interactive elements** — small radius values appear unintentional
- **Don't exceed 108px padding per side** — maintain responsive behavior on smaller viewports
- **Don't use `#FF0000` (error red) as a general accent color** — reserve for error states and warnings only
- **Don't nest cards deeper than two levels** of elevation — flatness becomes ambiguous
- **Don't omit focus states on interactive elements** — essential for keyboard navigation and accessibility
- **Don't scale typography below the defined hierarchy** — reduce spacing or layout instead
- **Don't apply gradients to text** — use solid colors for legibility and accessibility

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| **Mobile** | `320px–599px` | 4-column grid, `12px` gutters, `12px–20px` padding, single-column layout, `14px` body font, hamburger menu |
| **Tablet** | `600px–1023px` | 6-column grid, `16px` gutters, `20px` padding, 2-column cards, `16px` body font, collapsible nav |
| **Desktop** | `1024px–1439px` | 12-column grid, `20px` gutters, `36px–44px` padding, 3-column layout, `18px` body font, full nav bar |
| **Wide** | `1440px+` | 12-column grid, `20px` gutters, `56px–92px` padding, max-width `1440px` container |

### Touch Targets
- **Minimum Height:** 44px (all buttons, links, interactive elements)
- **Minimum Width:** 44px (icon buttons)
- **Minimum Spacing:** 8px between adjacent touch targets
- **Recommended Padding:** 12px–16px internal padding on all interactive elements
- **Cursor Area:** 48px × 48px for comfortable mouse targeting on desktop

### Collapsing Strategy
- **Navigation:** Full horizontal menu on desktop → hamburger icon on tablet/mobile with side drawer overlay
- **Cards:** 3 columns on desktop → 2 columns on tablet → 1 column on mobile
- **Countdown Timer:** Inline 4-column layout on desktop → 2×2 grid on tablet → Single column on mobile
- **Hero Text:** Full display size on desktop → reduced to h2 size on tablet → reduced further to h3 on mobile
- **Padding:** Hero padding scales from `92px` (desktop) → `44px` (tablet) → `20px` (mobile)
- **Font Sizes:** All typography scales down 10–15% at tablet, 15–25% at mobile to maintain readability within constrained space
- **Imagery:** High-resolution images on desktop → medium on tablet → optimized/compressed on mobile

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Neon Lime (`#E2FB61`) — main call-to-action button
- **Primary Brand:** Deep Magenta (`#B71371`) — gradients, accents, hover states
- **Background Base:** Dark (`#08060D`) — full-bleed hero sections
- **Heading Text:** White (`#FFFFFF`) — all primary and secondary headings
- **Body Text:** White (`#FFFFFF`) — over gradient/dark backgrounds
- **Success / Spotify:** Spotify Green (`#1DB954`) — integration badges, positive states
- **Error / Warning:** Red (`#FF0000`), Gold (`#FFC400`) — alerts and warnings
- **Neutral Foundation:** Magenta-Grey (`#6B6375`) — mid-tone surfaces, cards

### Iteration Guide

1. **Use Nura for all display and heading text** — `font-family: 'Nura', serif`. Secondary font is Nunito Variable for body, buttons, and links.

2. **Build button hierarchy:** Primary buttons are transparent with white text; CTAs use neon lime (`#E2FB61`) background with dark text and `36px` border radius.

3. **Apply elevation via shadows, not borders** — use the 4-level shadow system (Flat, SM, MD, LG, XL) from Section 6; hover states increase one level.

4. **Maintain contrast on gradient backgrounds** — always use `#FFFFFF` or very bright colors for text readability; never use dark text on dark gradients.

5. **Space components generously** — use the px scale (4, 8, 12, 16, 20, 28, 32, 36, 44, 56, 92) for all padding and gaps; no arbitrary values.

6. **Size interactive targets to 44px minimum height** — buttons, links, and form inputs should never be smaller; add internal padding to reach this size.

7. **Reserve accent colors deliberately:** Neon Lime for primary CTAs, Cyan for secondary interactivity, Spotify Green for success/badges only.

8. **Implement responsive typography and spacing** — headings and padding reduce proportionally on tablet/mobile (see Section 8 breakpoints); use viewport-scaled values or CSS media queries.

9. **Test all text for WCAG contrast compliance** — white (`#FFFFFF`) on magenta (`#B71371`) passes AA (4.5:1); verify custom color combinations before deployment.
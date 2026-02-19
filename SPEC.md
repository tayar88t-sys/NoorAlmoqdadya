# مدينه العاب نور المقدادية - Website Specification

## Project Overview
- **Project Name**: Noor Al-Maqadasia Games City Website
- **Type**: Multi-page Business Website
- **Location**: Diyala, Iraq
- **Language**: Arabic (primary), English (secondary)
- **Target Audience**: Families, children, tourists in Diyala and surrounding areas

## Design System

### Color Palette
- Primary: #FF6B35 (Vibrant Orange)
- Secondary: #4ECDC4 (Teal)
- Accent: #FFE66D (Yellow)
- Dark: #2C3E50 (Dark Blue-Gray)
- Light: #ECF0F1 (Light Gray)
- White: #FFFFFF

### Typography
- Primary Font: Cairo (Arabic)
- Secondary Font: Poppins (English fallback)
- Heading Sizes: H1: 4rem, H2: 3rem, H3: 2rem, H4: 1.5rem
- Body: 1rem (16px)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Page Structure

### 1. Home Page (index.html)
- Hero section with call-to-action
- Statistics counters
- Featured games preview
- Testimonials section
- Newsletter subscription
- Quick links to other pages

### 2. About Us (about.html)
- Company history
- Mission and vision
- Team/facilities images
- Why choose us section
- Stats and achievements

### 3. Games & Attractions (games.html)
- Game categories (Kids, Family, Adventure, Electronic)
- Individual game cards with images, descriptions, prices
- Filter functionality
- Booking buttons

### 4. Pricing & Tickets (pricing.html)
- Ticket packages (Individual, Family, Group)
- Pricing tables
- Online booking form
- Season passes
- Special offers

### 5. Events & Birthday (events.html)
- Birthday packages
- Event types
- Booking form
- Photo gallery of past events

### 6. Gallery (gallery.html)
- Photo grid
- Video section
- Filter by category

### 7. Safety & Rules (safety.html)
- Safety guidelines
- Age restrictions
- Health & safety info
- Park rules

### 8. Contact Us (contact.html)
- Contact form
- Location map (Google Maps for Diyala)
- Phone numbers
- WhatsApp integration
- Business hours
- Social media links

### 9. FAQ (faq.html)
- Accordion-style FAQ
- Search functionality
- Categories

## Business Features

### Online Booking System
- Ticket reservation form
- Event booking form
- Game booking modal
- Confirmation messages
- WhatsApp notification

### Communication
- WhatsApp floating button
- Contact forms with validation
- Newsletter subscription
- Social media integration

### Additional Features
- Testimonials section
- Opening hours display
- Location map
- SEO optimization
- Multi-language ready structure

## Technical Implementation

### File Structure
```
noor-almqadasia-park/
├── index.html
├── about.html
├── games.html
├── pricing.html
├── events.html
├── gallery.html
├── safety.html
├── contact.html
├── faq.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── (placeholder folder)
└── SPEC.md
```

### External Dependencies
- Tailwind CSS (CDN)
- Google Fonts (Cairo)
- Font Awesome 6.5
- AOS Animation Library

## Acceptance Criteria
1. All 9 pages load without errors
2. Navigation works between all pages
3. All forms are functional with validation
4. Responsive on mobile, tablet, desktop
5. Animations work smoothly
6. WhatsApp integration works
7. All sections have proper Arabic content
8. Consistent design across all pages

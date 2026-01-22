# Miti Karia Portfolio Website

A responsive website recreation of Miti Karia's PDF portfolio, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This project converts a PDF portfolio into a fully responsive, accessible web experience while maintaining pixel-level fidelity to the original design. Each PDF page becomes a scrollable section with preserved typography, colors, spacing, and imagery.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Processing**: PyMuPDF (Python)

## 📁 Project Structure

```
├── app/
│   ├── globals.css         # Global styles & Tailwind config
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main portfolio page
├── components/
│   ├── pages/              # Individual page components
│   │   ├── Page01Cover.tsx
│   │   ├── Page02About.tsx
│   │   ├── Page03Contents.tsx
│   │   ├── GenericPage.tsx
│   │   └── PageWrapper.tsx
│   ├── Navigation.tsx      # Sticky navigation
│   ├── Footer.tsx          # Footer with contact links
│   ├── LoadingScreen.tsx   # Loading state
│   └── PageRenderer.tsx    # Base page rendering component
├── public/
│   └── assets/
│       └── portfolio/
│           ├── pages/      # Extracted page images
│           ├── images/     # Extracted embedded images
│           └── metadata.json
├── scripts/
│   ├── extract_pdf_assets.py  # PDF extraction script
│   └── requirements.txt       # Python dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- npm or yarn

### Installation

1. **Clone and install dependencies**

```bash
cd /Users/ronitbhatia/Desktop/Archive
npm install
```

2. **Install Python dependencies for PDF extraction**

```bash
pip install -r scripts/requirements.txt
```

3. **Extract assets from PDF**

```bash
npm run extract-assets
# Or directly:
python3 scripts/extract_pdf_assets.py
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 PDF Asset Extraction

The extraction script (`scripts/extract_pdf_assets.py`) performs the following:

1. **Page Images**: Exports each PDF page as a 2x resolution PNG
2. **Embedded Images**: Extracts all embedded images (photos, graphics)
3. **Font Analysis**: Detects fonts used and suggests Google Font alternatives
4. **Color Analysis**: Extracts dominant colors from the document
5. **Metadata**: Generates `metadata.json` with page dimensions and text positions

### Output Structure

```
public/assets/portfolio/
├── pages/
│   ├── page-01.png
│   ├── page-02.png
│   └── ... (one per PDF page)
├── images/
│   ├── img-001-page1.png
│   └── ... (extracted embedded images)
└── metadata.json
```

## 🎨 Design Approach

### Artboard System

Each PDF page is rendered as a responsive "artboard" container:

- **Aspect Ratio**: Maintains 8.5:11 (letter) or detected page ratio
- **Max Width**: 1200px for optimal viewing
- **Scaling**: Fluid scaling for all screen sizes
- **Background**: High-res page image as backdrop
- **Overlays**: Interactive text layers for accessibility

### Typography

Font mapping (PDF → Google Fonts):

| Original Font | Google Font Alternative |
|---------------|------------------------|
| Decalotype-Bold | DM Sans (Bold) |
| ZingRust-Base | Playfair Display |
| CanvaSans (all weights) | DM Sans |
| Selima | Playfair Display (Italic) |
| HelveticaWorld | DM Sans |
| PublicSans-Regular | DM Sans |
| LeagueSpartan-Bold | DM Sans (Bold) |
| YesevaOne-Regular | Playfair Display |
| Aileron-Regular | DM Sans |

### Color Palette

```css
--color-cream: #F5F2EB;     /* Background */
--color-dark: #1A1A1A;      /* Primary text */
--color-accent: #E07B54;    /* Accent/CTA */
--color-blue: #2B4C7E;      /* Secondary */
--color-sage: #8B9A7D;      /* Tertiary */
--color-warm: #D4A574;      /* Warm accent */
--color-gray: #6B6B6B;      /* Muted text */
```

## ♿ Accessibility

- **Screen reader support**: All images have descriptive alt text
- **Keyboard navigation**: Full keyboard accessibility
- **Text selection**: Invisible text overlays allow content selection
- **Color contrast**: WCAG 2.1 AA compliant
- **Focus indicators**: Visible focus states on interactive elements

## 📱 Responsive Design

- **Desktop**: Full artboard view with side navigation dots
- **Tablet**: Scaled artboards with collapsible navigation
- **Mobile**: Full-width artboards with hamburger menu

## 🔧 Customization

### Adding New Pages

1. Add the page image to `/public/assets/portfolio/pages/`
2. Update `pageData` array in `app/page.tsx`
3. Create a custom component if needed in `/components/pages/`

### Updating Navigation

Edit `navItems` in `/components/Navigation.tsx`:

```typescript
const navItems: NavItem[] = [
  { id: 'cover', label: 'Cover', pageNumber: 1 },
  { id: 'about', label: 'About', pageNumber: 2 },
  // Add more items...
]
```

### Adjusting Colors

Update Tailwind config in `tailwind.config.ts` or CSS variables in `app/globals.css`.

## 📋 Fidelity Checklist

After extraction, verify each page (21 pages total, landscape 16:9):

- [ ] Page 1 - Cover
- [ ] Page 2 - About
- [ ] Page 3 - Contents
- [ ] Pages 4-8 - Project 1
- [ ] Pages 9-11 - Project 2
- [ ] Pages 12-15 - Project 3
- [ ] Pages 16-18 - Project 4
- [ ] Pages 19-20 - Additional Work
- [ ] Page 21 - Contact

**Check for each page:**
- [ ] Typography matches
- [ ] Colors accurate
- [ ] Spacing preserved
- [ ] Images crisp
- [ ] Interactive elements work

## 🐛 Troubleshooting

### Images not loading
- Run the extraction script first: `npm run extract-assets`
- Check that images exist in `/public/assets/portfolio/pages/`

### Fonts look different
- Verify Google Fonts are loading (check Network tab)
- Font weights may need adjustment in Tailwind config

### Page scaling issues
- Check the aspect ratio in `globals.css`
- Verify page dimensions in `metadata.json`

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run extract-assets` | Extract PDF assets |

## 📄 License

This project is for portfolio/demonstration purposes.

---

Built with ❤️ using Next.js

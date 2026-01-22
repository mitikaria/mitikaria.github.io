#!/usr/bin/env python3
"""
PDF Asset Extraction Script for Portfolio Website
Extracts pages as high-resolution PNGs and embedded images from the PDF.

Requirements:
    pip install pymupdf pillow

Usage:
    python3 scripts/extract_pdf_assets.py
    
    Or from project root:
    npm run extract-assets
"""

import os
import sys
import json
from pathlib import Path

try:
    import fitz  # PyMuPDF
    from PIL import Image
    import io
except ImportError:
    print("Missing required packages. Install with:")
    print("  pip install pymupdf pillow")
    sys.exit(1)


# Configuration
PDF_PATH = "Miti Karia Portfolio.pdf"
OUTPUT_BASE = "public/assets/portfolio"
PAGES_DIR = f"{OUTPUT_BASE}/pages"
IMAGES_DIR = f"{OUTPUT_BASE}/images"
METADATA_FILE = f"{OUTPUT_BASE}/metadata.json"

# Resolution multiplier (2x for retina, 3x for super high-res)
SCALE_FACTOR = 2.0


def ensure_directories():
    """Create output directories if they don't exist."""
    os.makedirs(PAGES_DIR, exist_ok=True)
    os.makedirs(IMAGES_DIR, exist_ok=True)
    print(f"✓ Output directories created")


def extract_page_images(doc):
    """Extract each page as a high-resolution PNG."""
    page_metadata = []
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Get page dimensions
        rect = page.rect
        width = rect.width
        height = rect.height
        
        # Create high-res matrix for rendering
        mat = fitz.Matrix(SCALE_FACTOR, SCALE_FACTOR)
        
        # Render page to pixmap
        pix = page.get_pixmap(matrix=mat, alpha=False)
        
        # Save as PNG
        filename = f"page-{str(page_num + 1).zfill(2)}.png"
        filepath = os.path.join(PAGES_DIR, filename)
        pix.save(filepath)
        
        # Extract text blocks for overlay positioning
        text_blocks = page.get_text("dict", flags=fitz.TEXT_PRESERVE_WHITESPACE)
        
        # Collect text data for positioning
        text_data = []
        for block in text_blocks.get("blocks", []):
            if block.get("type") == 0:  # Text block
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        text_data.append({
                            "text": span.get("text", ""),
                            "bbox": span.get("bbox", []),
                            "font": span.get("font", ""),
                            "size": span.get("size", 12),
                            "color": span.get("color", 0),
                            "flags": span.get("flags", 0),
                        })
        
        page_metadata.append({
            "page": page_num + 1,
            "filename": filename,
            "width": width,
            "height": height,
            "scaled_width": pix.width,
            "scaled_height": pix.height,
            "text_blocks": text_data[:100],  # Limit for manageable JSON
        })
        
        print(f"  Page {page_num + 1}/{len(doc)}: {filename} ({pix.width}x{pix.height})")
    
    return page_metadata


def extract_embedded_images(doc):
    """Extract all embedded images from the PDF."""
    image_metadata = []
    image_count = 0
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images(full=True)
        
        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            
            try:
                # Extract image
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Generate filename
                image_count += 1
                filename = f"img-{str(image_count).zfill(3)}-page{page_num + 1}.{image_ext}"
                filepath = os.path.join(IMAGES_DIR, filename)
                
                # Save image
                with open(filepath, "wb") as img_file:
                    img_file.write(image_bytes)
                
                # Get image dimensions
                img = Image.open(io.BytesIO(image_bytes))
                
                image_metadata.append({
                    "filename": filename,
                    "page": page_num + 1,
                    "width": img.width,
                    "height": img.height,
                    "format": image_ext,
                    "xref": xref,
                })
                
                print(f"  Image {image_count}: {filename} ({img.width}x{img.height})")
                
            except Exception as e:
                print(f"  Warning: Could not extract image {xref} from page {page_num + 1}: {e}")
    
    return image_metadata


def detect_colors(doc):
    """Analyze document for dominant colors."""
    colors = set()
    
    for page_num in range(min(5, len(doc))):  # Sample first 5 pages
        page = doc[page_num]
        text_dict = page.get_text("dict")
        
        for block in text_dict.get("blocks", []):
            if block.get("type") == 0:
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        color = span.get("color", 0)
                        if color:
                            # Convert integer color to hex
                            r = (color >> 16) & 0xFF
                            g = (color >> 8) & 0xFF
                            b = color & 0xFF
                            hex_color = f"#{r:02x}{g:02x}{b:02x}"
                            colors.add(hex_color)
    
    return list(colors)


def detect_fonts(doc):
    """Extract font information from the document."""
    fonts = {}
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text_dict = page.get_text("dict")
        
        for block in text_dict.get("blocks", []):
            if block.get("type") == 0:
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        font = span.get("font", "unknown")
                        size = span.get("size", 12)
                        
                        if font not in fonts:
                            fonts[font] = {"sizes": set(), "count": 0}
                        fonts[font]["sizes"].add(round(size, 1))
                        fonts[font]["count"] += 1
    
    # Convert sets to lists for JSON
    for font in fonts:
        fonts[font]["sizes"] = sorted(list(fonts[font]["sizes"]))
    
    return fonts


def main():
    """Main extraction function."""
    print("\n" + "=" * 60)
    print("Portfolio PDF Asset Extraction")
    print("=" * 60 + "\n")
    
    # Check if PDF exists
    if not os.path.exists(PDF_PATH):
        print(f"Error: PDF not found at '{PDF_PATH}'")
        print("Make sure you're running this script from the project root.")
        sys.exit(1)
    
    print(f"Source: {PDF_PATH}")
    print(f"Output: {OUTPUT_BASE}/\n")
    
    # Create directories
    ensure_directories()
    
    # Open PDF
    doc = fitz.open(PDF_PATH)
    print(f"✓ PDF opened: {len(doc)} pages\n")
    
    # Extract page images
    print("Extracting page images...")
    page_metadata = extract_page_images(doc)
    print(f"✓ Extracted {len(page_metadata)} pages\n")
    
    # Extract embedded images
    print("Extracting embedded images...")
    image_metadata = extract_embedded_images(doc)
    print(f"✓ Extracted {len(image_metadata)} images\n")
    
    # Detect fonts
    print("Analyzing fonts...")
    fonts = detect_fonts(doc)
    print(f"✓ Found {len(fonts)} font families\n")
    
    # Detect colors
    print("Analyzing colors...")
    colors = detect_colors(doc)
    print(f"✓ Found {len(colors)} colors\n")
    
    # Generate font mapping suggestions
    font_mapping = {}
    for font_name in fonts:
        # Suggest Google Font alternatives
        lower = font_name.lower()
        if "playfair" in lower:
            font_mapping[font_name] = "Playfair Display"
        elif "dm sans" in lower or "dmsans" in lower:
            font_mapping[font_name] = "DM Sans"
        elif "helvetica" in lower or "arial" in lower:
            font_mapping[font_name] = "DM Sans"
        elif "georgia" in lower or "times" in lower:
            font_mapping[font_name] = "Playfair Display"
        elif "mono" in lower or "courier" in lower:
            font_mapping[font_name] = "JetBrains Mono"
        else:
            font_mapping[font_name] = "DM Sans"  # Default fallback
    
    # Save metadata
    metadata = {
        "source_pdf": PDF_PATH,
        "total_pages": len(doc),
        "scale_factor": SCALE_FACTOR,
        "pages": page_metadata,
        "images": image_metadata,
        "fonts": fonts,
        "font_mapping": font_mapping,
        "colors": colors,
    }
    
    with open(METADATA_FILE, "w") as f:
        json.dump(metadata, f, indent=2)
    
    print(f"✓ Metadata saved to {METADATA_FILE}")
    
    # Print summary
    print("\n" + "=" * 60)
    print("EXTRACTION COMPLETE")
    print("=" * 60)
    print(f"\nPages extracted: {len(page_metadata)}")
    print(f"Images extracted: {len(image_metadata)}")
    print(f"Fonts detected: {list(fonts.keys())}")
    print(f"Colors detected: {colors[:10]}{'...' if len(colors) > 10 else ''}")
    print(f"\nFiles saved to: {OUTPUT_BASE}/")
    print("  └── pages/      (page renders)")
    print("  └── images/     (embedded images)")
    print("  └── metadata.json")
    
    # Font mapping suggestions
    print("\nSuggested Font Mapping (Google Fonts):")
    for original, suggested in font_mapping.items():
        print(f"  {original} → {suggested}")
    
    doc.close()
    print("\n✓ Done!\n")


if __name__ == "__main__":
    main()

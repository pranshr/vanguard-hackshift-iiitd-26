# Madhuvan Storefront Shot List

Every visual slot in the redesigned Madhuvan storefront is documented here with its required asset path, aspect ratio, resolution, and fallback behavior. The frontend implements `<ProductImage />`, which gracefully displays an apothecary-tinted fallback with floral swatch and "Photo pending" badge if the asset is not yet in the filesystem.

---

## 1. Hero & Atmosphere
- **`hero.jpg`**
  - **Usage**: Homepage full-bleed hero background (`/`), and `/our-story` scroll-reveal zoom element.
  - **Subject**: Macro honey pour into a glass jar or wooden dipper; backlit natural sunlight; warm golden amber tones. No bee clipart or drips.
  - **Aspect Ratio**: 16:9 (desktop) and 4:5 (mobile). Minimum resolution: 2560 × 1440.
  - **Fallback**: Rich warm radial gradient (`#FAF6EF` to `#E3DACB` with amber glow).

- **`orchard.jpg`**
  - **Usage**: `/our-story` panoramic terroir landscape break.
  - **Subject**: Indian floral terroir (Muzaffarpur litchi orchard in bloom, Kashmiri acacia mountain valley, or Sundarbans buffer).
  - **Aspect Ratio**: 21:9 ultra-wide banner. Minimum resolution: 2560 × 1097.
  - **Fallback**: Atmospheric landscape gradient block with terroir topography cue.

- **`footer-field.jpg`**
  - **Usage**: Full-bleed footer background across all storefront pages.
  - **Subject**: High-angle or horizon view of blooming floral field (yellow mustard or litchi blossoms).
  - **Aspect Ratio**: 21:9 or 16:9 panoramic. Minimum resolution: 2560 × 1080.
  - **Fallback**: Forest-toned botanical gradient overlay with Fraunces serif wordmark.

---

## 2. Jars & Product Packaging
- **`honey-litchi.jpg`**
  - **Usage**: Muzaffarpur Litchi Blossom product card (`/shop`, `/`, `/shop/muzaffarpur-litchi`).
  - **Subject**: Minimalist 250g/500g glass jar with dark amber lid, backlit showcasing light golden amber honey (`#E5A93C`). Clean white/cream background, subtle shadow.
  - **Aspect Ratio**: 4:5. Minimum resolution: 1200 × 1500.
  - **Fallback**: Tinted container with hex `#E5A93C` swatch, apothecary label, and "Photo pending" badge.

- **`honey-acacia.jpg`**
  - **Usage**: Kashmir White Acacia product card (`/shop`, `/`, `/shop/kashmir-white-acacia`).
  - **Subject**: Glass jar with pale white-amber, crystal-clear acacia honey (`#F3E2B8`). Backlit.
  - **Aspect Ratio**: 4:5. Minimum resolution: 1200 × 1500.
  - **Fallback**: Tinted container with hex `#F3E2B8` swatch, apothecary label, and "Photo pending" badge.

- **`honey-mangrove.jpg`**
  - **Usage**: Sundarbans Wild Mangrove product card (`/shop`, `/`, `/shop/sundarbans-wild-mangrove`).
  - **Subject**: Glass jar with deep mahogany amber mangrove honey (`#5E300A`). Backlit.
  - **Aspect Ratio**: 4:5. Minimum resolution: 1200 × 1500.
  - **Fallback**: Tinted container with hex `#5E300A` swatch, apothecary label, and "Photo pending" badge.

- **`honey-trio.jpg`**
  - **Usage**: The Terroir Tasting Trio gift set (`/`, `/our-story`, `/shop`).
  - **Subject**: 3 × 150g hexagonal or round glass jars in an untreated kraft gift sleeve, showing the 3 distinct floral colors side by side.
  - **Aspect Ratio**: 4:5 or 16:9. Minimum resolution: 1600 × 1200.
  - **Fallback**: 3-swatch tasting flight card with kraft border.

---

## 3. Trust, Traceability & Apiculture
- **`lid-qr.jpg`**
  - **Usage**: "Scan the lid" banner on Home (`/`) and PDP gallery callout.
  - **Subject**: Macro close-up of the jar lid with high-contrast laser-etched HoneyChain QR code seal.
  - **Aspect Ratio**: 1:1 square or 4:3. Minimum resolution: 1000 × 1000.
  - **Fallback**: High-resolution SVG rendered QR seal graphic with batch hash label.

- **`hive.jpg`**
  - **Usage**: "We listen to our hives" nature break on Home (`/`) and `/our-hives`.
  - **Subject**: Real apiary wooden hive box with electronic load cell scale underneath and waterproof IoT sensor node mounted discreetly.
  - **Aspect Ratio**: 16:9 or 21:9. Minimum resolution: 1920 × 1080.
  - **Fallback**: Muted botanical meadow photography canvas with circle diagram overlay.

- **`hand-jar.jpg`**
  - **Usage**: "How to use" section on PDP (`/shop/[slug]`).
  - **Subject**: Hand holding a raw honey jar with a wooden spoon dipping into the golden texture.
  - **Aspect Ratio**: 4:5 or 1:1. Minimum resolution: 1200 × 1500.
  - **Fallback**: Amber textured card with 2×2 pairing grid.

- **`spoon.jpg`**
  - **Usage**: `/our-story` scroll reveal and sensory texture break.
  - **Subject**: Hand-carved wooden spoon dripping thick, unheated honey.
  - **Aspect Ratio**: 1:1 square. Minimum resolution: 1000 × 1000.
  - **Fallback**: Honey texture gradient container.

- **`beekeeper.jpg`**
  - **Usage**: "Meet Ramdas Mahato" beekeeper feature card (`/`, `/our-story`).
  - **Subject**: Real apiarist portrait in field apiary suit. (Tagged as "Demo profile" until verified consent is recorded).
  - **Aspect Ratio**: 4:5. Minimum resolution: 1000 × 1250.
  - **Fallback**: Apiary portrait placeholder with demo profile tag and quote.

- **`team.jpg`**
  - **Usage**: "Where it all began" founders origin section on `/our-story`.
  - **Subject**: BEE safe founding team working on apiculture IoT sensors and honey provenance.
  - **Aspect Ratio**: 16:9 or 4:3. Minimum resolution: 1600 × 1200.
  - **Fallback**: Modern clean team card with provenance and hardware architecture context.

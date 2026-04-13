import adminShowingImg from "../assets/blog/testimonial/admin-showing.png";
import testimonialExampleImg from "../assets/blog/testimonial/testimonial-eg.png";
import relatedProductsImg from "../assets/blog/related-products/related-products.png";

export type BlogParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type BlogImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
};

export type BlogCodeBlock = {
  type: "code";
  code: string;
  language?: string;
  filename?: string;
};

export type BlogContentBlock = BlogParagraphBlock | BlogImageBlock | BlogCodeBlock;

export type BlogSection = {
  heading?: string;
  blocks: BlogContentBlock[];
};

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  sections: BlogSection[];
};

const blogPosts: BlogPost[] = [
  {
    title: "How to Develop a Customizable Testimonial Slider Section in Shopify",
    slug: "develop-customizable-testimonial-slider-section-shopify",
    date: "2026-04-13",
    excerpt:
      "A full walkthrough for building a Shopify testimonial slider section that merchants can configure from Theme Editor, including Liquid schema, autoplay, arrows, dots, and touch support.",
    tags: ["Shopify", "Liquid", "Theme Development", "Slider"],
    readTime: "8 min read",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "This task focuses on building a reusable testimonial slider section that can be dropped onto any page and fully managed by a merchant in Shopify Theme Editor.",
          },
          {
            type: "paragraph",
            text: "The section must support create, update, remove, and reorder for testimonial cards. Each card includes customer name, customer photo, testimonial text, and star rating with 0.5 increments.",
          },
          {
            type: "paragraph",
            text: "Slider behavior must include autoplay, arrow navigation, pagination dots, and mobile touch/swipe support while staying responsive across desktop, tablet, and mobile.",
          },
        ],
      },
      {
        heading: "Task Setup",
        blocks: [
          {
            type: "paragraph",
            text: "Before coding, install Shopify CLI globally, create a development store, and connect the local theme with shopify theme dev.",
          },
          {
            type: "code",
            language: "bash",
            filename: "shopify-cli-commands.sh",
            code: `# Install CLI (if not already installed)
npm install -g @shopify/cli @shopify/theme

# Login and run theme in development mode
shopify auth login
shopify theme dev`,
          },
          {
            type: "paragraph",
            text: "Create these files in your theme:",
          },
          {
            type: "code",
            language: "txt",
            filename: "required-files.txt",
            code: `sections/testimonial-slider.liquid
assets/testimonial-slider.js
assets/testimonial-slider.css`,
          },
        ],
      },
      {
        heading: "Section Requirements",
        blocks: [
          {
            type: "paragraph",
            text: "The schema should expose customizable controls for title, autoplay toggle, autoplay speed in seconds, per-view slide count for desktop/tablet/mobile, and a toggle for navigation and dots.",
          },
          {
            type: "paragraph",
            text: "Testimonial blocks should be capped at 8 and include image_picker for customer photo, text for customer name, richtext for testimonial content, and range 1 to 5 with 0.5 step for star rating.",
          },
          {
            type: "paragraph",
            text: "For accessibility, include aria labels for controls and rating output, and ensure keyboard navigation is possible for previous/next actions.",
          },
          {
            type: "image",
            src: testimonialExampleImg,
            alt: "Testimonial slider section preview with three testimonial cards, arrow controls, and pagination dots",
            caption: "Frontend result preview of the testimonial slider with cards, controls, and spacing.",
          },
          {
            type: "image",
            src: adminShowingImg,
            alt: "Shopify Theme Editor sidebar showing Testimonial Slider section configuration",
            caption: "Theme Editor view where merchants can add and customize the Testimonial Slider section.",
          },
        ],
      },
      {
        heading: "testimonial-slider.liquid",
        blocks: [
          {
            type: "paragraph",
            text: "Instead of one very long snippet, this section is split into small parts so each responsibility is easier to understand and review.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 1: Intro + CSS include)",
            code: `{% comment %}
  Testimonial slider section

  Purpose:
  - Provide a reusable testimonial carousel that merchants can add to pages.
  - Expose key controls in Theme Editor: title, autoplay, speed, navigation, and responsive slides-per-view.
  - Allow up to 8 testimonial blocks that can be added/removed/reordered by merchants.

  Related assets:
  - CSS: assets/testimonial-slider.css
  - JS: assets/testimonial-slider.js
{% endcomment %}

{{ 'testimonial-slider.css' | asset_url | stylesheet_tag }}
`,
          },
          {
            type: "paragraph",
            text: "Part 1 explains what the section does and loads the stylesheet used by the slider.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 2: Section root + data attributes)",
            code: `{% comment %}
  Root section element
  - data-* attributes are consumed by JavaScript to initialize behavior.
  - autoplay_speed is configured in seconds in schema, then converted to milliseconds for JS.
  - per_view_desktop/tablet/mobile control responsive slides visible at each breakpoint.
{% endcomment %}

<section
  class="testimonial-slider"
  id="TestimonialSlider-{{ section.id }}"
  data-autoplay="{{ section.settings.autoplay }}"
  data-speed="{{ section.settings.autoplay_speed | times: 1000 }}"
  data-desktop="{{ section.settings.per_view_desktop }}"
  data-tablet="{{ section.settings.per_view_tablet }}"
  data-mobile="{{ section.settings.per_view_mobile }}"
>
  <div class="slider-wrapper">
    {% comment %}
      Section heading editable from Theme Editor.
      Requirement mapping: "Edit section title".
    {% endcomment %}
    <h2 class="slider-title">{{ section.settings.title }}</h2>`
          },
          {
            type: "paragraph",
            text: "Part 2 creates the section wrapper and passes configurable settings to JavaScript through data attributes.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 3: Testimonial cards loop)",
            code: `    {% comment %}
      Swiper-like structure:
      - .swiper-container: slider viewport/instance root
      - .swiper-wrapper: track element
      - .swiper-slide: each testimonial card
    {% endcomment %}
    <div class="swiper-container">
      <div class="swiper-wrapper">
        {% comment %}
          Dynamic testimonial blocks.
          Merchants can add/remove/reorder in Theme Editor.
          Maximum count is enforced in schema (limit: 8).
        {% endcomment %}
        {% for block in section.blocks %}
          <div class="swiper-slide testimonial-card" {{ block.shopify_attributes }}>
            <div class="testimonial-image">
              {% comment %}
                Customer photo:
                - Uses image picker when provided.
                - Falls back to placeholder SVG when missing.
                - Image is requested at a square ratio for circular presentation in CSS.
              {% endcomment %}
              {% if block.settings.customer_photo %}
                {{
                  block.settings.customer_photo
                  | image_url: width: 150, height: 150, crop: 'center'
                  | image_tag: loading: 'lazy'
                }}
              {% else %}
                {{ 'image' | placeholder_svg_tag }}
              {% endif %}
            </div>

            {% comment %}
              Star rating area:
              - Exposes rating in accessible text via aria-label and image alt.
              - Star icon source comes from assets as requested.
              Note: visual rendering details (single vs repeated icons, half-stars) are handled by theme implementation choices.
            {% endcomment %}
            <div class="testimonial-stars" aria-label="Rating: {{ block.settings.rating }} stars">
              <img
                src="{{ 'icon-star.svg' | asset_url }}"
                alt="Rating: {{ block.settings.rating }} stars"
                width="24"
                height="24"
              >
            </div>

            {% comment %}
              Core testimonial content:
              - Rich text quote body.
              - Customer name.
            {% endcomment %}
            <div class="testimonial-text">{{ block.settings.testimonial_text }}</div>
            <p class="testimonial-name">
              <strong>{{ block.settings.customer_name }}</strong>
            </p>
          </div>
        {% endfor %}
      </div>`
          },
          {
            type: "paragraph",
            text: "Part 3 handles merchant-managed testimonial blocks, including photo fallback, star area, and text fields.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 4: Navigation + close section)",
            code: `      {% comment %}
        Optional controls:
        - Previous/next arrows and pagination dots are rendered only when enabled.
        - aria-label values improve control discoverability for assistive technologies.
      {% endcomment %}
      {% if section.settings.show_nav %}
        <div class="slider-arrows">
          <button class="prev-arrow" type="button" aria-label="Previous slide">&larr;</button>
          <button class="next-arrow" type="button" aria-label="Next slide">&rarr;</button>
        </div>
        <div class="slider-pagination"></div>
      {% endif %}
    </div>
  </div>
</section>`
          },
          {
            type: "paragraph",
            text: "Part 4 conditionally renders navigation controls and closes the slider structure.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 5: JS include)",
            code: `{% comment %}
  Slider behavior script:
  - Initializes autoplay/navigation/pagination/touch interactions.
  - Reads data-* configuration from the section root.
  - defer avoids blocking initial render.
{% endcomment %}
<script src="{{ 'testimonial-slider.js' | asset_url }}" defer="defer"></script>`
          },
          {
            type: "paragraph",
            text: "Part 5 loads JavaScript for autoplay, arrows, dots, and touch/swipe behavior.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/testimonial-slider.liquid (Part 6: Schema)",
            code: `{% schema %}
{
  "name": "Testimonial Slider",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "default": "Customer Reviews"
    },
    {
      "type": "checkbox",
      "id": "autoplay",
      "label": "Enable Autoplay",
      "default": true
    },
    {
      "type": "range",
      "id": "autoplay_speed",
      "min": 2,
      "max": 10,
      "step": 1,
      "unit": "sec",
      "label": "Autoplay Speed",
      "default": 5
    },
    {
      "type": "range",
      "id": "per_view_desktop",
      "min": 1,
      "max": 4,
      "step": 1,
      "label": "Visible (Desktop)",
      "default": 3
    },
    {
      "type": "range",
      "id": "per_view_tablet",
      "min": 1,
      "max": 3,
      "step": 1,
      "label": "Visible (Tablet)",
      "default": 2
    },
    {
      "type": "range",
      "id": "per_view_mobile",
      "min": 1,
      "max": 3,
      "step": 1,
      "label": "Visible (Mobile)",
      "default": 1
    },
    {
      "type": "checkbox",
      "id": "show_nav",
      "label": "Show Navigation & Dots",
      "default": true
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "limit": 8,
      "settings": [
        { "type": "image_picker", "id": "customer_photo", "label": "Photo" },
        { "type": "text", "id": "customer_name", "label": "Customer Name", "default": "Jane Doe" },
        {
          "type": "richtext",
          "id": "testimonial_text",
          "label": "Testimonial Text",
          "default": "<p>Excellent service!</p>"
        },
        {
          "type": "range",
          "id": "rating",
          "min": 1,
          "max": 5,
          "step": 0.5,
          "label": "Star Rating",
          "default": 5
        }
      ]
    }
  ],
  "presets": [{ "name": "Testimonial Slider" }]
}
{% endschema %}`,
          },
        ],
      },
      {
        heading: "Deliverables Checklist",
        blocks: [
          {
            type: "paragraph",
            text: "The final result should include one Liquid section with schema, one JavaScript file handling autoplay/navigation/touch behavior, and one CSS file for layout and visual styling.",
          },
          {
            type: "paragraph",
            text: "When done correctly, merchants can manage testimonials directly in Theme Editor and the slider remains responsive, accessible, and consistent with the provided visualization.",
          },
        ],
      },
    ],
  },
  {
    title: "How to Build a Related Products Section in Shopify",
    slug: "build-related-products-section-shopify",
    date: "2026-04-13",
    excerpt:
      "Complete guide to creating a responsive related products grid in Shopify with images, titles, prices, ratings, and AJAX cart integration. Learn schema configuration, responsive layouts, and accessibility best practices.",
    tags: ["Shopify", "Liquid", "Theme Development", "E-commerce", "Grid Layout"],
    readTime: "10 min read",
    sections: [
      {
        blocks: [
          {
            type: "paragraph",
            text: "Building a related products section is a key feature for any modern Shopify storefront. This section displays products from the same collection, helping customers discover complementary items and increase average order value.",
          },
          {
            type: "paragraph",
            text: "The section should be responsive (4 columns on desktop, 2 on tablets, 1 on mobile), display product details with ratings and pricing, and support AJAX-based add-to-cart functionality without page reload.",
          },
          {
            type: "paragraph",
            text: "Merchants must be able to customize the section from Theme Editor, including title alignment/size, card width, CTA text, and toggleable visibility for ratings and collection titles.",
          },
          {
            type: "image",
            src: relatedProductsImg,
            alt: "Related Products section showing four product cards in a grid layout with images, titles, ratings, prices, and Add to Cart buttons",
            caption: "Visual example of a responsive related products section displaying four featured products with all required information.",
          },
        ],
      },
      {
        heading: "Task Setup & Prerequisites",
        blocks: [
          {
            type: "paragraph",
            text: "Before starting, ensure you have Shopify CLI installed globally, a development store created, and the theme connected via shopify theme dev.",
          },
          {
            type: "code",
            language: "bash",
            filename: "setup-commands.sh",
            code: `# Install Shopify CLI (if not already installed)
npm install -g @shopify/cli @shopify/theme

# Login to your Shopify account
shopify auth login

# Run theme in development mode
shopify theme dev`,
          },
          {
            type: "paragraph",
            text: "Create the following files in your theme directory:",
          },
          {
            type: "code",
            language: "txt",
            filename: "required-files.txt",
            code: `sections/related-products.liquid
snippets/product-card.liquid
assets/related-products.css
assets/related-products.js`,
          },
        ],
      },
      {
        heading: "Data Source & Product Selection",
        blocks: [
          {
            type: "paragraph",
            text: "The related products section pulls from the first collection where the current product exists. This ensures logical grouping of similar items.",
          },
          {
            type: "paragraph",
            text: "Key requirements for product selection:",
          },
          {
            type: "code",
            language: "txt",
            filename: "selection-rules.txt",
            code: `✓ Load only the first 4 products from the first collection
✓ Exclude the current product from the display
✓ Show only available variants
✓ Display only on Product Details Page (PDP)
✓ Handle missing metafields gracefully (rating defaults to 0)`,
          },
        ],
      },
      {
        heading: "Product Card Requirements",
        blocks: [
          {
            type: "paragraph",
            text: "Each product card must include specific information displayed in a clean, organized manner:",
          },
          {
            type: "code",
            language: "txt",
            filename: "card-components.txt",
            code: `Card Image:
  - Current variant image at 350px width
  - Lazy loading for performance
  - Fallback white box if image missing

Card Information:
  - Collection title (1 line max, trimmed)
  - Variant title or product title (2 lines max)
  - Rating from metafield (reviews.rating), default 0
  - Current variant price with money filter
  - Compare at price (strikethrough, gray text) if available
  - Variant selector (if product has multiple variants)
  - "Sale!" badge if product has 'sale' tag (case-insensitive)

CTA Button:
  - Text from section settings (default: "Add to Cart")
  - AJAX add-to-cart functionality
  - 1 line max text with ellipsis overflow`,
          },
        ],
      },
      {
        heading: "sections/related-products.liquid",
        blocks: [
          {
            type: "paragraph",
            text: "The main section file handles the layout, product loop, and schema configuration. It uses a dedicated product-card snippet for rendering individual cards.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "sections/related-products.liquid",
            code: `{%- liquid
  assign current_product = product
  assign first_collection = current_product.collections.first
  assign card_width = section.settings.card_max_width | append: 'px'
  assign title_alignment = section.settings.title_alignment | default: 'center'
  assign title_size = section.settings.title_size | default: 24
-%}

{{ 'related-products.css' | asset_url | stylesheet_tag }}

<section
  class="related-products"
  style="--card-max-width: {{ card_width }}; --related-title-size: {{ title_size }}px; --related-title-align: {{ title_alignment }};"
>
  <div class="container">
    {% if section.settings.title != blank %}
      <h2 class="related-products__title" title="{{ section.settings.title | escape }}">
        {{ section.settings.title }}
      </h2>
    {% endif %}

    <div class="product-grid" role="list">
      {% assign count = 0 %}
      {% if first_collection %}
        {% for related_product in first_collection.products %}
          {% if related_product.id != current_product.id and related_product.available and count < 4 %}
            <div role="listitem" class="product-grid__item">
              {% render 'product-card',
                product: related_product,
                section_settings: section.settings
              %}
            </div>
            {% assign count = count | plus: 1 %}
          {% endif %}
        {% endfor %}
      {% endif %}
    </div>
  </div>
</section>

<script src="{{ 'related-products.js' | asset_url }}" defer="defer"></script>

{% schema %}
{
  "name": "Related Products",
  "limit": 1,
  "enabled_on": {
    "templates": ["product"]
  },
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Section Title",
      "default": "Related Products"
    },
    {
      "type": "select",
      "id": "title_alignment",
      "label": "Title Alignment",
      "options": [
        { "value": "left", "label": "Left" },
        { "value": "center", "label": "Center" },
        { "value": "right", "label": "Right" }
      ],
      "default": "center"
    },
    {
      "type": "range",
      "id": "title_size",
      "min": 16,
      "max": 48,
      "step": 2,
      "unit": "px",
      "label": "Title Size",
      "default": 24
    },
    {
      "type": "range",
      "id": "card_max_width",
      "min": 150,
      "max": 350,
      "step": 10,
      "unit": "px",
      "label": "Card Max Width",
      "default": 250
    },
    {
      "type": "text",
      "id": "cta_text",
      "label": "CTA Text",
      "default": "Add to Cart"
    },
    {
      "type": "checkbox",
      "id": "show_rating",
      "label": "Show Rating",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_collection",
      "label": "Show Collection Title",
      "default": true
    }
  ],
  "presets": [
    {
      "name": "Related Products"
    }
  ]
}
{% endschema %}`,
          },
          {
            type: "paragraph",
            text: "Key implementation details: CSS custom properties (variables) allow dynamic card width and title styling without inline styles. The schema limits the section to one per page (enabled only on product templates). The merchant-facing settings expose title customization, card sizing, and toggles for optional features.",
          },
        ],
      },
      {
        heading: "snippets/product-card.liquid",
        blocks: [
          {
            type: "paragraph",
            text: "The product card snippet encapsulates the rendering of individual product cards, making the code modular and reusable.",
          },
          {
            type: "code",
            language: "liquid",
            filename: "snippets/product-card.liquid",
            code: `{% comment %}
Product card snippet for related products section.
Renders: image, collection title, product info, rating, pricing, and variants.
- product: the product object
- section_settings: section configuration (toggles, text, etc.)
{% endcomment %}

{% assign variant = product.selected_or_first_available_variant %}
{% assign has_sale_tag = product.tags | join: ',' | downcase | contains: 'sale' %}

<div class="product-card">
  {% comment %} Product Image {% endcomment %}
  <div class="product-card__image-wrapper">
    {% if variant.image %}
      <img
        src="{{ variant | image_url: width: 350 }}"
        alt="{{ variant.image.alt | escape }}"
        loading="lazy"
        class="product-card__image"
      >
    {% else %}
      <div class="product-card__image-placeholder">No Image</div>
    {% endif %}

    {% comment %} Sale Badge {% endcomment %}
    {% if has_sale_tag %}
      <span class="product-card__sale-badge">Sale!</span>
    {% endif %}
  </div>

  <div class="product-card__body">
    {% comment %} Collection Title {% endcomment %}
    {% if section_settings.show_collection and product.collections.first %}
      <p class="product-card__collection" title="{{ product.collections.first.title | escape }}">
        {{ product.collections.first.title }}
      </p>
    {% endif %}

    {% comment %} Product/Variant Title {% endcomment %}
    <h3 class="product-card__title">
      <a href="{{ product.url }}" title="{{ product.title | escape }}">
        {% if variant.title != 'Default Title' %}
          {{ variant.title }}
        {% else %}
          {{ product.title }}
        {% endif %}
      </a>
    </h3>

    {% comment %} Rating (from metafield) {% endcomment %}
    {% if section_settings.show_rating %}
      {% assign rating = product.metafields.reviews.rating.value | default: 0 %}
      <div class="product-card__rating" aria-label="Rating: {{ rating }} out of 5 stars">
        Rating: {{ rating }}
      </div>
    {% endif %}

    {% comment %} Pricing {% endcomment %}
    <div class="product-card__price">
      {% if variant.compare_at_price and variant.compare_at_price > variant.price %}
        <span class="product-card__compare-price">
          {{ variant.compare_at_price | money }}
        </span>
      {% endif %}
      <span class="product-card__current-price">
        {{ variant.price | money }}
      </span>
    </div>

    {% comment %} Variant Selector (only if multiple variants) {% endcomment %}
    {% if product.variants.size > 1 %}
      <select class="product-card__variant-select" aria-label="Select variant">
        {% for variant in product.variants %}
          <option value="{{ variant.id }}" {% if variant == product.selected_or_first_available_variant %}selected{% endif %}>
            {{ variant.title }}
          </option>
        {% endfor %}
      </select>
    {% else %}
      <input type="hidden" class="product-card__variant-select" value="{{ variant.id }}" />
    {% endif %}

    {% comment %} Add to Cart Button {% endcomment %}
    <button
      class="product-card__cta ajax-add"
      type="button"
      title="{{ section_settings.cta_text | escape }}"
      aria-label="Add {{ product.title }} to cart"
    >
      {{ section_settings.cta_text }}
    </button>
  </div>
</div>`,
          },
          {
            type: "paragraph",
            text: "The product card snippet handles image fallback, sale badge detection (case-insensitive), optional collection and rating display, pricing with compare price, variant selection, and AJAX-ready cart buttons.",
          },
        ],
      },
      {
        heading: "assets/related-products.css",
        blocks: [
          {
            type: "paragraph",
            text: "CSS creates a responsive grid layout using CSS Grid with responsive breakpoints and implements all visual styling requirements.",
          },
          {
            type: "code",
            language: "css",
            filename: "assets/related-products.css",
            code: `.related-products {
  padding: 2rem 0;
}

.related-products__title {
  margin: 0 0 1.25rem;
  text-align: var(--related-title-align);
  font-size: var(--related-title-size);
  line-height: 1.2;
}

.product-grid {
  display: grid;
  gap: 20px;
  justify-content: center;
  justify-items: center;
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

.product-grid__item {
  width: 100%;
  max-width: var(--card-max-width);
}

.product-grid__item .product-card {
  max-width: var(--card-max-width) !important;
  height: 100%;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Text truncation with line clamping */
.product-card__collection {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 0.5rem;
}

.product-card__title a {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__cta {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Pricing styles */
.product-card__current-price {
  color: #000;
  font-weight: bold;
}

.product-card__compare-price {
  color: #888;
  text-decoration: line-through;
  margin-right: 5px;
}

/* Sale badge positioning */
.product-card__sale-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 12px;
}

.product-card__image-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

/* Image placeholder for missing images */
.product-card__image-placeholder {
  background-color: #f5f5f5;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}`,
          },
        ],
      },
      {
        heading: "assets/related-products.js",
        blocks: [
          {
            type: "paragraph",
            text: "JavaScript handles AJAX cart functionality, allowing customers to add products directly from the related products section without page reload.",
          },
          {
            type: "code",
            language: "javascript",
            filename: "assets/related-products.js",
            code: `if (!window.__relatedProductsAjaxBound) {
    window.__relatedProductsAjaxBound = true;

    document.addEventListener('click', function (event) {
        const button = event.target.closest('.ajax-add');
        if (!button) {
            return;
        }

        const card = button.closest('.product-card');
        if (!card) {
            return;
        }

        const variantInput = card.querySelector('.product-card__variant-select');
        if (!variantInput || !variantInput.value) {
            return;
        }

        event.preventDefault();
        button.disabled = true;

        const payload = {
            items: [
                {
                    id: Number(variantInput.value),
                    quantity: 1,
                },
            ],
        };

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Add to cart request failed');
                }

                return response.json();
            })
            .then(function () {
                button.disabled = false;
                // Optionally update cart UI or show confirmation
            })
            .catch(function (error) {
                console.error(error);
                button.disabled = false;
            });
    });
}`,
          },
          {
            type: "paragraph",
            text: "The script uses event delegation to handle cart button clicks, preventing the default form submission, retrieving the selected variant ID, and making a Fetch API call to Shopify's cart endpoint with the correct JSON payload.",
          },
        ],
      },
      {
        heading: "Styling & Accessibility Best Practices",
        blocks: [
          {
            type: "paragraph",
            text: "Text elements use CSS line-clamping for consistent truncation with title attributes for full-text hover tooltips. Product cards maintain aligned height and width using CSS Grid's justify-items and max-width constraints.",
          },
          {
            type: "paragraph",
            text: "For accessibility: all images include descriptive alt tags, buttons have proper aria-labels, variant selects are keyboard navigable, and the grid uses semantic role='list' and role='listitem' attributes.",
          },
          {
            type: "paragraph",
            text: "Images use Shopify's image_url filter to optimize dimensions (350px width), and lazy loading is enabled via the loading='lazy' attribute. Cache headers ensure efficient image delivery.",
          },
        ],
      },
      {
        heading: "Metafields & Product Tags Setup",
        blocks: [
          {
            type: "paragraph",
            text: "Before deploying, manually create a metafield for product ratings in the Shopify admin:",
          },
          {
            type: "code",
            language: "txt",
            filename: "metafield-setup.txt",
            code: `Namespace: reviews
Key: rating
Type: number_decimal
Display name: Product Rating
Example value: 4.5`,
          },
          {
            type: "paragraph",
            text: "For sale badges, ensure products have a 'sale' tag (case-insensitive). The Liquid code checks product tags with downcase and contains filters.",
          },
        ],
      },
      {
        heading: "Key Takeaways",
        blocks: [
          {
            type: "paragraph",
            text: "Building a related products section requires careful attention to responsive design, merchant customization, product selection logic, and AJAX functionality. By separating concerns into Liquid, CSS, and JavaScript files, the code remains maintainable and testable.",
          },
          {
            type: "paragraph",
            text: "Always prioritize accessibility with proper ARIA labels and keyboard navigation, optimize images for performance using Shopify filters and lazy loading, and handle edge cases like missing metafields and images gracefully.",
          },
          {
            type: "paragraph",
            text: "The result is a professional, conversion-focused section that increases average order value while giving merchants full control over appearance and behavior from Theme Editor.",
          },
        ],
      },
    ],
  },
];

export default blogPosts;
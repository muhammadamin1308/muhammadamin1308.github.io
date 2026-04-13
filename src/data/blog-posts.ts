import adminShowingImg from "../assets/blog/admin-showing.png";
import testimonialExampleImg from "../assets/blog/testimonial-eg.png";

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
];

export default blogPosts;
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/39a880c8-0bd9-4a41-be3e-fa56c973c6e0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Етап 1 — тільки збір джерел

Ось правильний промпт під це:


Prompt 1:


Act as a research assistant conducting deep internet search for a pharmaceutical supply company.

Your task is to identify and collect high-quality, relevant sources related to:

- global pharmaceutical supply chains
- API pricing trends
- logistics and transportation risks
- regulatory changes in pharma trade
- energy and cost factors affecting pharma production

Focus on sources such as:
- industry reports (McKinsey, Deloitte, BCG)
- международные организации (WHO, World Bank, OECD)
- reputable аналитические платформы
- официальные данные и исследования

Search instructions:

- Prioritize recent sources (2023–2026)
- Prefer authoritative and data-driven content
- Avoid low-quality blogs or opinion-only articles
- Include a mix of global and region-specific sources (Ukraine, CIS, EU, Asia)

Output format:

For each source provide:
- Title
- Link
- Short description (1–2 sentences)
- Why this source is valuable

Do NOT analyze deeply yet — focus only on collecting and filtering the best sources.


Prompt 2:


Review the attached notebook and use ONLY the provided research as the source of truth.

Your task is to transform this research into the structure of a modern, professional single-page website.

Design the page as a clear, logical narrative that guides the user from problem → insights → implications → action.

Define:

- Main sections of the page
- The purpose of each section
- Suggested headings and subheadings
- Key content to include in each section (based strictly on the research)
- Ideas for visuals (charts, cards, comparisons, metrics)
- Layout suggestions (hero, grid, cards, sections, etc.)

Important:

- Do NOT introduce new external information
- Do NOT repeat raw research — structure and simplify it
- Focus on clarity, hierarchy, and storytelling

Also:

- Suggest a modern, technology-focused color scheme
- Ensure the structure feels like a high-quality product landing page or analytical report

Output format:

- Clear section-by-section breakdown
- Bullet points for readability

Language: Ukrainian


Prompt 3:


Using the approved website structure from the attached notebook, generate the full website as a single self-contained HTML file.

Requirements:

- Write the entire page as one complete HTML file
- Use Tailwind CSS via CDN
- Use Ukrainian language for all visible page content
- Create a modern, professional, executive-style landing page for a pharmaceutical supply industry audience
- The design should feel clean, polished, data-driven, and suitable for decision-makers

Structure and content rules:

- Follow the website structure defined from the notebook research
- Use only the research-based content and section logic already established
- Do not invent unrelated sections
- Do not add fictional statistics or unsupported claims
- Present the content as a clear narrative:
  Hero → Key Risks / Trends → Business Impact → Strategic Insights → Recommended Actions → Final CTA

Design requirements:

- Add a sticky top navigation bar with anchor links to all major sections
- Enable smooth scrolling between sections
- Use a strong hero section with:
  - clear headline
  - short supporting text
  - primary call-to-action button
- Use clean typography and strong visual hierarchy
- Use section spacing, cards, icons, highlighted metrics, comparison blocks, and callout sections
- Include subtle hover effects on buttons and cards
- Use a professional color palette appropriate for pharma + technology
- Make the page look premium, similar to a modern consulting report or high-end product landing page

Visual elements to include where appropriate:

- Insight cards
- Risk/impact blocks
- Comparison layouts
- Statistic highlights
- Timeline / roadmap section
- Simple chart-like visual blocks using HTML/CSS only
- Final call-to-action section

Technical requirements:

- Output only the final HTML code
- Do not explain the code
- Make the page responsive for desktop, tablet, and mobile
- Use semantic HTML where possible
- Keep the code clean and readable
- Use Tailwind utility classes directly in the HTML
- If icons are needed, use inline SVG or simple Unicode symbols
- Do not rely on external assets except Tailwind CDN
- Make sure the file can be saved directly as index.html and opened in a browser

Important:

- The result must be a complete ready-to-use page, not a template or partial code
- The layout should feel visually complete and publication-ready
- All text on the page must be in Ukrainian

Return only the HTML file.

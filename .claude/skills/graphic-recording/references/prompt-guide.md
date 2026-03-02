# Graphic Recording Prompt Construction Guide

## Prompt Template

Use this template as a base. Fill in slide content and theme colors. Prompts must be written in English.

```
Create a structured visual summary illustration that summarizes the following content.

## Style Requirements
- Clean, structured infographic style — NOT loose hand-drawn sketches
- Use geometric shapes (rectangles, rounded boxes, circles) with crisp edges
- Grid-aligned layout with clear sections and logical reading order (left-to-right or top-to-bottom)
- White or very light background (use {background_color} tinted toward white)
- Bold section headers in {primary_color} with strong typographic hierarchy
- Accent highlights, arrows, and connectors in {accent_color}
- Body text and labels in {text_color}
- Section boxes and card backgrounds using {surface_color}
- Minimal decoration: no ribbons, badges, starburst shapes, or ornamental flourishes
- Icons should be original, slightly illustrative line-art (uniform stroke weight, not generic stock icons). Each icon should feel unique to the content rather than a standard template icon. Use 1-2 colors (primary + accent) for icons.
- Keep generous whitespace between sections for readability
- No decorative borders or frames around the entire image
- Do NOT include a title or heading text in the image unless the user explicitly requests it. The slide already has its own heading in MDX.
- All text must be in Japanese

## Content to Visualize
{slide_content}

## Key Visual Elements to Include
{visual_elements}
```

## Color Mapping Rules

| Graphic Recording Element | Theme Color to Use |
|---|---|
| Section headings / large keywords | `primary` |
| Arrows, connectors, highlight underlines | `accent` |
| Background | `background` (tinted toward white) |
| Body text and labels | `text` |
| Bordered boxes, banner backgrounds | `surface` |
| Emphasis boxes, speech bubble backgrounds | `surfaceAlt` or lighter shade of `surface` |

## Visual Element Selection

Extract the following from slide content and include in the prompt:

- **Keywords**: 3-5 core concepts → render as large text elements
- **Relationships**: cause-effect, sequence, contrast → express with arrows and connectors
- **Numbers/Data**: statistics, results → emphasize with simple charts or icons
- **People/Actions**: processes, roles → represent with stick figures or icons
- **Metaphors**: map abstract concepts to concrete objects → express with icons or illustrations

## Prompt Example

### Input: Survey Release Process Slide

```
Create a structured visual summary illustration that summarizes the following content.

## Style Requirements
- Clean, structured infographic style with crisp geometric shapes
- Grid-aligned layout with clear sections and logical left-to-right reading order
- White background
- Bold section headers in #02001A (dark navy)
- Accent highlights, arrows, and connectors in #DC3545 (red)
- Body text and labels in #1a1a1a
- Section boxes using #F5F6FA (light gray)
- Icons: original illustrative line-art with uniform stroke weight, not generic stock icons; use 1-2 colors
- Generous whitespace between sections
- No decorative borders or frames around the entire image
- All text must be in Japanese

## Content to Visualize
Survey release production process:
1. Theme design - Choose a newsworthy angle
2. Survey execution - Conduct questionnaire and collect responses
3. Data analysis - Create charts and extract insights
4. Release writing - Write as a press release article
5. Distribution - Distribute via PRTIMES etc. for reach

## Key Visual Elements to Include
- A horizontal flow of 5 numbered boxes, one per step
- Simple flat icon in each box: lightbulb, clipboard, bar chart, pen, megaphone
- Straight arrows connecting each step left to right
- Each box has a short label below the icon
```

# Portfolio Content Editing Guide

This guide will help you customize your portfolio content without touching any code files.

## Overview

All your portfolio content lives in one file: **`portfolio-content.json`**

This JSON file contains all the text, information, and settings for your entire portfolio website.

## How to Edit

1. Open `portfolio-content.json` in any text editor (VS Code, Sublime, even Notepad)
2. Find the section you want to edit
3. Change the text between the quotes
4. Save the file
5. Refresh your browser (if running `npm run dev`) or rebuild (`npm run build`)

## Important JSON Rules

⚠️ **Follow these rules to avoid errors:**

- **Keep the quotes** - All text must be wrapped in double quotes `"`
- **Commas matter** - Items in a list need commas between them (but NOT after the last item)
- **No trailing commas** - The last item in any list or object should NOT have a comma
- **Numbers don't use quotes** - Skill levels like `90` don't need quotes, but text like `"Principal QA Engineer"` does
- **Check your brackets** - Every `{` needs a matching `}`, every `[` needs a matching `]`

## Common Editing Tasks

### Change Your Name

```json
"personal": {
  "name": "Your Name Here",
  "email": "your.email@example.com"
}
```

Your name will automatically update everywhere it appears (hero, about, sidebar, footer).

### Update Hero Section

```json
"hero": {
  "greeting": "Hello, I'm",
  "name": "Your Name",
  "roles": [
    "Your Title",
    "Another Title",
    "Third Title"
  ]
}
```

The roles will rotate with a typewriter effect.

### Edit About Section

```json
"about": {
  "heading": "About Me",
  "subheading": "Your tagline here",
  "bio": "Your full bio paragraph...",
  "details": [
    { "label": "Name", "value": "Your Name" },
    { "label": "Role", "value": "Your Role" },
    { "label": "Email", "value": "your.email@example.com" },
    { "label": "Specialization", "value": "Your Specialty" }
  ]
}
```

### Add a New Skill

Find the `"skills"` section and add to a category:

```json
"categories": [
  {
    "category": "Automation & Testing",
    "items": [
      { "name": "Playwright", "level": 95 },
      { "name": "New Skill Name", "level": 85 }
    ]
  }
]
```

**Skill levels** must be numbers between 0 and 100 (no quotes).

### Add a New Project

```json
"projects": [
  {
    "title": "Your Project Name",
    "tech": ["Tech1", "Tech2", "Tech3"],
    "problem": "What problem did this solve?",
    "solution": "How did you solve it?",
    "impact": "What was the result?",
    "gradient": "blue"
  }
]
```

**Available gradients:**
- `"blue"` - Blue to cyan
- `"indigo"` - Indigo to purple
- `"purple"` - Purple to pink
- `"cyan"` - Cyan to blue
- `"green"` - Green to emerald

### Add a Certification

```json
"certifications": [
  {
    "name": "Certification Name",
    "issuer": "Issuing Organization",
    "icon": "🏆"
  }
]
```

Use any emoji for the icon!

### Update Experience

```json
"jobs": [
  {
    "role": "Your Role",
    "company": "Company Name",
    "period": "2020 - Present",
    "location": "City, Country",
    "achievements": [
      "First achievement here",
      "Use **double asterisks** for bold text",
      "Add more achievements as needed"
    ]
  }
]
```

**Bold text:** Wrap text with `**` on both sides to make it bold (e.g., `**70%**`).

### Add Contact Method

```json
"items": [
  {
    "label": "Email",
    "value": "your.email@example.com",
    "href": "mailto:your.email@example.com",
    "iconName": "Mail",
    "external": false
  }
]
```

**Available icons:**
- `"Mail"` - Email icon
- `"Linkedin"` - LinkedIn icon
- `"Github"` - GitHub icon
- `"FileText"` - Document/Resume icon
- `"Twitter"` - Twitter icon
- `"Phone"` - Phone icon

**External links:** Set `"external": true` for links that should open in a new tab.

## Section Headers

Every section has a `heading` and `subheading`:

```json
"skills": {
  "heading": "Technical Expertise",
  "subheading": "Tools, languages, and frameworks I work with",
  ...
}
```

Change these to customize what appears at the top of each section.

## Testing Your Changes

### During Development

```bash
npm run dev
```

Your changes will appear automatically when you save the file!

### Check for Errors

```bash
npm run build
```

If you see an error, it will tell you:
- What line has the problem
- What's wrong (missing comma, extra quote, etc.)

### Common Errors

**Error: "Unexpected token }"**
- You probably have an extra comma before a closing `}`

**Error: "Unexpected end of JSON input"**
- You're missing a closing `}` or `]` somewhere

**Error: "Invalid email address"**
- Make sure your email follows the format: `name@domain.com`

**Error: "Skill level must be between 0 and 100"**
- Check your skill levels - they must be numbers from 0 to 100

**Error: "Invalid icon name"**
- Use only the icon names listed above (Mail, Linkedin, Github, etc.)

**Error: "Invalid gradient name"**
- Use only: blue, indigo, purple, cyan, or green

## Pro Tips

✅ **Do:**
- Make one change at a time when starting out
- Use a JSON validator (like jsonlint.com) to check your syntax
- Keep a backup of your working file
- Run `npm run build` after major changes to catch errors early

❌ **Don't:**
- Remove required fields (everything shown in this guide is required)
- Change field names (like changing `"name"` to `"fullName"`)
- Use single quotes `'` instead of double quotes `"`
- Forget commas between items in lists

## Need Help?

If you get stuck:
1. Run `npm run build` to see the exact error
2. Check the error message - it will tell you what line and what's wrong
3. Compare your JSON to the examples in this guide
4. Make sure all quotes, commas, and brackets match up

## Example: Adding Everything to Your Portfolio

```json
{
  "personal": {
    "name": "Jane Developer",
    "email": "jane@example.com"
  },
  "hero": {
    "greeting": "Hi there, I'm",
    "name": "Jane Developer",
    "roles": [
      "Full Stack Developer",
      "Cloud Architect",
      "DevOps Engineer"
    ]
  },
  "skills": {
    "heading": "My Skills",
    "subheading": "Technologies I work with",
    "categories": [
      {
        "category": "Frontend",
        "items": [
          { "name": "React", "level": 95 },
          { "name": "TypeScript", "level": 90 }
        ]
      }
    ]
  },
  ...
}
```

Remember: This is your portfolio - make it yours! Edit the content to reflect your experience, skills, and personality.

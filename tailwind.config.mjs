/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sprat', 'serif'],
        sans: ['Hanken Grotesk Variable', 'sans-serif'],
      },
      colors: {
        accent: '#cc0000',
        'text-primary': '#0d0d0d',
        'text-secondary': '#555555',
        rule: '#e0e0e0',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            fontWeight: '300',
            color: theme('colors.text-primary', '#0d0d0d'),
            lineHeight: '1.6',
            maxWidth: '680px',
            '--tw-prose-body': '#0d0d0d',
            '--tw-prose-headings': '#0d0d0d',
            '--tw-prose-links': '#cc0000',
            '--tw-prose-bold': '#0d0d0d',
            '--tw-prose-code': '#0d0d0d',
            '--tw-prose-pre-bg': '#ffffff',
            '--tw-prose-pre-code': '#0d0d0d',
            '--tw-prose-hr': '#e0e0e0',
            '--tw-prose-quotes': '#555555',
            '--tw-prose-quote-borders': '#e0e0e0',
            h1: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '300',
              lineHeight: '1.1',
              fontVariationSettings: '"wdth" 75',
            },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '300',
              fontSize: '1.75rem',
              lineHeight: '1.2',
              fontVariationSettings: '"wdth" 75',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '300',
              fontSize: '1.25rem',
              lineHeight: '1.3',
              fontVariationSettings: '"wdth" 75',
            },
            h4: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '300',
              fontVariationSettings: '"wdth" 75',
            },
            'h2 a, h3 a, h4 a': {
              fontWeight: '300',
              textDecoration: 'none',
              color: 'inherit',
            },
            a: {
              color: '#cc0000',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              fontWeight: '600',
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '300',
              color: '#555555',
              borderLeftColor: '#e0e0e0',
              borderLeftWidth: '1px',
            },
            code: {
              fontWeight: '400',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            pre: {
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '0',
            },
            'pre code': {
              backgroundColor: 'transparent',
            },
            hr: {
              borderColor: '#e0e0e0',
              borderTopWidth: '1px',
            },
            table: {
              fontSize: '0.875rem',
            },
            'thead th': {
              fontWeight: '400',
              borderBottomColor: '#e0e0e0',
            },
            'tbody td': {
              borderBottomColor: '#e0e0e0',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        
        
      },
      colors: {
        'custom-purple' : '#AD1FEA',
        'custom-dark-blue': '#4661E6',
        'custom-very-dark-blue': '#373F68',
        'custom-very-light-gray': '#F7F8FD',
        'custom-light-gray': '#F2F4FE',
        'custom-very-dark-gray': '#3A4374',
        'custom-gray': '#647196',
        'custom-light-orange': '#F49F85',
        'custom-light-blue': '#62BCFA',
        'custom-radial': '#E84D70',

      },
      fontSize: {
        'h4': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '-0.02px',
          fontWeight: '700',
        }],
        'h3': ['1.125rem', {
          lineHeight: '1.625rem',
          letterSpacing: '-0.25px',
          fontWeight: '700',
        }],
        'h2': ['1.25rem', {
          lineHeight: '1.813rem',
          letterSpacing: '-0.25px',
          fontWeight: '700',
        }],
        'h1': ['1.5rem', {
          lineHeight: '2.188rem',
          letterSpacing: '-0.33px',
          fontWeight: '700',
        }],
        'body1': ['1rem', {
          lineHeight: '1.438rem',
          fontWeight: '400',
        }],
        'body2': ['0.938rem', {
          lineHeight: '1.375rem',
          fontWeight: '400',
        }],
        'body3': ['0.813rem', {
          lineHeight: '1.188rem',
          fontWeight: '600',
        }],
      }
    },
  },
  plugins: [],
}

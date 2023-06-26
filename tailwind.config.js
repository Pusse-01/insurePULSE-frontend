/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3658CF',

          secondary: '#F000B8',

          accent: '#37CDBE',

          neutral: '#3D4451',

          'base-100': '#EFF2FD',

          info: '#3ABFF8',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#F87272'
        }
      }
    ]
  },
  theme: {
    fontFamily: {
      sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Poppins'],
      body: ['Open Sans']
    },
    extend: {
      colors: {
        'main-accent': '#3658CF',
        'main-black': '#3B3D44',
        'bg-white-blue': '#EFF2FD',
        'txt-blue-grey': '#797B85',
        'txt-header-dark': '#242E4F',
        'txt-blue': '#3658CF'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

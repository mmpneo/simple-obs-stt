module.exports = {
  purge:    {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
    ],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  mode:     'jit',
  darkMode: false,
  theme:    {
    extend: {
      // colors: require('daisyui/colors')
    },
  },
  variants: {},
  plugins:  [
    require('daisyui'),
    require('@tailwindcss/aspect-ratio')
  ],
}

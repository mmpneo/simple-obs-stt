module.exports = {
  purge:    {
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
      colors: require('daisyui/colors')
    },
  },
  variants: {},
  plugins:  [
    require('daisyui')
  ],
}

const webpack = require('webpack')


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'JavaScript Radio Orchestra',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'JS Radio Orchestra' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/static/global.scss'
  ],
  plugins: [{src: 'plugins/lodash.js', ssr: true}, {src: 'plugins/u3c.js', ssr: true}, {src: 'plugins/youtube-embed.js', ssr: true}],
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}

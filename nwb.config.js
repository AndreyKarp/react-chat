module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    cjs: false,
    umd: {
      global: 'liveChat',
    },
    webpack: {
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  },
}

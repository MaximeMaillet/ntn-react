module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: ['./src/styles/variables.scss']
        },
      },
    ],
  });
  return config;
};
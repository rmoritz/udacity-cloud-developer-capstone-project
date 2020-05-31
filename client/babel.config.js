// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          esmodules: true,
        }
      }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ]
};

module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    [
      "babel-plugin-transform-import-meta",
      {
        target: "CommonJS"
      }
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};

// App entry point. Boots Storybook instead of the app only when EXPO_PUBLIC_STORYBOOK_ENABLED
// is set (see the `storybook:ios` / `storybook:android` scripts). Without the flag, Metro is
// configured to strip Storybook from the bundle entirely, so the branch below is dead code in a
// production build (see metro.config.js).
if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
  module.exports = require('./.rnstorybook').default;
} else {
  require('expo-router/entry');
}

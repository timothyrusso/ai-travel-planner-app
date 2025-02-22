# Travel Planner

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started with the development build

1. Install dependencies

   ```bash
   npm install
   ```

2. Build the app

   ```bash
    npm run ios && npm run android
   ```

3. Run the app

   ```bash
    npm run start
   ```

## Build the app locally for testing purpose

   ```bash
    npx eas-cli build --local --platform=android --profile=test
   ```
- For the _profile_ flag see the available profiles in __eas.json__ file
- _platform_ could be __android__ or __ios__

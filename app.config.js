export default {
  android: {
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  ios: {
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist',
  },
};

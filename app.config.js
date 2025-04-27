export default ({ config }) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_PLIST ??
        '/Users/timothy.russo/Desktop/Projects/ai-travel-planner-app/GoogleService-Info.plist',
    },
    android: {
      ...config.android,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ??
        '/Users/timothy.russo/Desktop/Projects/ai-travel-planner-app/google-services.json',
    },
  };
};

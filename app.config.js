export default ({ expo }) => {
  return {
    ...expo,
    ios: {
      config: {
        googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist',
      },
    },
    android: {
      config: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
      },
    },
  };
};

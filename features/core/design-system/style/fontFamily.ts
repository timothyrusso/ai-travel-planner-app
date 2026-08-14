export const fontFamily = {
  interRegular: 'inter-regular',
  interMedium: 'inter-medium',
  interBold: 'inter-bold',
  interExtraBold: 'inter-extrabold',
} as const;

export const fontsConfig = {
  'inter-regular': require('@/features/core/design-system/assets/fonts/Inter-Regular.ttf'),
  'inter-medium': require('@/features/core/design-system/assets/fonts/Inter-Medium.ttf'),
  'inter-bold': require('@/features/core/design-system/assets/fonts/Inter-Bold.ttf'),
  'inter-extrabold': require('@/features/core/design-system/assets/fonts/Inter-ExtraBold.ttf'),
} as const;

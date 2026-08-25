import { StyleSheet } from 'react-native';

type CustomWeatherIconStyleParams = {
  size: number;
};

export const customWeatherIconStyles = ({ size }: CustomWeatherIconStyleParams) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
    },
  });

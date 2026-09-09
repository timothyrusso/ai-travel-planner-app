import { StyleSheet } from 'react-native';

type CustomCheckboxStyleParams = {
  box: number;
};

export const customCheckboxStyles = ({ box }: CustomCheckboxStyleParams) =>
  StyleSheet.create({
    container: {
      width: box,
      height: box,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Lifted out of the flow so the glyph centres on the box rather than sitting beside the ring.
    ring: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

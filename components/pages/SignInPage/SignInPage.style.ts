import { dimensions } from '@/constants/dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'inter-bold',
    fontSize: dimensions.Fourfold,
  },
  emailContainer: {
    paddingVertical: dimensions.Triple,
  },
  passwordContainer: {
    paddingVertical: dimensions.Triple,
  },
  label: {
    marginBottom: dimensions.Single,
  },
  inputContainer: {
    paddingTop: dimensions.Triple,
  },
  buttonContainer: {
    paddingTop: dimensions.separator40,
    rowGap: dimensions.Quintuple,
  },
});

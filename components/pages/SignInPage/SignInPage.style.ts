import { dimensions } from '@/constants/dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'inter-bold',
    fontSize: dimensions.Fourfold,
  },
  emailContainer: {
    paddingTop: dimensions.Double,
  },
  passwordContainer: {
    paddingVertical: dimensions.Double,
  },
  label: {
    marginBottom: dimensions.Single,
  },
  inputContainer: {
    paddingTop: dimensions.Triple,
  },
  buttonContainer: {
    paddingTop: dimensions.separator40,
    rowGap: dimensions.Triple,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

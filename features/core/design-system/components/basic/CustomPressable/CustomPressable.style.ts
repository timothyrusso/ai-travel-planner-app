import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pressable: {
    // `alignSelf: 'stretch'` rather than `width: '100%'`: the wrapping Animated.View centers its
    // child with `alignItems`, and a percentage width needs a *definite* base to resolve against.
    // When a caller sizes the button with a percentage inside a content-sized parent, that base is
    // indefinite and the percentage silently degrades to content width, cascading down this chain
    // and stranding the label off-center. Stretching matches the parent's resolved width instead,
    // whether it came from a definite value or from content.
    alignSelf: 'stretch',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

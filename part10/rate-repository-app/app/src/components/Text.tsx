import { Text as NativeText, StyleSheet, TextProps, TextStyle } from 'react-native';

import theme from '../theme';

type Theme = typeof theme;

// Define the valid values for color, fontSize, and fontWeight
type TextColor = keyof Theme['colors']; // 'textPrimary' | 'textSecondary' | 'primary'
type TextFontSize = keyof Theme['fontSizes']; // 'body' | 'subheading'
type TextFontWeight = keyof Theme['fontWeights']; // 'normal' | 'bold'

interface TextComponentProps extends TextProps {
  color?: TextColor;
  fontSize?: TextFontSize;
  fontWeight?: TextFontWeight;
  style?: TextStyle;
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flexWrap: "wrap",
    wordWrap: "break-word",
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }: TextComponentProps) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;

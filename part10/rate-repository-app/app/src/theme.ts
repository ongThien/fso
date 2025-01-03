import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: "#eeeeee",
    backgroundPrimary: "#24292e",
    backgroundSecondary: "#e1e4e8",
    errors: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
} as const;

export default theme;

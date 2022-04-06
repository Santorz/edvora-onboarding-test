import { extendTheme, theme as base } from '@chakra-ui/react';

const customTheme = extendTheme({
  fonts: {
    heading: `Inter, sans-serif, ${base.fonts?.heading}`,
    body: `Inter, sans-serif, ${base.fonts?.body}`,
  },
});

export default customTheme;

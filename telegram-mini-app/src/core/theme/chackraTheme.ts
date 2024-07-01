import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  white: '#FFFFFF',
};

const spacing = {
  space: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '40px',
    8: '48px',
    9: '64px',
    10: '80px',
  },
};

export const chakraTheme = extendTheme({
  colors,
  ...spacing,
});

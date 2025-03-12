import { extendTheme } from "@chakra-ui/react";

// Define your custom colors
const colors = {
  parchment: {
    light: "#fbf4e9",
    default: "#f5edd6",
    dark: "#e8d9b5",
  },
  leather: {
    light: "#a98e63",
    default: "#896308",
    dark: "#654a06",
  },
  // Renamed to mythicalBlues for consistency
  mythicalBlues: {
    50: "#EDF2F7",
    100: "#E2E8F0",
    200: "#C5D1E8",
    300: "#A9B9D8",
    400: "#7A94C1",
    500: "#4A69A9",
    600: "#3A5488",
    700: "#2A3F66",
    800: "#1A2A44",
    900: "#0A1522",
  },
};

// Define custom component styles
const components = {
  Button: {
    baseStyle: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: "600",
    },
    variants: {
      solid: {
        bg: "leather.default",
        color: "white",
        _hover: {
          bg: "leather.dark",
        },
      },
      outline: {
        borderColor: "leather.default",
        color: "leather.default",
        _hover: {
          bg: "leather.light",
          color: "white",
        },
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: "leather.light",
          bg: "parchment.light",
          _focus: {
            borderColor: "leather.default",
            boxShadow: "0 0 0 1px #896308",
          },
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: "parchment.default",
        borderColor: "leather.light",
      },
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: "600",
    },
  },
  FormLabel: {
    baseStyle: {
      fontFamily: '"Quicksand", sans-serif',
      fontWeight: "600",
    },
  },
};

// Create the theme
const theme = extendTheme({
  colors,
  fonts: {
    heading: '"Quicksand", sans-serif',
    body: "system-ui, sans-serif",
  },
  components,
  styles: {
    global: {
      body: {
        bg: "parchment.light",
        color: "leather.dark",
      },
    },
  },
});

export default theme;

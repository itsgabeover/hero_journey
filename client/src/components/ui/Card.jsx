import { Box } from "@chakra-ui/react";

export const Card = ({ children, ...props }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg="parchment.default"
    boxShadow="md"
    {...props}
  >
    {children}
  </Box>
);

export const CardHeader = ({ children, ...props }) => (
  <Box p={6} {...props}>
    {children}
  </Box>
);

export const CardBody = ({ children, ...props }) => (
  <Box p={6} pt={0} {...props}>
    {children}
  </Box>
);

export const CardFooter = ({ children, ...props }) => (
  <Box p={6} pt={0} {...props}>
    {children}
  </Box>
);

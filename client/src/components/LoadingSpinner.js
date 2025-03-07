import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Center height="100vh">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="parchment.dark"
          color="leather.default"
          size="xl"
        />
        <Text
          fontFamily="Shadows Into Light"
          fontSize="xl"
          color="leather.default"
        >
          {message}
        </Text>
      </VStack>
    </Center>
  );
}

export default LoadingSpinner;

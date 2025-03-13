import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";

export default function WelcomeSection({ user }) {
  return (
    <Box
      position="relative"
      py={{ base: "12", md: "16" }}
      textAlign="center"
      bgGradient="linear(to-b, #1A2A44, #2A3F66)"
      color="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="xl"
      mb={8}
    >
      {/* Background Image with Overlay */}
      <Box
        position="absolute"
        inset="0"
        bgImage="url('/background.jpg')"
        bgSize="cover"
        opacity="0.2"
        zIndex="0"
      />

      <VStack spacing={6} position="relative" zIndex="1">
        <Heading fontSize={{ base: "3xl", md: "4xl" }} fontFamily="Quicksand">
          Welcome, {user?.name || "Adventurer"}
        </Heading>
        <Text fontSize="xl" maxW="2xl">
          Your journey unfolds here. Record your tales, map your world, and
          chart the unknown.
        </Text>
        <Image
          src={`/archetypes/${user?.archetype || "Warrior"}.jpg`}
          alt="User Archetype"
          boxSize="120px"
          borderRadius="full"
          border="4px solid white"
          boxShadow="lg"
        />
        <Text fontSize="lg" fontWeight="bold" fontFamily="Quicksand">
          {user?.archetype || "Warrior"}
        </Text>
      </VStack>
    </Box>
  );
}

import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaBook, FaBrain, FaFeather } from "react-icons/fa";

export default function Home({ user }) {
  return (
    <Box width={{ base: "100%" }}>
      {/* Hero Section */}
      <Box position="relative" py={{ base: "20", md: "32" }} as="section">
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, #1A2A44, #2A3F66)"
          opacity="0.9"
          zIndex="0"
        />

        {/* Background Image */}
        <Box
          position="absolute"
          inset="0"
          bgImage="url('/background.jpg')"
          bgSize="cover"
          opacity="0.2"
          zIndex="0"
        />

        <Container maxW="container.xl" position="relative" zIndex="1">
          <VStack spacing={8} textAlign="center" maxW="3xl" mx="auto">
            <VStack spacing={4}>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="bold"
                color="white"
                fontFamily="Quicksand"
              >
                Welcome, Hero. Your journey begins here.
              </Heading>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color="whiteAlpha.900"
                fontFamily="system-ui"
              >
                Unlock the hidden patterns of your mind. Journal with an
                archetypal framework to uncover your true self.
              </Text>
            </VStack>

            {/* CTA Buttons */}
            <HStack spacing={4} pt={4} flexDir={{ base: "column", sm: "row" }}>
              <a
                href="https://archetypes.jilecek.cz/"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  bg="leather.default"
                  color="white"
                  _hover={{ bg: "leather.dark" }}
                  rightIcon={<ArrowForwardIcon />}
                  fontFamily="Quicksand"
                  fontWeight="600"
                >
                  Take the Archetype Quiz
                </Button>
              </a>
              <Link as={RouterLink} to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="parchment.light"
                  color="white"
                  _hover={{ bg: "whiteAlpha.200" }}
                  fontFamily="Quicksand"
                  fontWeight="600"
                >
                  Sign Up & Start Journaling
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* What is This App? Section */}
      <Box as="section" py={{ base: "16", md: "24" }} bg="parchment.light">
        <Container maxW="container.xl">
          <VStack textAlign="center" mb={12}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              mb={4}
              color="leather.dark"
              fontFamily="Quicksand"
            >
              Your thoughts are a story—let's uncover your inner hero, sage, or
              magician.
            </Heading>
            <Text
              color="leather.default"
              maxW="2xl"
              mx="auto"
              fontFamily="system-ui"
            >
              Our journaling app uses Carl Jung's archetypal framework to help
              you understand yourself on a deeper level.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={12}>
            <Box
              p={6}
              borderRadius="lg"
              bg="parchment.light"
              bgGradient="linear(to-br, parchment.light, #F7F0E3)"
              border="1px"
              borderColor="#A9B9D8" // mythicalBlue.300
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                borderColor: "leather.default",
              }}
              textAlign="center"
            >
              <Flex
                h="14"
                w="14"
                borderRadius="full"
                bg="#A9B9D8" // mythicalBlue.300
                alignItems="center"
                justifyContent="center"
                mb={4}
                mx="auto"
              >
                <Icon as={FaFeather} h={7} w={7} color="white" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                mb={2}
                fontFamily="Quicksand"
                color="leather.dark"
              >
                Guided Journaling
              </Heading>
              <Text color="leather.default" fontFamily="system-ui">
                Thoughtful prompts based on your unique archetype to inspire
                meaningful reflection.
              </Text>
            </Box>

            <Box
              p={6}
              borderRadius="lg"
              bg="parchment.light"
              bgGradient="linear(to-br, #E2E8F0, #C5D1E8)" // mythicalBlue.100 to 200
              border="1px"
              borderColor="#7A94C1" // mythicalBlue.400
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                borderColor: "leather.default",
              }}
              textAlign="center"
            >
              <Flex
                h="14"
                w="14"
                borderRadius="full"
                bg="#7A94C1" // mythicalBlue.400
                alignItems="center"
                justifyContent="center"
                mb={4}
                mx="auto"
              >
                <Icon as={FaBrain} h={7} w={7} color="white" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                mb={2}
                fontFamily="Quicksand"
                color="leather.dark"
              >
                Deeper Self-Understanding
              </Heading>
              <Text color="leather.default" fontFamily="system-ui">
                Track your personal growth and gain insights into your patterns
                and behaviors.
              </Text>
            </Box>

            <Box
              p={6}
              borderRadius="lg"
              bg="parchment.light"
              bgGradient="linear(to-br, leather.light, #E8D8C0)" // Leather gradient
              border="1px"
              borderColor="leather.default"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "lg",
                borderColor: "leather.dark",
              }}
              textAlign="center"
            >
              <Flex
                h="14"
                w="14"
                borderRadius="full"
                bg="leather.default"
                alignItems="center"
                justifyContent="center"
                mb={4}
                mx="auto"
              >
                <Icon as={FaBook} h={7} w={7} color="white" />
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                mb={2}
                fontFamily="Quicksand"
                color="leather.dark"
              >
                A Narrative Approach
              </Heading>
              <Text color="leather.default" fontFamily="system-ui">
                Make sense of your life's journey by viewing it through the lens
                of timeless archetypes.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Quiz CTA Section */}
      <Box
        as="section"
        py={{ base: "16", md: "24" }}
        bg="#EDF2F7" // mythicalBlue.50
      >
        <Container maxW="container.xl">
          <Box
            maxW="4xl"
            mx="auto"
            bgGradient="linear(to-br, #E2E8F0, #C5D1E8)" // mythicalBlue.100 to 200
            p={{ base: 8, md: 12 }}
            borderRadius="xl"
            border="1px"
            borderColor="#A9B9D8" // mythicalBlue.300
            backdropFilter="blur(8px)"
          >
            <VStack spacing={6} textAlign="center" mb={8}>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="bold"
                color="leather.dark"
                fontFamily="Quicksand"
              >
                Ready to Begin?
              </Heading>
              <Text
                fontSize="lg"
                color="leather.default"
                fontFamily="system-ui"
                maxW="2xl"
              >
                Take this free and insightful quiz to reveal your dominant
                archetype.
              </Text>
              <a
                href="https://archetypes.jilecek.cz/"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  bg="leather.default"
                  color="white"
                  _hover={{ bg: "leather.dark" }}
                  rightIcon={<ArrowForwardIcon />}
                  fontFamily="Quicksand"
                  fontWeight="600"
                >
                  Start the Quiz
                </Button>
              </a>
            </VStack>

            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              }}
              gap={4}
              mt={8}
            >
              <VStack spacing={3}>
                <Box
                  bg="#A9B9D8" // mythicalBlue.300
                  borderRadius="lg"
                  p={4}
                  width="100%"
                  border="1px"
                  borderColor="#7A94C1" // mythicalBlue.400
                  aspectRatio={3 / 4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/archetypes/Warrior.jpg"
                    alt="Warrior Archetype"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    opacity="0.8"
                    _hover={{ opacity: "1" }}
                    transition="opacity 0.3s"
                  />
                </Box>
                <Text
                  fontWeight="600"
                  fontFamily="Quicksand"
                  color="leather.dark"
                  fontSize="lg"
                >
                  The Warrior
                </Text>
              </VStack>

              <VStack spacing={3}>
                <Box
                  bg="#A9B9D8"
                  borderRadius="lg"
                  p={4}
                  width="100%"
                  border="1px"
                  borderColor="#7A94C1"
                  aspectRatio={3 / 4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/archetypes/Sage.jpg"
                    alt="Sage Archetype"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    opacity="0.8"
                    _hover={{ opacity: "1" }}
                    transition="opacity 0.3s"
                  />
                </Box>
                <Text
                  fontWeight="600"
                  fontFamily="Quicksand"
                  color="leather.dark"
                  fontSize="lg"
                >
                  The Sage
                </Text>
              </VStack>

              <VStack spacing={3}>
                <Box
                  bg="#A9B9D8"
                  borderRadius="lg"
                  p={4}
                  width="100%"
                  border="1px"
                  borderColor="#7A94C1"
                  aspectRatio={3 / 4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/archetypes/Seeker.jpg"
                    alt="Seeker Archetype"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    opacity="0.8"
                    _hover={{ opacity: "1" }}
                    transition="opacity 0.3s"
                  />
                </Box>
                <Text
                  fontWeight="600"
                  fontFamily="Quicksand"
                  color="leather.dark"
                  fontSize="lg"
                >
                  The Seeker
                </Text>
              </VStack>

              <VStack spacing={3}>
                <Box
                  bg="#A9B9D8"
                  borderRadius="lg"
                  p={4}
                  width="100%"
                  border="1px"
                  borderColor="#7A94C1"
                  aspectRatio={3 / 4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/archetypes/Creator.jpg"
                    alt="Creator Archetype"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    opacity="0.8"
                    _hover={{ opacity: "1" }}
                    transition="opacity 0.3s"
                  />
                </Box>
                <Text
                  fontWeight="600"
                  fontFamily="Quicksand"
                  color="leather.dark"
                  fontSize="lg"
                >
                  The Creator
                </Text>
              </VStack>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Informational Video Section */}
      <Box as="section" py={{ base: "16", md: "24" }} bg="parchment.light">
        <Container maxW="container.xl">
          <VStack textAlign="center" mb={12} maxW="3xl" mx="auto">
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              mb={4}
              color="leather.dark"
              fontFamily="Quicksand"
            >
              The Power of Archetypes
            </Heading>
            <Text color="leather.default" fontFamily="system-ui">
              Learn about Carl Jung's archetypal framework and how it can
              transform your journaling experience.
            </Text>
          </VStack>

          <Box
            position="relative"
            maxW="4xl"
            mx="auto"
            borderRadius="xl"
            overflow="hidden"
            border="1px"
            borderColor="#A9B9D8" // mythicalBlue.300
            boxShadow="xl"
          >
            <Box
              as="iframe"
              src="https://www.youtube.com/embed/YFMQlm6mHUQ"
              title="The Power of Archetypes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="500px"
              borderRadius="12px"
              border="1px solid #ccc"
            />
          </Box>
        </Container>
      </Box>

      {/* Signup CTA Section */}
      <Box
        as="section"
        py={{ base: "16", md: "24" }}
        bgGradient="linear(to-b, #EDF2F7, #E2E8F0)" // mythicalBlue.50 to 100
      >
        <Container maxW="container.xl">
          <VStack maxW="3xl" mx="auto" textAlign="center" spacing={8}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="leather.dark"
              fontFamily="Quicksand"
            >
              Your story is waiting to be written. Begin today.
            </Heading>
            <Text
              fontSize="xl"
              color="leather.default"
              maxW="2xl"
              mx="auto"
              fontFamily="system-ui"
            >
              Join thousands of others who have discovered their archetypal
              patterns and transformed their lives through guided journaling.
            </Text>
            <Link as={RouterLink} to="/signup">
              <Button
                size="lg"
                bg="leather.default"
                color="white"
                _hover={{ bg: "leather.dark" }}
                rightIcon={<ArrowForwardIcon />}
                mt={4}
                fontFamily="Quicksand"
                fontWeight="600"
              >
                Sign Up & Start Journaling
              </Button>
            </Link>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        py={8}
        borderTop="1px solid"
        borderColor="#C5D1E8" // mythicalBlue.200
        bg="parchment.light"
      >
        <Container maxW="container.xl">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
          >
            <Text
              fontSize="sm"
              color="leather.default"
              mb={{ base: 4, md: 0 }}
              fontFamily="system-ui"
            >
              © {new Date().getFullYear()} Journal Quest. All rights reserved.
            </Text>
            <HStack spacing={6}>
              <Link
                href="#"
                fontSize="sm"
                color="leather.default"
                _hover={{ color: "#4A69A9" }} // mythicalBlue.500
                fontFamily="system-ui"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                fontSize="sm"
                color="leather.default"
                _hover={{ color: "#4A69A9" }} // mythicalBlue.500
                fontFamily="system-ui"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                fontSize="sm"
                color="leather.default"
                _hover={{ color: "#4A69A9" }} // mythicalBlue.500
                fontFamily="system-ui"
              >
                Contact Us
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

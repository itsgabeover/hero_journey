import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
// Update the import path for Card components if needed
import { Card, CardHeader, CardBody } from "../ui/Card";
import {
  FaBookOpen,
  FaComment,
  FaHatWizard,
  FaQuoteLeft,
} from "react-icons/fa";

export default function OracleSection({ oracleInsights = [] }) {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize="2xl"
        mb={6}
        fontFamily="Quicksand"
        color="leather.dark"
      >
        The Oracle 🔮
      </Heading>

      <Text mb={6} color="leather.default">
        Seek wisdom from your past self. The Oracle helps you reflect on past
        journal entries and extract meaningful insights.
      </Text>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={6}>
        <Card maxW="100%" borderColor="#A9B9D8">
          <CardHeader>
            <Heading size="md" fontFamily="Quicksand" color="leather.dark">
              Ask The Oracle
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text color="gray.700">
                The Oracle analyzes your journal entries to provide insights
                about your patterns, growth, and blind spots.
              </Text>

              <FormControl>
                <FormLabel color="leather.dark">Your Question</FormLabel>
                <Textarea
                  placeholder="What would you like to ask about your journey? (e.g., 'What patterns do I keep repeating?' or 'When have I shown the most courage?')"
                  rows={3}
                  bg="white"
                  border="1px solid #D4A373"
                />
              </FormControl>

              <Button
                leftIcon={<FaHatWizard />}
                bg="leather.default"
                color="white"
                _hover={{ bg: "leather.dark" }}
                alignSelf="flex-end"
              >
                Consult the Oracle
              </Button>
            </VStack>

            <Box
              mt={6}
              p={4}
              bg="#1A2A44"
              color="white"
              borderRadius="md"
              position="relative"
            >
              <Box
                position="absolute"
                inset="0"
                bgImage="url('/stars-bg.jpg')"
                bgSize="cover"
                mixBlendMode="overlay"
                opacity="0.3"
                borderRadius="md"
              />
              <VStack spacing={3} position="relative" align="start">
                <Icon as={FaQuoteLeft} color="#A9B9D8" boxSize={6} />
                <Text fontStyle="italic" fontFamily="Quicksand">
                  Your entries reveal a deep desire for creative expression, yet
                  you often prioritize practical concerns. Consider how your
                  Creator and Caregiver archetypes are in tension.
                </Text>
                <Text fontSize="sm" alignSelf="flex-end">
                  Based on 12 journal entries from the past 3 months
                </Text>
              </VStack>
            </Box>
          </CardBody>
        </Card>

        <VStack spacing={4} align="stretch">
          <Heading
            as="h3"
            size="md"
            fontFamily="Quicksand"
            color="leather.dark"
          >
            Recent Insights
          </Heading>

          {oracleInsights.map((insight) => (
            <Box
              key={insight.id}
              p={4}
              bg="#F7F0E3"
              border="1px"
              borderColor="#A9B9D8"
              borderRadius="md"
              boxShadow="sm"
            >
              <VStack align="start" spacing={2}>
                <Heading size="sm" fontFamily="Quicksand" color="leather.dark">
                  {insight.question}
                </Heading>
                <Box
                  p={3}
                  bg="#E2E8F0"
                  borderRadius="md"
                  width="100%"
                  fontSize="sm"
                  color="gray.700"
                  fontStyle="italic"
                >
                  <Icon as={FaQuoteLeft} color="#4A69A9" mr={2} />
                  {insight.reflection}
                </Box>
                <HStack justify="space-between" width="100%">
                  <Text fontSize="xs" color="gray.500">
                    Source: {insight.journalDate}
                  </Text>
                  <Button
                    size="xs"
                    leftIcon={<FaComment />}
                    variant="ghost"
                    colorScheme="blue"
                  >
                    Reflect
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}

          <Button
            variant="outline"
            colorScheme="blue"
            size="sm"
            leftIcon={<FaBookOpen />}
          >
            View All Insights
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
}

import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FaCompass, FaQuestionCircle } from "react-icons/fa";

export default function UnknownSection({ unchartedChallenges = [] }) {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize="2xl"
        mb={6}
        fontFamily="Quicksand"
        color="leather.dark"
      >
        The Unknown 🔮
      </Heading>

      <Text mb={6} color="leather.default">
        Venture into unexplored territory of your psyche with guided journaling
        quests and challenges.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {unchartedChallenges.map((challenge) => (
          <Box
            key={challenge.id}
            bg="#F7F0E3"
            border="1px"
            borderColor="#A9B9D8"
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
            overflow="hidden"
          >
            <Box p={4}>
              <HStack justify="space-between" mb={2}>
                <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                  {challenge.name}
                </Heading>
                <Badge
                  colorScheme={
                    challenge.difficulty === "Easy"
                      ? "green"
                      : challenge.difficulty === "Medium"
                      ? "blue"
                      : challenge.difficulty === "Hard"
                      ? "orange"
                      : "purple"
                  }
                >
                  {challenge.difficulty}
                </Badge>
              </HStack>
              <Text color="gray.700" fontSize="sm" mb={4}>
                {challenge.description}
              </Text>
              <Button
                leftIcon={<FaCompass />}
                bg="leather.default"
                color="white"
                _hover={{ bg: "leather.dark" }}
                size="sm"
                fontFamily="Quicksand"
                fontWeight="600"
                w="full"
              >
                Begin Challenge
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Box
        mt={8}
        p={6}
        bg="#E2E8F0"
        borderRadius="lg"
        border="1px"
        borderColor="#7A94C1"
      >
        <HStack spacing={4}>
          <Icon as={FaQuestionCircle} boxSize={8} color="#4A69A9" />
          <Box>
            <Heading
              as="h3"
              size="md"
              fontFamily="Quicksand"
              color="leather.dark"
              mb={1}
            >
              Need Guidance?
            </Heading>
            <Text color="leather.default">
              Not sure what challenge to undertake next? Complete the archetype
              quiz for personalized recommendations.
            </Text>
          </Box>
          <Button
            bg="leather.default"
            color="white"
            _hover={{ bg: "leather.dark" }}
            fontFamily="Quicksand"
            fontWeight="600"
            ml="auto"
          >
            Take the Quiz
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

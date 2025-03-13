import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "../ui/Card";
import {
  FaBookOpen,
  FaCalendarCheck,
  FaCheck,
  FaCrown,
  FaEye,
  FaHistory,
  FaHourglass,
  FaLightbulb,
  FaPlus,
} from "react-icons/fa";

export default function QuestBoardSection({ questBoardItems = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "blue";
      case "Not Started":
        return "gray";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return FaCheck;
      case "In Progress":
        return FaHourglass;
      case "Not Started":
        return FaCalendarCheck;
      default:
        return FaCalendarCheck;
    }
  };

  return (
    <Box>
      <Heading
        as="h2"
        fontSize="2xl"
        mb={6}
        fontFamily="Quicksand"
        color="leather.dark"
      >
        Quest Board 📜
      </Heading>

      <Text mb={6} color="leather.default">
        Set personal challenges and intentions for your hero's journey. Track
        your goals and create quests for yourself.
      </Text>

      <Card maxW="100%" borderColor="#A9B9D8" mb={6}>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md" fontFamily="Quicksand" color="leather.dark">
              Active Quests
            </Heading>
            <Button
              leftIcon={<FaPlus />}
              size="sm"
              colorScheme="blue"
              variant="outline"
            >
              New Quest
            </Button>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            {questBoardItems.map((quest) => (
              <Box
                key={quest.id}
                p={4}
                bg="white"
                borderRadius="md"
                border="1px"
                borderColor="#C5D1E8"
                transition="all 0.2s"
                _hover={{ bg: "#EDF2F7" }}
              >
                <Grid templateColumns={{ base: "1fr", md: "1fr auto" }} gap={4}>
                  <Box>
                    <HStack mb={2}>
                      <Icon
                        as={getStatusIcon(quest.status)}
                        color={getStatusColor(quest.status) + ".500"}
                      />
                      <Heading
                        size="sm"
                        fontFamily="Quicksand"
                        color="leather.dark"
                      >
                        {quest.title}
                      </Heading>
                    </HStack>
                    <HStack spacing={4}>
                      <Tag size="sm" colorScheme="blue" borderRadius="full">
                        <TagLabel>{quest.type}</TagLabel>
                      </Tag>
                      <Text fontSize="xs" color="gray.500">
                        Deadline: {quest.deadline}
                      </Text>
                    </HStack>
                  </Box>
                  <HStack>
                    <Button
                      size="xs"
                      leftIcon={<FaCheck />}
                      colorScheme="green"
                      variant="outline"
                    >
                      Complete
                    </Button>
                    <Button
                      size="xs"
                      leftIcon={<FaEye />}
                      colorScheme="blue"
                      variant="ghost"
                    >
                      Details
                    </Button>
                  </HStack>
                </Grid>
              </Box>
            ))}
          </VStack>
        </CardBody>
      </Card>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box
          bg="#F7F0E3"
          border="1px"
          borderColor="#A9B9D8"
          borderRadius="lg"
          boxShadow="md"
          p={4}
        >
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaCrown} color="gold" boxSize={6} />
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                Quest Categories
              </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Organize your quests by category to better track your journey.
            </Text>
            <Divider borderColor="gray.300" />
            <VStack align="start" spacing={2} width="100%">
              <HStack justify="space-between" width="100%">
                <Text color="leather.dark">Personal Growth</Text>
                <Badge colorScheme="green">3 Quests</Badge>
              </HStack>
              <HStack justify="space-between" width="100%">
                <Text color="leather.dark">Creative Pursuits</Text>
                <Badge colorScheme="blue">2 Quests</Badge>
              </HStack>
              <HStack justify="space-between" width="100%">
                <Text color="leather.dark">Knowledge</Text>
                <Badge colorScheme="purple">1 Quest</Badge>
              </HStack>
            </VStack>
            <Button
              size="sm"
              leftIcon={<FaPlus />}
              variant="ghost"
              colorScheme="blue"
              alignSelf="center"
            >
              Add Category
            </Button>
          </VStack>
        </Box>

        <Box
          bg="#F7F0E3"
          border="1px"
          borderColor="#A9B9D8"
          borderRadius="lg"
          boxShadow="md"
          p={4}
        >
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaHistory} color="#4A69A9" boxSize={6} />
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                Quest History
              </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              View your completed quests and achievements.
            </Text>
            <Divider borderColor="gray.300" />
            <VStack align="start" spacing={2} width="100%">
              <Box p={2} bg="white" borderRadius="md" width="100%">
                <Text color="leather.dark" fontSize="sm" fontWeight="bold">
                  Meditate for 7 days straight
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Completed 2 weeks ago
                </Text>
              </Box>
              <Box p={2} bg="white" borderRadius="md" width="100%">
                <Text color="leather.dark" fontSize="sm" fontWeight="bold">
                  Read "The Power of Myth"
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Completed last month
                </Text>
              </Box>
            </VStack>
            <Button
              size="sm"
              leftIcon={<FaBookOpen />}
              variant="ghost"
              colorScheme="blue"
              alignSelf="center"
            >
              View All Completed
            </Button>
          </VStack>
        </Box>

        <Box
          bg="#F7F0E3"
          border="1px"
          borderColor="#A9B9D8"
          borderRadius="lg"
          boxShadow="md"
          p={4}
        >
          <VStack align="start" spacing={3}>
            <HStack>
              <Icon as={FaLightbulb} color="#D69E2E" boxSize={6} />
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                Quest Ideas
              </Heading>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Suggested quests based on your archetype and journey.
            </Text>
            <Divider borderColor="gray.300" />
            <VStack align="start" spacing={2} width="100%">
              <Box p={2} bg="white" borderRadius="md" width="100%">
                <Text color="leather.dark" fontSize="sm" fontWeight="bold">
                  Try a new form of creative expression
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Perfect for your Creator archetype
                </Text>
              </Box>
              <Box p={2} bg="white" borderRadius="md" width="100%">
                <Text color="leather.dark" fontSize="sm" fontWeight="bold">
                  Journal daily for 30 days
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Deepen your self-awareness
                </Text>
              </Box>
            </VStack>
            <Button
              size="sm"
              leftIcon={<FaLightbulb />}
              variant="ghost"
              colorScheme="yellow"
              alignSelf="center"
            >
              More Ideas
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

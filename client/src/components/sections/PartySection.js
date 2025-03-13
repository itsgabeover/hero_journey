import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaHandshake,
  FaPlus,
  FaUserSecret,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

export default function PartySection({ partyMembers = [] }) {
  const getRelationshipIcon = (relationship) => {
    switch (relationship) {
      case "Mentor":
        return FaUserTie;
      case "Ally":
        return FaHandshake;
      case "Rival":
        return FaUserSecret;
      case "Shadow":
        return FaUserSecret;
      default:
        return FaUsers;
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
        My Party 🛡️
      </Heading>

      <Text mb={6} color="leather.default">
        Record key figures in your life journey - mentors, allies, rivals, and
        shadows who have shaped your story.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {partyMembers.map((member) => (
          <Box
            key={member.id}
            bg="#F7F0E3"
            border="1px"
            borderColor="#A9B9D8"
            borderRadius="lg"
            boxShadow="md"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              top="0"
              right="0"
              px={2}
              py={1}
              bg="#7A94C1"
              color="white"
              borderBottomLeftRadius="md"
              fontSize="xs"
              fontWeight="bold"
            >
              {member.relationship}
            </Box>
            <VStack p={4} pt={6}>
              <Avatar
                size="xl"
                name={member.name}
                src={member.avatar}
                border="3px solid"
                borderColor={
                  member.relationship === "Mentor"
                    ? "#4A69A9"
                    : member.relationship === "Ally"
                    ? "#38A169"
                    : member.relationship === "Rival"
                    ? "#DD6B20"
                    : member.relationship === "Shadow"
                    ? "#718096"
                    : "#7A94C1"
                }
              />
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                {member.name}
              </Heading>
              <Badge colorScheme="blue" px={2} py={1} borderRadius="full">
                {member.archetype}
              </Badge>

              <HStack>
                <Icon
                  as={getRelationshipIcon(member.relationship)}
                  color={
                    member.relationship === "Mentor"
                      ? "#4A69A9"
                      : member.relationship === "Ally"
                      ? "#38A169"
                      : member.relationship === "Rival"
                      ? "#DD6B20"
                      : member.relationship === "Shadow"
                      ? "#718096"
                      : "#7A94C1"
                  }
                />
                <Text fontSize="sm" color="gray.600">
                  {member.relationship}
                </Text>
              </HStack>

              <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
                A {member.relationship.toLowerCase()} on your hero's journey.
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                fontFamily="Quicksand"
                mt={2}
              >
                View Profile
              </Button>
            </VStack>
          </Box>
        ))}

        {/* Add New Party Member Card */}
        <Box
          bg="#F7F0E3"
          border="1px dashed"
          borderColor="#A9B9D8"
          borderRadius="lg"
          boxShadow="sm"
          transition="all 0.3s"
          _hover={{ bg: "#EDF2F7", cursor: "pointer" }}
        >
          <VStack h="100%" justify="center" py={10} px={4}>
            <Icon as={FaPlus} boxSize={10} color="#7A94C1" />
            <Text
              fontFamily="Quicksand"
              color="leather.dark"
              fontWeight="medium"
              textAlign="center"
            >
              Add a Character to Your Story
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

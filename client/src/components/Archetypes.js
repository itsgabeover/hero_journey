"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

// Archetype data
const archetypeData = [
  {
    id: "seeker",
    name: "Seeker",
    image: "/archetypes/Seeker.jpg",
    shortDescription:
      "The Seeker is driven by a quest for deeper meaning and truth.",
    fullDescription:
      "The Seeker archetype embodies the human desire for independence and the journey to find one's authentic self. Seekers are driven by a deep yearning for fulfillment and meaning beyond the ordinary world. They often feel constrained by conventional society and seek freedom through exploration, adventure, and discovery. The Seeker's journey is both external (traveling to new places) and internal (exploring new ideas and perspectives). At their best, Seekers are authentic, ambitious, and independent. Their shadow aspects can manifest as restlessness, inability to commit, and perpetual dissatisfaction.",
    traits: [
      "Independent",
      "Adventurous",
      "Authentic",
      "Restless",
      "Ambitious",
    ],
    quote: "Not all who wander are lost.",
    examples: "Odysseus, Amelia Earhart, Indiana Jones",
  },
  {
    id: "innocent",
    name: "Innocent",
    image: "/archetypes/Innocent.jpg",
    shortDescription:
      "The Innocent embodies optimism, goodness, and a pure heart.",
    fullDescription:
      "The Innocent archetype represents purity, goodness, and the childlike belief in the possibility of paradise. Innocents approach life with optimism and trust, seeing the good in others and situations. They value simplicity, morality, and nostalgia for simpler times. At their best, Innocents bring joy, faith, and openness to the world. Their shadow aspects can include naivety, denial of problems, and an unwillingness to grow up and face difficult truths. The Innocent's journey often involves maintaining faith while integrating the complexities and disappointments of life.",
    traits: ["Optimistic", "Pure", "Trusting", "Faithful", "Naive"],
    quote: "There's no place like home.",
    examples: "Dorothy from The Wizard of Oz, Forrest Gump, Snow White",
  },
  {
    id: "orphan",
    name: "Orphan",
    image: "/archetypes/Orphan.jpg",
    shortDescription:
      "The Orphan seeks belonging and connection after experiencing abandonment.",
    fullDescription:
      "The Orphan archetype emerges from the universal fear of abandonment and the struggle to find belonging in a difficult world. Orphans have often experienced disappointment, betrayal, or neglect, leading them to be realistic and pragmatic. They value empathy, resilience, and community, seeking connection with others who understand their pain. At their best, Orphans are empathetic, resilient, and interdependent. Their shadow aspects can include victimhood, cynicism, and emotional dependency. The Orphan's journey involves moving from feeling victimized to developing resilience and finding belonging.",
    traits: [
      "Realistic",
      "Empathetic",
      "Resilient",
      "Interdependent",
      "Pragmatic",
    ],
    quote: "We're all in this together.",
    examples: "Oliver Twist, Harry Potter, Jane Eyre",
  },
  {
    id: "fool",
    name: "Fool (Jester)",
    image: "/archetypes/Fool.jpg",
    shortDescription:
      "The Fool brings joy, humor, and a fresh perspective to life.",
    fullDescription:
      "The Fool or Jester archetype embodies joy, humor, and the spirit of play. Fools live in the moment, finding delight in simple pleasures and bringing levity to serious situations. They value spontaneity, authenticity, and the freedom to break social conventions. At their best, Fools bring joy, creativity, and fresh perspectives to the world. Their shadow aspects can include irresponsibility, cruelty in their humor, and using comedy to avoid deeper issues. The Fool's journey involves balancing playfulness with wisdom, using humor to reveal truth rather than escape it.",
    traits: ["Playful", "Spontaneous", "Humorous", "Irreverent", "Present"],
    quote: "Life is too important to be taken seriously.",
    examples:
      "Charlie Chaplin, Robin Williams, Puck from A Midsummer Night's Dream",
  },
  {
    id: "sage",
    name: "Sage (Senex)",
    image: "/archetypes/Sage.jpg",
    shortDescription:
      "The Sage seeks wisdom and truth through knowledge and reflection.",
    fullDescription:
      "The Sage archetype represents the human quest for truth and understanding through knowledge, analysis, and reflection. Sages are driven by a desire to find wisdom and share it with others. They value objectivity, critical thinking, and the pursuit of higher truths. At their best, Sages are wise, insightful, and thoughtful. Their shadow aspects can include dogmatism, overthinking, and disconnection from emotions and practical realities. The Sage's journey involves integrating intellectual knowledge with emotional wisdom and applying their insights to real-world situations.",
    traits: ["Wise", "Knowledgeable", "Thoughtful", "Objective", "Reflective"],
    quote: "The unexamined life is not worth living.",
    examples: "Socrates, Gandalf, Yoda",
  },
  {
    id: "king",
    name: "King",
    image: "/archetypes/King.jpg",
    shortDescription:
      "The King embodies leadership, order, and the responsible use of power.",
    fullDescription:
      "The King archetype represents the energy of wise leadership, order, and the responsible use of power. Kings create harmony in their kingdoms through fair governance and clear boundaries. They value responsibility, integrity, and the greater good of their community. At their best, Kings are benevolent, just, and generative. Their shadow aspects can include tyranny, rigidity, and abuse of power. The King's journey involves balancing authority with compassion, using power to serve rather than dominate, and creating systems that benefit all.",
    traits: [
      "Authoritative",
      "Responsible",
      "Orderly",
      "Generous",
      "Protective",
    ],
    quote: "With great power comes great responsibility.",
    examples:
      "King Solomon, Aragorn from Lord of the Rings, T'Challa (Black Panther)",
  },
  {
    id: "creator",
    name: "Creator",
    image: "/archetypes/Creator.jpg",
    shortDescription:
      "The Creator brings new ideas and visions into reality through innovation.",
    fullDescription:
      "The Creator archetype embodies the urge to create something new and express one's vision in tangible form. Creators are driven by imagination and the desire to give form to their ideas, whether through art, innovation, or entrepreneurship. They value originality, authenticity, and the process of creation itself. At their best, Creators are innovative, expressive, and visionary. Their shadow aspects can include perfectionism, creative blocks, and valuing creation over human connection. The Creator's journey involves finding the courage to express their unique vision while remaining open to feedback and collaboration.",
    traits: [
      "Imaginative",
      "Innovative",
      "Expressive",
      "Authentic",
      "Visionary",
    ],
    quote: "To create is to live twice.",
    examples: "Leonardo da Vinci, Frida Kahlo, Steve Jobs",
  },
  {
    id: "rebel",
    name: "Rebel (Destroyer)",
    image: "/archetypes/Rebel.jpg",
    shortDescription:
      "The Rebel challenges the status quo and breaks down outdated structures.",
    fullDescription:
      "The Rebel or Destroyer archetype represents the energy that challenges the status quo and breaks down what is no longer serving its purpose. Rebels are driven by a desire for revolution, freedom from constraints, and authentic self-expression. They value independence, courage, and radical honesty. At their best, Rebels are catalysts for necessary change, breaking down oppressive systems to make way for new growth. Their shadow aspects can include destructiveness for its own sake, chronic anger, and inability to cooperate with others. The Rebel's journey involves channeling their revolutionary energy constructively, knowing when to destroy and when to build.",
    traits: [
      "Revolutionary",
      "Courageous",
      "Authentic",
      "Disruptive",
      "Independent",
    ],
    quote: "Rules are meant to be broken.",
    examples: "Prometheus, Malcolm X, Katniss Everdeen",
  },
  {
    id: "magician",
    name: "Magician",
    image: "/archetypes/Magician.jpg",
    shortDescription:
      "The Magician transforms reality through knowledge and connection to higher laws.",
    fullDescription:
      "The Magician archetype represents the energy of transformation, manifestation, and connection to the laws of the universe. Magicians are driven by a desire to understand how things work and to use that knowledge to transform reality. They value wisdom, power, and the alchemical process of turning lead into gold (literally or metaphorically). At their best, Magicians are transformative, insightful, and healing. Their shadow aspects can include manipulation, power-seeking, and unethical use of knowledge. The Magician's journey involves using their power ethically, transforming themselves as well as the world around them.",
    traits: [
      "Transformative",
      "Insightful",
      "Powerful",
      "Visionary",
      "Catalytic",
    ],
    quote: "As above, so below.",
    examples: "Merlin, Marie Curie, Nikola Tesla",
  },
  {
    id: "caregiver",
    name: "Caregiver",
    image: "/archetypes/Caregiver.jpg",
    shortDescription:
      "The Caregiver nurtures others with compassion and selfless generosity.",
    fullDescription:
      "The Caregiver archetype embodies the energy of nurturing, protection, and generosity toward others. Caregivers are driven by compassion and the desire to help those in need. They value empathy, generosity, and the well-being of their community. At their best, Caregivers are compassionate, nurturing, and selfless. Their shadow aspects can include martyrdom, enabling unhealthy behaviors, and neglecting their own needs. The Caregiver's journey involves finding balance between caring for others and caring for themselves, learning when to help and when to allow others to grow through their own challenges.",
    traits: [
      "Compassionate",
      "Nurturing",
      "Generous",
      "Protective",
      "Empathetic",
    ],
    quote: "Love begins by taking care of the closest ones - the ones at home.",
    examples:
      "Mother Teresa, Florence Nightingale, Mrs. Weasley from Harry Potter",
  },
  {
    id: "lover",
    name: "Lover",
    image: "/archetypes/Lover.jpg",
    shortDescription:
      "The Lover seeks connection, passion, and deep appreciation of beauty.",
    fullDescription:
      "The Lover archetype represents the energy of passion, connection, and appreciation of beauty in all its forms. Lovers are driven by the desire for intimate connection, whether with people, experiences, or aesthetic pursuits. They value beauty, emotion, and sensual experience. At their best, Lovers are passionate, committed, and appreciative. Their shadow aspects can include obsession, jealousy, and losing themselves in relationships. The Lover's journey involves developing healthy intimacy, balancing passion with commitment, and finding the beauty in all aspects of life, even the challenging ones.",
    traits: ["Passionate", "Committed", "Appreciative", "Sensual", "Emotional"],
    quote: "Life without love is like a tree without blossoms or fruit.",
    examples: "Romeo and Juliet, Aphrodite, Pablo Neruda",
  },
  {
    id: "warrior",
    name: "Warrior",
    image: "/archetypes/Warrior.jpg",
    shortDescription:
      "The Warrior fights for what matters with courage and discipline.",
    fullDescription:
      "The Warrior archetype embodies courage, discipline, and the willingness to fight for what matters. Warriors are driven by a desire to protect, to overcome challenges, and to achieve their goals through determination and skill. They value strength, courage, and honor. At their best, Warriors are courageous, disciplined, and skilled. Their shadow aspects can include aggression, ruthlessness, and an inability to show vulnerability. The Warrior's journey involves finding causes worth fighting for, developing both outer strength and inner resilience, and knowing when to fight and when to make peace.",
    traits: [
      "Courageous",
      "Disciplined",
      "Skilled",
      "Protective",
      "Determined",
    ],
    quote: "Courage is not the absence of fear, but the triumph over it.",
    examples: "Achilles, Joan of Arc, Mulan",
  },
];

function Archetypes() {
  const [selectedArchetype, setSelectedArchetype] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openArchetypeModal = (archetype) => {
    setSelectedArchetype(archetype);
    onOpen();
  };

  return (
    <Box width={{ base: "100%" }}>
      {/* Hero Section */}
      <Box
        position="relative"
        py={{ base: "16", md: "24" }}
        as="section"
        bg="#1A2A44"
      >
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-b, #1A2A44, #2A3F66)"
          opacity="0.9"
          zIndex="0"
        />

        <Container maxW="container.xl" position="relative" zIndex="1">
          <VStack spacing={8} textAlign="center" maxW="3xl" mx="auto">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              fontFamily="Quicksand"
            >
              Discover the Archetypes Within
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              fontFamily="system-ui"
            >
              Explore the powerful archetypal patterns that shape our lives,
              stories, and collective unconscious.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Box as="section" py={{ base: "12", md: "16" }} bg="parchment.light">
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={10}
            alignItems="center"
          >
            <Box>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                mb={4}
                color="leather.dark"
                fontFamily="Quicksand"
              >
                Understanding Jungian Archetypes
              </Heading>
              <Text
                color="leather.default"
                fontSize="lg"
                mb={4}
                fontFamily="system-ui"
              >
                Archetypes are universal, mythic patterns that reside in what
                Carl Jung called the "collective unconscious" — the part of the
                unconscious mind shared by all of humanity.
              </Text>
              <Text
                color="leather.default"
                fontSize="lg"
                mb={4}
                fontFamily="system-ui"
              >
                These primordial images and motifs appear across cultures, in
                our dreams, myths, and stories. They represent fundamental human
                experiences and motivations that we all share.
              </Text>
              <Text
                color="leather.default"
                fontSize="lg"
                fontFamily="system-ui"
              >
                By understanding the archetypes active in our lives, we gain
                insight into our behaviors, desires, and challenges. This
                awareness can lead to greater self-understanding and personal
                growth.
              </Text>
            </Box>
            <Box
              p={8}
              bg="#E2E8F0"
              borderRadius="xl"
              border="1px"
              borderColor="#A9B9D8"
              boxShadow="lg"
            >
              <VStack spacing={4} align="flex-start">
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  color="leather.dark"
                  fontFamily="Quicksand"
                >
                  Key Concepts in Jungian Psychology
                </Heading>
                <Box>
                  <Text
                    fontWeight="bold"
                    color="leather.dark"
                    fontFamily="Quicksand"
                  >
                    The Collective Unconscious
                  </Text>
                  <Text color="leather.default" fontFamily="system-ui">
                    A shared reservoir of memories and ideas inherited from our
                    ancestors and common to all humans.
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    color="leather.dark"
                    fontFamily="Quicksand"
                  >
                    Archetypes
                  </Text>
                  <Text color="leather.default" fontFamily="system-ui">
                    Universal patterns and images that derive from the
                    collective unconscious and are the psychic counterpart of
                    instinct.
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    color="leather.dark"
                    fontFamily="Quicksand"
                  >
                    The Shadow
                  </Text>
                  <Text color="leather.default" fontFamily="system-ui">
                    The unknown dark side of the personality, containing
                    repressed ideas, weaknesses, desires, and instincts.
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    color="leather.dark"
                    fontFamily="Quicksand"
                  >
                    Individuation
                  </Text>
                  <Text color="leather.default" fontFamily="system-ui">
                    The process of integrating the conscious with the
                    unconscious to form a whole, individuated self.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Archetypes Grid Section */}
      <Box as="section" py={{ base: "12", md: "16" }} bg="#EDF2F7">
        <Container maxW="container.xl">
          <VStack spacing={8} mb={10}>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="leather.dark"
              fontFamily="Quicksand"
              textAlign="center"
            >
              Explore the 12 Primary Archetypes
            </Heading>
            <Text
              color="leather.default"
              fontSize="lg"
              maxW="3xl"
              textAlign="center"
              fontFamily="system-ui"
            >
              Click on each archetype to learn more about its characteristics,
              strengths, challenges, and how it might manifest in your life.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {archetypeData.map((archetype) => (
              <Box
                key={archetype.id}
                onClick={() => openArchetypeModal(archetype)}
                cursor="pointer"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                border="1px"
                borderColor="#A9B9D8"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl",
                  borderColor: "leather.default",
                }}
              >
                <Box position="relative" height="280px">
                  <Image
                    src={archetype.image || "/placeholder.svg"}
                    alt={`${archetype.name} Archetype`}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    objectPosition={
                      archetype.id === "orphan"
                        ? "center 15%"
                        : archetype.id === "caregiver"
                        ? "center 30%"
                        : archetype.id === "sage"
                        ? "center 30%"
                        : "center"
                    }
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="rgba(26, 42, 68, 0.75)"
                    p={4}
                  >
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="bold"
                      color="white"
                      fontFamily="Quicksand"
                    >
                      {archetype.name}
                    </Heading>
                  </Box>
                </Box>
                <Box p={4}>
                  <Text
                    color="leather.default"
                    fontFamily="system-ui"
                    noOfLines={3}
                  >
                    {archetype.shortDescription}
                  </Text>
                  <Button
                    mt={4}
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    rightIcon={<ArrowForwardIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      openArchetypeModal(archetype);
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Archetype Detail Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="rgba(26, 42, 68, 0.75)" />
        <ModalContent bg="parchment.light" borderRadius="lg" mx={4}>
          {selectedArchetype && (
            <>
              <ModalHeader
                borderBottomWidth="1px"
                borderColor="#A9B9D8"
                fontFamily="Quicksand"
                color="leather.dark"
                fontSize="2xl"
              >
                The {selectedArchetype.name} Archetype
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody py={6}>
                <Grid
                  templateColumns={{ base: "1fr", md: "250px 1fr" }}
                  gap={6}
                >
                  <Box>
                    <Image
                      src={selectedArchetype.image || "/placeholder.svg"}
                      alt={`${selectedArchetype.name} Archetype`}
                      borderRadius="md"
                      boxShadow="md"
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      objectPosition={
                        selectedArchetype.id === "orphan"
                          ? "center 30%"
                          : selectedArchetype.id === "caregiver"
                          ? "center 30%"
                          : "center"
                      }
                    />
                  </Box>
                  <Box>
                    <Text fontFamily="system-ui" fontSize="lg" mb={4}>
                      {selectedArchetype.fullDescription}
                    </Text>

                    <Box mb={4}>
                      <Heading
                        as="h4"
                        size="md"
                        fontFamily="Quicksand"
                        color="leather.dark"
                        mb={2}
                      >
                        Key Traits
                      </Heading>
                      <Flex wrap="wrap" gap={2}>
                        {selectedArchetype.traits.map((trait, index) => (
                          <Box
                            key={index}
                            bg="#E2E8F0"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                            fontFamily="system-ui"
                            color="leather.dark"
                          >
                            {trait}
                          </Box>
                        ))}
                      </Flex>
                    </Box>

                    <Box mb={4}>
                      <Heading
                        as="h4"
                        size="md"
                        fontFamily="Quicksand"
                        color="leather.dark"
                        mb={2}
                      >
                        Notable Examples
                      </Heading>
                      <Text fontFamily="system-ui">
                        {selectedArchetype.examples}
                      </Text>
                    </Box>

                    <Box
                      p={4}
                      bg="#E2E8F0"
                      borderRadius="md"
                      borderLeft="4px solid"
                      borderColor="#7A94C1"
                    >
                      <Text
                        fontStyle="italic"
                        fontFamily="system-ui"
                        fontSize="lg"
                      >
                        "{selectedArchetype.quote}"
                      </Text>
                    </Box>
                  </Box>
                </Grid>

                <Box mt={8}>
                  <Heading
                    as="h4"
                    size="md"
                    fontFamily="Quicksand"
                    color="leather.dark"
                    mb={4}
                  >
                    Journaling Prompts for the {selectedArchetype.name}
                  </Heading>
                  <VStack align="stretch" spacing={3}>
                    <Text fontFamily="system-ui">
                      1. When have you embodied the {selectedArchetype.name}{" "}
                      energy in your life? How did it feel?
                    </Text>
                    <Text fontFamily="system-ui">
                      2. What aspects of the {selectedArchetype.name} do you
                      admire? Which aspects challenge you?
                    </Text>
                    <Text fontFamily="system-ui">
                      3. How might embracing the positive qualities of the{" "}
                      {selectedArchetype.name} help you in your current
                      situation?
                    </Text>
                    <Text fontFamily="system-ui">
                      4. Describe a time when you witnessed someone else
                      embodying the {selectedArchetype.name} archetype.
                    </Text>
                    <Text fontFamily="system-ui">
                      5. If your {selectedArchetype.name} energy could speak to
                      you directly, what wisdom would it share?
                    </Text>
                  </VStack>
                </Box>
              </ModalBody>
              <ModalFooter borderTopWidth="1px" borderColor="#A9B9D8">
                <Button
                  bg="leather.default"
                  color="white"
                  _hover={{ bg: "leather.dark" }}
                  onClick={onClose}
                  fontFamily="Quicksand"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Call to Action Section */}
      <Box
        as="section"
        py={{ base: "12", md: "16" }}
        bgGradient="linear(to-br, #E2E8F0, #C5D1E8)"
      >
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto">
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="leather.dark"
              fontFamily="Quicksand"
            >
              Begin Your Archetypal Journey
            </Heading>
            <Text color="leather.default" fontSize="lg" fontFamily="system-ui">
              Take our quiz to discover which archetypes are most active in your
              life right now, and start journaling with personalized prompts.
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
        </Container>
      </Box>
    </Box>
  );
}

export default Archetypes;

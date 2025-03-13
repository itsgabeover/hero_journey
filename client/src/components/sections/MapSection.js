import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaMapMarkerAlt, FaPlus, FaUnlock } from "react-icons/fa";

export default function MapSection({ mapLocations = [] }) {
  return (
    <Box>
      <Heading
        as="h2"
        fontSize="2xl"
        mb={6}
        fontFamily="Quicksand"
        color="leather.dark"
      >
        Hero's Journey Map 🗺️
      </Heading>

      <Text mb={6} color="leather.default">
        Map the landscapes of your journey - document real or imagined places
        tied to your experiences and attach journal entries to locations.
      </Text>

      <Box
        bg="#F7F0E3"
        p={6}
        border="1px"
        borderColor="#A9B9D8"
        borderRadius="lg"
        boxShadow="md"
      >
        <Grid templateColumns={{ base: "1fr", lg: "1fr 300px" }} gap={8}>
          <Box
            position="relative"
            h={{ base: "300px", md: "400px" }}
            bg="#E2E8F0"
            borderRadius="lg"
            overflow="hidden"
            border="1px solid #7A94C1"
          >
            {/* Map Background */}
            <Box
              position="absolute"
              inset="0"
              bgImage="url('/map-background.jpg')"
              bgSize="cover"
              bgPos="center"
              opacity="0.7"
            />

            {/* Map Markers */}
            {mapLocations.map((location, index) => (
              <Tooltip
                key={location.id}
                label={
                  location.locked
                    ? "Locked: Continue your journey to unlock"
                    : `${location.name} (${location.entryCount} entries)`
                }
                placement="top"
              >
                <IconButton
                  position="absolute"
                  top={`${20 + index * 20}%`}
                  left={`${15 + index * 25}%`}
                  aria-label={location.name}
                  icon={location.locked ? <FaLock /> : <FaMapMarkerAlt />}
                  colorScheme={location.locked ? "gray" : "red"}
                  size="md"
                  isRound
                  opacity={location.locked ? 0.6 : 1}
                />
              </Tooltip>
            ))}
          </Box>

          <VStack align="stretch" spacing={4}>
            <Heading
              as="h3"
              size="md"
              fontFamily="Quicksand"
              color="leather.dark"
            >
              Discovered Locations
            </Heading>

            {mapLocations.map((location) => (
              <Box
                key={location.id}
                p={3}
                bg={location.locked ? "gray.100" : "white"}
                borderRadius="md"
                border="1px"
                borderColor={location.locked ? "gray.300" : "#7A94C1"}
                opacity={location.locked ? 0.7 : 1}
              >
                <VStack align="start" spacing={2}>
                  <HStack width="100%" justify="space-between">
                    <HStack>
                      <Icon
                        as={location.locked ? FaLock : FaUnlock}
                        color={location.locked ? "gray.500" : "green.500"}
                      />
                      <Text fontWeight="bold" color="leather.dark">
                        {location.name}
                      </Text>
                    </HStack>
                    {!location.locked && location.entryCount > 0 && (
                      <Badge colorScheme="blue" borderRadius="full">
                        {location.entryCount}{" "}
                        {location.entryCount === 1 ? "entry" : "entries"}
                      </Badge>
                    )}
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    {location.description}
                  </Text>
                  {!location.locked && (
                    <Button
                      size="xs"
                      leftIcon={<FaPlus />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Attach Journal Entry
                    </Button>
                  )}
                </VStack>
              </Box>
            ))}
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              Add New Location
            </Button>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  VStack,
  Box,
  Select,
  Divider,
  SimpleGrid,
  Center,
  useToast,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "./ui/Card";

function UserProfile({ user, setUser }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    nickname: "",
    email: "",
    archetype: "",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        nickname: user.nickname || "",
        email: user.email || "",
        archetype: user.archetype || "",
      });
    }
  }, [user]);

  // Safe early return if user is not ready yet
  if (!user) {
    return (
      <Center minH="calc(100vh - 4rem)" px={4} py={8}>
        <Card maxW="4xl" w="full">
          <CardHeader>
            <Heading
              textAlign="center"
              size="lg"
              fontFamily="Quicksand"
              fontWeight="600"
              color="leather.default"
            >
              Loading Your Profile
            </Heading>
          </CardHeader>
          <CardBody>
            <Text
              textAlign="center"
              color="leather.default"
              fontFamily="Quicksand"
            >
              Please wait while we retrieve your information...
            </Text>
          </CardBody>
        </Card>
      </Center>
    );
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  // Handle form submission (PATCH request)
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    fetch(`/editprofile/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: formData}),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((updatedUser) => {
            setUser(updatedUser); // Update global user state
            toast({
              title: "Profile updated.",
              description: "Your profile has been successfully updated.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          });
        } else {
          response
            .json()
            .then((err) => setErrors(err.errors || ["Profile update failed."]));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Center minH="calc(100vh - 4rem)" px={4} py={8}>
      <Card maxW="4xl" w="full">
        <CardHeader>
          <Heading
            textAlign="center"
            size="lg"
            fontFamily="Quicksand"
            fontWeight="600"
            color="leather.default"
          >
            Your Hero's Profile
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {errors.length > 0 && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  <VStack align="start" spacing={1} w="full">
                    {errors.map((error, index) => (
                      <Text key={index}>{error}</Text>
                    ))}
                  </VStack>
                </Alert>
              )}

              <Box>
                <Heading
                  size="sm"
                  fontFamily="Quicksand"
                  fontWeight="600"
                  color="leather.default"
                  mb={4}
                >
                  Account Information
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="username">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Username
                    </FormLabel>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Divider borderColor="leather.light" />

              <Box>
                <Heading
                  size="sm"
                  fontFamily="Quicksand"
                  fontWeight="600"
                  color="leather.default"
                  mb={4}
                >
                  Personal Information
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="first_name">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      First Name
                    </FormLabel>
                    <Input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl id="last_name">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Last Name
                    </FormLabel>
                    <Input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl id="nickname">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Nickname
                    </FormLabel>
                    <Input
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl id="archetype">
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Your Archetype
                    </FormLabel>
                    <Select
                      name="archetype"
                      value={formData.archetype}
                      onChange={handleChange}
                      fontFamily="Quicksand"
                      fontSize="md"
                    >
                      <option value="">Choose your archetype</option>
                      <option value="Seeker">Seeker</option>
                      <option value="Innocent">Innocent</option>
                      <option value="Orphan">Orphan</option>
                      <option value="Fool (Jester)">Fool (Jester)</option>
                      <option value="Sage (Senex)">Sage</option>
                      <option value="King">King</option>
                      <option value="Creator">Creator</option>
                      <option value="Rebel">Rebel</option>
                      <option value="Magician">Magician</option>
                      <option value="Caregiver">Caregiver</option>
                      <option value="Lover">Lover</option>
                      <option value="Warrior">Warrior</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Updating Profile..."
                width="full"
                size="lg"
                fontSize="lg"
                bg="leather.default"
                color="white"
                _hover={{ bg: "leather.dark" }}
                mt={4}
                fontFamily="Quicksand"
              >
                Update Profile
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
}

export default UserProfile;

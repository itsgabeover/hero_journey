"use client";

import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Alert,
  AlertIcon,
  VStack,
  Box,
  Select,
  Divider,
  useToast,
  FormErrorMessage,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "./ui/Card";

function SignUp({ setUser }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    nickname: "",
    email: "",
    archetype: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Basic validation
    const validationErrors = [];
    if (formData.password !== formData.password_confirmation) {
      validationErrors.push("Passwords don't match");
    }
    if (formData.password.length < 6) {
      validationErrors.push("Password must be at least 6 characters");
    }
    if (!formData.username) {
      validationErrors.push("Username is required");
    }
    if (!formData.email) {
      validationErrors.push("Email is required");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user: formData}),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((user) => {
            setUser(user);
            toast({
              title: "Account created.",
              description: "Welcome to your journal!",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            navigate("/");
          });
        } else {
          return r.json().then((err) => {
            setErrors(err.errors || [err.error] || ["Signup failed"]);
          });
        }
      })
      .catch((error) => {
        setErrors(["Something went wrong. Please try again."]);
        console.error("Signup error:", error);
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
            Begin Your Journey
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
                  <FormControl id="username" isRequired>
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
                      placeholder="Choose a username"
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>

                  <FormControl id="email" isRequired>
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
                      placeholder="Your email address"
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
                <Heading
                  size="sm"
                  fontFamily="Quicksand"
                  fontWeight="600"
                  color="leather.default"
                  mb={4}
                >
                  Security
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={
                      formData.password && formData.password.length < 6
                    }
                  >
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                    {formData.password && formData.password.length < 6 && (
                      <FormErrorMessage>
                        Password must be at least 6 characters
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    id="password_confirmation"
                    isRequired
                    isInvalid={
                      formData.password_confirmation &&
                      formData.password !== formData.password_confirmation
                    }
                  >
                    <FormLabel
                      fontFamily="Quicksand"
                      fontSize="lg"
                      color="leather.default"
                    >
                      Confirm Password
                    </FormLabel>
                    <Input
                      type="password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      fontFamily="Quicksand"
                      fontSize="md"
                    />
                    {formData.password_confirmation &&
                      formData.password !== formData.password_confirmation && (
                        <FormErrorMessage>
                          Passwords don't match
                        </FormErrorMessage>
                      )}
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
                      placeholder="Your first name"
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
                      placeholder="Your last name"
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
                      placeholder="What should we call you?"
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
                      placeholder="Choose your archetype"
                      fontFamily="Quicksand"
                      fontSize="md"
                    >
                      <option value="Seeker">Seeker</option>
                      <option value="Innocent">Innocent</option>
                      <option value="Orphan">Orphan</option>
                      <option value="Fool">Fool (Jester)</option>
                      <option value="Sage">Sage</option>
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
                loadingText="Creating Account..."
                width="full"
                size="lg"
                fontSize="lg"
                bg="leather.default"
                color="white"
                _hover={{ bg: "leather.dark" }}
                mt={4}
              >
                Begin Your Journey
              </Button>

              <Text
                textAlign="center"
                fontFamily="Quicksand"
                color="leather.default"
              >
                Already have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  color="leather.dark"
                  textDecoration="underline"
                >
                  Login
                </Link>
              </Text>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
}

export default SignUp;

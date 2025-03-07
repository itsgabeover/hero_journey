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
  Center,
} from "@chakra-ui/react";
import { Card, CardBody, CardHeader } from "./ui/Card";

function Login({ setUser, setJournals }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch("/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((user) => {
            setUser(user);
            setJournals(user.journals || []);
            navigate("/");
          });
        } else {
          return r.json().then((err) => {
            setError(err.error || "Invalid login");
          });
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Center minH="calc(100vh - 4rem)" px={4}>
      <Card maxW="md" w="full" boxShadow="md" borderWidth="1px">
        <CardHeader>
          <Heading
            textAlign="center"
            size="lg"
            fontFamily="Quicksand"
            fontWeight="600"
            color="leather.default"
          >
            Login to Your Journal
          </Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <FormControl id="username">
                <FormLabel
                  fontFamily="Quicksand"
                  fontSize="lg"
                  color="leather.default"
                >
                  Username
                </FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  fontFamily="Quicksand"
                  fontSize="md"
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel
                  fontFamily="Quicksand"
                  fontSize="lg"
                  color="leather.default"
                >
                  Password
                </FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  fontFamily="Quicksand"
                  fontSize="md"
                />
              </FormControl>

              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Logging in..."
                width="full"
                size="lg"
                fontSize="lg"
              >
                Login
              </Button>

              <Text
                textAlign="center"
                fontFamily="Quicksand"
                color="leather.default"
              >
                Don't have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/signup"
                  color="leather.dark"
                  textDecoration="underline"
                >
                  Sign up
                </Link>
              </Text>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Login;

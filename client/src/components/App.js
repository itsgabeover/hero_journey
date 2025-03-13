"use client";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import theme from "./theme";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import LoadingSpinner from "./LoadingSpinner";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Community from "./Community";
import Archetypes from "./Archetypes";
import HerosJourney from "./HerosJourney";
import MyJournal from "./MyJournal";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [myJournals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-login check on first load
  useEffect(() => {
    setIsLoading(true);
    fetch("/me", {
      credentials: "include", // Important for Rails sessions
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((userData) => {
            setUser(userData);
            setJournals(userData.journals || []); // preload journals if you want
          });
        } else {
          setUser(null); // No user logged in
          return Promise.resolve();
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <LoadingSpinner />;
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Flex direction={{ base: "column", md: "row" }} minH="100vh">
          <NavBar user={user} setUser={setUser} setJournals={setJournals} />

          <Box
            as="main"
            w="full"
            ml={{ base: 0, md: "15%" }}
            transition="all 0.3s"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/signup" element={<SignUp setUser={setUser} />} />
                <Route
                  path="/login"
                  element={
                    <Login setUser={setUser} setJournals={setJournals} />
                  }
                />
                <Route
                  path="/myprofile"
                  element={
                    <ProtectedRoute>
                      <UserProfile
                        user={user}
                        setUser={setUser}
                        myJournals={myJournals}
                        setJournals={setJournals}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myjournal"
                  element={
                    <ProtectedRoute>
                      <MyJournal
                        user={user}
                        setUser={setUser}
                        myJournals={myJournals}
                        setJournals={setJournals}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard
                        user={user}
                        setUser={setUser}
                        myJournals={myJournals}
                        setJournals={setJournals}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/archetypes"
                  element={
                    <Archetypes
                      user={user}
                      myJournals={myJournals}
                      setJournals={setJournals}
                    />
                  }
                />
                <Route
                  path="/herosjourney"
                  element={
                    <HerosJourney
                      user={user}
                      myJournals={myJournals}
                      setJournals={setJournals}
                    />
                  }
                />
              </Routes>
            )}
          </Box>
        </Flex>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

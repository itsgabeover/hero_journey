"use client";

import { useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Link,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import logo from "../logo.png";
import logoMovie from "../logoMovie.mp4";

function NavBar({ user, setUser, setJournals }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  function handleLogoutClick() {
    fetch("/logout", {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      setUser(null);
      setJournals([]);
      navigate("/");
      if (isOpen) onClose();
    });
  }

  // Shared link styling
  const linkStyle = {
    display: "block",
    width: "100%",
    py: 2,
    px: 4,
    textAlign: "center",
    borderWidth: "1px",
    borderColor: "leather.dark",
    borderRadius: "md",
    transition: "all 0.2s",
    my: 2,
    fontFamily: "Quicksand",
    fontWeight: "600",
    _hover: {
      bg: "leather.default",
      color: "white",
    },
  };

  // Sidebar content based on user login status
  const SidebarContent = () => (
    <VStack spacing={2} align="stretch" p={2}>
      {user !== null ? (
        <>
          <Image
            src={logo || "/placeholder.svg"}
            alt="Journal App Logo"
            objectFit="contain"
          />
          <Link as={RouterLink} to="/" sx={linkStyle} onClick={onClose}>
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/herosjourney"
            sx={linkStyle}
            onClick={onClose}
          >
            The Hero's Journey
          </Link>
          <Link
            as={RouterLink}
            to="/archetypes"
            sx={linkStyle}
            onClick={onClose}
          >
            Jungian Archetypes
          </Link>
          <Link
            as={RouterLink}
            to="/community"
            sx={linkStyle}
            onClick={onClose}
          >
            Community
          </Link>
          <Link
            as={RouterLink}
            to="/myprofile"
            sx={linkStyle}
            onClick={onClose}
          >
            My Profile
          </Link>
          <Link
            as={RouterLink}
            to="/"
            sx={linkStyle}
            onClick={() => {
              handleLogoutClick();
              onClose();
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Box width="100%">
            <ReactPlayer
              url={logoMovie}
              width="100%"
              height="200px"
              playing={true}
              volume={0}
              muted={true}
            />
          </Box>
          <Link as={RouterLink} to="/" sx={linkStyle} onClick={onClose}>
            Home
          </Link>
          <Link as={RouterLink} to="/signup" sx={linkStyle} onClick={onClose}>
            Signup
          </Link>
          <Link as={RouterLink} to="/login" sx={linkStyle} onClick={onClose}>
            Login
          </Link>
          <Link
            as={RouterLink}
            to="/herosjourney"
            sx={linkStyle}
            onClick={onClose}
          >
            The Hero's Journey
          </Link>
          <Link
            as={RouterLink}
            to="/archetypes"
            sx={linkStyle}
            onClick={onClose}
          >
            Jungian Archetypes
          </Link>
          <Link
            as={RouterLink}
            to="/community"
            sx={linkStyle}
            onClick={onClose}
          >
            Community
          </Link>
        </>
      )}
    </VStack>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        ref={btnRef}
        onClick={onOpen}
        position="fixed"
        top="4"
        left="4"
        zIndex="50"
        display={{ base: "flex", md: "none" }}
        bg="leather.default"
        color="white"
        _hover={{ bg: "leather.dark" }}
        aria-label="Open menu"
        size="sm"
      >
        ☰
      </Button>

      {/* Mobile drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="parchment.light">
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop sidebar */}
      <Box
        as="aside"
        position="fixed"
        left="0"
        width="20%"
        height="100%"
        bg="parchment.light"
        overflowY="auto"
        display={{ base: "none", md: "block" }}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <SidebarContent />
      </Box>
    </>
  );
}

export default NavBar;

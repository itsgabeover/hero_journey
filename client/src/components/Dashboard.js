"use client";

import { useState } from "react";
import { Box, Button, Container, HStack } from "@chakra-ui/react";
import {
  FaBook,
  FaMap,
  FaUsers,
  FaScroll,
  FaTasks,
  FaHatWizard,
} from "react-icons/fa";

// Import section components
import JournalsSection from "./sections/JournalsSection";
import PartySection from "./sections/PartySection";
import MapSection from "./sections/MapSection";
import UnknownSection from "./sections/UnknownSection";
import QuestBoardSection from "./sections/QuestBoardSection";
import OracleSection from "./sections/OracleSection";
import WelcomeSection from "./sections/WelcomeSection";

export default function Dashboard({ user, folders = [] }) {
  const [selectedSection, setSelectedSection] = useState("welcome"); // Tracks active section

  const [journalForm, setJournalForm] = useState({
    title: "",
    archetype: "",
    body: "",
    folder_id: "",
  });

  const handleJournalChange = (e) => {
    const { name, value } = e.target;
    setJournalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJournalSubmit = (e) => {
    e.preventDefault();
    console.log("Journal Entry Saved:", journalForm);
  };

  // Sample data for placeholders
  const partyMembers = [
    {
      id: 1,
      name: "Elara",
      archetype: "Sage",
      avatar: "/archetypes/Sage.jpg",
      relationship: "Mentor",
    },
    {
      id: 2,
      name: "Thorne",
      archetype: "Warrior",
      avatar: "/archetypes/Warrior.jpg",
      relationship: "Ally",
    },
    {
      id: 3,
      name: "Lyra",
      archetype: "Creator",
      avatar: "/archetypes/Creator.jpg",
      relationship: "Ally",
    },
    {
      id: 4,
      name: "Kael",
      archetype: "Seeker",
      avatar: "/archetypes/Seeker.jpg",
      relationship: "Rival",
    },
  ];

  const mapLocations = [
    {
      id: 1,
      name: "The Inner Sanctum",
      description: "A place of deep reflection",
      locked: false,
      entryCount: 3,
    },
    {
      id: 2,
      name: "Shadow's Edge",
      description: "Confront your fears",
      locked: false,
      entryCount: 1,
    },
    {
      id: 3,
      name: "Wisdom's Peak",
      description: "Gain clarity and perspective",
      locked: false,
      entryCount: 2,
    },
    {
      id: 4,
      name: "The Forgotten Path",
      description: "Rediscover lost aspects of yourself",
      locked: true,
      entryCount: 0,
    },
  ];

  const unchartedChallenges = [
    {
      id: 1,
      name: "The Hero's Journey",
      description: "Complete a 7-day journaling challenge",
      difficulty: "Medium",
    },
    {
      id: 2,
      name: "Shadow Work",
      description: "Explore your inner shadows through guided prompts",
      difficulty: "Hard",
    },
    {
      id: 3,
      name: "Archetype Integration",
      description: "Balance opposing archetypes in your psyche",
      difficulty: "Expert",
    },
  ];

  const questBoardItems = [
    {
      id: 1,
      title: "Face my fear of public speaking",
      deadline: "In 30 days",
      status: "Not Started",
      type: "Personal Challenge",
    },
    {
      id: 2,
      title: "Write a chapter of my story every week",
      deadline: "Ongoing",
      status: "In Progress",
      type: "Creative Quest",
    },
    {
      id: 3,
      title: "Meditate for 10 minutes daily",
      deadline: "Daily",
      status: "In Progress",
      type: "Daily Practice",
    },
    {
      id: 4,
      title: "Read 'The Hero with a Thousand Faces'",
      deadline: "By end of month",
      status: "Not Started",
      type: "Knowledge Quest",
    },
  ];

  const oracleInsights = [
    {
      id: 1,
      question: "How can I overcome my fear of failure?",
      reflection:
        "From your entry on March 15th: 'My fear doesn't protect me; it only prevents growth. Each failure has taught me more than any success.'",
      journalDate: "March 15, 2023",
    },
    {
      id: 2,
      question: "What patterns keep repeating in my relationships?",
      reflection:
        "Your entries reveal a pattern of initial enthusiasm followed by withdrawal when things get serious. Consider how your Lover and Orphan archetypes interact.",
      journalDate: "Various entries",
    },
    {
      id: 3,
      question: "When am I most authentically myself?",
      reflection:
        "In your Hero's Journey reflection: 'I feel most alive when creating something new, especially when sharing that creation with others.'",
      journalDate: "January 8, 2023",
    },
  ];

  return (
    <Box bg="parchment.light" minH="100vh">
      {/* Navigation Buttons */}
      <Box
        py={4}
        bg="parchment.dark"
        borderBottom="1px solid"
        borderColor="#C5D1E8"
      >
        <Container maxW="container.xl">
          <HStack spacing={4} justify="center" wrap="wrap">
            <Button
              leftIcon={<FaBook />}
              bg={
                selectedSection === "journals" ? "leather.default" : "#7A94C1"
              }
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("journals")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              My Journals 🏹
            </Button>
            <Button
              leftIcon={<FaUsers />}
              bg={selectedSection === "party" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("party")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              My Party 🛡
            </Button>
            <Button
              leftIcon={<FaMap />}
              bg={selectedSection === "map" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("map")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              Map 🗺
            </Button>
            <Button
              leftIcon={<FaScroll />}
              bg={
                selectedSection === "uncharted" ? "leather.default" : "#7A94C1"
              }
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("uncharted")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              The Unknown 🔮
            </Button>
            <Button
              leftIcon={<FaTasks />}
              bg={selectedSection === "quests" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("quests")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              Quest Board 📜
            </Button>
            <Button
              leftIcon={<FaHatWizard />}
              bg={selectedSection === "oracle" ? "leather.default" : "#7A94C1"}
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("oracle")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              The Oracle 🔮
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Dynamic Content Section */}
      <Box py={{ base: "8", md: "12" }}>
        <Container maxW="container.xl">
          {selectedSection === "welcome" && <WelcomeSection user={user} />}

          {selectedSection === "journals" && (
            <JournalsSection
              folders={folders}
              journalForm={journalForm}
              handleJournalChange={handleJournalChange}
              handleJournalSubmit={handleJournalSubmit}
              user={user}
            />
          )}

          {selectedSection === "party" && (
            <PartySection partyMembers={partyMembers} />
          )}

          {selectedSection === "map" && (
            <MapSection mapLocations={mapLocations} />
          )}

          {selectedSection === "uncharted" && (
            <UnknownSection unchartedChallenges={unchartedChallenges} />
          )}

          {selectedSection === "quests" && (
            <QuestBoardSection questBoardItems={questBoardItems} />
          )}

          {selectedSection === "oracle" && (
            <OracleSection oracleInsights={oracleInsights} />
          )}
        </Container>
      </Box>
    </Box>
  );
}

import { useState, useEffect } from "react";
import { Box, Button, Container, HStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

// Import section components
import JournalsSection from "./sections/JournalsSection";
import QuestBoardSection from "./sections/QuestBoardSection";
import OracleSection from "./sections/OracleSection";
import WelcomeSection from "./sections/WelcomeSection";

export default function Dashboard({ user, folders = [] }) {
  const location = useLocation();

  // Get the section from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const sectionParam = queryParams.get("section");

  // Set the initial selected section based on the URL parameter or default to "welcome"
  const [selectedSection, setSelectedSection] = useState(
    sectionParam || "welcome"
  );

  // Update selectedSection when the URL parameter changes
  useEffect(() => {
    if (sectionParam) {
      setSelectedSection(sectionParam);
    }
  }, [sectionParam]);

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
              bg={
                selectedSection === "journals" ? "leather.default" : "#7A94C1"
              }
              color="white"
              _hover={{ bg: "leather.dark" }}
              onClick={() => setSelectedSection("journals")}
              fontFamily="Quicksand"
              fontWeight="600"
            >
              My Journals 📚
            </Button>
            <Button
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
      <Box py={{ base: "4", md: "4" }}>
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

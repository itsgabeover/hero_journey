import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "../ui/Card";
import {
  FaBookOpen,
  FaFeather,
  FaPlus,
  FaFolder,
  FaList,
} from "react-icons/fa";

export default function JournalsSection({ user }) {
  const toast = useToast();

  // State for folders and selection
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);
  const [viewMode, setViewMode] = useState("recent"); // "recent", "all", or "folder"

  // State for journals
  const [unassignedJournals, setUnassignedJournals] = useState([]);
  const [allJournals, setAllJournals] = useState([]);
  const [isLoadingJournals, setIsLoadingJournals] = useState(true);

  // Journal form state
  const [journalForm, setJournalForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });

  // Fetch folders on mount
  useEffect(() => {
    setIsLoadingFolders(true);
    fetch("/folders", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
        setIsLoadingFolders(false);
      })
      .catch((err) => {
        console.error("Error fetching folders:", err);
        setIsLoadingFolders(false);
      });
  }, []);

  // Fetch unassigned journals on mount
  useEffect(() => {
    setIsLoadingJournals(true);
    fetch("/journals/unassigned", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUnassignedJournals(data || []);
        setIsLoadingJournals(false);
      })
      .catch((err) => {
        console.error("Error fetching unassigned journals:", err);
        setIsLoadingJournals(false);
      });
  }, []);

  // Fetch all journals when needed
  useEffect(() => {
    if (viewMode === "all") {
      setIsLoadingJournals(true);
      fetch("/journals", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          setAllJournals(data || []);
          setIsLoadingJournals(false);
        })
        .catch((err) => {
          console.error("Error fetching all journals:", err);
          setIsLoadingJournals(false);
        });
    }
  }, [viewMode]);

  function handleJournalChange(e) {
    const { name, value } = e.target;
    setJournalForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleJournalSubmit(e) {
    e.preventDefault();

    // Check if user exists and has an id
    if (!user || !user.id) {
      toast({
        title: "Error saving journal",
        description: "User information is missing. Please log in again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const folderIdToUse =
      journalForm.folder_id || (selectedFolder ? selectedFolder.id : null);

    const payload = {
      title: journalForm.title,
      body: journalForm.body,
      archetype: journalForm.archetype,
      user_id: user.id,
      folder_id: folderIdToUse,
    };

    // Validate required fields
    if (!payload.title.trim()) {
      toast({
        title: "Title is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    fetch("/newJournalEntry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        toast({
          title: "Journal saved",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Update the appropriate state based on where the journal was saved
        if (folderIdToUse) {
          setFolders((prevFolders) =>
            prevFolders.map((f) =>
              f.id === folderIdToUse
                ? {
                    ...f,
                    journals: [...(f.journals || []), data],
                  }
                : f
            )
          );
        } else {
          setUnassignedJournals((prev) => [...prev, data]);
        }

        // If we're viewing all journals, update that state too
        if (viewMode === "all") {
          setAllJournals((prev) => [...prev, data]);
        }

        setJournalForm({ title: "", body: "", archetype: "", folder_id: "" });
      })
      .catch((error) => {
        console.error("Error saving journal:", error);
        toast({
          title: "Error saving journal",
          description: error.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  function handleCreateFolder() {
    if (!newFolderName.trim()) return;

    // Check if user exists and has an id
    if (!user || !user.id) {
      toast({
        title: "Error creating folder",
        description: "User information is missing. Please log in again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Here you would typically make an API call to create the folder
    const folderData = {
      folder: {
        name: newFolderName,
        user_id: user.id,
      },
    };

    fetch("/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(folderData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create folder");
        return res.json();
      })
      .then((newFolder) => {
        setFolders((prev) => [...prev, newFolder]);
        setNewFolderName("");
        setIsCreatingFolder(false);

        toast({
          title: "Folder created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
        // Fallback to client-side folder creation if API fails
        const tempFolder = {
          id: `temp-${Date.now()}`,
          name: newFolderName,
          journals: [],
        };

        setFolders((prev) => [...prev, tempFolder]);
        setNewFolderName("");
        setIsCreatingFolder(false);

        toast({
          title: "Folder created locally",
          description: "Note: This folder will not persist after refresh",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  // When "All Journals" is selected, combine folder journals and unassigned journals
  const combinedJournals =
    viewMode === "all"
      ? allJournals
      : viewMode === "folder" && selectedFolder
      ? selectedFolder.journals || []
      : unassignedJournals.slice(0, 3); // Recent view shows just a few unassigned journals

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get folder name by id
  const getFolderName = (folderId) => {
    if (!folderId) return "Unassigned";
    const folder = folders.find((f) => f.id === folderId);
    return folder ? folder.name : "Unknown folder";
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
        Hero's Log 🏹
      </Heading>
      <Text mb={6} color="leather.default">
        Track your personal growth through your journal entries. This is your
        record of experiences, trials, and triumphs.
      </Text>

      <Grid templateColumns={{ base: "1fr", lg: "350px 1fr" }} gap={8}>
        {/* Left Column - Recent Entries & Folders */}
        <Box>
          {/* View Selection */}
          <Card maxW="100%" mb={6} borderColor="#A9B9D8">
            <CardHeader>
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                Journal Views
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={3}>
                <Button
                  leftIcon={<FaBookOpen />}
                  colorScheme={viewMode === "recent" ? "blue" : "gray"}
                  variant={viewMode === "recent" ? "solid" : "outline"}
                  justifyContent="flex-start"
                  onClick={() => {
                    setViewMode("recent");
                    setSelectedFolder(null);
                  }}
                >
                  Recent Entries
                </Button>
                <Button
                  leftIcon={<FaList />}
                  colorScheme={viewMode === "all" ? "blue" : "gray"}
                  variant={viewMode === "all" ? "solid" : "outline"}
                  justifyContent="flex-start"
                  onClick={() => {
                    setViewMode("all");
                    setSelectedFolder(null);
                  }}
                >
                  All Journals
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Folders Card */}
          <Card maxW="100%" borderColor="#A9B9D8">
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                  Folders
                </Heading>
                <Button
                  size="xs"
                  leftIcon={<FaPlus />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => setIsCreatingFolder(true)}
                >
                  New
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              {isLoadingFolders ? (
                <Box textAlign="center" py={4}>
                  <Spinner size="md" color="blue.500" />
                  <Text mt={2} fontSize="sm" color="gray.500">
                    Loading folders...
                  </Text>
                </Box>
              ) : (
                <VStack align="stretch" spacing={3}>
                  {folders.length > 0 ? (
                    folders.map((folder) => (
                      <Box
                        key={folder.id}
                        p={3}
                        bg={
                          viewMode === "folder" &&
                          selectedFolder?.id === folder.id
                            ? "#EDF2F7"
                            : "white"
                        }
                        borderRadius="md"
                        border="1px"
                        borderColor="#C5D1E8"
                        _hover={{ bg: "#EDF2F7", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedFolder(folder);
                          setViewMode("folder");
                        }}
                      >
                        <HStack>
                          <FaFolder color="#7A94C1" />
                          <Text
                            fontWeight="bold"
                            color="leather.dark"
                            fontSize="sm"
                          >
                            {folder.name}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {folder.journals?.length || 0} entries
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      textAlign="center"
                      py={2}
                    >
                      No folders yet. Create one to organize your journals.
                    </Text>
                  )}

                  {isCreatingFolder && (
                    <VStack spacing={2} mt={2}>
                      <Input
                        placeholder="Folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        size="sm"
                        bg="white"
                        border="1px solid #D4A373"
                        _placeholder={{ color: "#8B6F47" }}
                      />
                      <HStack spacing={2} width="100%">
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="solid"
                          width="50%"
                          onClick={handleCreateFolder}
                          isDisabled={!newFolderName.trim()}
                        >
                          Create
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          width="50%"
                          onClick={() => {
                            setNewFolderName("");
                            setIsCreatingFolder(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </VStack>
                  )}
                </VStack>
              )}
            </CardBody>
          </Card>
        </Box>

        {/* Right Column - Journal Entry Form and Journal List */}
        <VStack spacing={6} align="stretch">
          {/* Journal Entry Form */}
          <Card maxW="100%" borderColor="#A9B9D8">
            <CardHeader>
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                New Journal Entry
              </Heading>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleJournalSubmit}>
                <VStack spacing={4} align="stretch">
                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
                    gap={4}
                  >
                    <FormControl id="title" isRequired>
                      <FormLabel color="leather.dark" fontSize="sm">
                        Title
                      </FormLabel>
                      <Input
                        type="text"
                        name="title"
                        value={journalForm.title}
                        onChange={handleJournalChange}
                        placeholder="Title your journey..."
                        bg="white"
                        color="#5B4636"
                        border="1px solid #D4A373"
                        fontFamily="system-ui"
                        size="sm"
                        _placeholder={{ color: "#8B6F47" }}
                      />
                    </FormControl>

                    <FormControl id="archetype">
                      <FormLabel color="leather.dark" fontSize="sm">
                        Archetype
                      </FormLabel>
                      <Select
                        name="archetype"
                        value={journalForm.archetype}
                        onChange={handleJournalChange}
                        bg="white"
                        color="#5B4636"
                        border="1px solid #D4A373"
                        size="sm"
                      >
                        <option value="">Select archetype</option>
                        <option value="The Call to Adventure">
                          The Call to Adventure
                        </option>
                        <option value="Refusal of the Call">
                          Refusal of the Call
                        </option>
                        <option value="Supernatural Aid">
                          Supernatural Aid
                        </option>
                        <option value="The Crossing of the First Threshold">
                          The Crossing of the First Threshold
                        </option>
                        <option value="Belly of the Whale">
                          Belly of the Whale
                        </option>
                        <option value="The Road of Trials">
                          The Road of Trials
                        </option>
                        <option value="Mara as the Temptress">
                          Mara as the Temptress
                        </option>
                        <option value="Atonement with the Father/Abyss">
                          Atonement with the Father/Abyss
                        </option>
                        <option value="Apotheosis">Apotheosis</option>
                        <option value="The Ultimate Boon">
                          The Ultimate Boon
                        </option>
                        <option value="Refusal of the Return">
                          Refusal of the Return
                        </option>
                        <option value="The Magic Flight">
                          The Magic Flight
                        </option>
                        <option value="Rescue from Without">
                          Rescue from Without
                        </option>
                        <option value="The Crossing of the Return Threshold">
                          The Crossing of the Return Threshold
                        </option>
                        <option value="Master of the Two Worlds">
                          Master of the Two Worlds
                        </option>
                        <option value="Freedom to Live">Freedom to Live</option>
                      </Select>
                    </FormControl>

                    <FormControl id="folder_id">
                      <FormLabel color="leather.dark" fontSize="sm">
                        Folder
                      </FormLabel>
                      <Select
                        name="folder_id"
                        value={
                          journalForm.folder_id ||
                          (selectedFolder && viewMode === "folder"
                            ? selectedFolder.id
                            : "")
                        }
                        onChange={handleJournalChange}
                        bg="white"
                        color="#5B4636"
                        border="1px solid #D4A373"
                        size="sm"
                      >
                        <option value="">No folder (unassigned)</option>
                        {folders.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <FormControl id="body">
                    <FormLabel color="leather.dark" fontSize="sm">
                      Journal Entry
                    </FormLabel>
                    <Textarea
                      name="body"
                      value={journalForm.body}
                      onChange={handleJournalChange}
                      placeholder="Begin your story here... What adventures did you encounter today? What challenges did you face? What insights did you gain?"
                      bg="white"
                      color="#5B4636"
                      border="1px solid #D4A373"
                      fontFamily="system-ui"
                      _placeholder={{ color: "#8B6F47" }}
                      h="200px"
                      resize="vertical"
                    />
                  </FormControl>

                  <HStack justify="flex-end">
                    <Button
                      type="submit"
                      bg="leather.default"
                      color="white"
                      _hover={{ bg: "leather.dark" }}
                      leftIcon={<FaFeather />}
                      fontFamily="Quicksand"
                      fontWeight="600"
                      isDisabled={!journalForm.title.trim() || !user}
                    >
                      Save Journal Entry
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </CardBody>
          </Card>

          {/* Journal List */}
          <Card maxW="100%" borderColor="#A9B9D8">
            <CardHeader>
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                {viewMode === "recent"
                  ? "Recent Entries"
                  : viewMode === "all"
                  ? "All Journals"
                  : `Folder: ${selectedFolder?.name || "Unknown"}`}
              </Heading>
            </CardHeader>
            <CardBody>
              {isLoadingJournals ? (
                <Box textAlign="center" py={4}>
                  <Spinner size="md" color="blue.500" />
                  <Text mt={2} fontSize="sm" color="gray.500">
                    Loading journals...
                  </Text>
                </Box>
              ) : combinedJournals.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {combinedJournals.map((journal) => (
                    <Box
                      key={journal.id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      border="1px"
                      borderColor="#C5D1E8"
                      _hover={{ bg: "#F7FAFC" }}
                    >
                      <Heading
                        size="sm"
                        fontFamily="Quicksand"
                        color="leather.dark"
                        mb={2}
                      >
                        {journal.title}
                      </Heading>
                      <Text fontSize="sm" color="gray.700" mb={3} noOfLines={3}>
                        {journal.body}
                      </Text>
                      <HStack spacing={4} fontSize="xs" color="gray.500">
                        {journal.archetype && (
                          <Text>
                            <Text as="span" fontWeight="bold">
                              Archetype:
                            </Text>{" "}
                            {journal.archetype}
                          </Text>
                        )}
                        {viewMode === "all" && (
                          <Text>
                            <Text as="span" fontWeight="bold">
                              Folder:
                            </Text>{" "}
                            {getFolderName(journal.folder_id)}
                          </Text>
                        )}
                        <Text>
                          <Text as="span" fontWeight="bold">
                            Created:
                          </Text>{" "}
                          {formatDate(journal.created_at)}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Box textAlign="center" py={4}>
                  <Text color="gray.500">
                    {viewMode === "recent"
                      ? "No recent journal entries."
                      : viewMode === "all"
                      ? "No journal entries found."
                      : "No journals in this folder."}
                  </Text>
                </Box>
              )}
            </CardBody>
            {viewMode === "recent" && unassignedJournals.length > 3 && (
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<FaBookOpen />}
                  color="#4A69A9"
                  onClick={() => setViewMode("all")}
                  mx="auto"
                >
                  View All Entries
                </Button>
              </CardFooter>
            )}
          </Card>
        </VStack>
      </Grid>
    </Box>
  );
}

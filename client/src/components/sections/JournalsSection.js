import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
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
  InputGroup,
  InputLeftElement,
  Flex,
  Badge,
  IconButton,
  SimpleGrid,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "../ui/Card";
import {
  FaBookOpen,
  FaFeather,
  FaFolder,
  FaSearch,
  FaCalendarAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTag,
  FaChevronDown,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function JournalsSection({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Get the view from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const viewParam = queryParams.get("view");

  // Set the active view based on the query parameter or default to "journals"
  const [activeView, setActiveView] = useState(viewParam || "journals");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [journalToDelete, setJournalToDelete] = useState(null);
  const cancelRef = React.useRef();

  // State for folders and selection
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  // State for journals
  const [journals, setJournals] = useState([]);
  const [displayedJournals, setDisplayedJournals] = useState([]);
  const [isLoadingJournals, setIsLoadingJournals] = useState(true);
  const [showMoreCount, setShowMoreCount] = useState(12); // Increased for grid view

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");
  const [archetypeFilter, setArchetypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // "latest" or "oldest"

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

  // Fetch all journals on mount
  useEffect(() => {
    setIsLoadingJournals(true);
    fetch("/journals", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setJournals(data || []);
        setDisplayedJournals(data?.slice(0, showMoreCount) || []);
        setIsLoadingJournals(false);
      })
      .catch((err) => {
        console.error("Error fetching journals:", err);
        setIsLoadingJournals(false);
      });
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...journals];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((journal) =>
        journal.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply folder filter
    if (folderFilter !== "all") {
      // Only filter if not 'all'
      if (folderFilter === "null") {
        filtered = filtered.filter((journal) => journal.folder_id === null);
      } else {
        filtered = filtered.filter(
          (journal) => journal.folder_id === Number(folderFilter)
        );
      }
    }

    // Apply archetype filter
    if (archetypeFilter) {
      filtered = filtered.filter(
        (journal) => journal.archetype === archetypeFilter
      );
    }

    // Apply sort order
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    setDisplayedJournals(filtered.slice(0, showMoreCount));
  }, [
    journals,
    searchQuery,
    folderFilter,
    archetypeFilter,
    sortOrder,
    showMoreCount,
  ]);

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

    const payload = {
      title: journalForm.title,
      body: journalForm.body,
      archetype: journalForm.archetype,
      user_id: user.id,
      folder_id: journalForm.folder_id || null,
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

        // Update journals state with the new entry
        setJournals((prev) => [data, ...prev]);

        // Reset form
        setJournalForm({ title: "", body: "", archetype: "", folder_id: "" });

        // Switch to journals view to see the new entry
        setActiveView("journals");
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

  function handleViewMore() {
    setShowMoreCount((prev) => prev + 12); // Increased for grid view
  }

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

  // Get unique archetypes from journals
  const archetypes = [
    ...new Set(journals.filter((j) => j.archetype).map((j) => j.archetype)),
  ];

  // Handle journal click to navigate to detail page
  const handleJournalClick = (journalId) => {
    navigate(`/journal/${journalId}`);
  };

  // Handle delete journal confirmation
  const handleDeleteConfirm = (journal, e) => {
    e.stopPropagation(); // Prevent navigation to detail page
    setJournalToDelete(journal);
    onOpen();
  };

  // Handle actual deletion
  const handleDeleteJournal = () => {
    if (!journalToDelete) return;

    fetch(`/journals/${journalToDelete.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        // Consider any 2xx response as success, even if there's no JSON
        if (res.ok) {
          // Remove the journal from state
          setJournals(journals.filter((j) => j.id !== journalToDelete.id));

          toast({
            title: "Journal deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        // If not ok, try to parse error message or throw generic error
        return res
          .json()
          .then((data) => {
            throw new Error(
              data.message || `Server responded with status: ${res.status}`
            );
          })
          .catch(() => {
            throw new Error(`Server responded with status: ${res.status}`);
          });
      })
      .catch((error) => {
        console.error("Error deleting journal:", error);
        toast({
          title: "Error deleting journal",
          description: error.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setJournalToDelete(null);
        onClose();
      });
  };

  return (
    <Box>
      {/* Main Navigation Buttons */}
      <HStack spacing={4} mb={4}>
        <Button
          leftIcon={<FaBookOpen />}
          colorScheme={activeView === "journals" ? "blue" : "gray"}
          variant={activeView === "journals" ? "solid" : "outline"}
          onClick={() => setActiveView("journals")}
          size="lg"
          flex="1"
        >
          My Journals
        </Button>
        <Button
          leftIcon={<FaFeather />}
          colorScheme={activeView === "write" ? "blue" : "gray"}
          variant={activeView === "write" ? "solid" : "outline"}
          onClick={() => setActiveView("write")}
          size="lg"
          flex="1"
        >
          Write New Entry
        </Button>
      </HStack>

      {/* My Journals View */}
      {activeView === "journals" && (
        <Box>
          {/* Filters Section */}
          <Card mb={4} borderColor="#A9B9D8">
            <CardBody>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 1fr",
                  lg: "1fr 1fr 1fr 1fr",
                }}
                gap={4}
                py={2}
              >
                {/* Search by title */}
                <FormControl>
                  <FormLabel fontSize="sm" color="leather.dark">
                    Search
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaSearch color="#8B6F47" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search by title"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      bg="white"
                      border="1px solid #D4A373"
                    />
                  </InputGroup>
                </FormControl>

                {/* Filter by folder */}
                <FormControl>
                  <FormLabel fontSize="sm" color="leather.dark">
                    Folder
                  </FormLabel>
                  <HStack>
                    <Select
                      value={folderFilter}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "all") {
                          setFolderFilter("all");
                        } else if (value === "null") {
                          setFolderFilter("null");
                        } else {
                          setFolderFilter(Number(value));
                        }
                      }}
                      bg="white"
                      border="1px solid #D4A373"
                      icon={<FaFolder />}
                      flex="1"
                    >
                      <option value="all">All folders</option>
                      <option value="null">Unassigned</option>
                      {folders.map((folder) => (
                        <option key={folder.id} value={folder.id}>
                          {folder.name}
                        </option>
                      ))}
                    </Select>
                    <Button
                      size="sm"
                      leftIcon={<FaPlus />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => setIsCreatingFolder(true)}
                    >
                      New
                    </Button>
                  </HStack>
                  {isCreatingFolder && activeView === "journals" && (
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
                </FormControl>

                {/* Filter by archetype */}
                <FormControl>
                  <FormLabel fontSize="sm" color="leather.dark">
                    Archetype
                  </FormLabel>
                  <Select
                    placeholder="All archetypes"
                    value={archetypeFilter}
                    onChange={(e) => setArchetypeFilter(e.target.value)}
                    bg="white"
                    border="1px solid #D4A373"
                    icon={<FaTag />}
                  >
                    <option value="">All archetypes</option>
                    {archetypes.map((archetype) => (
                      <option key={archetype} value={archetype}>
                        {archetype}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* Sort by date */}
                <FormControl>
                  <FormLabel fontSize="sm" color="leather.dark">
                    Sort by Date
                  </FormLabel>
                  <Button
                    leftIcon={
                      sortOrder === "latest" ? (
                        <FaSortAmountDown />
                      ) : (
                        <FaSortAmountUp />
                      )
                    }
                    rightIcon={<FaCalendarAlt />}
                    onClick={() =>
                      setSortOrder((prev) =>
                        prev === "latest" ? "oldest" : "latest"
                      )
                    }
                    width="100%"
                    justifyContent="space-between"
                    bg="white"
                    border="1px solid #D4A373"
                    color="#5B4636"
                    _hover={{ bg: "#F7FAFC" }}
                  >
                    {sortOrder === "latest" ? "Newest First" : "Oldest First"}
                  </Button>
                </FormControl>
              </Grid>
            </CardBody>
          </Card>

          {/* Journals List - Now in Grid Layout */}
          <Card borderColor="#A9B9D8">
            <CardHeader>
              <Heading size="md" fontFamily="Quicksand" color="leather.dark">
                Journal Entries
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
              ) : displayedJournals.length > 0 ? (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={4}
                >
                  {displayedJournals.map((journal) => (
                    <Box
                      key={journal.id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      border="1px"
                      borderColor="#C5D1E8"
                      _hover={{ bg: "#F7FAFC", cursor: "pointer" }}
                      onClick={() => handleJournalClick(journal.id)}
                      position="relative"
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      className="group" // Add this class for group hover functionality
                    >
                      <Flex justify="space-between" align="flex-start" mb={2}>
                        <Heading
                          size="sm"
                          fontFamily="Quicksand"
                          color="leather.dark"
                          noOfLines={1}
                        >
                          {journal.title}
                        </Heading>
                        <IconButton
                          aria-label="Delete journal"
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={(e) => handleDeleteConfirm(journal, e)}
                          position="absolute"
                          top={2}
                          right={2}
                          opacity={0} // Start with opacity 0 (invisible)
                          _groupHover={{ opacity: 1 }} // Show on group hover
                          transition="opacity 0.2s ease-in-out" // Smooth transition
                        />
                      </Flex>
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        {formatDate(journal.created_at)}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.700"
                        mb={3}
                        noOfLines={3}
                        flex="1"
                      >
                        {journal.body}
                      </Text>
                      <HStack spacing={2} wrap="wrap" mt="auto">
                        {journal.folder_id && (
                          <Badge colorScheme="blue" variant="subtle">
                            <FaFolder
                              size="10"
                              style={{ marginRight: "4px", display: "inline" }}
                            />
                            {getFolderName(journal.folder_id)}
                          </Badge>
                        )}
                        {journal.archetype && (
                          <Badge colorScheme="purple" variant="subtle">
                            <FaTag
                              size="10"
                              style={{ marginRight: "4px", display: "inline" }}
                            />
                            {journal.archetype}
                          </Badge>
                        )}
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Box textAlign="center" py={4}>
                  <Text color="gray.500">
                    No journal entries found matching your filters.
                  </Text>
                </Box>
              )}
            </CardBody>
            {displayedJournals.length > 0 &&
              displayedJournals.length < journals.length && (
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<FaChevronDown />}
                    color="#4A69A9"
                    onClick={handleViewMore}
                    mx="auto"
                  >
                    View More
                  </Button>
                </CardFooter>
              )}
          </Card>
        </Box>
      )}

      {/* Write New Entry View */}
      {activeView === "write" && (
        <Card maxW="100%" borderColor="#A9B9D8">
          <CardBody mt={4}>
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
                      <option value="Seeker">Seeker</option>
                      <option value="Innocent">Innocent</option>
                      <option value="Orphan">Orphan</option>
                      <option value="Fool">Fool (Jester)</option>
                      <option value="Sage">Sage (Senex)</option>
                      <option value="King">King</option>
                      <option value="Creator">Creator</option>
                      <option value="Rebel">Rebel (Destroyer)</option>
                      <option value="Magician">Magician</option>
                      <option value="Caregiver">Caregiver</option>
                      <option value="Lover">Lover</option>
                      <option value="Warrior">Warrior</option>
                    </Select>
                  </FormControl>

                  <FormControl id="folder_id">
                    <FormLabel color="leather.dark" fontSize="sm">
                      Folder
                    </FormLabel>
                    <HStack>
                      <Select
                        name="folder_id"
                        value={journalForm.folder_id || ""}
                        onChange={handleJournalChange}
                        bg="white"
                        color="#5B4636"
                        border="1px solid #D4A373"
                        size="sm"
                        flex="1"
                      >
                        <option value="">No folder (unassigned)</option>
                        {folders.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.name}
                          </option>
                        ))}
                      </Select>
                      <Button
                        size="sm"
                        leftIcon={<FaPlus />}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => setIsCreatingFolder(true)}
                      >
                        New
                      </Button>
                    </HStack>
                    {isCreatingFolder && activeView === "write" && (
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
                    h="300px"
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
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Journal
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you'd like to delete this journal? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteJournal} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

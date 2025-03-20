import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Badge,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "../ui/Card";
import {
  FaArrowLeft,
  FaFolder,
  FaTag,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function JournalDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [journal, setJournal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });

  // Fetch journal details when id is available
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    // Using the standard RESTful endpoint for fetching a single journal
    fetch(`/journals/${id}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Server responded with status: ${res.status}`);
          throw new Error("Failed to fetch journal");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Journal data received:", data);
        setJournal(data);
        // Initialize edit form with journal data
        setEditForm({
          title: data.title,
          body: data.body,
          archetype: data.archetype || "",
          folder_id: data.folder_id || "",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching journal:", error);
        toast({
          title: "Error loading journal",
          description: "Could not load the journal entry. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      });
  }, [id, toast]);

  // Fetch folders for reference
  useEffect(() => {
    fetch(`/folders`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      })
      .catch((err) => {
        console.error("Error fetching folders:", err);
      });
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get folder name by id
  const getFolderName = (folderId) => {
    if (!folderId) return "Unassigned";
    const folder = folders.find((f) => f.id === Number(folderId));
    return folder ? folder.name : "Unknown folder";
  };

  // Update the handleGoBack function to navigate to the dashboard with a section parameter
  const handleGoBack = () => {
    // Navigate to the dashboard page with a section parameter to activate the journals section
    navigate("/dashboard?section=journals");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateFolder = () => {
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

    const folderData = {
      folder: {
        name: newFolderName,
        user_id: user.id,
      },
    };

    fetch(`/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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

        // Set the new folder as the selected folder
        setEditForm((prev) => ({ ...prev, folder_id: newFolder.id }));

        toast({
          title: "Folder created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
        toast({
          title: "Error creating folder",
          description: error.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSaveEdit = () => {
    // Validate required fields
    if (!editForm.title.trim()) {
      toast({
        title: "Title is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      title: editForm.title,
      body: editForm.body,
      archetype: editForm.archetype,
      folder_id: editForm.folder_id || null,
    };

    fetch(`/journals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(`Server responded with status: ${res.status}`);
        return res.json();
      })
      .then((updatedJournal) => {
        setJournal(updatedJournal);
        setIsEditing(false);

        toast({
          title: "Journal updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error updating journal:", error);
        toast({
          title: "Error updating journal",
          description: error.message || "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // Also update the handleDeleteJournal function to do the same
  const handleDeleteJournal = () => {
    fetch(`/journals/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        // Consider any 2xx response as success, even if there's no JSON
        if (res.ok) {
          toast({
            title: "Journal deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          // Navigate to dashboard page after successful deletion with section parameter
          navigate("/dashboard?section=journals");
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
        onClose();
      });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form to original values if canceling
      setEditForm({
        title: journal.title,
        body: journal.body,
        archetype: journal.archetype || "",
        folder_id: journal.folder_id || "",
      });
    }
    setIsEditing(!isEditing);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} fontSize="lg" color="gray.500">
          Loading journal entry...
        </Text>
      </Box>
    );
  }

  if (!journal) {
    return (
      <Box textAlign="center" py={10}>
        <Heading size="md" color="gray.500">
          Journal entry not found
        </Heading>
        <Text mt={2} color="gray.500">
          The journal entry you're looking for could not be found.
        </Text>
        <Button mt={4} leftIcon={<FaArrowLeft />} onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="1000px" mx="auto" py={6}>
      <HStack mb={6} justify="space-between">
        <Button
          leftIcon={<FaArrowLeft />}
          variant="outline"
          onClick={handleGoBack}
          color="leather.dark"
          borderColor="#D4A373"
        >
          Back to Journals
        </Button>

        <HStack spacing={2}>
          {!isEditing ? (
            <>
              <Button
                leftIcon={<FaTrash />}
                onClick={onOpen}
                colorScheme="red"
                variant="outline"
              >
                Delete
              </Button>
              <Button
                leftIcon={<FaEdit />}
                onClick={toggleEditMode}
                colorScheme="blue"
                variant="outline"
              >
                Edit Journal
              </Button>
            </>
          ) : (
            <>
              <Button
                leftIcon={<FaTimes />}
                onClick={toggleEditMode}
                colorScheme="red"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                leftIcon={<FaSave />}
                onClick={handleSaveEdit}
                colorScheme="green"
              >
                Save Changes
              </Button>
            </>
          )}
        </HStack>
      </HStack>

      <Card borderColor="#A9B9D8">
        {!isEditing ? (
          // View Mode
          <>
            <CardHeader>
              <VStack align="stretch" spacing={4}>
                <Heading size="lg" fontFamily="Quicksand" color="leather.dark">
                  {journal.title}
                </Heading>

                <Flex
                  justify="space-between"
                  align="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <HStack spacing={2}>
                    {journal.folder_id && (
                      <Badge colorScheme="blue" variant="subtle" p={1}>
                        <FaFolder
                          style={{ marginRight: "4px", display: "inline" }}
                        />
                        {getFolderName(journal.folder_id)}
                      </Badge>
                    )}
                    {journal.archetype && (
                      <Badge colorScheme="purple" variant="subtle" p={1}>
                        <FaTag
                          style={{ marginRight: "4px", display: "inline" }}
                        />
                        {journal.archetype}
                      </Badge>
                    )}
                  </HStack>

                  <HStack>
                    <FaCalendarAlt color="#718096" />
                    <Text fontSize="sm" color="gray.500">
                      {formatDate(journal.created_at)}
                    </Text>
                  </HStack>
                </Flex>
              </VStack>
            </CardHeader>

            <CardBody>
              <Box
                bg="white"
                p={6}
                borderRadius="md"
                whiteSpace="pre-wrap"
                fontSize="md"
                color="#5B4636"
                lineHeight="1.7"
              >
                {journal.body}
              </Box>
            </CardBody>
          </>
        ) : (
          // Edit Mode
          <CardBody mt={4}>
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
                    value={editForm.title}
                    onChange={handleEditChange}
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
                    value={editForm.archetype}
                    onChange={handleEditChange}
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
                      value={editForm.folder_id || ""}
                      onChange={handleEditChange}
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
                </FormControl>
              </Grid>

              <FormControl id="body">
                <FormLabel color="leather.dark" fontSize="sm">
                  Journal Entry
                </FormLabel>
                <Textarea
                  name="body"
                  value={editForm.body}
                  onChange={handleEditChange}
                  placeholder="Begin your story here..."
                  bg="white"
                  color="#5B4636"
                  border="1px solid #D4A373"
                  fontFamily="system-ui"
                  _placeholder={{ color: "#8B6F47" }}
                  h="300px"
                  resize="vertical"
                />
              </FormControl>
            </VStack>
          </CardBody>
        )}
      </Card>

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

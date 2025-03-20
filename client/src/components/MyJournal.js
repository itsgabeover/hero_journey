import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Text,
  Divider,
  Spinner,
  useToast,
} from "@chakra-ui/react";

function MyJournal({ user }) {
  const toast = useToast();

  // State for folders and selection
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  // State for unassigned journals (journals with no folder)
  const [unassignedJournals, setUnassignedJournals] = useState([]);

  // State for journal form with archetype instead of tags
  const [journalForm, setJournalForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });

  // Fetch folders on mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/folders`, {
      credentials: "include",
    })
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
    fetch("/journals/unassigned", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        // If no unassigned journals are returned, try a fallback fetch from all journals
        if (!data || data.length === 0) {
          console.warn("No data from /journals/unassigned; trying fallback.");
          fetch("/journals", { credentials: "include" })
            .then((res) => res.json())
            .then((allJournals) => {
              const unassigned = allJournals.filter(
                (journal) => journal.folder_id === null
              );
              setUnassignedJournals(unassigned);
            });
        } else {
          setUnassignedJournals(data);
        }
      })
      .catch((err) =>
        console.error("Error fetching unassigned journals:", err)
      );
  }, []);

  // Handle changes in the journal form inputs
  function handleJournalChange(e) {
    const { name, value } = e.target;
    setJournalForm((prev) => ({ ...prev, [name]: value }));
  }

  // Submit new journal entry
  function handleJournalSubmit(e) {
    e.preventDefault();
    // If a folder is selected in the sidebar and no override in the form, use that folder's id
    const folderIdToUse =
      journalForm.folder_id || (selectedFolder ? selectedFolder.id : null);

    const payload = {
      title: journalForm.title,
      body: journalForm.body,
      archetype: journalForm.archetype, // sending archetype instead of tags
      user_id: user.id,
      folder_id: folderIdToUse,
    };

    fetch("/newJournalEntry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: "Journal saved",
          description: "Your journal entry has been saved.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Update local state for the journal entry
        if (folderIdToUse) {
          const updatedFolder = folders.find(
            (f) => f.id === parseInt(folderIdToUse)
          );
          if (updatedFolder) {
            updatedFolder.journals = updatedFolder.journals
              ? [...updatedFolder.journals, data]
              : [data];
            setFolders(
              folders.map((f) =>
                f.id === updatedFolder.id ? updatedFolder : f
              )
            );
          }
        } else {
          setUnassignedJournals((prev) => [...prev, data]);
        }
        setJournalForm({ title: "", body: "", archetype: "", folder_id: "" });
      })
      .catch((err) => {
        console.error("Error saving journal:", err);
        toast({
          title: "Error",
          description: "Could not save journal entry.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  // Create a new folder
  function handleFolderCreate(e) {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    fetch("/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ folder: { name: newFolderName } }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders((prev) => [...prev, data]);
        setNewFolderName("");
        toast({
          title: "Folder created",
          description: "Your new folder has been created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Error creating folder:", err);
        toast({
          title: "Error",
          description: "Could not create folder.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  // Handle folder selection from sidebar
  function handleSelectFolder(folder) {
    setSelectedFolder(folder);
  }

  // When "All Journals" is selected, combine folder journals and unassigned journals.
  // We attach the folder id to each journal coming from a folder.
  const allFolderJournals = folders.flatMap((folder) =>
    (folder.journals || []).map((journal) => ({
      ...journal,
      folder_id: folder.id,
    }))
  );
  const allJournals = [...allFolderJournals, ...unassignedJournals];

  return (
    <Box>
      <Header user={user} />
      <Flex p={4}>
        {/* Sidebar with folders */}
        <Box width="250px" borderRight="1px solid #ccc" pr={4}>
          <Heading size="md" mb={4}>
            Folders
          </Heading>
          {isLoadingFolders ? (
            <Spinner />
          ) : (
            <VStack align="start" spacing={3}>
              <Button
                variant={!selectedFolder ? "solid" : "outline"}
                onClick={() => setSelectedFolder(null)}
              >
                All Journals
              </Button>
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={
                    selectedFolder && selectedFolder.id === folder.id
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => handleSelectFolder(folder)}
                >
                  {folder.name}
                </Button>
              ))}
              {/* New Folder Form */}
              <form onSubmit={handleFolderCreate} style={{ width: "100%" }}>
                <HStack>
                  <Input
                    placeholder="New Folder"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    size="sm"
                  />
                  <Button type="submit" size="sm">
                    Add
                  </Button>
                </HStack>
              </form>
            </VStack>
          )}
        </Box>

        {/* Main Dashboard Area */}
        <Box flex="1" pl={4}>
          {/* Journal Entry Form */}
          <Box mb={8}>
            <Heading size="md" mb={4}>
              New Journal Entry
            </Heading>
            <form onSubmit={handleJournalSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl id="title">
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    value={journalForm.title}
                    onChange={handleJournalChange}
                    placeholder="Title..."
                  />
                </FormControl>
                <FormControl id="archetype">
                  <FormLabel>Archetype</FormLabel>
                  <Select
                    name="archetype"
                    value={journalForm.archetype}
                    onChange={handleJournalChange}
                  >
                    <option value="The Call to Adventure">
                      The Call to Adventure
                    </option>
                    <option value="Refusal of the Call">
                      Refusal of the Call
                    </option>
                    <option value="Supernatural Aid">Supernatural Aid</option>
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
                    <option value="The Ultimate Boon">The Ultimate Boon</option>
                    <option value="Refusal of the Return">
                      Refusal of the Return
                    </option>
                    <option value="The Magic Flight">The Magic Flight</option>
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
                <FormControl id="body">
                  <FormLabel>Journal Entry</FormLabel>
                  <Input
                    type="text"
                    name="body"
                    value={journalForm.body}
                    onChange={handleJournalChange}
                    placeholder="Begin your story..."
                  />
                </FormControl>
                {/* Optional override of folder selection */}
                <FormControl id="folder_id">
                  <FormLabel>Assign to Folder</FormLabel>
                  <Select
                    name="folder_id"
                    value={journalForm.folder_id}
                    onChange={handleJournalChange}
                  >
                    <option value="">Select a folder</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" colorScheme="blue">
                  Save Journal
                </Button>
              </VStack>
            </form>
          </Box>

          <Divider mb={4} />

          {/* Journals List */}
          <Box>
            <Heading size="md" mb={4}>
              Journals
            </Heading>
            {selectedFolder ? (
              selectedFolder.journals && selectedFolder.journals.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {selectedFolder.journals.map((journal) => (
                    <Box
                      key={journal.id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <Heading size="sm">{journal.title}</Heading>
                      <Text>{journal.body}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {journal.archetype}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Folder:{" "}
                        {journal.folder_id
                          ? folders.find((f) => f.id === journal.folder_id)
                              ?.name || "Unknown"
                          : "Unassigned"}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>No journals in this folder.</Text>
              )
            ) : (
              // "All Journals" selected: combine folder journals and unassigned journals
              <VStack spacing={4} align="stretch">
                {allFolderJournals.concat(unassignedJournals).map((journal) => (
                  <Box
                    key={journal.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Heading size="sm">{journal.title}</Heading>
                    <Text>{journal.body}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {journal.archetype}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Folder:{" "}
                      {journal.folder_id
                        ? folders.find((f) => f.id === journal.folder_id)
                            ?.name || "Unknown"
                        : "Unassigned"}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default MyJournal;

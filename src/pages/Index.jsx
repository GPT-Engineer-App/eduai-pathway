import { Container, Text, VStack, Image, Box, Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [interaction, setInteraction] = useState("");

  const handleInteraction = (message) => {
    setInteraction(message);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the LMS</Text>
        <Text>Interact with your AI teachers below.</Text>
        <HStack spacing={8}>
          <Box textAlign="center">
            <Image src="/images/ai-teacher-man.png" alt="AI Teacher Man" boxSize="150px" borderRadius="full" />
            <Button mt={4} onClick={() => handleInteraction("Hello! How can I assist you today?")}>Talk to AI Teacher Man</Button>
          </Box>
          <Box textAlign="center">
            <Image src="/images/ai-teacher-woman.png" alt="AI Teacher Woman" boxSize="150px" borderRadius="full" />
            <Button mt={4} onClick={() => handleInteraction("Hi there! What do you need help with?")}>Talk to AI Teacher Woman</Button>
          </Box>
        </HStack>
        {interaction && (
          <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <Text>{interaction}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
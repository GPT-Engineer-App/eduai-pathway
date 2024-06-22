import { Container, Text, VStack, Image, Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Index = () => {
  const [interaction, setInteraction] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleInteraction = (message, video) => {
    setInteraction(message);
    setVideoUrl(video);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const voiceMessage = event.results[0][0].transcript;
      setMessage(voiceMessage);
      socket.emit("message", voiceMessage);
    };
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the LMS</Text>
        <Text>Interact with your AI teachers below.</Text>
        <HStack spacing={8}>
          <Box textAlign="center">
            <Image src="/images/ai-teacher-man.png" alt="AI Teacher Man" boxSize="150px" borderRadius="full" />
            <Button mt={4} onClick={() => handleInteraction("Hello! How can I assist you today?", "https://www.example.com/video1.mp4")}>Talk to AI Teacher Man</Button>
          </Box>
          <Box textAlign="center">
            <Image src="/images/ai-teacher-woman.png" alt="AI Teacher Woman" boxSize="150px" borderRadius="full" />
            <Button mt={4} onClick={() => handleInteraction("Hi there! What do you need help with?", "https://www.example.com/video2.mp4")}>Talk to AI Teacher Woman</Button>
          </Box>
        </HStack>
        {interaction && (
          <Box mt={8} p={4} borderWidth="1px" borderRadius="lg">
            <Text>{interaction}</Text>
            {videoUrl && <ReactPlayer url={videoUrl} controls />}
          </Box>
        )}
        <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <VStack spacing={4}>
            <HStack width="100%">
              <Input
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>Send</Button>
              <Button onClick={handleVoiceInput}>🎤</Button>
            </HStack>
            <Box width="100%" maxHeight="200px" overflowY="auto" borderWidth="1px" borderRadius="lg" p={2}>
              {messages.map((msg, index) => (
                <Text key={index}>{msg}</Text>
              ))}
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
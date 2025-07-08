// Make sure you have a file called secrets.js with your OpenAI API key like:
// const OPENAI_API_KEY = "sk-...";

// Get references to the buttons and response area
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');
const responseDiv = document.getElementById('response');

// Get reference to the context dropdown
const contextSelect = document.getElementById('contextSelect');

// Get reference to the persona dropdown
const personaSelect = document.getElementById('personaSelect');

// Fun loading messages with emojis
const loadingMessages = [
  "Thinking of something cool... 🧊",
  "Cooking up a response... 🍳",
  "Let me break the ice... ❄️",
  "Looking for a fun fact... 🔍",
  "Getting a joke ready... 😂",
  "Checking the weather... ☁️",
  "Warming up my brain... 🧠",
  "Finding the perfect answer... 🎯"
];

// Helper function to get system prompt based on selected persona and context
function getSystemPrompt(context) {
  // Get the selected persona
  const persona = personaSelect.value;
  // Return a system prompt based on the persona
  switch (persona) {
    case "intern":
      return "You are a friendly, casual intern who always uses emojis and keeps things light and cheerful.";
    case "wizard":
      return "You are a wise wizard who loves sharing knowledge in a magical way.";
    case "pirate":
      return "You are a pirate who makes every answer sound like an adventure on the high seas.";
    case "robot":
      return "You are a robot who is super helpful and a little bit silly.";
    case "detective":
      return "You are a detective who loves solving mysteries and sharing clues.";
    case "chef":
      return "You are a cheerful chef who relates everything to food and cooking.";
    case "astronaut":
      return "You are a friendly astronaut who loves space and making things exciting.";
    case "puppy":
      return "You are a playful puppy who is always happy and energetic.";
    case "skateboarder":
      return "You are a cool skateboarder who uses fun, casual language.";
    default:
      return "You are a friendly assistant helping people break the ice.";
  }
}

// This function talks to OpenAI and gets a response
async function getOpenAIResponse(prompt) {
  // Pick a random loading message
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  responseDiv.textContent = loadingMessages[randomIndex];

  // Get the selected context
  const context = contextSelect.value;
  // Get the system prompt for the selected context
  const systemPrompt = getSystemPrompt(context);

  // Set up the API endpoint and request data
  const url = "https://api.openai.com/v1/chat/completions";
  const data = {
    model: "gpt-4.1", // Use the gpt-4.1 model
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ],
    max_tokens: 80,
    temperature: 0.8
  };

  try {
    // Make the API request using fetch and await the response
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    // Parse the JSON response
    const json = await res.json();

    // Get the generated message from OpenAI
    const aiMessage = json.choices && json.choices[0].message.content;

    // Show the response or an error message
    responseDiv.textContent = aiMessage || "Sorry, I couldn't think of anything fun right now. Try another button!";
  } catch (error) {
    // Show a friendly error message if something goes wrong
    responseDiv.textContent = "😅 Oops! Something went wrong. Please check your internet connection or try again in a moment.";
  }
}

// Add event listeners for each button

// Icebreaker button
iceBtn.addEventListener('click', () => {
  // Ask for a fun conversation starter
  const prompt = "Give me a fun, friendly conversation starter for a group of people meeting for the first time.";
  getOpenAIResponse(prompt);
});

// Weird Fact button
factBtn.addEventListener('click', () => {
  // Ask for a surprising or weird fact
  const prompt = "Share a surprising or weird fact that most people don't know.";
  getOpenAIResponse(prompt);
});

// Joke button
jokeBtn.addEventListener('click', () => {
  // Ask for a light, friendly joke
  const prompt = "Tell me a short, light-hearted joke that's safe for all ages.";
  getOpenAIResponse(prompt);
});

// Weather button
weatherBtn.addEventListener('click', () => {
  // Ask for a weather-related prompt to get people talking
  const prompt = "Give me a weather-related question or prompt that encourages people to share what the weather is like where they are.";
  getOpenAIResponse(prompt);
});


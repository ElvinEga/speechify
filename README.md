## React Vite Speechify Text-to-Speech App

This project demonstrates a basic React application using Vite.js to convert text to speech with Speechify's API.

![Screenshot 2024-03-08 at 13-30-19 Speechify Text to Speech](https://github.com/ElvinEga/speechify/assets/12608507/651c4ca7-defc-489e-9d69-eefefbb42448)

### Setting Up

**Prerequisites:**

- Node.js (version 14 or later) and npm (or yarn)
- A Speechify account and API key: [https://www.speechify.com/](https://www.speechify.com/)

**Steps:**

1. **Create the project:**

   ```bash
   npm init vite@latest my-speechify-app --template react
   ```

   Replace `my-speechify-app` with your preferred project name.

2. **Install dependencies:**

   ```bash
   cd my-speechify-app
   npm install @speechify/react-client speech-synthesis polyfill-fetch
   ```

### Running the Project

1. **Start the development server:**

   ```bash
   npm run dev
   ```

   (You can also use `yarn dev` if you prefer.)

2. **Access your app:**

   The server will open your default browser at http://localhost:5173/.

### Text-to-Speech Integration

1. **Replace API key:**

   Open `src/App.jsx` and replace the placeholder API key with your actual key from Speechify:

   ```javascript
   const apiKey = "YOUR_SPEECHIFY_API_KEY";
   ```

2. **Implement functionality:**

   - Add an input field to enter text and a button to trigger speech.
   - Use the `@speechify/react-client` library to call the Speechify API.

   Here's an example:

   ```javascript
   import React, { useState } from "react";
   import { SpeechifyClient } from "@speechify/react-client";

   function App() {
     const [text, setText] = useState("");

     const speakText = async () => {
       const client = new SpeechifyClient(apiKey);

       try {
         const response = await client.speak(text, {
           voice: "en-US-Allison", // Customize voice and options
         });

         console.log("Speech started:", response.id);
       } catch (error) {
         console.error("Error:", error);
       }
     };

     return (
       <div>
         <input value={text} onChange={(e) => setText(e.target.value)} />
         <button onClick={speakText}>Speak</button>
       </div>
     );
   }
   ```

### Customization and Features

- Refer to the Speechify React Client documentation for more options: [[invalid URL removed]]([invalid URL removed])
- You can add features like voice selection, playback controls, language options, etc.

### Additional Notes

- Consider error handling and user feedback during development.
- Explore Speechify's advanced features and customization options.

### Downloading README as Text

1. Open the README file in your text editor.
2. Select all the content.
3. Copy the selection.
4. Paste the copied text into your desired location.

I hope this comprehensive guide helps you create your React Vite Speechify application!

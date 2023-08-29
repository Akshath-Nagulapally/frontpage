import React, { useEffect } from 'react';

const EmbedChat = () => {

  useEffect(() => {
    // Dynamically create the script element
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/Akshath-Nagulapally/js_deliver@main/Luup_deliver.js";
    script.type = 'module';
    script.async = true;

    script.onload = () => {
      // If Chatbot is defined on the window, initialize it
      if (window.Chatbot) {
        window.Chatbot.init({
          chatflowid: "0ae3cca8-2702-49fe-884e-dbfbc7d370f1",
          apiHost: "https://flowiseai-railway-production-6134.up.railway.app",
        });
      }
    };

    // Add the script to the document
    document.body.appendChild(script);

    // Cleanup: Remove the script if component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <div id="chatbot-placeholder">Loading Chatbot...</div>
  );
}

export default EmbedChat;

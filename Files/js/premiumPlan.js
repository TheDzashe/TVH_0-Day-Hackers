function toggleChatbot() {
            const chatbot = document.getElementById('chatbot');
            chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
        }

        function sendMessage() {
            const input = document.getElementById('chatbot-input');
            const message = input.value.trim();
            
            if (message) {
                const messagesContainer = document.getElementById('chatbot-messages');
                
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.textContent = message;
                messagesContainer.appendChild(userMessage);
                
                // Clear input
                input.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.textContent = getAIResponse(message);
                    messagesContainer.appendChild(botMessage);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 1000);
                
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }

        function getAIResponse(message) {
            const responses = [
                "Based on your sales data, I recommend increasing inventory for your top-selling products.",
                "I notice your expenses have increased by 15% this month. Would you like me to analyze this?",
                "Your business shows strong growth potential! Consider exploring new market opportunities.",
                "I can help you create a financial forecast for the next quarter based on current trends.",
                "Based on similar businesses in your area, there's opportunity to optimize pricing strategy."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
  function handleLogout() {
    // Remove the current user from localStorage
    localStorage.removeItem('currentUser');

    // Optionally, show a message
    alert('✅ You have been logged out successfully.');

    // Redirect to login or homepage
    window.location.href = 'index.html'; // or 'login.html'
}

        // Enter key support for chatbot
        document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
// Chat functionality
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');

        function addMessage(sender, text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageDiv.innerHTML = `
                <div class="message-sender">${isUser ? 'You' : 'Kaci AI'}</div>
                <div class="message-content">${text}</div>
                <div class="message-time">${timeString}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getAIResponse(message) {
            const responses = {
                'sales': "Based on your recent sales data, I notice a 15% increase in weekend sales. Consider extending your weekend hours or running weekend promotions to maximize revenue.",
                'expense': "Your expenses have increased by 12% this month. The main increases are in supplier costs (8%) and utilities (4%). I recommend negotiating with suppliers for better rates.",
                'inventory': "Your inventory analysis shows that 20% of your stock hasn't moved in 60 days. Consider running a promotion to clear slow-moving items and free up capital.",
                'forecast': "Based on current trends, I forecast a 18% revenue growth next quarter. This would result in approximately R45,000 in additional revenue if current patterns continue.",
                'default': "I've analyzed your business data and can provide insights on optimizing operations. Would you like me to focus on sales, expenses, inventory, or overall financial health?"
            };

            message = message.toLowerCase();
            
            if (message.includes('sale') || message.includes('revenue')) {
                return responses.sales;
            } else if (message.includes('expense') || message.includes('cost')) {
                return responses.expense;
            } else if (message.includes('invent') || message.includes('stock')) {
                return responses.inventory;
            } else if (message.includes('forecast') || message.includes('predict')) {
                return responses.forecast;
            } else {
                return responses.default;
            }
        }

        function sendMessage() {
            const message = userInput.value.trim();
            if (message) {
                addMessage('You', message, true);
                userInput.value = '';
                
                // Simulate AI thinking
                setTimeout(() => {
                    const response = getAIResponse(message);
                    addMessage('Kaci AI', response, false);
                }, 1000);
            }
        }

        function sendSuggestion(suggestion) {
            userInput.value = suggestion;
            sendMessage();
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Focus on input when page loads
        window.onload = function() {
            userInput.focus();
        };
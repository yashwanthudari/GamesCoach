// Tara Chat Widget - AI Casino Games Coach
class TaraChatWidget {
    constructor() {
        // Wait for DOM to be fully loaded
        this.initializeElements();
        this.isOpen = false;
        this.isTyping = false;
        this.chatHistory = [];
        this.hasUnreadMessage = false;
        
        this.initializeKnowledgeBase();
        this.bindEvents();
        this.setupQuickActions();
        
        console.log('Tara Chat Widget initialized');
        
        // Show notification after a delay to attract attention
        setTimeout(() => this.showNotification(), 3000);
    }

    initializeElements() {
        this.chatWidget = document.getElementById('chatWidget');
        this.chatButton = document.getElementById('chatButton');
        this.chatPanel = document.getElementById('chatPanel');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.minimizeBtn = document.getElementById('minimizeBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.notificationDot = document.getElementById('notificationDot');
        this.actionButtons = document.querySelectorAll('.action-btn');

        // Verify elements exist
        if (!this.chatWidget || !this.chatButton || !this.chatPanel) {
            console.error('Critical chat widget elements not found');
            return;
        }
        
        console.log('Chat widget elements found and initialized');
    }

    initializeKnowledgeBase() {
        this.knowledgeBase = {
            Registration: {
                keywords: ['login', 'How to sign Up', 'How to login', 'Register', 'Creat account', 'Sign up', 'sign in'],
                response: '🎰 <strong>Greetings !!!</strong><br><br> You can sign up by clicking the link below:<br><a href="https://yashwanthudari.github.io/GamesCoach/signup.html" target="_blank">👉 Sign Up Here</a>'
            },
            slots: {
                keywords: ['slot', 'slots', 'spin', 'reel', 'jackpot', 'payline', 'rtp'],
                response: "🎰 **Slot Machine Guide:**\n\nSlots are the most popular casino games! Here's what you need to know:\n\n• **RTP (Return to Player):** Look for 96%+ for better odds\n• **Volatility:** Low = frequent small wins, High = rare big wins\n• **Paylines:** More lines = more chances to win\n• **Progressive Jackpots:** Build up over time\n\n**Pro Tips:**\n• Set a budget before you start\n• Never chase losses\n• Take breaks regularly\n• Try demo mode first!\n\nRemember: Slots are games of chance - play for fun! 🎯"
            },
            blackjack: {
                keywords: ['blackjack', '21', 'hit', 'stand', 'double', 'split', 'dealer'],
                response: "🃏 **Blackjack Strategy:**\n\n**Goal:** Get as close to 21 without going over\n\n**Card Values:**\n• Number cards: Face value\n• Face cards (J,Q,K): 10 points\n• Aces: 1 or 11\n\n**Basic Strategy:**\n• Always split Aces and 8s\n• Never split 5s or 10s\n• Double on 11 vs dealer 2-10\n• Stand on 17+\n• Hit on 16 or less (unless dealer shows 6 or less)\n\n**House Edge:** With perfect strategy, under 1%! 📊"
            },
            roulette: {
                keywords: ['roulette', 'wheel', 'red', 'black', 'number', 'european', 'american'],
                response: "🎡 **Roulette Guide:**\n\n**How to Play:**\n• Bet on numbers, colors, or sections\n• Ball spins and lands in a pocket\n• Matching bets win!\n\n**Bet Types:**\n• **Inside Bets:** Specific numbers (higher payouts)\n• **Outside Bets:** Red/black, odd/even (better odds)\n\n**Choose European over American:**\n• European: Single zero (2.7% house edge)\n• American: Double zero (5.26% house edge)\n\n**Smart Tip:** Stick to outside bets for better winning chances! 🎯"
            },
            bingo: {
                keywords: ['bingo', 'ball', 'number', 'card', 'pattern', '75', '90'],
                response: "🎲 **Bingo Basics:**\n\n**75-Ball Bingo:**\n• 5x5 grid with B-I-N-G-O columns\n• Win by completing patterns\n\n**90-Ball Bingo:**\n• 3x9 grid format\n• Three ways to win: 1 line, 2 lines, full house\n\n**Winning Tips:**\n• Buy multiple cards for better odds\n• Play during quieter times\n• Learn the patterns quickly\n• Stay alert when numbers are called!\n\n**Best Strategy:** More cards = better chances! 🏆"
            },
            poker: {
                keywords: ['poker', 'texas', 'holdem', 'hand', 'fold', 'bluff', 'tournament'],
                response: "♠️ **Poker Strategy:**\n\n**Hand Rankings (High to Low):**\n1. Royal Flush 👑\n2. Straight Flush\n3. Four of a Kind\n4. Full House\n5. Flush\n6. Straight\n7. Three of a Kind\n8. Two Pair\n9. One Pair\n10. High Card\n\n**Basic Tips:**\n• Play tight-aggressive\n• Position matters!\n• Don't bluff beginners\n• Manage your bankroll\n• Learn pot odds\n\n**Tournament Strategy:** Adjust play based on stack sizes and blinds! 🃏"
            },
            responsible: {
                keywords: ['responsible', 'gambling', 'addiction', 'limit', 'help', 'problem', 'safe'],
                response: "🛡️ **Responsible Gaming:**\n\n**Essential Rules:**\n• Set time and money limits BEFORE playing\n• Never gamble money you can't afford to lose\n• Don't chase losses\n• Take regular breaks\n• Never gamble when upset or intoxicated\n\n**Warning Signs:**\n• Gambling to escape problems\n• Lying about gambling\n• Borrowing money to gamble\n• Neglecting responsibilities\n\n**Get Help:**\n• **US:** 1-800-GAMBLER\n• **UK:** GamCare.org.uk\n• Self-exclusion tools available\n\nYour wellbeing comes first! 💚"
            },
            tournaments: {
                keywords: ['tournament', 'competition', 'leaderboard', 'prize', 'entry', 'ranking'],
                response: "🏆 **Tournament Guide:**\n\n**Available Tournaments:**\n• **Slot Tournaments:** Speed-based spinning\n• **Poker Tournaments:** Multi-table events\n• **Blackjack Tournaments:** Best chip count wins\n• **Daily/Weekly Challenges**\n\n**How to Join:**\n• Check tournament schedule\n• Pay entry fee (buy-in)\n• Follow specific rules\n• Compete for leaderboard position\n\n**Pro Tips:**\n• Read tournament rules carefully\n• Manage your bankroll\n• Play consistently, not just big\n• Time management is key!\n\nGood luck! 🎯"
            },
            support: {
                keywords: ['issue', 'problem', 'report', 'bug', 'error', 'help', 'support', 'contact'],
                response: "🆘 **Technical Support:**\n\n**I can help with:**\n• Game loading issues\n• Payment problems\n• Bonus questions\n• Account verification\n• Rule clarifications\n\n**Contact Methods:**\n• **Live Chat:** Available 24/7 (fastest)\n• **Email:** support@royalcasino.com\n• **Phone:** 1-800-ROYAL-HELP\n\n**When reporting issues, include:**\n• Your username\n• Device/browser info\n• Screenshots if possible\n• Time when issue occurred\n\n**Emergency?** Use live chat for urgent account or payment issues! 📞"
            },
            promotions: {
                keywords: ['bonus', 'promotion', 'free', 'welcome', 'cashback', 'loyalty', 'offer'],
                response: "🎁 **Current Promotions:**\n\n**Welcome Package:**\n• 100% match bonus up to $500\n• 100 free spins on Mega Fortune\n• Valid for 30 days\n\n**Ongoing Offers:**\n• **Monday Cashback:** 20% on losses\n• **Daily Tournaments:** $10,000 prize pool\n• **Loyalty Program:** Earn points on every bet\n• **Weekend Reload:** 50% bonus on deposits\n\n**Important:**\n• Check wagering requirements\n• Game restrictions may apply\n• Read terms and conditions\n\n**Pro Tip:** Set up deposit limits before claiming bonuses! 💰"
            }
        };

        this.greetings = [
            "Hello! I'm Tara, your AI Casino Games Coach! 🎰 What can I help you with today?",
            "Hi there! Ready to learn about casino games? I'm here to help! 🎲",
            "Welcome! I'm Tara - let's make your gaming experience smarter and safer! 🃏"
        ];

        this.quickResponses = [
            "Great question! Let me help you with that.",
            "I love helping players learn! Here's what you need to know:",
            "Smart to ask! Knowledge is power in casino gaming:",
            "Excellent question! Here's my expert advice:",
            "Perfect timing to learn about this!"
        ];
    }

    bindEvents() {
        console.log('Binding events...');
        
        if (this.chatButton) {
            this.chatButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat button clicked');
                this.openChat();
            });
        }
        
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Minimize button clicked');
                this.minimizeChat();
            });
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                this.closeChat();
            });
        }
        
        if (this.sendButton) {
            this.sendButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSendMessage();
            });
        }
        
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSendMessage();
                }
            });

            this.messageInput.addEventListener('input', () => {
                if (this.sendButton) {
                    this.sendButton.disabled = this.messageInput.value.trim() === '';
                }
            });
        }

        console.log('Events bound successfully');
    }

    setupQuickActions() {
        if (this.actionButtons) {
            this.actionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const question = button.dataset.question;
                    if (question && this.messageInput) {
                        this.messageInput.value = question;
                        this.handleSendMessage();
                    }
                });
            });
        }
    }

    openChat() {
        console.log('Opening chat...');
        this.isOpen = true;
        
        if (this.chatPanel) {
            this.chatPanel.style.display = 'flex';
            // Force reflow
            this.chatPanel.offsetHeight;
            this.chatPanel.classList.add('visible');
        }
        
        if (this.chatButton) {
            this.chatButton.style.display = 'none';
        }
        
        this.hideNotification();
        
        if (this.messageInput) {
            setTimeout(() => this.messageInput.focus(), 300);
        }
        
        this.scrollToBottom();
        console.log('Chat opened');
    }

    minimizeChat() {
        console.log('Minimizing chat...');
        this.isOpen = false;
        
        if (this.chatPanel) {
            this.chatPanel.classList.remove('visible');
            setTimeout(() => {
                this.chatPanel.style.display = 'none';
            }, 300);
        }
        
        if (this.chatButton) {
            this.chatButton.style.display = 'flex';
        }
        
        if (this.hasUnreadMessage) {
            this.showNotification();
        }
        console.log('Chat minimized');
    }

    closeChat() {
        console.log('Closing chat...');
        this.isOpen = false;
        
        if (this.chatPanel) {
            this.chatPanel.classList.remove('visible');
            setTimeout(() => {
                this.chatPanel.style.display = 'none';
            }, 300);
        }
        
        if (this.chatButton) {
            this.chatButton.style.display = 'flex';
        }
        
        this.hasUnreadMessage = false;
        this.hideNotification();
        console.log('Chat closed');
    }

    showNotification() {
        this.hasUnreadMessage = true;
        if (this.notificationDot) {
            this.notificationDot.classList.add('visible');
        }
    }

    hideNotification() {
        this.hasUnreadMessage = false;
        if (this.notificationDot) {
            this.notificationDot.classList.remove('visible');
        }
    }

    async handleSendMessage() {
        if (!this.messageInput || !this.chatMessages) return;
        
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        console.log('Sending message:', message);

        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        if (this.sendButton) {
            this.sendButton.disabled = true;
        }

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Generate response with realistic delay
            const response = await this.generateResponse(message);
            
            // Simulate thinking time
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
            
            this.hideTypingIndicator();
            this.addMessage(response, 'tara');
            
            // If chat is minimized, show notification
            if (!this.isOpen) {
                this.showNotification();
            }
        } catch (error) {
            console.error('Error generating response:', error);
            this.hideTypingIndicator();
            this.addMessage("I apologize, but I'm having trouble right now. Please try again! 🔧", 'tara');
        }

        if (this.sendButton) {
            this.sendButton.disabled = false;
        }
    }

    async generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Handle greetings
        if (this.isGreeting(message)) {
            return this.getRandomFromArray(this.greetings);
        }

        // Handle win celebrations
        if (this.isCelebration(message)) {
            return "🎉 **CONGRATULATIONS!** 🎉\n\nThat's fantastic! I love seeing players succeed! 🏆\n\n**Remember:**\n• Enjoy your win!\n• Consider cashing out some winnings\n• Don't feel pressured to bet it all again\n• Keep playing within your budget\n\nWhat game brought you this victory? 🍀✨";
        }

        // Find best matching category
        let bestMatch = null;
        let matchCount = 0;

        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            const matches = data.keywords.filter(keyword => message.includes(keyword)).length;
            if (matches > matchCount) {
                matchCount = matches;
                bestMatch = category;
            }
        }

        // Return specific response if good match found
        if (bestMatch && matchCount > 0) {
            const intro = this.getRandomFromArray(this.quickResponses);
            return `${intro}\n\n${this.knowledgeBase[bestMatch].response}`;
        }

        // Default helpful response
        return this.getDefaultResponse(userMessage);
    }

    getDefaultResponse(userMessage) {
        const responses = [
            `I'd love to help you with "${userMessage}"! I specialize in casino games, responsible gambling, and player support. Try asking about specific games like slots, blackjack, poker, or bingo. What would you like to learn? 🎰`,
            
            `That's interesting! While I might not have specific info about "${userMessage}", I'm an expert on casino games, strategies, and safe gaming practices. Ask me about game rules, tournaments, or responsible gambling! 🎯`,
            
            `Thanks for your question about "${userMessage}"! I'm here to help with casino gaming topics. Try asking me about:\n\n• Game rules and strategies\n• Responsible gambling tips\n• Tournament information\n• Bonus explanations\n• Technical support\n\nWhat interests you most? 🃏`
        ];

        return this.getRandomFromArray(responses);
    }

    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'start', 'help'];
        return greetings.some(greeting => message.includes(greeting));
    }

    isCelebration(message) {
        const celebrations = ['won', 'win', 'winning', 'jackpot', 'big win', 'hit', 'lucky', 'victory', 'success'];
        return celebrations.some(word => message.includes(word));
    }

    getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    addMessage(content, type) {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'user' ? '👤' : '🎭';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = this.formatMessage(content);

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.getCurrentTime();

        messageContent.appendChild(bubble);
        messageContent.appendChild(time);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to chat history
        this.chatHistory.push({
            content,
            type,
            timestamp: new Date()
        });

        // Animate new message
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
    }

    formatMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/• /g, '• ');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    showTypingIndicator() {
        this.isTyping = true;
        if (this.typingIndicator) {
            this.typingIndicator.classList.add('visible');
        }
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        if (this.typingIndicator) {
            this.typingIndicator.classList.remove('visible');
        }
    }

    scrollToBottom() {
        if (this.chatMessages) {
            requestAnimationFrame(() => {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            });
        }
    }
}

// Initialize the chat widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Tara Chat Widget...');
    
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        try {
            window.TaraChat = new TaraChatWidget();
            console.log('Tara Chat Widget initialized successfully!');
        } catch (error) {
            console.error('Error initializing Tara Chat Widget:', error);
        }
    }, 100);
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    console.log('Tara Chat Widget unloading');
});
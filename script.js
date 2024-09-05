// Sample conversation flow
const conversationFlow = {
    0: "Hello! What would you like to book today? (flight, hotel, museum)",
    1: "Great! Please enter the date for your booking (YYYY-MM-DD).",
    2: "How many tickets or rooms do you need?",
    3: "Can you please provide your name?",
    4: "What is your preferred payment method? (credit card, paypal, etc.)",
    5: "Thank you! We are processing your booking. Have a nice day!"
};

// Variables to store user input
let bookingDetails = {
    type: "",
    date: "",
    tickets: "",
    name: "",
    paymentMethod: ""
};

// To track current step in the conversation
let step = 0;

// Function to add message to the chatbox
function addMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

// Send user message and trigger bot response
function sendMessage() {
    const input = document.getElementById("user-input");
    const userMessage = input.value;

    if (userMessage.trim() !== "") {
        addMessage(userMessage, "user");

        // Clear the input field
        input.value = "";

        // Bot response based on the step
        setTimeout(() => botResponse(userMessage), 1000);  // Simulate a delay
    }
}

// Handle bot's response
function botResponse(userMessage) {
    let botReply = "";

    switch (step) {
        case 0:
            if (["flight", "hotel", "museum"].includes(userMessage.toLowerCase())) {
                bookingDetails.type = userMessage.toLowerCase();
                botReply = conversationFlow[1];
                step++;
            } else {
                botReply = "Sorry, I can only help with booking flights, hotels, or museums.";
            }
            break;
        case 1:
            if (/^\d{4}-\d{2}-\d{2}$/.test(userMessage)) {
                bookingDetails.date = userMessage;
                botReply = conversationFlow[2];
                step++;
            } else {
                botReply = "Please enter a valid date in YYYY-MM-DD format.";
            }
            break;
        case 2:
            if (!isNaN(userMessage)) {
                bookingDetails.tickets = userMessage;
                botReply = conversationFlow[3];
                step++;
            } else {
                botReply = "Please enter a valid number.";
            }
            break;
        case 3:
            bookingDetails.name = userMessage;
            botReply = conversationFlow[4];
            step++;
            break;
        case 4:
            bookingDetails.paymentMethod = userMessage.toLowerCase();
            botReply = conversationFlow[5];
            step = 0;  // Reset for a new booking

            // Log the booking details to the console (for demonstration purposes)
            console.log("Booking Details:", bookingDetails);
            break;
        default:
            botReply = conversationFlow[0];
            step = 0;
            break;
    }

    addMessage(botReply, "bot");
}

// Handle "Enter" key press to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Initial bot message
window.onload = function() {
    addMessage(conversationFlow[0], "bot");
};

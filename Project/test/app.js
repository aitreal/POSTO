document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const checkButton = document.getElementById('check-button');
    const chatContainer = document.getElementById('chat-container');
    const loading = document.getElementById('loading');
    const clearChatButton = document.getElementById('clear-chat');
    const loginButton = document.getElementById('login-button');
    let chatHistory = [];
    let electricityData = [];

    // Load CSV data
    Papa.parse("/testdata.csv", {
        download: true,
        header: true,
        complete: function(results) {
            electricityData = results.data;
        }
    });

    // Check electricity data based on input
    function checkElectricityData(query) {
        const queryWords = query.toLowerCase().split(" ");
        const foundRows = electricityData.filter(row => {
            const stationMatch = row["สถานี/หน่วยงาน"].toLowerCase().includes(queryWords[1] || "");
            const monthMatch = row["เดือนรอบบิล"].toLowerCase() === (queryWords[0] || "");
            return stationMatch && monthMatch;
        });

        if (foundRows.length > 0) {
            return foundRows.map(found =>
                `ค่าไฟฟ้าของ ${found["สถานี/หน่วยงาน"]} ในเดือน ${found["เดือนรอบบิล"]} ปี ${found["ปี"]} คือ ${found["ค่าไฟฟ้า (บาท/เดือน)"]}`
            ).join("\n");
        }
        return "ไม่พบข้อมูลที่ตรงกับคำค้น";
    }

    // Send a message and check for electricity data
    function sendMessage() {
        const userInputValue = userInput.value.trim();
        if (userInputValue === "") return;

        loading.style.display = "block"; // Show loading
        const answer = checkElectricityData(userInputValue);

        chatHistory.push({ type: 'user', message: userInputValue });
        chatHistory.push({ type: 'bot', message: answer });

        updateChatHistory();
        userInput.value = "";
        loading.style.display = "none"; // Hide loading
    }

    // Update the chat history UI
    function updateChatHistory() {
        chatContainer.innerHTML = chatHistory.map(chat => `
            <div class="${chat.type === 'user' ? 'user-message' : 'bot-message'}">
                ${chat.message}
            </div>
        `).join('');
    }

    // Event listeners
    checkButton.addEventListener('click', sendMessage);
    clearChatButton.addEventListener('click', function() {
        chatHistory = [];
        updateChatHistory();
    });
    loginButton.addEventListener('click', function() {
        window.location.href = '/login.html'; // Navigate to login page
    });
});
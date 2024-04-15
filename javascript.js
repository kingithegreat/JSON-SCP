// Global variable to keep track of current speech
let currentSpeech = null;

function speakText(text) {
    // Check if we are currently speaking
    if (window.speechSynthesis.speaking) {
        // If we are speaking, stop the current speech
        window.speechSynthesis.cancel();
        // If the current speech is the same as the new text, don't start speaking again
        if (currentSpeech === text) {
            currentSpeech = null;
            return;
        }
    }
    
    // Set up new speech
    const speech = new SpeechSynthesisUtterance(text);
    // Assign currentSpeech to new text
    currentSpeech = text;
    // Speak the actual text
    window.speechSynthesis.speak(speech);
}

// Your existing code for adding event listeners to buttons
document.getElementById("fetchButton").addEventListener('click', () => {
    // fetch JSON DATA
    fetch('json.json')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayData(data) {
    const displayData = document.getElementById("dataDisplay");

    data.forEach(item => {
        const div = document.createElement("div");
        const content = `<strong>Subject: </strong> ${item.subject}
            <br><strong>Class: </strong> ${item.class}
            <br><strong>Summary: </strong> ${item.summary}
            <br>`;
        
        const speechButton = document.createElement('button');
        speechButton.textContent = "Read";
        
        const monster = item.summary;
        speechButton.addEventListener('click', () => { speakText(monster) });
        
        div.innerHTML = content;
        displayData.appendChild(speechButton);
        displayData.appendChild(div);
    });
}

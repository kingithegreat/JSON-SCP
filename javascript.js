// Global variable to keep track of current speech
let currentSpeech = null;

/**
 * Speaks the provided text using text-to-speech.
 * @param {string} text - The text to be spoken.
 */
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

// Event listener for the fetch button
document.getElementById("fetchButton").addEventListener('click', () => {
    // Fetch JSON data
    fetch('json.json')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});

/**
 * Displays the fetched data on the webpage.
 * @param {Array} data - An array of data items.
 */
function displayData(data) {
    const displayData = document.getElementById("dataDisplay");

    data.forEach(item => {
        const div = document.createElement("div");
        const content = `<strong>Subject: </strong> ${item.subject}
            <br><strong>Class: </strong> ${item.class}
            <br><strong>Summary: </strong> ${item.summary}
            <br>`;

        // Create a button for text-to-speech
        const speechButton = document.createElement('button');
        speechButton.textContent = "Read";

        // Set up the text to be spoken
        const monster = item.summary;
        speechButton.addEventListener('click', () => { speakText(monster) });

        // Append content and button to the display area
        div.innerHTML = content;
        displayData.appendChild(speechButton);
        displayData.appendChild(div);
    });
}

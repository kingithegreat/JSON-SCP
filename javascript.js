//  variable to track current speech
let currentSpeech = null;


function speakText(text) {
    // Check if currently speaking
    if (window.speechSynthesis.speaking) {
        // If speaking, cancel the current speech
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
    // Speak the json text
    window.speechSynthesis.speak(speech);
}
    

    

// Add Event listener for the fetch button
document.getElementById("fetchButton").addEventListener('click', () => {
    // Fetch JSON data
    fetch('json.json')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
});



function displayData(data) {
    const displayData = document.getElementById("dataDisplay");
    // Display the data for each div
    data.forEach(item => {
        const div = document.createElement("div");
        const content = `<strong>Title: </strong> ${item.Title}
            <br><strong>Class: </strong> ${item.class}
            <br><strong>Description: </strong> ${item.Description}
            <br><strong>Containment: </strong> ${item.Containment}
            <br>${item.Image}
            `;

        // Create a button for text-to-speech
        const speechButton = document.createElement('button');
        speechButton.textContent = "Read Contents";

        // Set up the text to be spoken
        const monster = item.Description;
        speechButton.addEventListener('click', () => { speakText(item.Title + ". " + item.class + ". "+ monster+ ". ") });

          

        // Append content and button to the display area
        div.innerHTML = content;
        displayData.appendChild(div);
        displayData.appendChild(speechButton);
    });
}

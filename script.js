// Get elements
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");

const translateBtn = document.getElementById("translateBtn");
const swapBtn = document.getElementById("swap");

const counter = document.getElementById("counter");
const loading = document.getElementById("loading");

const darkModeBtn = document.getElementById("darkMode");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        darkModeBtn.innerText = "☀ Light Mode";
    } else {
        darkModeBtn.innerText = "🌙 Dark Mode";
    }
});


// Character counter
inputText.addEventListener("input", () => {
    counter.innerText = inputText.value.length + "/500";
});


// Debounce function
function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay);
    };
}


// Translation function
function translateText() {

    let text = inputText.value.trim();

    if (text === "") {
        outputText.value = "";
        return;
    }

    loading.innerText = "Translating...";

    let url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`;

    fetch(url)

    .then(response => {

        if (!response.ok) {
            throw new Error("Network response failed");
        }

        return response.json();
    })

    .then(data => {

        if (data && data.responseData) {
            outputText.value = data.responseData.translatedText;
        } else {
            outputText.value = "Translation not available";
        }

        loading.innerText = "";
    })

    .catch(error => {

        loading.innerText = "Error: Unable to translate";

        console.error(error);
    });

}


// Real-time translation with debounce
const debouncedTranslate = debounce(translateText, 600);

inputText.addEventListener("input", debouncedTranslate);


// Translate button
translateBtn.addEventListener("click", translateText);


// Default translation when page loads
window.addEventListener("load", () => {

    inputText.value = "Hello, how are you";
    fromLang.value = "en";
    toLang.value = "fr";

    counter.innerText = inputText.value.length + "/500";

    translateText();
});


// Swap languages
swapBtn.addEventListener("click", () => {

    let tempLang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = tempLang;

    let tempText = inputText.value;
    inputText.value = outputText.value;
    outputText.value = tempText;
});


// Copy text
document.getElementById("copyInput").addEventListener("click", () => {
    navigator.clipboard.writeText(inputText.value);
});

document.getElementById("copyOutput").addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.value);
});


// Text-to-Speech (Input)
document.getElementById("listenInput").addEventListener("click", () => {

    let speech = new SpeechSynthesisUtterance(inputText.value);
    speech.lang = fromLang.value;

    speechSynthesis.speak(speech);
});


// Text-to-Speech (Output)
document.getElementById("listenOutput").addEventListener("click", () => {

    let speech = new SpeechSynthesisUtterance(outputText.value);
    speech.lang = toLang.value;

    speechSynthesis.speak(speech);
});


// Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});



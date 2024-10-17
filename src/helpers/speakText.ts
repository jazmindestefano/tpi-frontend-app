export const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-AR"
    window.speechSynthesis.speak(utterance);
};
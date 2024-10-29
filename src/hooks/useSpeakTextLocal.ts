// todo: this also needs to desappear
const useTextToSpeech = () => {
  const textToSpeech = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)

    window.speechSynthesis.speak(utterance)
  }

  return { textToSpeech }
}

export default useTextToSpeech

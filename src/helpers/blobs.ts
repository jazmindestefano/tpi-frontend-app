export const convertBlobToAudioFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: 'audio/wav' })
}

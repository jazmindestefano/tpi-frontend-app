export const convertBlobToAudioFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: 'audio/wav' })
}

export const convertToImgFile = (blob: File, fileName: string): File => {
  return new File([blob], fileName, { type: 'image/jpeg' })
}

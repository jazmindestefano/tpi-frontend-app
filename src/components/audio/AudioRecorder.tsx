import * as React from 'react';
import {useAudioRecording} from "../../hooks/useAudioRecording.ts";
import {useState} from "react";


export const AudioRecorder: React.FC = () => {

  const { isRecording, error, audio, startRecording, stopRecording } = useAudioRecording()
  const [audioUrl, setAudioUrl] = useState<string>('');
  console.log(audio)
  console.log(error)
  if (audio && !audioUrl) {
    setAudioUrl(URL.createObjectURL(audio))
    console.log(audioUrl)
  }
  
  return (
    <div>
      <audio src={audioUrl}>asdassa</audio>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
      <button onClick={() => {isRecording ? stopRecording() : startRecording()}}>{isRecording ? "Recording..." : "Record"}</button>
    </div>
  );
};
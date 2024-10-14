import * as React from 'react';
import {useAudioRecording} from "../../hooks/useAudioRecording.ts";


const AudioRecorder: React.FC = () => {
  const { isRecording, error, audio, startRecording, stopRecording } = useAudioRecording()
  
  return (
    !error ? <div>
      {audio ? <audio controls src={URL.createObjectURL(audio)}>asdassa</audio> : null}
      {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
      <button onClick={() => {isRecording ? stopRecording() : startRecording()}}>{isRecording ? "Recording..." : "Record"}</button>
    </div> : null
  );
};

export default AudioRecorder;
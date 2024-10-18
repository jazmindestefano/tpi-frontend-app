import {useAudioRecording} from "../../hooks/useAudioRecording.ts";


const AudioRecorder: React.FC = () => {
  const { isRecording, error, audio, startRecording, stopRecording } = useAudioRecording()
  
  return (
    !error ? <div>
      {audio ? <audio controls src={URL.createObjectURL(audio)}>asdassa</audio> : null}
      <button onClick={() => {
        if (isRecording) {
          stopRecording()
        } else {
          startRecording()
        }}}>{isRecording ? "Recording..." : "Record"}</button>
    </div> : null
  );
};

export default AudioRecorder;
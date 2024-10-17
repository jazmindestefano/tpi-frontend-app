import { House, LogOut, Pencil, Save } from "lucide-react"
import { ArrowRightIcon, AudioLinesIcon, MicIcon, VolumeIcon } from "../icons/Icons"
import Button from "./Button"

export const PrimaryVolumeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"circle"} shape={"circle"} variant={"primary"} onClick={onClick}>
            <VolumeIcon />
        </Button>
    )
}

export const SecondaryVolumeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"circle"} shape={"circle"} variant={"secondary"} onClick={onClick}>
            <VolumeIcon />
        </Button>
    )
}

export const TertiaryVolumeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"circle"} shape={"circle"} variant={"tertiary"} onClick={onClick}>
            <VolumeIcon />
        </Button>
    )
}

export const FourthVolumeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"circle"} shape={"circle"} variant={"fourth"} onClick={onClick}>
            <VolumeIcon />
        </Button>
    )
}

export const FourthMicButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"circle"} shape={"circle"} variant={"fourth"} onClick={onClick}>
            <MicIcon />
        </Button>
    )
}

export const MicOrAudioLinesButton = ({ isRecording, stopRecording, startRecording} : { isRecording: boolean, stopRecording: () => void, startRecording: () => void }) => {
    return (
        <Button
              size={"circle"}
              shape={"circle"}
              variant={"fourth"}
              onClick={() => (isRecording ? stopRecording() : startRecording())}
            >
              {isRecording ? <AudioLinesIcon /> : <MicIcon /> }
        </Button>
    )
}

export const PrimaryArrowRightButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            size={"circle"}
            shape={"circle"}
            variant={"primary"}
            onClick={onClick}
          >
            <ArrowRightIcon />
        </Button>
    )
}

export const PrimaryLogOutButton = () => {
    return (
        <Button size={"square"} variant={"primary"}>
            <LogOut className="text-white" />
        </Button>
    )
}

export const TertiaryHomeButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button size={"square"} variant={"tertiary"} onClick={onClick}>
            <House />
        </Button>
    )
}

export const TertiaryProfileButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <Button
            size={"square"}
            variant={"tertiary"}
            onClick={onClick}
          >
            {children}
          </Button>
    )
}

export const SecondarySaveButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
                size={"circle"}
                shape={"circle"}
                variant={"secondary"}
                onClick={onClick}
              >
                <Save className="text-white" />
        </Button>
    )
}

export const SecondaryPencilButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
                size={"circle"}
                shape={"circle"}
                variant={"secondary"}
                onClick={onClick}
              >
                <Pencil className="text-white" />
        </Button>
    )
}





          
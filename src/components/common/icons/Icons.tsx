import { ArrowBigLeft, ArrowBigRight, AudioLines, Frown, Meh, Mic, Smile, StepForward, Volume2 } from 'lucide-react'
import { FC } from 'react'

export const VolumeIcon: FC = () => <Volume2 color="#ffffff" size={36} />

export const MicIcon: FC = () => <Mic color="#ffffff" size={36} />

export const ArrowRightIcon: FC = () => <ArrowBigRight color="#ffffff" size={36} />

export const ArrowLeftIcon: FC = () => <ArrowBigLeft color="#ffffff" size={36} />

export const AudioLinesIcon: FC = () => <AudioLines color="#ffffff" size={36} />

export const ContinueIcon: FC = () => <StepForward color="#ffffff" size={36} />

export const GoodFeedbackIcon: FC = () => <Smile color={'#008F39'} size={16 * 5} strokeWidth={1} />

export const MehFeedbackIcon: FC = () => <Meh color={'#E5BE01'} size={16 * 5} strokeWidth={1} />

export const BadFeedbackIcon: FC = () => <Frown color={'#C13617'} size={16 * 5} strokeWidth={1} />

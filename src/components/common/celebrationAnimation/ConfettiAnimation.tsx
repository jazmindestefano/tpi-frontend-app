import { FC, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import useSound from 'use-sound'

interface ConfettiAnimationProps {
  isActive: boolean
}

const ConfettiAnimation: FC<ConfettiAnimationProps> = ({ isActive }) => {
  const { width, height } = useWindowSize()
  const [playApplause] = useSound('https://cdn.pixabay.com/audio/2022/11/04/audio_7b2d96a98f.mp3', { volume: 0.03 })

  useEffect(() => {
    if (isActive) {
      playApplause()
    }
  }, [isActive, playApplause])

  return (
    <>
      {isActive && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={2500}
          gravity={0.3}
          wind={0.01}
          colors={['#ff6347', '#ffd700', '#32cd32', '#00bfff', '#ff69b4']}
          initialVelocityY={20}
        />
      )}
    </>
  )
}

export default ConfettiAnimation

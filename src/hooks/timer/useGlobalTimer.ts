import { useContext } from 'react'
import { TimerContext } from '@context'

const useGlobalTimer = () => useContext(TimerContext)

export default useGlobalTimer

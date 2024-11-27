import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { User } from '@interfaces'

export const useCurrentUser = (): User => useSelector((state: RootState) => state.user.user)

export const useToken = (): string => useSelector((state: RootState) => state.user.token)

export const useUserBackground = (): string => useSelector((state: RootState) => state.user.background)

export const useShowModalFeedback = (): boolean => useSelector((state: RootState) => state.ui.ui.showModalFeedback)

export const useShowProductTour = (): boolean => useSelector((state: RootState) => state.ui.ui.showProductTour)

export const useCurrentGame = () => useSelector((state: RootState) => state.game)

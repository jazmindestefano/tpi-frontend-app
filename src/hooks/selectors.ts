import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Game, Theme, User } from '@/interfaces'

export const useSelectedTheme = (): Theme => useSelector((state: RootState) => state.game.selectedTheme)

export const useSelectedGame = (): Game => useSelector((state: RootState) => state.game.selectedGame)

export const useUser = (): User => useSelector((state: RootState) => state.user.user)

export const useToken = (): string => useSelector((state: RootState) => state.user.token)

export const useShowModalFeedback = (): boolean => useSelector((state: RootState) => state.ui.ui.showModalFeedback)

export const useShowProductTour = (): boolean => useSelector((state: RootState) => state.ui.ui.showProductTour)

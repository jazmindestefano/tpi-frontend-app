import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {Game, Theme, User} from "../interfaces/interfaces.ts";

export const useSelectedTheme = (): Theme => useSelector((state: RootState) => state.game.selectedTheme);

export const useSelectedGame = (): Game => useSelector((state: RootState) => state.game.selectedGame);

export const useUser = (): User => useSelector((state: RootState) => state.user.user);
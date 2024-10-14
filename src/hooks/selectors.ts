import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Game, Theme } from "../interfaces/interfaces.ts";

export const useSelectedTheme = (): Theme | null => useSelector((state: RootState) => state.game.selectedTheme);

export const useSelectedGame = (): Game | null => useSelector((state: RootState) => state.game.selectedGame);
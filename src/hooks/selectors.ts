import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {Theme} from "../interfaces/interfaces.ts";

export const useSelectedTheme = (): Theme | null => useSelector((state: RootState) => state.theme.selectedTheme);
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toggleTheme } from "../../store/themeSlice";

export function useNavbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  function onToggleTheme() {
    dispatch(toggleTheme());
  }

  return {
    mode,
    onToggleTheme,
  };
}

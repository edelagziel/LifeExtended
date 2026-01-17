import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  mode: "light" | "dark";
  fontSize: number;
};

const initialState: ThemeState = {
  mode: "light",
  fontSize: 16,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
    setFontSize(state, action: PayloadAction<number>) {
      state.fontSize = action.payload;
    },
  },
});

export const { toggleMode, setMode, setFontSize } = themeSlice.actions;
export default themeSlice.reducer;

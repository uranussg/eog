import { createSlice, PayloadAction } from 'redux-starter-kit';




export type ApiErrorAction = {
  error: string;
};

const initialState = {
  heartBeat: 0
};


const slice = createSlice({
  name: 'heartBeat',
  initialState,
  reducers: {
    beatDataRecevied: (state, action: PayloadAction<number>) => {
      state.heartBeat = action.payload;

    },
    beatErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

import { createSlice, PayloadAction } from 'redux-starter-kit';




export type ApiErrorAction = {
  error: string;
};

const initialState = {
  labels: ['']
};


const slice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    labelSelectionRecevied: (state, action: PayloadAction<string[]>) => {
      const labels = action.payload
      state.labels = labels;

    },
    labelErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

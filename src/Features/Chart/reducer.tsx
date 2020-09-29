import { createSlice, PayloadAction } from 'redux-starter-kit';

export type  Measurement = {
  metric: String;
  at: number;
  value: number;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  multiMeasurements: [{}]
};


const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataRecevied: (state, action: PayloadAction<Measurement[]>) => {
    
      state.multiMeasurements = action.payload;

    },
    dataErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

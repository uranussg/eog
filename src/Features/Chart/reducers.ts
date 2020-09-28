import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Labels = {
  labels: string[];

};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  labels: ['']
};


const slice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    weatherDataRecevied: (state, action: PayloadAction<Labels) => {
      const {labels} = action.payload
      state.labels = labels;

    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

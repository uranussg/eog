import { reducer as weatherReducer } from '../Features/Weather/reducer';
import {reducer as labelReducer} from '../Features/Label/reducer'

export default {
  weather: weatherReducer,
  labels: labelReducer
};

import { reducer as weatherReducer } from '../Features/Weather/reducer';
import {reducer as labelReducer} from '../Features/Label/reducer';
import {reducer as dataReducer} from '../Features/Chart/reducer';
import {reducer as beatReducer} from '../Features/HeartBeat/reducer'

export default {
  weather: weatherReducer,
  labels: labelReducer,
  data: dataReducer,
  heatBeat: beatReducer
};

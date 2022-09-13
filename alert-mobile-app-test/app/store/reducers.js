import { combineReducers } from 'redux';
import appReducer from 'containers/App/reducer';
import sensorDetailReducer from 'containers/DetailsScreen/reducer';
import sensorReducer from 'containers/SensorsScreen/reducer';
import homeReducer from 'containers/HomeScreen/reducer';

export const createReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  sensors: sensorReducer,
  sensor: sensorDetailReducer,
});

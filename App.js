import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import WeatherScreen from './src/screens/WeatherScreen';

const App = () => {
  return (
    <Provider store={store}>
      <WeatherScreen />
    </Provider>
  );
};

export default App;

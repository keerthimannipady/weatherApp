import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '55250e4a6bfc0b193870a03cb8b69112';

// Example coordinates for London
const latitude = '51.5074';
const longitude = '-0.1278';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      // Filter to get weather data for the next 5 days
      const filteredData = response.data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000).getDate();
        const currentDate = new Date().getDate();
        return forecastDate !== currentDate && forecastDate > currentDate;
      });
      return filteredData;
    } catch (error) {
      throw Error(`Error fetching weather: ${error}`);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    loading: false,
    weather: [],
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = ''; // Clear error state on new fetch request
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
        state.error = ''; // Clear error state on successful fetch
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.weather = [];
        state.error = action.error.message; // Set error state on fetch failure
      });
  },
});

export default weatherSlice.reducer;

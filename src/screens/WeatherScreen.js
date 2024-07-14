import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../reducers/weatherSlice';
import WeatherList from '../components/WeatherList';

const WeatherScreen = () => {
  const dispatch = useDispatch();
  const { weather, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <WeatherList weather={weather} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default WeatherScreen;

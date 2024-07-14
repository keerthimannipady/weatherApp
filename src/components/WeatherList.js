import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherList = ({ weather }) => {
  // Function to group forecasts by day
  const groupForecastsByDay = () => {
    const groupedForecasts = {};
    
    weather.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      
      if (!groupedForecasts[date]) {
        groupedForecasts[date] = forecast;
      }
    });

    const groupedForecastsArray = Object.keys(groupedForecasts).map(date => groupedForecasts[date]);
    
    return groupedForecastsArray;
  };

  // Group forecasts by day
  const groupedForecasts = groupForecastsByDay();

  return (
    <View style={styles.container}>
      {groupedForecasts.map((forecast, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.date}>{new Date(forecast.dt * 1000).toDateString()}</Text>
          <Text style={styles.temp}>{forecast.main.temp} °C</Text>
          <Text style={styles.desc}>{forecast.weather[0].description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical:80,
    borderRadius:20,
    backgroundColor: 'orange',  
  },
  item: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#ffffff',  
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', 
  },
  temp: {
    fontSize: 16,
    marginBottom: 3,
    color: '#666666',  
  },
  desc: {
    fontSize: 14,
    color: '#888888', 
  },
});

export default WeatherList;

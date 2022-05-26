import React from 'react';
import AppContainer from './routes';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <AppContainer />
  );
}

import { ThemeProvider } from 'styled-components';
import { SafeAreaView, StatusBar } from 'react-native';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

import theme from './src/theme/index';

import { Loading } from '@components/Loading';

import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_600 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </SafeAreaView>
    </ThemeProvider>
  );
}

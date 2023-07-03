/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const handleLoadStart = () => {
      setIsLoading(true);
      setProgress(0);
    };

    const handleLoadEnd = () => {
      setIsLoading(false);
      setProgress(100);
    };

    const handleLoadProgress = ({ nativeEvent }) => {
      const newProgress = nativeEvent.progress * 100;
      setProgress(newProgress);
    };

    return (
      <View style={styles.container}>
        {isLoading && (
            <Progress.Bar progress={progress} width={320}/>
        )}

        <WebView
          source={{ uri: 'https://www.parrotias.com/' }}
          style={styles.webView}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onLoadProgress={handleLoadProgress}
        />
      </View>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
    width: '100%',
  },
});

export default App;

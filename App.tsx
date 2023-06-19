/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { View, Platform, Alert, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';


const handleLongPress = async () => {
  try {
    const response = await webViewRef.current.injectJavaScript(`
      document.addEventListener('message', function(event) {
        window.ReactNativeWebView.postMessage(event.target.src);
      });
    `);
    const imageUrl = response[0];
    if (imageUrl) {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/image.jpg`;
      const options = {
        fromUrl: imageUrl,
        toFile: downloadDest,
      };
      const { jobId } = RNFS.downloadFile(options);
      jobId.then(() => {
        Alert.alert('Image saved successfully.');
      }).catch((error) => {
        Alert.alert('Failed to save image.');
      });
    }
  } catch (error) {
    Alert.alert('Error occurred while saving image.');
  }
};

function App(): JSX.Element {
  return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: 'https://www.parrotias.com/' }}
            style={{ flex: 1 }} />
        </View>

//         <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => {
//             if (nativeEvent.state === State.ACTIVE) {
//                 handleLongPress();
//             }
//         }}>
//             <View style= {{ flex: 1 }}>
//                 <WebView
//                     source={{ uri: 'https://www.parrotias.com/' }}
//                     style={{ flex: 1 }}/>
//             </View>
//         </LongPressGestureHandler>
  );
}

export default App;

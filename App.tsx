import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { Camera } from 'expo-camera';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [position, setPosition] = useState({ x: width / 4, y: height / 3 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => {
      setPosition({ x: g.moveX - 100, y: g.moveY - 100 });
    },
  });

  if (!permission?.granted) return <View />;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type="front" />

      <Image
        source={require('./assets/shirt.png')}
        style={[
          styles.shirt,
          {
            left: position.x,
            top: position.y,
            transform: [{ scale }],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  shirt: {
    position: 'absolute',
    width: 200,
    height: 250,
    resizeMode: 'contain',
    opacity: 0.9,
  },
});

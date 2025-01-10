import React, { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photos, setPhotos] = useState<string[]>([]); 
  const [camera, setCamera] = useState<any>(null); 

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Function to take a photo
  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhotos((prevPhotos) => [photo.uri, ...prevPhotos]); 
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={facing} ref={(ref) => setCamera(ref)}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <Icon name="rotate-ccw" size={40} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.takePictureButton} onPress={takePhoto}>
          <Text style={styles.text}></Text>
        </TouchableOpacity>
      </CameraView>
      
      <View style={styles.photosContainer}>
        {photos.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
    justifyContent: 'space-between',
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.94)',
    padding: 12,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  takePictureButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 70,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'rgb(0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: 1,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
});

// // import { Image, StyleSheet, Platform } from 'react-native';

// import { MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>Welcome to Moment App</Text>
      
//       <View style={styles.cameraButtonContainer}>
//         <TouchableOpacity style={styles.cameraButton} onPress={() => router.push('/(tabs)/camera')}>
//           <MaterialIcons name="camera-alt" size={40} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.cameraButtonText}>Capture the moment</Text>
//       </View>
//     </View>
//   );
// }

// // Add to styles:
// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   backgroundColor: '#fff',
//   justifyContent: 'center',
// },
// cameraButtonContainer: {
//   alignItems: 'center',
//   marginTop: 50,
// },
// cameraButton: {
//   width: 100,
//   height: 100,
//   borderRadius: 50,
//   backgroundColor: '#6a1b9a',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginBottom: 20,
// },
// cameraButtonText: {
//   color: 'white',
//   fontSize: 18,
// },
// screenTitle: {
//   fontSize: 28,
//   fontWeight: 'bold',
//   textAlign: 'center',
//   marginTop: 40,
//   marginBottom: 20,
//   color: '#333',
// },
// });

// import { MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   ImageBackground,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// const { width, height } = Dimensions.get('window');

// export default function HomeScreen() {
//   return (
//     <ImageBackground 
//       source={require('../../assets/images/moment_background.jpg')}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <StatusBar barStyle="light-content" />
      
//       {/* Dark overlay for better text readability */}
//       <View style={styles.overlay} />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.headerButton}>
//           <MaterialIcons name="menu" size={24} color="rgba(255,255,255,0.9)" />
//         </TouchableOpacity>
        
//         <View style={styles.titleContainer}>
//           <Text style={styles.appTitle}>MOMENT</Text>
//         </View>
        
//         <TouchableOpacity style={styles.headerButton}>
//           <MaterialIcons name="settings" size={24} color="rgba(255,255,255,0.9)" />
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <View style={styles.mainContent}>
//         <View style={styles.textContainer}>
//           <Text style={styles.mainTitle}>Capture</Text>
//           <Text style={styles.subTitle}>Your Story</Text>
//           <Text style={styles.description}>
//             Every moment deserves to be remembered with timeless charm
//           </Text>
//         </View>

//         {/* Camera Button */}
//         <View style={styles.cameraButtonContainer}>
//           <TouchableOpacity 
//             style={styles.cameraButton} 
//             // onPress={() => router.push('/(tabs)/camera')}
//             onPress={() => router.push({
//               pathname: "/(tabs)/camera",
//             })}
//             activeOpacity={0.8}
//           >
//             <MaterialIcons name="camera-alt" size={40} color="#8B4513" />
//           </TouchableOpacity>
          
//           {/* Decorative ring */}
//           <View style={styles.decorativeRing} />
//         </View>

//         <Text style={styles.cameraButtonText}>Tap to capture a moment</Text>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: width,
//     height: height,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   headerButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     alignItems: 'center',
//   },
//   appTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '400',
//     letterSpacing: 3,
//     fontFamily: 'serif',
//   },
//   mainContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//   },
//   textContainer: {
//     alignItems: 'center',
//     marginBottom: 48,
//   },
//   mainTitle: {
//     color: 'white',
//     fontSize: 36,
//     fontWeight: '300',
//     letterSpacing: 2,
//     fontFamily: 'serif',
//     marginBottom: 8,
//   },
//   subTitle: {
//     color: 'white',
//     fontSize: 28,
//     fontWeight: '300',
//     letterSpacing: 2,
//     fontFamily: 'serif',
//     marginBottom: 16,
//   },
//   description: {
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: 14,
//     textAlign: 'center',
//     letterSpacing: 1,
//     lineHeight: 20,
//     maxWidth: 280,
//   },
//   cameraButtonContainer: {
//     position: 'relative',
//     marginBottom: 32,
//   },
//   cameraButton: {
//     width: 96,
//     height: 96,
//     borderRadius: 48,
//     backgroundColor: 'rgba(245,245,220,0.9)', // Cream color with transparency
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: 'rgba(139,69,19,0.5)', // Brown border
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   decorativeRing: {
//     position: 'absolute',
//     top: -2,
//     left: -2,
//     right: -2,
//     bottom: -2,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   cameraButtonText: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//     letterSpacing: 1,
//     textAlign: 'center',
//   },
// });

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ImageBackground 
      source={require('../../assets/images/moment_background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      
      {/* Dark overlay - now ignores touches */}
      <View style={styles.overlay} pointerEvents="none" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="menu" size={24} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity> */}
        
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>MOMENT</Text>
        </View>
        
        {/* <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity> */}
      </View>

      {/* Main Content - now has higher z-index */}
      <View style={styles.mainContent}>
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Capture</Text>
          <Text style={styles.subTitle}>Your Moment</Text>
          <Text style={styles.description}>
            Every moment deserves to be remembered with timeless charm
          </Text>
        </View>

        {/* Camera Button */}
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={() => router.push('/(tabs)/camera')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="camera-alt" size={40} color="#8B4513" />
            {/* Decorative ring moved inside button */}
            <View style={styles.decorativeRing} />
          </TouchableOpacity>
        </View>

        <Text style={styles.cameraButtonText}>Tap to capture a moment</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 10, // Ensure header stays above overlay
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 3,
    fontFamily: 'serif',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 10, // Ensure content stays above overlay
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  mainTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: '300',
    letterSpacing: 2,
    fontFamily: 'serif',
    marginBottom: 8,
  },
  subTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 2,
    fontFamily: 'serif',
    marginBottom: 16,
  },
  description: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: 280,
  },
  cameraButtonContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  cameraButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(245,245,220,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(139,69,19,0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  decorativeRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    pointerEvents: 'none', // Ensure ring doesn't block touches
  },
  cameraButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
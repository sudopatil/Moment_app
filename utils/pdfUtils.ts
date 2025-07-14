// import * as Print from 'expo-print';
// import * as FileSystem from 'expo-file-system';
// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';
// import { Alert, Platform } from 'react-native';
// import * as IntentLauncher from 'expo-intent-launcher';

// // Save photos to gallery
// export const savePhotosToGallery = async (photos: string[]) => {
//   try {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
    
//     if (status !== 'granted') {
//       Alert.alert(
//         'Permission Required',
//         'Please allow access to your photos to save images'
//       );
//       return false;
//     }

//     for (const uri of photos) {
//       await MediaLibrary.createAssetAsync(uri);
//     }
    
//     return true;
//   } catch (error) {
//     console.error('Error saving photos:', error);
//     return false;
//   }
// };

// // Save PDF to device storage
// export const savePDFToDevice = async (pdfUri: string) => {
//   try {
//     if (Platform.OS === 'android') {
//       // On Android, we need to request external storage permissions
//       const { status } = await MediaLibrary.requestPermissionsAsync();
      
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please allow storage access to save the PDF'
//         );
//         return false;
//       }

//       // For Android, we save to public directory
//       const publicDir = FileSystem.documentDirectory + '../Download/';
//       const fileName = `memory_${Date.now()}.pdf`;
//       const newUri = publicDir + fileName;
      
//       // Ensure directory exists
//       await FileSystem.makeDirectoryAsync(publicDir, { intermediates: true });
//       await FileSystem.copyAsync({ from: pdfUri, to: newUri });
      
//       // Trigger media scan
//       await IntentLauncher.startActivityAsync('android.intent.action.MEDIA_SCANNER_SCAN_FILE', {
//         data: newUri,
//       });
      
//       return true;
//     } else {
//       // On iOS, we use the media library
//       const { status } = await MediaLibrary.requestPermissionsAsync();
      
//       if (status !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please allow access to your photos to save the PDF'
//         );
//         return false;
//       }

//       const asset = await MediaLibrary.createAssetAsync(pdfUri);
//       await MediaLibrary.createAlbumAsync('Moment App', asset, false);
//       return true;
//     }
//   } catch (error) {
//     console.error('Error saving PDF:', error);
//     return false;
//   }
// };

// export const generateMemoryPDF = async (photos: string[], message: string) => {
//   // Create HTML with vertically stacked framed photos
//   const framedPhotos = photos.map(uri => `
//     <div style="
//       border: 10px solid #8B4513; 
//       padding: 5px; 
//       margin: 20px 0;
//       border-radius: 5px;
//       box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//     ">
//       <img src="${uri}" style="width: 100%;" />
//     </div>
//   `).join('');

//   const html = `
//     <html>
//       <head>
//         <style>
//           body { 
//             font-family: Arial, sans-serif; 
//             padding: 20px;
//             background-color: #f5f5f5;
//           }
//           .memory-title {
//             text-align: center; 
//             color: #6a1b9a;
//             margin-bottom: 30px;
//             font-size: 24px;
//             font-weight: bold;
//           }
//         </style>
//       </head>
//       <body>
//         <h1 class="memory-title">${message || 'My Memory'}</h1>
//         ${framedPhotos}
//       </body>
//     </html>
//   `;

//   // Generate PDF
//   const { uri } = await Print.printToFileAsync({ html });
  
//   // Save to documents
//   const newUri = FileSystem.documentDirectory + 'memory.pdf';
//   await FileSystem.copyAsync({ from: uri, to: newUri });
  
//   return newUri;
// };

// export const sharePDF = async (pdfUri: string) => {
//   await shareAsync(pdfUri, {
//     dialogTitle: 'Share Your Memory',
//     UTI: 'com.adobe.pdf'
//   });
// };

import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';

export const savePhotosToGallery = async (photos: string[]) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photos to save images'
      );
      return false;
    }

    for (const uri of photos) {
      await MediaLibrary.createAssetAsync(uri);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving photos:', error);
    return false;
  }
};

export const savePDFToDevice = async (pdfUri: string) => {
  try {
    if (Platform.OS === 'android') {
      // Use SAF (Storage Access Framework) to save to Downloads
      const permissions = await MediaLibrary.requestPermissionsAsync();
      if (!permissions.granted) return false;
      
      const asset = await MediaLibrary.createAssetAsync(pdfUri);
      await MediaLibrary.createAlbumAsync('Moment App', asset, false);
      return true;
    } else {
      // iOS: Use MediaLibrary
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photos to save the PDF'
        );
        return false;
      }

      const asset = await MediaLibrary.createAssetAsync(pdfUri);
      await MediaLibrary.createAlbumAsync('Moment App', asset, false);
      return true;
    }
  } catch (error) {
    console.error('Error saving PDF:', error);
    
    // Fallback to sharing for Android
    if (Platform.OS === 'android') {
      Alert.alert(
        'Save to Downloads',
        'Please use the "Share" button to save the PDF to your Downloads folder',
        [{ text: 'OK' }]
      );
    }
    
    return false;
  }
};

export const generateMemoryPDF = async (photos: string[], message: string) => {
  // Create HTML with vertically stacked framed photos
  const framedPhotos = photos.map(uri => `
    <div style="
      border: 10px solid #8B4513; 
      padding: 5px; 
      margin: 20px 0;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    ">
      <img src="${uri}" style="width: 100%;" />
    </div>
  `).join('');

  const html = `
    <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px;
            background-color: #f5f5f5;
          }
          .memory-title {
            text-align: center; 
            color: #6a1b9a;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1 class="memory-title">${message || 'My Memory'}</h1>
        ${framedPhotos}
      </body>
    </html>
  `;

  // Generate PDF
  const { uri } = await Print.printToFileAsync({ html });
  
  // Return the generated URI directly
  return uri;
};

export const sharePDF = async (pdfUri: string) => {
  await shareAsync(pdfUri, {
    dialogTitle: 'Share Your Memory',
    UTI: 'com.adobe.pdf'
  });
};
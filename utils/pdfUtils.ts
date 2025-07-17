
// import { Asset } from 'expo-asset';
// import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
// import * as Print from 'expo-print';
// import { shareAsync } from 'expo-sharing';
// import { Alert, Platform } from 'react-native';
// import { PDFDocument, rgb } from 'pdf-lib';


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

// export const savePDFToDevice = async (pdfUri: string) => {
//   try {
//     if (Platform.OS === 'android') {
//       // Use SAF (Storage Access Framework) to save to Downloads
//       const permissions = await MediaLibrary.requestPermissionsAsync();
//       if (!permissions.granted) return false;
      
//       const asset = await MediaLibrary.createAssetAsync(pdfUri);
//       await MediaLibrary.createAlbumAsync('Moment App', asset, false);
//       return true;
//     } else {
//       // iOS: Use MediaLibrary
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
    
//     // Fallback to sharing for Android
//     if (Platform.OS === 'android') {
//       Alert.alert(
//         'Save to Downloads',
//         'Please use the "Share" button to save the PDF to your Downloads folder',
//         [{ text: 'OK' }]
//       );
//     }
    
//     return false;
//   }
// };

// export const generateMemoryPDF_A4Layout = async (photos: string[], message: string) => {
//   console.log('🟡 Starting PDF generation...');
//   console.log('📸 Photos:', photos);
//   console.log('✉️ Message:', message);

//   // Convert photos to base64
//   const base64Images = await Promise.all(
//     photos.map(async (uri, index) => {
//       try {
//         const base64 = await FileSystem.readAsStringAsync(uri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         return `data:image/jpeg;base64,${base64}`;
//       } catch (error) {
//         console.error(`❌ Failed to convert photo ${index + 1}:`, error);
//         return '';
//       }
//     })
//   );

//   // Load frame image - FIXED
//   let frameBase64 = '';
//   try {
//     // Load the frame asset
//     const frameAsset = require('@assets/images/Capture.PNG');
    
//     // Get the resolved asset source
//     const asset = Asset.fromModule(frameAsset);
//     await asset.downloadAsync();
    
//     if (asset.localUri) {
//       const frameData = await FileSystem.readAsStringAsync(asset.localUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       frameBase64 = `data:image/png;base64,${frameData}`;
//     } else {
//       console.error('❌ Frame asset has no local URI');
//     }
//   } catch (error) {
//     console.error('❌ Failed to load frame image:', error);
//   }

//   // Define photo grid positions
//   const photoLayouts = [
//     // 1 photo
//     [{ x: 1.5, y: 2, w: 18, h: 20 }],
    
//     // 2 photos
//     [
//       { x: 1.5, y: 2, w: 8.5, h: 12 },
//       { x: 11, y: 2, w: 8.5, h: 12 }
//     ],
    
//     // 3 photos
//     [
//       { x: 1.5, y: 2, w: 8.5, h: 9 },
//       { x: 11, y: 2, w: 8.5, h: 9 },
//       { x: 6, y: 13, w: 9, h: 10 }
//     ],
    
//     // 4 photos
//     [
//       { x: 1.5, y: 2, w: 8.5, h: 9 },
//       { x: 11, y: 2, w: 8.5, h: 9 },
//       { x: 1.5, y: 13, w: 8.5, h: 9 },
//       { x: 11, y: 13, w: 8.5, h: 9 }
//     ],
    
//     // 5 photos
//     [
//       { x: 1.5, y: 2, w: 8.5, h: 8 },
//       { x: 11, y: 2, w: 8.5, h: 8 },
//       { x: 1.5, y: 11, w: 8.5, h: 8 },
//       { x: 11, y: 11, w: 8.5, h: 8 },
//       { x: 6, y: 20, w: 9, h: 7 }
//     ]
//   ];

//   // Get layout based on number of photos
//   const layout = photoLayouts[Math.min(photos.length - 1, 4)] || [];
//   const messageY = photos.length === 5 ? 27.5 : 25;

//   const html = `
//     <html>
//     <head>
//       <style>
//         body {
//           width: 21cm;
//           height: 29.7cm;
//           margin: 0;
//           padding: 0;
//           position: relative;
//           background: white;
//           font-family: Arial, sans-serif;
//         }
//         .frame {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           z-index: 1;
//         }
//         .photo-container {
//           position: absolute;
//           overflow: hidden;
//           z-index: 2;
//           border: 1px solid rgba(0,0,0,0.1);
//           border-radius: 4px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }
//         .photo {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//         .message-box {
//           position: absolute;
//           top: ${messageY}cm;
//           left: 1.5cm;
//           width: 18cm;
//           min-height: 1.5cm;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           z-index: 3;
//           font-size: 16px;
//           color: #333;
//           padding: 0.5cm;
//           box-sizing: border-box;
//           white-space: pre-wrap;
//           background: rgba(255, 255, 255, 0.85);
//           border-radius: 6px;
//           border: 1px solid rgba(0,0,0,0.1);
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }
//       </style>
//     </head>
//     <body>
//       ${frameBase64 ? `<img src="${frameBase64}" class="frame" />` : ''}
      
//       ${layout.map((pos, index) => `
//         <div class="photo-container" 
//              style="left: ${pos.x}cm; top: ${pos.y}cm; width: ${pos.w}cm; height: ${pos.h}cm;">
//           <img src="${base64Images[index]}" class="photo" />
//         </div>
//       `).join('')}
      
//       <div class="message-box">
//         ${message || 'Your special message appears here'}
//       </div>
//     </body>
//     </html>
//   `;

//   const { uri } = await Print.printToFileAsync({ html });
//   console.log('✅ PDF generated at URI:', uri);
//   return uri;
// };

// // export const generateMemoryPDF_A4Layout = async (photos: string[], message: string) => {
// //   console.log('🟡 Starting PDF generation...');
// //   console.log('📸 Photos:', photos);
// //   console.log('✉️ Message:', message);

// //   const base64Images = await Promise.all(
// //     photos.map(async (uri, index) => {
// //       try {
// //         const base64 = await FileSystem.readAsStringAsync(uri, {
// //           encoding: FileSystem.EncodingType.Base64,
// //         });
// //         console.log(`✅ Photo ${index + 1} converted to base64:`, base64.slice(0, 100) + '...');
// //         return `data:image/jpeg;base64,${base64}`;
// //       } catch (error) {
// //         console.error(`❌ Failed to convert photo ${index + 1}:`, error);
// //         return null;
// //       }
// //     })
// //   );

// //   const boxes: string[][] = Array(3).fill(null).map(() => Array(2).fill(''));
// //   const placements = photos.length;

// //   for (let i = 0; i < Math.min(5, placements); i++) {
// //     const row = Math.floor(i / 2);
// //     const col = i % 2;
// //     boxes[row][col] = `<img src="${base64Images[i]}" class="photo" />`;
// //   }

// //   // Determine where the message goes
// //   let messageCell = '';
// //   if (placements === 1) messageCell = 'A2';
// //   else if (placements === 2) messageCell = 'A2+B2';
// //   else if (placements === 3) messageCell = 'B2';
// //   else if (placements === 4) messageCell = 'A3+B3';
// //   else if (placements === 5) messageCell = 'B3';

// //   console.log('🧩 Message cell target:', messageCell);

// //   const html = `
// //     <html>
// //     <head>
// //       <style>
// //         body {
// //           width: 21cm;
// //           height: 29.7cm;
// //           margin: 0;
// //           padding: 1cm;
// //           font-family: Arial, sans-serif;
// //           background: white;
// //           position: relative;
// //         }
// //         .grid {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           grid-template-rows: repeat(3, auto);
// //           gap: 0.5cm 1cm;
// //           height: 100%;
// //         }
// //         .cell {
// //           border: 2px solid #333;
// //           padding: 0.3cm;
// //           border-radius: 6px;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //         }
// //         .photo {
// //           max-width: 100%;
// //           max-height: 100%;
// //           object-fit: cover;
// //           aspect-ratio: 4 / 5;
// //         }
// //         .message {
// //           font-size: 16px;
// //           color: #444;
// //           text-align: center;
// //           white-space: pre-wrap;
// //         }
// //         .fold-line {
// //           position: absolute;
// //           top: 1cm;
// //           bottom: 1cm;
// //           left: 50%;
// //           width: 0;
// //           border-left: 2px dashed #999;
// //         }
// //       </style>
// //     </head>
// //     <body>
// //       <div class="fold-line"></div>
// //       <div class="grid">
// //         ${boxes.map((row, rowIndex) =>
// //           row.map((content, colIndex) => {
// //             const pos = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
// //             const span = (messageCell.includes('+') && messageCell.includes(pos)) ? 1 : 0;
// //             const isMsg = messageCell.includes(pos);
// //             return span && pos === messageCell.split('+')[0]
// //               ? `<div class="cell" style="grid-column: span 2;"><div class="message">${message}</div></div>`
// //               : isMsg && !span
// //                 ? `<div class="cell"><div class="message">${message}</div></div>`
// //                 : `<div class="cell">${content}</div>`;
// //           }).join('')
// //         ).join('')}
// //       </div>
// //     </body>
// //     </html>
// //   `;

// //   console.log('🖨️ Final HTML Preview (first 500 chars):\n', html.slice(0, 500), '...');

// //   const { uri } = await Print.printToFileAsync({ html });
// //   console.log('✅ PDF generated at URI:', uri);
// //   return uri;
// // };



// export const sharePDF = async (pdfUri: string) => {
//   await shareAsync(pdfUri, {
//     dialogTitle: 'Share Your Memory',
//     UTI: 'com.adobe.pdf'
//   });
// };

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { PDFDocument, rgb } from 'pdf-lib';
import { Alert, Platform } from 'react-native';

// Helper to convert cm to points (1cm = 28.35 points)
const cmToPoints = (cm: number) => cm * 28.35;

// Helper to convert base64 to Uint8Array
const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Polyfill for atob
const atob = (input: string) => {
  const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;

  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  }

  return output;
};

// Polyfill for btoa
const btoa = (str: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  
  for (let i = 0; i < str.length; i += 3) {
    const a = str.charCodeAt(i);
    const b = str.charCodeAt(i + 1);
    const c = str.charCodeAt(i + 2);
    
    const enc1 = a >> 2;
    const enc2 = ((a & 3) << 4) | (b >> 4);
    let enc3 = ((b & 15) << 2) | (c >> 6);
    let enc4 = c & 63;
    
    if (isNaN(b)) {
      enc3 = enc4 = 64;
    } else if (isNaN(c)) {
      enc4 = 64;
    }
    
    output = output +
      chars.charAt(enc1) + chars.charAt(enc2) +
      chars.charAt(enc3) + chars.charAt(enc4);
  }
  
  return output;
};

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
    const { status } = await MediaLibrary.requestPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to save the PDF file'
      );
      return false;
    }

    if (Platform.OS === 'android') {
      // Create album if needed
      let album = await MediaLibrary.getAlbumAsync('Moment App');
      if (!album) {
        album = await MediaLibrary.createAlbumAsync('Moment App', pdfUri, false);
      }
      
      // Save to album
      const asset = await MediaLibrary.createAssetAsync(pdfUri);
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      return true;
    } else {
      // iOS
      await MediaLibrary.createAssetAsync(pdfUri);
      return true;
    }
  } catch (error) {
    console.error('Error saving PDF:', error);
    return false;
  }
};

// Define layout type for TypeScript
type Layout = {
  [key: number]: { x: number; y: number; width: number; height: number }[];
};

export const generateMemoryPDF_A4Layout = async (photos: string[], message: string) => {
  console.log('🟡 Starting PDF generation with film-style layout...');
  
  // Create new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4: 21x29.7cm in points (72dpi)
  
  // Set light background color
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 595,
    height: 842,
    color: rgb(0.98, 0.98, 0.97),
  });
  
  // Define grid parameters
  const cellWidth = cmToPoints(5.6); // 5.6cm in points
  const cellHeight = cmToPoints(7);  // 7cm in points
  const gridWidth = cellWidth * 2;
  const gridHeight = cellHeight * 3;
  
  // Center the grid on the page
  const gridX = (595 - gridWidth) / 2;
  const gridY = (842 - gridHeight) / 2 + cmToPoints(1.5); // Slightly higher for footer space
  
  // Draw fold line (dashed)
  const foldX = gridX + cellWidth;
  page.drawLine({
    start: { x: foldX, y: gridY },
    end: { x: foldX, y: gridY + gridHeight },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
    dashArray: [3, 3],
  });
  
  // Draw grid borders
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const x = gridX + col * cellWidth;
      const y = gridY + (2 - row) * cellHeight; // Top to bottom
      
      page.drawRectangle({
        x,
        y,
        width: cellWidth,
        height: cellHeight,
        borderColor: rgb(0.85, 0.85, 0.85),
        borderWidth: 0.5,
      });
    }
  }
  
  // Define grid positions for photos and message
  const positions = {
    a1: { x: gridX, y: gridY + cellHeight * 2, width: cellWidth, height: cellHeight },
    b1: { x: gridX + cellWidth, y: gridY + cellHeight * 2, width: cellWidth, height: cellHeight },
    a2: { x: gridX, y: gridY + cellHeight, width: cellWidth, height: cellHeight },
    b2: { x: gridX + cellWidth, y: gridY + cellHeight, width: cellWidth, height: cellHeight },
    a3: { x: gridX, y: gridY, width: cellWidth, height: cellHeight },
    b3: { x: gridX + cellWidth, y: gridY, width: cellWidth, height: cellHeight },
  };
  
  // Determine which cells get photos and which get message
  const photoCells: string[] = [];
  let messageCell: string | string[] = '';
  let messageSpan = false;
  
  switch (photos.length) {
    case 1:
      photoCells.push('a1');
      messageCell = 'a2';
      break;
    case 2:
      photoCells.push('a1', 'b1');
      messageCell = ['a2', 'b2'];
      messageSpan = true;
      break;
    case 3:
      photoCells.push('a1', 'b1', 'a2');
      messageCell = 'b2';
      break;
    case 4:
      photoCells.push('a1', 'b1', 'a2', 'b2');
      messageCell = ['a3', 'b3'];
      messageSpan = true;
      break;
    case 5:
      photoCells.push('a1', 'b1', 'a2', 'b2', 'a3');
      messageCell = 'b3';
      break;
    default:
      // Default to 3 photos if more than 5
      photoCells.push('a1', 'b1', 'a2');
      messageCell = 'b2';
  }
  
  // Add photos to PDF
  for (let i = 0; i < Math.min(photos.length, 5); i++) {
    try {
      const photoUri = photos[i];
      const cell = photoCells[i];
      const position = positions[cell as keyof typeof positions];
      
      // Read image data
      const base64 = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      const bytes = base64ToUint8Array(base64);
      
      // Try to determine image type
      let image;
      try {
        image = await pdfDoc.embedPng(bytes);
      } catch {
        try {
          image = await pdfDoc.embedJpg(bytes);
        } catch (error) {
          console.error(`❌ Failed to embed photo ${i + 1}:`, error);
          continue;
        }
      }
      
      // Draw image with 5px padding inside cell
      const padding = 5;
      page.drawImage(image, {
        x: position.x + padding,
        y: position.y + padding,
        width: position.width - padding * 2,
        height: position.height - padding * 2,
      });
      
    } catch (error) {
      console.error(`❌ Failed to add photo ${i + 1}:`, error);
    }
  }
  
  // Add message
  if (message) {
    let messageX, messageY, messageWidth, messageHeight;
    
    if (messageSpan) {
      // Message spans two columns
      const cells = messageCell as string[];
      const pos1 = positions[cells[0] as keyof typeof positions];
      const pos2 = positions[cells[1] as keyof typeof positions];
      
      messageX = pos1.x + 10;
      messageY = pos1.y + 10;
      messageWidth = (pos1.width + pos2.width) - 20;
      messageHeight = pos1.height - 20;
    } else {
      // Single cell message
      const cell = messageCell as string;
      const position = positions[cell as keyof typeof positions];
      
      messageX = position.x + 10;
      messageY = position.y + 10;
      messageWidth = position.width - 20;
      messageHeight = position.height - 20;
    }
    
    page.drawText(message, {
      x: messageX,
      y: messageY,
      size: 12,
      color: rgb(0.2, 0.2, 0.2),
      maxWidth: messageWidth,
      lineHeight: 14,
    });
  }
  
  // Add footer text
  page.drawText('Fold here', {
    x: foldX - 25,
    y: gridY - 20,
    size: 10,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  page.drawText('memory by\nMoment app', {
    x: foldX + 5,
    y: gridY - 30,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
    lineHeight: 12,
  });
  
  // Add vintage watermark
  page.drawText('MOMENT', {
    x: 595 / 2 - 60,
    y: 842 / 2,
    size: 48,
    color: rgb(0.9, 0.9, 0.9),
    opacity: 0.05,
  });
  
  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const uri = `${FileSystem.documentDirectory}memory_${Date.now()}.pdf`;
  
  // Convert to base64 for saving
  let binaryString = '';
  for (let i = 0; i < pdfBytes.length; i++) {
    binaryString += String.fromCharCode(pdfBytes[i]);
  }
  const base64String = btoa(binaryString);
  
  await FileSystem.writeAsStringAsync(uri, base64String, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  console.log('✅ Film-style PDF saved at:', uri);
  return uri;
};

export const sharePDF = async (pdfUri: string) => {
  await shareAsync(pdfUri, {
    dialogTitle: 'Share Your Memory PDF',
    mimeType: 'application/pdf',
    UTI: 'com.adobe.pdf'
  });
};
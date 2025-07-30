

// import framebase64 from '@/assets/framebase64';
// import vintageGrainBase64 from '@/assets/vintageGrainBase64';
// import { Asset } from 'expo-asset';
// import * as FileSystem from 'expo-file-system';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as MediaLibrary from 'expo-media-library';
// import { shareAsync } from 'expo-sharing';
// import { PDFDocument, rgb } from 'pdf-lib';
// import { Alert, Platform } from 'react-native';

// import fontkit from '@pdf-lib/fontkit';


// // Helper to convert cm to points (1cm = 28.35 points)
// const cmToPoints = (cm: number) => cm * 28.35;

// // Optimized base64 to Uint8Array converter
// const base64ToUint8Array = (base64: string) => {
//   const binaryString = atob(base64);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes;
// };

// // Lightweight atob polyfill
// const atob = (input: string) => {
//   const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//   let output = '';
//   let chr1, chr2, chr3;
//   let enc1, enc2, enc3, enc4;
//   let i = 0;

//   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

//   while (i < input.length) {
//     enc1 = keyStr.indexOf(input.charAt(i++));
//     enc2 = keyStr.indexOf(input.charAt(i++));
//     enc3 = keyStr.indexOf(input.charAt(i++));
//     enc4 = keyStr.indexOf(input.charAt(i++));

//     chr1 = (enc1 << 2) | (enc2 >> 4);
//     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//     chr3 = ((enc3 & 3) << 6) | enc4;

//     output += String.fromCharCode(chr1);
//     if (enc3 !== 64) output += String.fromCharCode(chr2);
//     if (enc4 !== 64) output += String.fromCharCode(chr3);
//   }
//   return output;
// };

// // Lightweight btoa polyfill
// const btoa = (str: string) => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
//   let output = '';
  
//   for (let i = 0; i < str.length; i += 3) {
//     const a = str.charCodeAt(i);
//     const b = str.charCodeAt(i + 1);
//     const c = str.charCodeAt(i + 2);
    
//     const enc1 = a >> 2;
//     const enc2 = ((a & 3) << 4) | (b >> 4);
//     let enc3 = ((b & 15) << 2) | (c >> 6);
//     let enc4 = c & 63;
    
//     if (isNaN(b)) enc3 = enc4 = 64;
//     else if (isNaN(c)) enc4 = 64;
    
//     output += chars.charAt(enc1) + chars.charAt(enc2) +
//               chars.charAt(enc3) + chars.charAt(enc4);
//   }
//   return output;
// };

// // Resize images to optimal size for PDF
// const resizeImageForPDF = async (uri: string): Promise<string> => {
//   try {
//     // Target size for our 5.6cm x 7cm boxes at 300 DPI
//     const result = await ImageManipulator.manipulateAsync(
//       uri,
//       [{ resize: { width: 661 } }], // 5.6cm * 300 DPI / 2.54 cm/inch ≈ 661px
//       { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//     );
//     return result.uri;
//   } catch (error) {
//     console.warn('Failed to resize image, using original', error);
//     return uri;
//   }
// };

// export const savePhotosToGallery = async (photos: string[]) => {
//   try {
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Required', 'Please allow access to your photos to save images');
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
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Required', 'Please allow access to save the PDF file');
//       return false;
//     }

//     let asset;
//     if (Platform.OS === 'android') {
//       asset = await MediaLibrary.createAssetAsync(pdfUri);
//       let album = await MediaLibrary.getAlbumAsync('Moment App');
//       if (!album) {
//         album = await MediaLibrary.createAlbumAsync('Moment App', asset, false);
//       } else {
//         await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
//       }
//     } else {
//       asset = await MediaLibrary.createAssetAsync(pdfUri);
//     }
//     return !!asset;
//   } catch (error) {
//     console.error('Error saving PDF:', error);
//     return false;
//   }
// };

// export const sharePDF = async (pdfUri: string) => {
//   await shareAsync(pdfUri, {
//     dialogTitle: 'Share Your Memory PDF',
//     mimeType: 'application/pdf',
//     UTI: 'com.adobe.pdf'
//   });
// };


// export const generateMemoryPDF_A4Layout = async (
//   photos: string[], 
//   message: string, 
//   progressCallback?: (progress: number) => void
// ) => {
//   const startTime = Date.now();
//   console.log('🟡 Starting optimized PDF generation...');

//   if (progressCallback) progressCallback(0.1);
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([595, 842]);

//   page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(0.15, 0.1, 0.05), opacity: 0.06 });

//   const cellWidth = cmToPoints(5.6);
//   const cellHeight = cmToPoints(7);
//   const columnGap = 10;
//   const gridWidth = cellWidth * 2 + columnGap;
//   const gridHeight = cellHeight * 3;
//   const gridX = (595 - gridWidth) / 2;
//   const gridY = (842 - gridHeight) / 2 + cmToPoints(1.5);

//   const foldX = gridX + cellWidth + columnGap / 2;
//   page.drawLine({
//     start: { x: foldX, y: gridY },
//     end: { x: foldX, y: gridY + gridHeight },
//     thickness: 0.5,
//     color: rgb(0.7, 0.7, 0.7),
//     dashArray: [3, 3],
//   });

//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 2; col++) {
//       const x = gridX + col * (cellWidth + columnGap);
//       const y = gridY + (2 - row) * cellHeight;
//       page.drawRectangle({ x, y, width: cellWidth, height: cellHeight, borderColor: rgb(0.85, 0.85, 0.85), borderWidth: 0.5 });
//     }
//   }

//   const positions = {
//     a1: { x: gridX, y: gridY + cellHeight * 2, w: cellWidth, h: cellHeight },
//     b1: { x: gridX + cellWidth + columnGap, y: gridY + cellHeight * 2, w: cellWidth, h: cellHeight },
//     a2: { x: gridX, y: gridY + cellHeight, w: cellWidth, h: cellHeight },
//     b2: { x: gridX + cellWidth + columnGap, y: gridY + cellHeight, w: cellWidth, h: cellHeight },
//     a3: { x: gridX, y: gridY, w: cellWidth, h: cellHeight },
//     b3: { x: gridX + cellWidth + columnGap, y: gridY, w: cellWidth, h: cellHeight },
//   };

//   const photoCount = Math.min(photos.length, 5);
//   const photoCells: string[] = [];
//   let messageCell: string | string[] = '';
//   let messageSpan = false;

//   switch (photoCount) {
//     case 1: photoCells.push('a1'); messageCell = 'a2'; break;
//     case 2: photoCells.push('a1', 'b1'); messageCell = ['a2', 'b2']; messageSpan = true; break;
//     case 3: photoCells.push('a1', 'b1', 'a2'); messageCell = 'b2'; break;
//     case 4: photoCells.push('a1', 'b1', 'a2', 'b2'); messageCell = ['a3', 'b3']; messageSpan = true; break;
//     case 5: photoCells.push('a1', 'b1', 'a2', 'b2', 'a3'); messageCell = 'b3'; break;
//   }

//   if (progressCallback) progressCallback(0.2);
//   const resizeStart = Date.now();
//   const imagesToProcess = photos.slice(0, 5).map(uri => resizeImageForPDF(uri));
//   const resizedUris = await Promise.all(imagesToProcess);
//   console.log(`⏱️ Resized ${resizedUris.length} images in ${Date.now() - resizeStart}ms`);
//   if (progressCallback) progressCallback(0.3);

//   for (let i = 0; i < resizedUris.length; i++) {
//     try {
//       const uri = resizedUris[i];
//       const cell = photoCells[i];
//       if (!cell) continue;
//       const position = positions[cell as keyof typeof positions];
//       const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
//       const bytes = base64ToUint8Array(base64);

//       let image;
//       try {
//         image = await pdfDoc.embedJpg(bytes);
//       } catch {
//         image = await pdfDoc.embedPng(bytes);
//       }

//       const imgRatio = image.width / image.height;
//       const cellRatio = position.w / position.h;
//       let drawWidth, drawHeight, drawX, drawY;

//       if (imgRatio > cellRatio) {
//         drawWidth = position.w;
//         drawHeight = position.w / imgRatio;
//         drawX = position.x;
//         drawY = position.y + (position.h - drawHeight) / 2;
//       } else {
//         drawHeight = position.h;
//         drawWidth = position.h * imgRatio;
//         drawX = position.x + (position.w - drawWidth) / 2;
//         drawY = position.y;
//       }

//       page.drawImage(image, { x: drawX, y: drawY, width: drawWidth, height: drawHeight });
//       page.drawRectangle({ x: position.x, y: position.y, width: position.w, height: position.h, color: rgb(0.96, 0.90, 0.75), opacity: 0.2 });

//       if (vintageGrainBase64) {
//         const cleanGrainBase64 = vintageGrainBase64.replace(/^data:image\/png;base64,/, '');
//         const grainImageBytes = Uint8Array.from(atob(cleanGrainBase64), c => c.charCodeAt(0));
//         const grainImage = await pdfDoc.embedPng(grainImageBytes);
//         page.drawImage(grainImage, { x: position.x, y: position.y, width: position.w, height: position.h, opacity: 0.15 });
//       }

//       if (framebase64) {
//         const cleanFrameBase64 = framebase64.replace(/^data:image\/png;base64,/, '');
//         const frameImageBytes = Uint8Array.from(atob(cleanFrameBase64), c => c.charCodeAt(0));
//         const frameImage = await pdfDoc.embedPng(frameImageBytes);
//         page.drawImage(frameImage, { x: position.x, y: position.y - 5, width: position.w, height: position.h + 10 });

//       }

//       if (progressCallback) {
//         const currentProgress = 0.3 + ((i + 1) / resizedUris.length) * 0.5;
//         progressCallback(currentProgress);
//       }
//     } catch (error) {
//       console.error(`❌ Failed to process photo ${i + 1}:`, error);
//     }
//   }

//   if (message) {
//     const formatDate = (date: Date) => {
//       const day = date.getDate();
//       const suffix = (n: number) =>
//         n % 10 === 1 && n !== 11 ? 'st' :
//         n % 10 === 2 && n !== 12 ? 'nd' :
//         n % 10 === 3 && n !== 13 ? 'rd' : 'th';
//       const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//       return `${day}${suffix(day)} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//     };
//     const formattedDate = formatDate(new Date());

//     pdfDoc.registerFontkit(fontkit);
//     const asset = Asset.fromModule(require('@/assets/fonts/GreatVibes-Regular.ttf'));
//     await asset.downloadAsync();
//     const response = await fetch(asset.uri);
//     const fontBuffer = await response.arrayBuffer();
//     const font = await pdfDoc.embedFont(new Uint8Array(fontBuffer));

//     let messageX, messageY, messageWidth, position;
//     if (messageSpan) {
//       const cells = messageCell as string[];
//       const pos1 = positions[cells[0] as keyof typeof positions];
//       messageX = pos1.x + 10;
//       messageY = pos1.y + 10;
//       messageWidth = (pos1.w * 2) - 20;
//       position = pos1;
//     } else {
//       const cell = messageCell as string;
//       position = positions[cell as keyof typeof positions];
//       messageX = position.x + 10;
//       messageY = position.y + 10;
//       messageWidth = position.w - 20;
//     }

//     const fontSize = 16;
//     const lineHeight = fontSize * 1.5;

//     const splitMessageIntoLines = (text: string, font: any, size: number, maxWidth: number) => {
//       const words = text.split(' ');
//       const lines = [];
//       let line = '';
//       for (let i = 0; i < words.length; i++) {
//         const testLine = line ? line + ' ' + words[i] : words[i];
//         const width = font.widthOfTextAtSize(testLine, size);
//         if (width < maxWidth) {
//           line = testLine;
//         } else {
//           lines.push(line);
//           line = words[i];
//         }
//       }
//       if (line) lines.push(line);
//       return lines;
//     };

//     const lines = splitMessageIntoLines(message, font, fontSize, messageWidth);

//     lines.forEach((line, idx) => {
//       page.drawText(line, {
//         x: messageX,
//         y: messageY + position.h - 40 - idx * lineHeight,
//         size: fontSize,
//         font,
//         color: rgb(0.2, 0.2, 0.2),
//       });
//     });

//     const dateFontSize = 10;
//     const dateWidth = font.widthOfTextAtSize(formattedDate, dateFontSize);

//     page.drawText(formattedDate, {
//       x: messageX + messageWidth - dateWidth,
//       y: messageY + 5,
//       size: dateFontSize,
//       font,
//       color: rgb(0.4, 0.4, 0.4),
//     });
//   }

//   page.drawText('Fold here', { x: foldX - 25, y: gridY - 40, size: 10, color: rgb(0.5, 0.5, 0.5) });
//   page.drawText('Memory by...\nMoment app', { x: foldX + 40, y: gridY - 70, size: 10, color: rgb(0.3, 0.3, 0.3), lineHeight: 12 });

//   if (progressCallback) progressCallback(0.9);
//   const pdfBytes = await pdfDoc.save();
//   const uri = `${FileSystem.documentDirectory}Memory_${Date.now()}.pdf`;

//   let binaryString = '';
//   const chunkSize = 50000;
//   for (let i = 0; i < pdfBytes.length; i += chunkSize) {
//     const chunk = pdfBytes.subarray(i, i + chunkSize);
//     binaryString += String.fromCharCode.apply(null, chunk as any);
//   }

//   const base64String = btoa(binaryString);
//   await FileSystem.writeAsStringAsync(uri, base64String, { encoding: FileSystem.EncodingType.Base64 });

//   const duration = Date.now() - startTime;
//   console.log(`✅ PDF generated in ${duration}ms`);
//   if (progressCallback) progressCallback(1.0);
//   return uri;
// };




import framebase64 from '@/assets/framebase64';
import vintageGrainBase64 from '@/assets/vintageGrainBase64';
import fontkit from '@pdf-lib/fontkit';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { PDFDocument, rgb } from 'pdf-lib';
import { Alert, Platform } from 'react-native';

// Helper to convert cm to points (1cm = 28.35 points)
const cmToPoints = (cm: number) => cm * 28.35;

// Optimized base64 to Uint8Array converter
const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Resize images to optimal size for PDF
const resizeImageForPDF = async (uri: string): Promise<string> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 661 } }],
      { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  } catch (error) {
    console.warn('Failed to resize image, using original', error);
    return uri;
  }
};

export const savePhotosToGallery = async (photos: string[]) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please allow access to your photos to save images');
      return false;
    }

    const savePromises = photos.map(uri => MediaLibrary.createAssetAsync(uri));
    await Promise.all(savePromises);
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
      Alert.alert('Permission Required', 'Please allow access to save the PDF file');
      return false;
    }

    const asset = await MediaLibrary.createAssetAsync(pdfUri);
    if (Platform.OS === 'android') {
      let album = await MediaLibrary.getAlbumAsync('Moment App');
      if (!album) {
        album = await MediaLibrary.createAlbumAsync('Moment App', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    }
    return !!asset;
  } catch (error) {
    console.error('Error saving PDF:', error);
    return false;
  }
};

export const sharePDF = async (pdfUri: string) => {
  await shareAsync(pdfUri, {
    dialogTitle: 'Share Your Memory PDF',
    mimeType: 'application/pdf',
    UTI: 'com.adobe.pdf'
  });
};

export const generateMemoryPDF_A4Layout = async (
  photos: string[], 
  message: string, 
  progressCallback?: (progress: number) => void
) => {
  const startTime = Date.now();
  console.log('🟡 Starting optimized PDF generation...');
  
  // Create PDF document early
  const pdfDoc = await PDFDocument.create();
  if (progressCallback) progressCallback(0.05);

  // Pre-load all static assets in parallel
  const [fontAsset, grainImage, frameImage] = await Promise.all([
    (async () => {
      const asset = Asset.fromModule(require('@/assets/fonts/GreatVibes-Regular.ttf'));
      if (!asset.localUri) await asset.downloadAsync();
      return asset;
    })(),
    (async () => {
      if (!vintageGrainBase64) return null;
      const clean = vintageGrainBase64.replace(/^data:image\/png;base64,/, '');
      return pdfDoc.embedPng(base64ToUint8Array(clean));
    })(),
    (async () => {
      if (!framebase64) return null;
      const clean = framebase64.replace(/^data:image\/png;base64,/, '');
      return pdfDoc.embedPng(base64ToUint8Array(clean));
    })()
  ]);
  
  if (progressCallback) progressCallback(0.15);

  // Setup PDF page
  const page = pdfDoc.addPage([595, 842]);
  page.drawRectangle({ 
    x: 0, 
    y: 0, 
    width: 595, 
    height: 842, 
    color: rgb(0.15, 0.1, 0.05), 
    opacity: 0.06 
  });

  // Grid configuration
  const cellWidth = cmToPoints(5.6);
  const cellHeight = cmToPoints(7);
  const columnGap = 10;
  const gridWidth = cellWidth * 2 + columnGap;
  const gridHeight = cellHeight * 3;
  const gridX = (595 - gridWidth) / 2;
  const gridY = (842 - gridHeight) / 2 + cmToPoints(1.5);

  // Draw fold line
  const foldX = gridX + cellWidth + columnGap / 2;
  page.drawLine({
    start: { x: foldX, y: gridY },
    end: { x: foldX, y: gridY + gridHeight },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
    dashArray: [3, 3],
  });

  // Draw grid cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const x = gridX + col * (cellWidth + columnGap);
      const y = gridY + (2 - row) * cellHeight;
      page.drawRectangle({ 
        x, 
        y, 
        width: cellWidth, 
        height: cellHeight, 
        borderColor: rgb(0.85, 0.85, 0.85), 
        borderWidth: 0.5 
      });
    }
  }

  // Position mapping
  const positions = {
    a1: { x: gridX, y: gridY + cellHeight * 2, w: cellWidth, h: cellHeight },
    b1: { x: gridX + cellWidth + columnGap, y: gridY + cellHeight * 2, w: cellWidth, h: cellHeight },
    a2: { x: gridX, y: gridY + cellHeight, w: cellWidth, h: cellHeight },
    b2: { x: gridX + cellWidth + columnGap, y: gridY + cellHeight, w: cellWidth, h: cellHeight },
    a3: { x: gridX, y: gridY, w: cellWidth, h: cellHeight },
    b3: { x: gridX + cellWidth + columnGap, y: gridY, w: cellWidth, h: cellHeight },
  };

  // Photo placement logic
  const photoCount = Math.min(photos.length, 5);
  const photoCells: string[] = [];
  let messageCell: string | string[] = '';
  let messageSpan = false;

  switch (photoCount) {
    case 1: photoCells.push('a1'); messageCell = 'a2'; break;
    case 2: photoCells.push('a1', 'b1'); messageCell = ['a2', 'b2']; messageSpan = true; break;
    case 3: photoCells.push('a1', 'b1', 'a2'); messageCell = 'b2'; break;
    case 4: photoCells.push('a1', 'b1', 'a2', 'b2'); messageCell = ['a3', 'b3']; messageSpan = true; break;
    case 5: photoCells.push('a1', 'b1', 'a2', 'b2', 'a3'); messageCell = 'b3'; break;
  }

  // Parallel image processing
  const resizeStart = Date.now();
  const imageProcessing = photos.slice(0, 5).map(uri => 
    resizeImageForPDF(uri)
      .then(resizedUri => FileSystem.readAsStringAsync(resizedUri, {
        encoding: FileSystem.EncodingType.Base64
      }))
  );

  const imageBase64s = await Promise.all(imageProcessing);
  console.log(`⏱️ Resized ${imageBase64s.length} images in ${Date.now() - resizeStart}ms`);
  if (progressCallback) progressCallback(0.3);

  // Parallel image embedding
  const imageEmbedding = imageBase64s.map(base64 => {
    const bytes = base64ToUint8Array(base64);
    return Promise.any([
      pdfDoc.embedJpg(bytes),
      pdfDoc.embedPng(bytes)
    ]).catch(() => null);
  });

  const embeddedImages = await Promise.all(imageEmbedding);
  if (progressCallback) progressCallback(0.5);

  // Draw images to PDF
  for (let i = 0; i < embeddedImages.length; i++) {
    const image = embeddedImages[i];
    if (!image) continue;

    const cell = photoCells[i];
    const position = positions[cell as keyof typeof positions];
    
    // Calculate dimensions
    const imgRatio = image.width / image.height;
    const cellRatio = position.w / position.h;
    let drawWidth, drawHeight;
    
    if (imgRatio > cellRatio) {
      drawWidth = position.w;
      drawHeight = position.w / imgRatio;
    } else {
      drawHeight = position.h;
      drawWidth = position.h * imgRatio;
    }

    const drawX = position.x + (position.w - drawWidth) / 2;
    const drawY = position.y + (position.h - drawHeight) / 2;

    // Batch drawing operations
    page.drawImage(image, { x: drawX, y: drawY, width: drawWidth, height: drawHeight });
    page.drawRectangle({ 
      x: position.x, 
      y: position.y, 
      width: position.w, 
      height: position.h, 
      color: rgb(0.96, 0.90, 0.75), 
      opacity: 0.2 
    });

    if (grainImage) {
      page.drawImage(grainImage, { 
        x: position.x, 
        y: position.y, 
        width: position.w, 
        height: position.h, 
        opacity: 0.15 
      });
    }

    if (frameImage) {
      page.drawImage(frameImage, { 
        x: position.x, 
        y: position.y - 5, 
        width: position.w, 
        height: position.h + 10 
      });
    }

    // Update progress
    if (progressCallback) {
      const currentProgress = 0.5 + (0.4 * (i + 1) / embeddedImages.length);
      progressCallback(currentProgress);
    }
  }

  // Add message if exists
  if (message) {
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const suffix = (n: number) =>
        n % 10 === 1 && n !== 11 ? 'st' :
        n % 10 === 2 && n !== 12 ? 'nd' :
        n % 10 === 3 && n !== 13 ? 'rd' : 'th';
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${day}${suffix(day)} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    pdfDoc.registerFontkit(fontkit);
    const response = await fetch(fontAsset.localUri!);
    const fontBuffer = await response.arrayBuffer();
    const font = await pdfDoc.embedFont(new Uint8Array(fontBuffer));

    let messageX, messageY, messageWidth, position;
    if (messageSpan) {
      const cells = messageCell as string[];
      const pos1 = positions[cells[0] as keyof typeof positions];
      messageX = pos1.x + 10;
      messageY = pos1.y + 10;
      messageWidth = (pos1.w * 2) - 20;
      position = pos1;
    } else {
      const cell = messageCell as string;
      position = positions[cell as keyof typeof positions];
      messageX = position.x + 10;
      messageY = position.y + 10;
      messageWidth = position.w - 20;
    }

    const fontSize = 16;
    const lineHeight = fontSize * 1.5;
    const maxLines = Math.floor((position.h - 20) / lineHeight);
    let currentY = messageY + position.h - 40;
    
    // Simple line wrapping
    const words = message.split(' ');
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      
      if (testWidth <= messageWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          page.drawText(currentLine, {
            x: messageX,
            y: currentY,
            size: fontSize,
            font,
            color: rgb(0.2, 0.2, 0.2),
          });
          currentY -= lineHeight;
        }
        currentLine = word;
      }
      
      if (currentY < messageY) break;
    }
    
    if (currentLine && currentY >= messageY) {
      page.drawText(currentLine, {
        x: messageX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0.2, 0.2, 0.2),
      });
    }

    // Add date
    const formattedDate = formatDate(new Date());
    const dateFontSize = 10;
    const dateWidth = font.widthOfTextAtSize(formattedDate, dateFontSize);
    
    page.drawText(formattedDate, {
      x: messageX + messageWidth - dateWidth,
      y: messageY + 5,
      size: dateFontSize,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  // Add footer
  page.drawText('Fold here', { 
    x: foldX - 25, 
    y: gridY - 40, 
    size: 10, 
    color: rgb(0.5, 0.5, 0.5) 
  });
  
  page.drawText('Memory by...\nMoment app', { 
    x: foldX + 40, 
    y: gridY - 70, 
    size: 10, 
    color: rgb(0.3, 0.3, 0.3), 
    lineHeight: 12 
  });

  // Save PDF
  if (progressCallback) progressCallback(0.95);
  const pdfBytes = await pdfDoc.save();
  const uri = `${FileSystem.documentDirectory}Memory_${Date.now()}.pdf`;
  
  // FIXED: Safe base64 conversion without call stack overflow
  const chunkSize = 4000;
  let binaryString = '';
  for (let i = 0; i < pdfBytes.length; i += chunkSize) {
    const chunk = pdfBytes.slice(i, i + chunkSize);
    binaryString += String.fromCharCode.apply(null, chunk as any);
  }
  
  const base64String = btoa(binaryString);
  await FileSystem.writeAsStringAsync(uri, base64String, {
    encoding: FileSystem.EncodingType.Base64
  });

  const duration = Date.now() - startTime;
  console.log(`✅ PDF generated in ${duration}ms`);
  if (progressCallback) progressCallback(1.0);
  return uri;
};
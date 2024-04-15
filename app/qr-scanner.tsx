import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";
import { COLORS, Z_INDEX, icons } from "../constants";
import { CameraView, useCameraPermissions } from 'expo-camera/next'
import { useEffect, useState } from "react";
import { View } from "react-native";

function QrScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedResult, setScannedResult] = useState<string | null>(null);

    useEffect(() => {
        requestPermission();
    }, [])

    switch (permission?.granted) {
        case null:
            return <View style={{flex: 1, backgroundColor: COLORS.background}}/>
            break;
        case false:
            return <CustomText style={{backgroundColor: 'black'}}>No access to camera.</CustomText>
            break;
        case true: 
            return (
                <SafeAreaView style={{
                    flex: 1, 
                    zIndex: Z_INDEX.modal_1,
                    backgroundColor: COLORS.background
                }}>
                    <CustomText>{scannedResult}</CustomText>
                    <icons.qr 
                        height={300} 
                        width={300} 
                        fill={COLORS.accent + '90'}
                        style={{    
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: [{ translateX: -150 }, { translateY: -150 }],
                            width: 300,
                            height: 300,
                            zIndex: Z_INDEX.extra_1,
                        }}
                    />
                    <CameraView 
                        style={{flex: 1}}
                        facing={'back'}
                        barcodeScannerSettings={{
                            barcodeTypes: ['qr', 'ean13'],
                        
                        }}
                        onBarcodeScanned={({data}) => {
                            setScannedResult(data);
                        }}
                    >
                    </CameraView>
                </SafeAreaView>
            )
            break;
        default:
            return null;
            break;
    }
}

export default QrScanner;
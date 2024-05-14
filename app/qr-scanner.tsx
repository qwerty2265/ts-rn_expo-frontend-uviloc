import CustomText from "../components/CustomText";
import { COLORS, Z_INDEX, icons } from "../constants";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { getData } from "../utils/storage";
import { useDispatch, useSelector } from "../state/store";
import { addTracker } from "../slices/trackerSlice";

interface QrScannerProps {
    navigation: NavigationProp<any>;
}

function QrScanner({ navigation } : QrScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedResult, setScannedResult] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const userData = useSelector((state) => state.auth.userData);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
            const access_token = await getData('access_token');
            if (typeof access_token === 'string' || access_token === null) {
                setAccessToken(access_token);
            } else {
                console.error("Received non-string access token:", access_token);
            }
        };
        fetchToken();
    }, [userData]);

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        if (scannedResult === null || accessToken === null) return
        Alert.prompt(
            'Enter tracker name',
            'Tracker name',
            [
                {
                    text: 'Submit',
                    onPress: (trackerName) => {
                        dispatch(addTracker({ tracker_name: trackerName, access_token: accessToken, tracker_token: scannedResult }));
                    }
                }
            ]
        )
    }, [scannedResult])

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (data.startsWith("uviloc_tracker-") && data.length <= 33) {
            setScannedResult(data);
            navigation.navigate('home');
        }
    };

    switch (permission?.granted) {
        case null:
            return <View style={{flex: 1, backgroundColor: COLORS.background}}/>
            break;
        case false:
            return <CustomText style={{backgroundColor: 'black'}}>No access to camera.</CustomText>
            break;
        case true: 
            return (
                <View style={{
                    flex: 1, 
                    zIndex: Z_INDEX.modal_1,
                    backgroundColor: COLORS.background
                }}>
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
                        onBarcodeScanned={handleBarcodeScanned}
                    >
                    </CameraView>
                </View>
            )
            break;
        default:
            return null;
            break;
    }
}

export default QrScanner;
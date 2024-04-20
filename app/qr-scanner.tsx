import CustomText from "../components/CustomText";
import { COLORS, Z_INDEX, icons } from "../constants";
import { CameraView, useCameraPermissions } from 'expo-camera/next'
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { getData } from "../utils/storage";
import { UserData } from "../types/user";
import { useDispatch } from "../state/store";
import { addTracker } from "../slices/trackerSlice";

interface QrScannerProps {
    navigation: NavigationProp<any>;
}

function QrScanner({ navigation } : QrScannerProps) {
    const [permission, requestPermission] = useCameraPermissions();
    const [username, setUsername] = useState<string | null>(null);
    const [scannedResult, setScannedResult] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsername = async () => {
            const user_data = await getData('user_data'); // Тип unknown
            const typedUserData = user_data as UserData | undefined; // Приведение к типу UserData или undefined

            if (typedUserData && typedUserData.username) {
                setUsername(typedUserData.username);
            } 
            else {
                console.error("Invalid or missing user data:", typedUserData);
            }
        };

        fetchUsername();
        requestPermission();
    }, []);

    useEffect(() => {
        if (scannedResult === null || username === null) return
        Alert.prompt(
            'Enter tracker name',
            'Tracker name',
            [
                {
                    text: 'Submit',
                    onPress: (trackerName) => {
                        dispatch(addTracker({ tracker_name: trackerName, username, tracker_token: scannedResult }));
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
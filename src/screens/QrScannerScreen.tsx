import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

type QRData = {
    type: string;
    data: string;
};

export default function QrScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }: QRData) => {
        setScanned(true);
        Alert.alert(
            `Código ${type} escaneado`,
            `Datos: ${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }],
            { cancelable: false }
        );
    };

    if (!permission?.granted) {
        return (
            <View style={styles.center}>
                <Text>Se necesita permiso para usar la cámara.</Text>
                <Button title="Permitir" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

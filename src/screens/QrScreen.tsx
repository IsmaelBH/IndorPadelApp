import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';

const QrScreen = () => {
    const navigation = useNavigation<any>();
    const [scanCount, setScanCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSuccessfulScan = () => {
        const newCount = scanCount + 1;
        if (newCount === 10) {
            setModalVisible(true);
            setScanCount(0);
        } else {
            setScanCount(newCount);
        }
    };

    const renderStamps = () => {
        return Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={styles.stampSlot}>
                {i < scanCount ? (
                    <Image source={require('../../assets/logo.png')} style={styles.stampIcon} />
                ) : (
                    <View style={styles.emptySlot} />
                )}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('../../assets/videos/padel-loop.mp4')}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                isLooping
                shouldPlay
                isMuted
            />
            <View style={styles.overlay} />

            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.stampGrid}>
                {renderStamps()}
            </View>

            <View style={styles.iconRow}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('QrScannerScreen', { onSuccess: handleSuccessfulScan })}
                >
                    <Image source={require('../../assets/icons/qr.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>🎉 ¡Ganaste una cancha gratis! 🎾</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QrScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        transform: [{ rotate: '180deg' }],
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    logo: {
        width: 200,
        height: 200,
        zIndex: 2,
        marginBottom: 10,
    },
    stampGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        justifyContent: 'center',
        zIndex: 2,
        marginTop: 10,
        marginBottom: 30,
    },
    stampSlot: {
        width: '30%',
        aspectRatio: 1,
        margin: '1.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stampIcon: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    emptySlot: {
        width: '70%',
        height: '70%',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 60,
        zIndex: 2,
    },
    icon: {
        width: 36,
        height: 36,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

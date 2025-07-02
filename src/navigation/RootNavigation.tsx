import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './AppStackNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { ActivityIndicator, View } from 'react-native';

const RootNavigation = () => {
    const user = useSelector((state: RootState) => state.auth);

    const isCheckingAuth = user === null || user.idToken === null;
    const isLoggedIn = !!user.idToken;

    if (user === null) {
        // Evita que intente renderizar mientras el estado aún no carga (opcional según tu lógica)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStackNavigator /> : <AuthNavigator />}

        </NavigationContainer>
    );
};

export default RootNavigation;


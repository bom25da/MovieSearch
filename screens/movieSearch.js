import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const MovieSearch = ({ route }) => {

    const {link} = route.params;

    return (
        <WebView source={{uri:link}} />
    );
}

export default MovieSearch
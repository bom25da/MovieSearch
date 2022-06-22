import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RecentKeywords = ({navigation}) => {

    const [hisKeywords, setHisKeywords] = useState([]);

    async function getRecentKeywords() {
        // call api
        const res = await axios.get("http://125.128.10.133:8080/keywords/read")
            .catch(error => console.error('this is error' + error));
        
        setHisKeywords(res.data)

        console.log(hisKeywords)
    }

    const PrintKeywords = ({data}) => {
        return(
            <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate('main', {keywords: data.keywords})}>
                <Text style={styles.text}>{data.keywords}</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getRecentKeywords();
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>최근검색이력</Text>
            </View>
            <View style={styles.bottom}>
                {hisKeywords.map((data) => (
                    <PrintKeywords data={data} key={data.id} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    top: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
    },

    title: {
        fontSize: 20,
    },

    bottom: {
        flex: 0.9,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10
    },

    box: {
        borderWidth: 2,
        margin: 10,
        borderRadius: 5
    },

    text: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    }
})

export default RecentKeywords
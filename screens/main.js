import React, {useEffect, useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import "moment/locale/ko";

const Main = ({navigation, route}) => {
    const [keywords, setKeywords] = useState({text: '', inputText: ''});
    const [movieList, setMovieList] = useState([])
    const API_ID = 'dUPa2H00gMoXPiq7A0ID'
    const API_KEY = '0eeiCeiNzZ'
    //const [recentKeywords, setRecentKeywords] = useState(route.params);
    const recentKeywords = route.params;

    async function getMovieList(keywords, isSetHistory) {
        // call api
        const res = await axios.get("https://openapi.naver.com/v1/search/movie.json", {
                params: {
                    query: keywords,
                },
                headers: {
                    'X-Naver-Client-Id': API_ID,
                    'X-Naver-Client-Secret': API_KEY
                }
            })
            .catch(error => console.error('this is error' + error));
        
        const newData = {
            "keywords":keywords,
            "createDateTime":moment().format('YYYYMMDDhhmmss')
        }

        setMovieList([])
        setMovieList(res.data.items)

        console.log(newData)

        if(isSetHistory) {
            // input recent keywords
            axios.post("http://125.128.10.133:8080/keywords/create", newData)
                .then(res => console.log('success' + res))
                .catch(error => {
                    console.error('this is error' + error)});
                
        }
    }
    
    useEffect(() => {
        console.log(recentKeywords)

        if(recentKeywords !== undefined) {
            getMovieList(recentKeywords.keywords);

            setKeywords({text: recentKeywords.keywords, inputText: recentKeywords.keywords});
        }
    }, [recentKeywords])

    const renderItem = ({ item }) => {

        const imgList = {uri: item.image};
        //console.debug(imgList);

        return (
            <TouchableOpacity style={listStyles.container} onPress={() => navigation.navigate('movieSearch', {link: item.link})}>
                <View style={listStyles.imageContainer}>
                    <Image source={imgList} style={listStyles.image}></Image>
                </View>
                <View style={listStyles.text}>
                    <View>
                        <Text style={listStyles.font}>제목: {item.title.replace(/(<([^>]+)>)/ig,"")}</Text>
                    </View>
                    <View>
                        <Text style={listStyles.font}>출시: {item.pubDate}</Text>
                    </View>
                    <View>
                        <Text style={listStyles.font}>평점: {item.userRating}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return(
        <View style= {styles.container}>
            <View style= {styles.top}>
                <View style= {styles.top_text}>
                    <TextInput
                        value={keywords.text}
                        style={styles.textInput}
                        onChangeText={(text) => {setKeywords({inputText: text})}}
                    />
                </View>
                <View style= {styles.top_button}>
                    <TouchableOpacity style= {styles.button} onPress={() => getMovieList(keywords.inputText, true)}>
                        <Text>검색</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style= {styles.button} onPress={() => navigation.navigate('recentKeywords')}>
                        <Text>최근검색</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style= {styles.bottom}>
                <FlatList
                    data={movieList}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                    style={styles.flatList}>
                </FlatList>
            </View>
        </View>
    );
}

const listStyles = StyleSheet.create({
    container: {
        //flex: 1,
        height: 150,
        flexDirection: 'row',
    },

    imageContainer: {
        flex: 0.3,
        //backgroundColor: 'pink',
    },

    image: {
        flex: 1,
        margin: 10,
    },

    text: {
        flex: 0.7,
        justifyContent: 'center'
        //backgroundColor: 'yellow',
    },

    font: {
        fontSize: 18,
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,    
    },

    top: {
        flex: 0.1,
        flexDirection: 'row',
        //alignItems: 'center'
    },

    top_text: {
        flex: 0.6,
    },

    top_button: {
        flex: 0.4,
        justifyContent: 'center',
        flexDirection: 'row',   
    },

    bottom: {
        flex: 0.9,
    },

    textInput: {
        margin: 10,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1
    },

    button: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        width: 70,
        height: 40,
        backgroundColor: '#dcdcdc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    flatList: {
        flex: 1,
    }
})

export default Main;
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { getData, removeData, storeData } from '../../database/StoreData';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeParamList } from '../../types';

type IRoute = {
    "params": HomeParamList['EditNote'];
}

export default function AddNoteScreen() {
    const route = useRoute<RouteProp<IRoute, "params">>();
    const note = route.params.note;
    const index = route.params.index;

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const navigation = useNavigation();

    const [loading, setLoading] = useState<boolean>(false)

    const submitNote = async () => {
        setLoading(true)
        setTimeout(async () => {
            const data = {
                title: title,
                description: description,
                time: Date.now()
            }
            const noteList = await getData('noteList');
            if (noteList) {
                const json = JSON.parse(noteList);
                json[index] = data;
                storeData('noteList', JSON.stringify(json));
            } else {
                storeData('noteList', JSON.stringify([data]));
            }
            setTitle('');
            setDescription('');

            navigation.navigate("Recipes", {
                screen: "HomePage"
            }
            )
            setLoading(false)

        }, 1200)
    }
    useEffect(() => {
        setTitle(note.title);
        setDescription(note.description)
    }, []);
    
    return (
        <View style={styles.container}>
            <TextInput
                label='Recipe Name'
                autoComplete={false}
                mode={'flat'}
                style={styles.title}
                underlineColor={Colors.txt}
                activeUnderlineColor={Colors.btn}
                value={title}
                onChangeText={setTitle}
                theme={{
                    colors: {
                        text: Colors.txt,
                    }
                }}
            />
            <TextInput
                label=''
                autoComplete={false}
                mode={'outlined'}
                style={styles.desc}
                outlineColor={Colors.txt}
                activeOutlineColor={Colors.btn}
                multiline={true}
                value={description}
                onChangeText={setDescription}
                theme={{
                    colors: {
                        text: Colors.txt,
                    }
                }}
            />

            {title !== '' && description !== '' ?
                <Button
                    title="UPDATE RECIPE"
                    loading={loading}
                    
                    iconRight
                    iconContainerStyle={{ marginRight: 0 }}
                    titleStyle={{ fontWeight: '700' }}
                    buttonStyle={{
                        backgroundColor: 'rgba(90, 154, 230, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        
                    }}
                    containerStyle={{
                        width: Dimensions.get('screen').width * .6,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => {
                        submitNote();
                    }}
                />
                : null}


        </View>
    );
}

const width = Dimensions.get('screen').width - 70;
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#112B3C',
        paddingTop: 80,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'poppins-regular',
        height: 50,
        width,
        marginVertical: 10,
        backgroundColor: '#A0F6D2'
    },
    desc: {
        fontSize: 16,
        fontFamily: 'poppins-regular',
        height: 300,
        width,
        marginVertical: 10,
        fontWeight: 'bold',
        paddingVertical: 20,
        backgroundColor: '#A0F6D2'
    },
});

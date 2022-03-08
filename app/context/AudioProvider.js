import { Text, View, Alert } from 'react-native'
import React, { Component, createContext } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview'

export const AudioContext = createContext()
export default class AudioProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files!",
            [
                { text: 'I am ready', onPress: () => this.getPermission() },
                { text: 'cancel', onPress: () => this.permissionAlert() }
            ])
    }

    getAudioFiles = async () => {
        const { dataProvider, audioFiles } = this.state

        let media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        })

        media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first: media.totalCount
        })

        this.setState({ ...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]), audioFiles: [...audioFiles, ...media.assets] })
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if (permission.granted) {
            // Get All Audio Files
            this.getAudioFiles()
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({ ...this.state, permissionError: true })
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()
            if (status === 'denied' && canAskAgain) {
                // Alert user that access is needed
                this.permissionAlert()
            }

            if (status === 'granted') {
                // Get All Audio Files
                this.getAudioFiles()
            }

            if (status === 'denied' && !canAskAgain) {
                // Display Error 
                this.setState({ ...this.state, permissionError: true })
            }
        }
    }

    componentDidMount() {
        this.getPermission()
    }

    render() {
        const { audioFiles, dataProvider, permissionError } = this.state
        if (permissionError) return <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center'
            }}       >
            <Text style={{ fontSize: 25, textAlign: "center", color: 'red' }}>It Looks like you haven't accepted the permission</Text>
        </View>
        return <AudioContext.Provider value={{ audioFiles, dataProvider }}>
            {this.props.children}
        </AudioContext.Provider>
    }
}
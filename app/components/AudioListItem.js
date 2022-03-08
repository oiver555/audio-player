import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class AudioListItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View></View>
                </View>
                <View style={styles.rightContainer}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {}
})
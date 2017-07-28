'use strict';
import React, {Component} from "react"
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

export default class TitleBarComponent extends Component {
    render() {
        return <View style={styles.titleBarContainer}>
            <View style={styles.titleCenter}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            {this.props.isShow && <TouchableOpacity
                style={styles.btnLeft}
                activeOpacity={0.5}
                onPress={this.props.onPress}>
                <Image
                    style={styles.image}
                    source={require('../image/icon/back.png')}
                    reSizeMode={'cover'}
                />

            </TouchableOpacity>}
        </View>
    }
}
const styles = StyleSheet.create({
    titleBarContainer: {
        height: 56,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#96969A',
        backgroundColor: '#38ADFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnLeft: {
        width: 50,
        height: '100%',
    },
    image: {
        width: 50,
        marginTop: '30%',
        height: '40%',

    },
    titleCenter: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
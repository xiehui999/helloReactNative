import React, {Component} from "react"
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native'

export default class TitleBarComponent extends Component {
    render() {
        console.log(this.props)
        return <View style={styles.titleBarContainer}>
            {this.props.isShow && <TouchableHighlight
                style={styles.btnLeft}
                onPress={() => {

                }}>
                <Image
                    style={styles.image}
                    source={require('../image/icon/back.png')}
                    reSizeMode={'cover'}
                />

            </TouchableHighlight>}
            <View style={styles.titleCenter}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>

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
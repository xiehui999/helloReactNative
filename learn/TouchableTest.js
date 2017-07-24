import React, {Component} from "react"
import {
    TouchableNativeFeedback ,
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native'

export default class TouchableTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        return <View>
            <TouchableNativeFeedback
                //触摸开始
                onPressIn={()=>{console.log('onPressIn')}
                }
                //触摸结束
                onPressOut={()=>{console.log('onPressOut')}}
                onPress={() => {
                    console.log('onPress')
                    this.setState({count: this.state.count + 1})
                }}
                onLongPress={() => {
                    console.log('onLongPress')
                    Alert.alert('提示', '确认删除吗？', [
                        {
                            text: '取消', onPress: () => {
                        }, style: 'cancel'
                        },
                        {
                            text: '确定', onPress: () => {
                        }, style: 'cancel'
                        },
                    ])
                }}
            >
                <View style={styles.button}>
                    <Text>
                        我是TouchableWithoutFeedback，点击我{this.state.count}
                    </Text>
                </View>
            </TouchableNativeFeedback >
        </View>
    }
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2
    }
})
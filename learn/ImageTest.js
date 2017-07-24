import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'

export default class ImageTest extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <View>
            <Image
                style={styles.image}
                //静态图片资源
                 source={require('../reactlogo.png')}
                //网络图片
                // source={{uri:'http://preview.quanjing.com/cultura010/52li0046rf.jpg'}}
                //原生图片,android（res/mipmap-*）或ios资源目录(没有显示出来)
                // source={{uri:'ic_launcher'}}
                //cover,contain(显示全图)
                reSizeMode={'center'}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    image: {
        backgroundColor: '#ddd',
        width: 100,
        height: 100,
        tintColor:'#46B6F6'
    }
})
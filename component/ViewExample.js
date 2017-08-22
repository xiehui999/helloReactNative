import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native'

class ViewBorderStyle extends Component {
    state = {
        showBorder: true
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this._handlePress}
            >
                <View>
                    <View style={{borderWidth: 1, borderStyle: this.state.showBorder ? 'dashed' : null, padding: 5}}>
                        <Text>虚线(Dashed)边框样式</Text>
                    </View>
                    <View style={{
                        marginTop: 5,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderStyle: this.state.showBorder ? 'dotted' : null,
                        padding: 5
                    }}>
                        <Text>圆点(dotted)边框样式</Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        )

    }

    _handlePress = () => {
        this.setState({
            showBorder: !this.state.showBorder
        })
    }
}

//zIndex没有效果？
class ZIndexExample extends Component {
    state = {
        flipped: false
    }

    render() {
        const indices = this.state.flipped ? [-1, 0, 1, 2] : [2, 1, 0, -1];
        return (
            <TouchableWithoutFeedback onPress={this._handlePress}>
                <View>
                    <Text style={{paddingBottom: 10}}>点击翻转排序</Text>
                    <View
                        style={[styles.zIndex, {marginTop: 0, backgroundColor: '#e57373', zIndex: indices[0]}]}>
                        <Text>ZIndex {indices[0]}</Text>
                    </View>

                    <View style={[
                        styles.zIndex,
                        {marginLeft: 50, backgroundColor: '#FFF176', zIndex: indices[1]}
                    ]}>
                        <Text>ZIndex {indices[1]}</Text>
                    </View>

                    <View style={[
                        styles.zIndex,
                        {marginLeft: 100, backgroundColor: '#81C784', zIndex: indices[2]}
                    ]}>
                        <Text>ZIndex {indices[2]}</Text>
                    </View>

                    <View style={[
                        styles.zIndex,
                        {marginLeft: 150, backgroundColor: '#64B5F6', zIndex: indices[3]}
                    ]}>
                        <Text>ZIndex {indices[3]}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _handlePress = () => {
        this.setState({flipped: !this.state.flipped});
    };
}

export const title = '<View>';
export const description = '基本构建组件View,展示一些基本的样式.';

export const displayName = 'ViewExample';
export const examples = [
    {
        title: '背景颜色',
        render() {
            return (
                <View style={{backgroundColor: '#527fe4', padding: 5}}>
                    <Text style={{fontSize: 11}}>
                        蓝色(#527fe4)背景
                    </Text>
                </View>
            )
        }
    },
    {
        title: '边框',
        render() {
            return (
                <View style={{backgroundColor: '#527fe4', borderWidth: 5, padding: 5}}>
                    <Text style={{fontSize: 11}}>
                        背景蓝色，边框宽度5px
                    </Text>
                </View>
            )
        }
    },
    {
        title: 'padding和margin',
        render() {
            return (
                <View style={{borderColor: '#bb0000', borderWidth: 1}}>
                    <View style={[styles.box, {padding: 5}]}>
                        <Text style={{fontSize: 11}}>5px padding</Text>
                    </View>
                    <View style={[styles.box, {margin: 5}]}>
                        <Text style={{fontSize: 11}}>5px margin</Text>
                    </View>
                    <View style={[styles.box, {margin: 5, padding: 5, alignSelf: 'flex-start'}]}>
                        <Text style={{fontSize: 11}}>
                            5px margin 和 padding,
                        </Text>
                        <Text style={{fontSize: 11}}>
                            widthAutonomous=true
                        </Text>
                    </View>
                </View>
            )
        }
    },
    {
        title: '边框圆角半径',
        render() {
            return (
                <View style={{borderWidth: 1, borderRadius: 5, borderColor: 'red', padding: 5}}>
                    <Text style={{fontSize: 11}}>
                        设置圆角5px
                    </Text>
                </View>
            )
        }
    },
    {
        title: '边框样式',
        render() {
            return (
                <ViewBorderStyle/>
            )
        }
    }, {
        title: '用border画一个圆',
        render() {
            return <View
                style={{borderWidth: 1, width: 50, height: 50, borderRadius: 25}}
            />
        }
    },
    {
        title: 'Overflow',
        render() {
            return (
                <View
                    style={{flexDirection: 'row'}}>
                    <View style={{
                        width: 80,
                        height: 30,
                        marginBottom: 5,
                        marginRight: 10,
                        overflow: 'hidden',
                        borderWidth: 0.5
                    }}>
                        <View style={{width: 200, height: 200}}>
                            <Text>
                                Overflow hidden
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        width: 80,
                        height: 30,
                        marginBottom: 5,
                        marginRight: 10,
                        overflow: 'visible',
                        borderWidth: 0.5
                    }}>
                        <View style={{width: 200, height: 200}}>
                            <Text>
                                Overflow visible
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    },
    {
        title: '透明度属性opacity',
        render() {
            return (
                <View>
                    <View style={{opacity: 0}}><Text>Opacity 0</Text></View>
                    <View style={{opacity: 0.1}}><Text>Opacity 0.1</Text></View>
                    <View style={{opacity: 0.3}}><Text>Opacity 0.3</Text></View>
                    <View style={{opacity: 0.5}}><Text>Opacity 0.5</Text></View>
                    <View style={{opacity: 0.7}}><Text>Opacity 0.7</Text></View>
                    <View style={{opacity: 0.9}}><Text>Opacity 0.9</Text></View>
                    <View style={{opacity: 1}}><Text>Opacity 1</Text></View>
                </View>
            )
        }
    },
    {
        title: '属性zindex',
        render() {
            return (
                <ZIndexExample/>
            )
        }
    }, {
        title: '使用border属性绘制三角形和梯形',
        render() {
            return <View>
                <View style={styles.border}></View>
                <View style={styles.border2}></View>
            </View>
        }
    }
]
const styles = StyleSheet.create({
    box: {
        backgroundColor: '#527fe4',
        borderColor: '#000033',
        borderWidth: 1,
    },
    zIndex: {
        justifyContent: 'space-around',
        width: 100,
        height: 50,
        marginTop: -10,
    },
    border:{
        width:100,
        height:100,
        borderStyle: 'solid',
        borderTopWidth:50,
        borderBottomWidth:50,
        borderRightWidth:0,
        borderLeftWidth:100,
        borderLeftColor: 'red',
        borderTopColor:'transparent',
        borderBottomColor:'transparent'
    },
    border2:{
        width:100,
        height:100,
        borderTopWidth:60,
        borderBottomWidth:40,
        borderRightWidth:30,
        borderLeftWidth:30,
        borderBottomColor:'red',
        borderLeftColor: 'transparent',
        borderRightColor:'transparent',
        borderTopColor:'transparent',

    }
})
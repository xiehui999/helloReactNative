'use strict';
import React, {Component} from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native'
import TestPage from "./TestPage";
import TestBlock from "./TestBlock";

class PressText extends Component {
    state = {fontSize: 15, fontWeight: 'bold'}
    toggleWeight = () => {
        this.setState({
            fontWeight: this.state.fontWeight === 'bold' ? 'normal' : 'bold'
        });
    };

    increaseSize = () => {
        this.setState({
            fontSize: this.state.fontSize + 1
        });
    };

    render() {
        var curStyle = {fontWeight: this.state.fontWeight, fontSize: this.state.fontSize};
        return (
            <View>
                <Text style={curStyle}>
                    点击下面更改这个组件属性
                </Text>
                <Text>这个Text中嵌套了一个Text<Text style={curStyle}>我就是嵌套的Text</Text></Text>
                <Text onPress={this.toggleWeight}>更改Weight</Text>
                <Text onPress={this.increaseSize} suppressHighlighting={true}>
                    增加字体大小 (suppressHighlighting true)
                </Text>
            </View>
        )
    }
}

class TextExample extends Component {
    static title = '<Text>';
    static description = '基本组件Text样式.';

    render() {
        const platform = Platform.OS
        return (
            <TestPage title="<Text>">
                <TestBlock title="Wrap">
                    <Text>
                        如果文本过长，会自动换行显示
                        如果文本过长，会自动换行显示
                    </Text>
                </TestBlock>
                <TestBlock title="padding">
                    <Text style={{padding: 10}}>
                        通过属性padding设置内边距10
                    </Text>
                </TestBlock>
                {platform === 'android' ? <TestBlock title="android字体">
                    <Text style={{fontFamily: 'sans-serif'}}>
                        字体为Sans-Serif
                    </Text>
                    <Text style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                        字体为Sans-Serif Bold
                    </Text>
                    <Text style={{fontFamily: 'serif'}}>
                        字体为Serif
                    </Text>
                    <Text style={{fontFamily: 'serif', fontWeight: 'bold'}}>
                        字体为Serif Bold
                    </Text>
                    <Text style={{fontFamily: 'monospace'}}>
                        字体为Monospace
                    </Text>
                    <Text style={{fontFamily: 'monospace', fontWeight: 'bold'}}>
                        字体为 Monospace Bold (After 5.0)
                    </Text>
                </TestBlock> : null}
                {platform === 'android' ? <TestBlock title="android Material Design字体">
                        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontFamily: 'sans-serif'}}>
                                    字体Roboto Regular
                                </Text>
                                <Text style={{fontFamily: 'sans-serif', fontStyle: 'italic'}}>
                                    字体 Roboto Italic
                                </Text>
                                <Text style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                                    字体 Roboto Bold
                                </Text>
                                <Text style={{fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: 'bold'}}>
                                    字体 Roboto Bold Italic
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-light'}}>
                                    字体 Roboto Light
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-light', fontStyle: 'italic'}}>
                                    字体 Roboto Light Italic
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-thin'}}>
                                    字体 Roboto Thin (After 4.2)
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-thin', fontStyle: 'italic'}}>
                                    字体 Roboto Thin Italic (After 4.2)
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-condensed'}}>
                                    字体 Roboto Condensed
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-condensed', fontStyle: 'italic'}}>
                                    字体 Roboto Condensed Italic
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>
                                    字体 Roboto Condensed Bold
                                </Text>
                                <Text style={{
                                    fontFamily: 'sans-serif-condensed',
                                    fontStyle: 'italic',
                                    fontWeight: 'bold'
                                }}>
                                    字体 Roboto Condensed Bold Italic
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-medium'}}>
                                    字体 Roboto Medium (After 5.0)
                                </Text>
                                <Text style={{fontFamily: 'sans-serif-medium', fontStyle: 'italic'}}>
                                    字体 Roboto Medium Italic (After 5.0)
                                </Text>
                            </View>
                        </View>
                    </TestBlock> :
                    <TestBlock title="ios字体">
                        <Text style={{fontFamily: (Platform.isTVOS ? 'Times' : 'Cochin')}}>
                            Cochin
                        </Text>
                        <Text style={{fontFamily: (Platform.isTVOS ? 'Times' : 'Cochin'), fontWeight: 'bold'}}>
                            Cochin bold
                        </Text>
                        <Text style={{fontFamily: 'Helvetica'}}>
                            Helvetica
                        </Text>
                        <Text style={{fontFamily: 'Helvetica', fontWeight: 'bold'}}>
                            Helvetica bold
                        </Text>
                        <Text style={{fontFamily: (Platform.isTVOS ? 'Courier' : 'Verdana')}}>
                            Verdana
                        </Text>
                        <Text style={{fontFamily: (Platform.isTVOS ? 'Courier' : 'Verdana'), fontWeight: 'bold'}}>
                            Verdana bold
                        </Text>
                    </TestBlock>
                }
                <TestBlock title="字体大小">
                    <Text style={{fontSize: 23}}>
                        字体大小fontSize为23
                    </Text>
                    <Text style={{fontSize: 18}}>
                        字体大小fontSize为18
                    </Text>
                    <Text style={{fontSize: 14}}>
                        字体大小fontSize为14
                    </Text>
                    <Text style={{fontSize: 10}}>
                        字体大小fontSize为10
                    </Text>
                    <Text style={{fontSize: 6}}>
                        字体大小fontSize为6
                    </Text>
                </TestBlock>
                <TestBlock title="字体粗细">
                    <Text style={{fontWeight: 'bold'}}>
                        粗字体 bold,值也可以是'100', '200', '300', '400', '500', '600', '700', '800', '900'，值越大字体越粗
                    </Text>
                    <Text style={{fontWeight: 'normal', fontStyle: 'italic'}}>
                        正常字体粗细normal,fontStyle有normal,italic,此处是italic
                    </Text>
                </TestBlock>
                <TestBlock title="字体装饰属性textDecorationLine">
                    <Text style={{textDecorationLine: 'underline'}}>
                        textDecorationLine属性值为underline
                    </Text>
                    <Text style={{textDecorationLine: 'none'}}>
                        没有textDecoration
                    </Text>
                    <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                        textDecorationStyle为Solid line-through
                    </Text>
                    <Text style={{textDecorationLine: 'underline line-through'}}>
                        underline 和 line-through
                    </Text>
                    <Text>
                        Mixed text with <Text style={{textDecorationLine: 'underline'}}>underline</Text> and <Text
                        style={{textDecorationLine: 'line-through'}}>line-through</Text> text nodes
                    </Text>
                </TestBlock>
                <TestBlock title="text组件嵌套">
                    <Text style={{color: 'red'}} onPress={() => console.log('最外层')}>
                        (红色字体是
                        <Text style={{color: 'green'}} onPress={() => console.log('中间层')}>
                            （绿色字体
                            <Text style={{color: 'blue'}} onPress={() => console.log('最内层')}>
                                蓝色字体第三层
                            </Text>第二层）
                        </Text>第一层)
                    </Text>
                </TestBlock>
                <TestBlock title="文本对齐方式">
                    <Text>
                        默认的对齐方式（auto）
                    </Text>
                    <Text style={{textAlign: 'left'}}>
                        对齐方式left
                    </Text>
                    <Text style={{textAlign: 'center'}}>
                        对齐方式center
                    </Text>
                    <Text style={{textAlign: 'right'}}>
                        对齐方式right
                    </Text>
                    <Text style={{textAlign: 'justify'}}>
                        对齐方式justify
                    </Text>
                </TestBlock>
                {platform === 'ios' ? <TestBlock title="字间距Letter Spacing（ios）">
                    <Text style={{letterSpacing: 0}}>
                        letterSpacing = 0
                    </Text>
                    <Text style={{letterSpacing: 2, marginTop: 5}}>
                        letterSpacing = 2
                    </Text>
                    <Text style={{letterSpacing: 9, marginTop: 5}}>
                        letterSpacing = 9
                    </Text>
                    <Text style={{letterSpacing: -1, marginTop: 5}}>
                        letterSpacing = -1
                    </Text>
                </TestBlock> : null}
                <TestBlock title="设置行高">
                    <Text style={{lineHeight: 35}}>
                        设置的行高是35, 设置的行高是35 设置的行高是35， 设置的行高是35， 设置的行高是35， 设置的行高是35， 设置的行高是35
                    </Text>
                </TestBlock>
                <TestBlock title="Empty Text">
                    <Text/>
                </TestBlock>
                <TestBlock title="事件响应">
                    <PressText/>
                </TestBlock>
                <TestBlock title="设置行数(numberOfLines)">
                    <Text numberOfLines={1}>numberOfLines的值是1，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的</Text>
                    <Text numberOfLines={2} style={{marginTop: 10}}>numberOfLines的值是2,文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的</Text>
                    <Text style={{marginTop: 10}}>
                        [没设置numberOfLines]文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的</Text>
                </TestBlock>
                <TestBlock title="设置selectable">
                    <Text selectable>设置了selectable，当长按是可以可以选择复制粘贴操作</Text>
                </TestBlock>
                {platform === 'android' ?
                    <TestBlock title="设置selectionColor(android)">
                        <Text selectable selectionColor="orange">设置了selectionColor，设置选中高亮颜色</Text>
                    </TestBlock> : null}
                <TestBlock title="在Text中加入图片">
                    <Text>
                        在文本中个插入
                        <Image source={require('./file/bunny.png')}></Image>
                        图片
                    </Text>
                </TestBlock>
                <TestBlock title="文本阴影">
                    <Text style={{
                        fontSize: 20,
                        textShadowOffset: {width: 2, height: 2},
                        textShadowRadius: 1,
                        textShadowColor: '#00cccc'
                    }}>
                        我是文本
                    </Text>
                </TestBlock>
                <TestBlock title="Ellipsize mode">
                    <Text numberOfLines={1}>ellipsizeMode默认，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，</Text>
                    <Text numberOfLines={1} ellipsizeMode="head"
                          style={{marginTop: 10}}>ellipsizeMode="head",文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，</Text>
                    <Text numberOfLines={1} ellipsizeMode="middle"
                          style={{marginTop: 10}}>ellipsizeMode="middle",文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，</Text>
                    {platform == 'ios' ? <Text numberOfLines={1} ellipsizeMode="clip"
                                               style={{marginTop: 10}}>ellipsizeMode="clip",ios才有的属性.
                            文本很长很长的，文本很长很长的，文本很长很长的，文本很长很长的，</Text>
                        : null}
                </TestBlock>
                {platform == 'android' ? <TestBlock title="includeFontPadding属性（android）">
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.includeFontPaddingText}>
                                Ey
                            </Text>
                            <Text>Default</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={[styles.includeFontPaddingText, {includeFontPadding: false, marginBottom: 10}]}>
                                Ey
                            </Text>
                            <Text>includeFontPadding: false</Text>
                        </View>
                    </View>

                </TestBlock> : null}
            </TestPage>
        )
    }
}

const  styles=StyleSheet.create({
    includeFontPaddingText: {
        fontSize: 120,
        fontFamily: 'sans-serif',
        backgroundColor: '#EEEEEE',
        color: '#000000',
        textAlignVertical: 'center',
        alignSelf: 'center',
    }
})

module.exports = TextExample
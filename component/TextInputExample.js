/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/textinput.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform
} from 'react-native'

//当multiline=false时，为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效
class ToggleDefaultPaddingExample extends Component {
    constructor(props) {
        super(props);
        this.state = {hasPadding: false};
    }

    render() {
        return (
            <View>
                <TextInput style={this.state.hasPadding ? {padding: 0} : null}/>
                <Text onPress={() => this.setState({hasPadding: !this.state.hasPadding})}>
                    Toggle padding {this.state.hasPadding ? 'true' : 'false'}
                </Text>
            </View>
        );
    }
}

class TextEventsExample extends Component {
    state = {
        curText: 'No Event',
        prevText: 'No Event',
        prev2Text: 'No Event',
    }
    updateText = (text) => {
        console.log(text)
        this.setState((state) => {
            return {
                curText: text,
                prevText: state.curText,
                prev2Text: state.prevText,
            };
        });
    }
    //onFocus:获取焦点
    //onBlur :文本框市区焦点时候回调
    //onChange:文本发生改变时
    //onChangeText:和onChange功能一样，不同的是该函数直接当文本以参数形式传出
    //onEndEditing:当文本输入结束后调用此回调函数。
    //onSubmitEditing:此回调函数当软键盘的确定/提交按钮被按下的时候调用此函数。如果multiline={true}，此属性不可用
    render() {
        return (
            <View>
                <TextInput
                    autoCapitalize="none"
                    placeholder="输入文本查看事件"
                    autoCorrect={false}
                    onFocus={() => {
                        //获取焦点
                        this.updateText('onFocus')
                    }}
                    onBlur={() => this.updateText('onBlur')}
                    onChange={(event) => this.updateText('onChange  文本:' + event.nativeEvent.text)}
                    onChangeText={(text) => this.updateText('onChangeText  文本:' + text)}
                    onContentSizeChange={(event) => this.updateText('onContentSizeChange size:' + event.nativeEvent.contentSize)}
                    onEndEditing={(event) => this.updateText('onEndEditing 文本: ' + event.nativeEvent.text)}
                    onSubmitEditing={(event) => this.updateText(
                        'onSubmitEditing text: ' + event.nativeEvent.text
                    )}
                    style={styles.singleLine}
                />
                <Text style={styles.eventLabel}>
                    (current:{this.state.curText}){'\n'}
                    (prev: {this.state.prevText}){'\n'}
                    (prev2: {this.state.prev2Text})
                </Text>
            </View>
        )
    }

}

class AutoExpandingTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        };
    }

    render() {
        return (
            <TextInput
                {...this.props}
                multiline={true}
                onContentSizeChange={(event) => {
                    this.setState({height: event.nativeEvent.contentSize.height});
                }}
                style={[styles.default, {height: Math.min(200, Math.max(35, this.state.height))}]}
            />
        );
    }
}

class BlurOnSubmitExample extends React.Component {
    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

//如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，
//如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行
    render() {
        return (
            <View>
                <TextInput
                    ref="1"
                    style={styles.singleLine}
                    placeholder="blurOnSubmit = false"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('2')}
                />
                <TextInput
                    ref="2"
                    style={styles.singleLine}
                    keyboardType="email-address"
                    placeholder="blurOnSubmit = false"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('3')}
                />
                <TextInput
                    ref="3"
                    style={styles.singleLine}
                    keyboardType="url"
                    placeholder="blurOnSubmit = false"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('4')}
                />
                <TextInput
                    ref="4"
                    style={styles.singleLine}
                    keyboardType="numeric"
                    placeholder="blurOnSubmit = false"
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('5')}
                />
                <TextInput
                    ref="5"
                    style={styles.singleLine}
                    keyboardType="numbers-and-punctuation"
                    placeholder="blurOnSubmit = true"
                    returnKeyType="done"
                />
            </View>
        );
    }
}

export const title = '<TextInput>';
export const description = '单行以及多行输入框';
const platform = Platform.OS
export const examples = [
    {
        title: '自动聚焦',
        render() {
            return (
                <TextInput
                    autoFocus={true}
                    style={styles.singleLine}
                    accessibilityLabel="我是文本输入的可访问标签"
                />
            )
        }
    },
    {
        title: '自动校正（autoCorrect）',
        render() {
            return (
                <View>
                    <TextInput
                        autoCorrect={true}
                        style={styles.singleLine}
                        placeholder="有自动校正功能(默认值)"
                    />
                    <TextInput
                        autoCorrect={false}
                        style={styles.singleLine}
                        placeholder="没有自动校正功能"
                    />
                </View>
            )
        }
    },
    {
        title: '自动大写默写字符(键盘输入时)',
        render() {
            //autoCapitalize:控制TextInput是否要自动将特定字符切换为大写words:第一个单词,sentences:每一句第一个字母,characters：所以字符
            var autoCapitalizeTypes = [
                'none',
                'sentences',
                'words',
                'characters',
            ];
            var examples = autoCapitalizeTypes.map((type) => {
                return (
                    <TextInput
                        key={type}
                        autoCapitalize={type}
                        placeholder={'autoCapitalize: ' + type}
                        style={styles.singleLine}
                    />
                )
            })
            return <View>{examples}</View>;
        }
    },
    {
        title: '键盘类型,限制输入类型',
        render() {
            var keyboardTypes = [
                'default',
                'email-address',
                'numeric',
                'phone-pad',
            ];
            var examples = keyboardTypes.map((type) => {
                return (
                    <TextInput
                        key={type}
                        keyboardType={type}
                        placeholder={'keyboardType: ' + type}
                        style={styles.singleLine}
                    />
                );
            });
            return <View>{examples}</View>;
        }
    },
    {
        title: '输入的文本颜色',
        render() {
            return (
                <View>
                    <TextInput
                        style={styles.singleLine}
                        defaultValue="默认颜色"
                    />
                    <TextInput
                        style={[styles.singleLine, {color: 'green'}]}
                        defaultValue="绿色文本"
                    />
                    <TextInput
                        style={[styles.singleLine]}
                        placeholder="默认提示文本(placeholder)颜色"
                    />
                    <TextInput
                        style={[styles.singleLine]}
                        placeholder="提示文本颜色设置为红色placeholderTextColor"
                        placeholderTextColor="red"
                    />
                    {platform === 'android' ? <TextInput
                        placeholder="默认下划线颜色"
                        style={[styles.singleLine]}
                    /> : null}
                    {platform === 'android' ? <TextInput
                        placeholder="下划线颜色蓝色underlineColorAndroid"
                        style={[styles.singleLine]}
                        underlineColorAndroid="blue"
                    /> : null}
                    <TextInput
                        defaultValue="TextInput中有一个Text "
                        style={[styles.singleLine, {backgroundColor: 'rgba(100, 100, 100, 0.3)'}]}>
                        <Text style={{backgroundColor: 'rgba(100, 100, 100, 0.3)'}}>
                            Text深颜色背景
                        </Text>
                    </TextInput>
                    <TextInput
                        defaultValue="选中高亮色"
                        selectionColor={'red'}
                        style={styles.singleLine}>
                    </TextInput>
                </View>
            )
        }
    },
    {
        title: '密码样式，输入内容不可见黑点代替，',
        render() {
            return (
                <View>
                    <TextInput
                        defaultValue="12345"
                        secureTextEntry={true}
                        style={styles.singleLine}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={[styles.singleLine, {color: 'red'}]}
                        placeholder="可以设置黑点颜色"
                        placeholderTextColor="red"
                    />
                </View>
            )
        }
    },
    {
        title: '是否可编辑',
        render() {
            return (
                <TextInput
                    defaultValue="不能编辑"
                    editable={false}
                    style={styles.singleLine}
                />
            )
        }
    },
    {
        title: '多行输入',
        render() {
            //autoCorrect:拼写是否自动纠正
            return (
                <View>
                    <TextInput
                        autoCorrect={true}
                        placeholder="multiline, aligned top-left"
                        placeholderTextColor="red"
                        multiline={true}
                        style={[styles.multiline, {textAlign: 'left', textAlignVertical: 'top'}]}
                    />
                    <TextInput
                        autoCorrect={true}
                        placeholder="multiline, aligned center"
                        placeholderTextColor="green"
                        multiline={true}
                        style={[styles.multiline, {textAlign: 'center', textAlignVertical: 'center'}]}
                    />
                    <TextInput
                        autoCorrect={true}
                        multiline={true}
                        style={[styles.multiline, {color: 'blue'}, {textAlign: 'right', textAlignVertical: 'bottom'}]}>
                        <Text style={styles.multiline}>multiline with children, aligned bottom-right</Text>
                    </TextInput>
                </View>
            )
        }
    },
    {
        title: '固定行数',
        platform: 'android',
        render() {
            return (
                <View>
                    <TextInput numberOfLines={2}
                               multiline={true}
                               placeholder="Two line input"/>
                    <TextInput numberOfLines={5}
                               multiline={true}
                               placeholder="5行"/>
                </View>
            )
        }
    }, {
        title: 'Return key',
        render() {
            var returnKeyTypes = [
                'none',
                'go',
                'search',
                'send',
                'done',
                'previous',
                'next',
            ];
            var returnKeyLabels = [
                'Compile',
                'React Native',
            ];
            var examples = returnKeyTypes.map((type) => {
                return (
                    <TextInput
                        key={type}
                        returnKeyType={type}
                        placeholder={'returnKeyType: ' + type}
                        style={styles.singleLine}
                    />
                );
            });
            var types = returnKeyLabels.map((type) => {
                return (
                    <TextInput
                        key={type}
                        returnKeyLabel={type}
                        placeholder={'returnKeyLabel: ' + type}
                        style={styles.singleLine}
                    />
                );
            });
            return <View>{examples}{types}</View>;
        }
    },
    {
        title: 'Inline Images',
        platform: 'android',
        render() {
            return (
                <View>
                    <TextInput
                        inlineImageLeft="ic_menu_black_24dp"
                        placeholder="This has drawableLeft set"
                        style={styles.singleLine}
                    />
                    <TextInput
                        inlineImageLeft="ic_menu_black_24dp"
                        inlineImagePadding={30}
                        placeholder="This has drawableLeft and drawablePadding set"
                        style={styles.singleLine}
                    />
                    <TextInput
                        placeholder="This does not have drawable props set"
                        style={styles.singleLine}
                    />
                </View>
            );
        }
    },
    {
        title: '打开关闭默认padding',
        render() {
            return <ToggleDefaultPaddingExample/>
        }
    },
    {
        title: '事件监听',
        render() {
            return (
                <TextEventsExample/>
            )
        }
    },
    {
        title: 'Auto-expanding',
        render: function () {
            //enablesReturnKeyAutomatically(ios):如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false
            return (
                <View>
                    <AutoExpandingTextInput
                        placeholder="height increases with content"
                        defaultValue="React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native."
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="done"
                    />
                </View>
            );
        }
    },
    {
        title: '提交时失去焦点',
        render() {
            return <BlurOnSubmitExample/>
        }
    }]
const styles = StyleSheet.create({
    multiline: {
        height: 60,
        fontSize: 16,
        padding: 4,
        marginBottom: 10,
    },
    eventLabel: {
        margin: 3,
        fontSize: 14,
    },
    singleLine: {
        fontSize: 16,
        padding: 4,
    },
    singleLineWithHeightTextInput: {
        height: 30,
    },
    hashtag: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

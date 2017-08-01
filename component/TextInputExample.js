import React, {Component} from 'react'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform
} from 'react-native'

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
                    Toggle padding  {this.state.hasPadding ?'true':'false'}
                </Text>
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
            //words:第一个单词,sentences:m每一个橘子第一个字母,characters：所以字符
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
        render(){
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
        fontSize: 12,
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

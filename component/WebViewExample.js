import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    WebView,
} from 'react-native'
import  TestPage from './TestPage'
const DEFAULT_URL = 'http://www.jianshu.com/u/d5b531888b2b';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

//javaScriptEnabled:是否启用JavaScript （android），ios无此属性，已经默认true
//domStorageEnabled:是否开启DOM本地存储(android)
//decelerationRate:指定一个浮点数,用于设置触摸停止后，多块速度停止滚动,也可传字符串，normal,fast
//onNavigationStateChange:当webview加载开始或者结束回调函数
//onShouldStartLoadWithRequest:允许为webview发起的请求运行一个自定义的处理函数。返回true或false表示是否要继续执行响应的请求(ios)
//startInLoadingState:强制WebView在第一次加载时先显示loading视图。默认为true
//scalesPageToFit:设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。
//automaticallyAdjustContentInsets 控制是否调整放置在导航条、标签栏或工具栏后面的web视图的内容。默认值是true
//source={require('./helloworld.html')可以加载html
//postMessage RN发送消息给html
//onMessage:html发送消息给RN
//injectJavaScript注入脚本
class WebViewExample extends Component {
    static title = '<WebView>';
    static description = '显示网页的组件';
    state = {
        url: DEFAULT_URL,
        isHtml: false,
        status: '没有页面',
        backButtonEnabled: false,
        forwardButtonEnabled: false,
        loading: true,
        scalesPageToFit: true,
        isPostMessage: false,
    }
    inputText = '';
    script = 'document.write("Injected JS ")';

    render() {
        console.log(this.state.url)
        console.log(this.state.isHtml)
        console.log(this.state.isPostMessage)
        var html = this.state.isPostMessage ? require('./messagingtest.html') : require('./helloworld.html');
        return (
            <TestPage
                title=""
                style={styles.container}
                noSpacer={true}
                noScroll={true}>
                    <View style={styles.addressBarRow}>
                        <TouchableOpacity
                            onPress={this.goBack}
                            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>{'<'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.goForward}
                            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>
                                {'>'}
                            </Text>
                        </TouchableOpacity>
                        <TextInput
                            ref={(textinput) => this._textInput = textinput}
                            autoCaitalize="none"
                            defaultValue={this.state.url}
                            onSubmitEditing={this._onSubmitEditing}
                            onChange={this._textChange}
                            clearButtonMode="while-editing"
                            style={styles.addressBarTextInput}
                        />
                        <TouchableOpacity onPress={this._pressGoButton}>
                            <View style={styles.goButton}>
                                <Text>
                                    Go!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <WebView
                        ref={(webview) => this.webview = webview}
                        automaticallyAdjustContentInsets={false}
                        style={styles.webView}
                        source={this.state.isHtml ? html : {uri: this.state.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        onNavigationStateChange={this._onNavigationStateChange}
                        onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                        startInLoadingState={true}
                        onMessage={this._onMessage}
                        scalesPageToFit={this.state.scalesPageToFit}
                    />
                    <View style={styles.statusBar}>
                        <Text style={styles.statusBarText}>{this.state.status}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',marginBottom:10}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this.setState({scalesPageToFit: !this.state.scalesPageToFit})}
                            style={[{backgroundColor: '#38acff', marginTop: 10, padding: 5}]}>
                            <Text
                                style={styles.statusBarText}>scalesPageToFit:{this.state.scalesPageToFit ? 'true' : 'false'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this.setState({
                                isHtml: !this.state.isHtml,
                                isPostMessage: false,
                                url: this.state.isHtml ? DEFAULT_URL : this.state.url
                            })}
                            style={[{backgroundColor: '#38acff', marginTop: 10, padding: 5, marginLeft: 5}]}>
                            <Text
                                style={styles.statusBarText}>可加载{this.state.isHtml ? 'html文件' : '网页uri'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this._postMessage}
                            style={[{backgroundColor: '#38acff', marginTop: 10, padding: 5, marginLeft: 5}]}>
                            <Text
                                style={styles.statusBarText}>测试数据传递</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={this.injectJS}
                            style={[{backgroundColor: '#38acff', marginTop: 10, padding: 5, marginLeft: 5}]}>
                            <Text
                                style={styles.statusBarText}>脚本注入</Text>
                        </TouchableOpacity>
                    </View>
            </TestPage>
        )
    }

    //脚本注入
    injectJS = () => {
        const script = 'document.write("Injected JS ")';  // eslint-disable-line quotes
        if (this.webview) {
            this.webview.injectJavaScript(script);
        }
    }

    //向HTML发送数据
    _postMessage = () => {
        this.setState({isPostMessage: true, isHtml: true})

        setTimeout(() => {
            if (this.webview) {
                this.webview.postMessage('"Hello" 我是RN发送过来的数据');
            }
        }, 4000);
    }
    //接收HTML发出的数据
    _onMessage = (e) => {
        this.setState({
            messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
            message: e.nativeEvent.data,
        })
        Alert.alert(e.nativeEvent.data)
    }
    _onNavigationStateChange = (navState) => {
        console.log(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
        });
    }
    _textChange = (e) => {
        var url = e.nativeEvent.text;
        if (!/^[a-zA-Z-_]+:/.test(url)) {
            url = 'http://' + url;
        }
        this.inputText = url;
        console.log("_textChange:" + this.inputText)
    }
    _onSubmitEditing = (e) => {
        this._pressGoButton();
    }
    _pressGoButton = () => {
        var url = this.inputText.toLowerCase();
        console.log("_pressGoButton:" + this.inputText)
        if (url === this.state.url) {
            this.reload();
        } else {
            this.setState({
                url: url,
            });
        }
        this._textInput.blur();
    };
    goBack = () => {
        this.webview.goBack();
    }
    goForward = () => {
        this.webview.goForward();
    }
    reload = () => {
        this.webview.reload();
    }
    _onShouldStartLoadWithRequest = (event) => {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#ff0000"
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#38acff',
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        backgroundColor: '#38acff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    webView: {
        backgroundColor: BGWASH,
        height: '100%',
    },
})
module.exports=WebViewExample
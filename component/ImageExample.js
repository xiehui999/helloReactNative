'use strict'
import React, {Component} from 'react'
import {
    Image,
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Platform,
    ActivityIndicator
} from 'react-native'
import nativeImageSource from 'nativeImageSource'

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export const displayName = (undefined: ?string);
export const framework = 'React'
export const title = '<Image>'
export const description = '展示不同图片的组件Image'
export var examples = [
    {
        title: '简单的加载网络图片',
        description: '如果Image属性source,uri是以http为前缀，则会从网络下载图片',
        render() {
            return (
                <Image
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    style={styles.base}
                />);
        }
    },
    {
        title: '加载静态图片',
        description: '静态图片放在源码中，和在js模块中',
        render() {
            return (
                <View style={styles.horizontal}>
                    <Image
                        source={require('./file/uie_thumb_normal.png')}
                        style={styles.icon}
                    />
                    <Image
                        source={require('./file/uie_thumb_selected.png')}
                        style={styles.icon}/>
                    <Image
                        source={require('./file/uie_comment_normal.png')}
                        style={styles.icon}/>
                    <Image
                        source={require('./file/uie_comment_highlighted.png')}
                        style={styles.icon}/>
                </View>
            )
        }
    }, {
        title: '加载android中图片资源',
        platform:'android',
        description:'分别是使用uri加载drawable下图片，使用nativeImageSource加载drawable下图片资源，使用nativeImageSource加载mipmap下的图片资源',
        render() {
            return (
                <View style={styles.horizontal}>
                    <Image
                        source={{uri: 'launcher_icon'}}
                        style={styles.base}
                    />
                    <Image
                        source={nativeImageSource({
                            android: 'ic_create_black_48dp',
                            width: 96,
                            height: 96
                        })}
                        style={styles.base}
                    />
                    <Image
                        source={nativeImageSource({
                            android: 'mipmap/ic_launcher',
                            width: 96,
                            height: 96
                        })}
                        style={styles.base}
                    />
                </View>)
                ;
        }
    },
    {
        title: '默认图片',
        description: '从网络加载图片时显示的占位图片',
        render() {
            //defaultSource ios才有，android上没有效果
            return (
                <Image
                    defaultSource={require('./file/bunny.png')}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    style={styles.base}
                />
            );
        },
        platform: 'ios'
    },
    {
        title: '边框样式',
        description: '第一个边框为3,第二个边框为6,颜色#f099f0,第三个边框半径5,第四个边框半径19',
        render() {
            return (
                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                    <Image
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                        style={[styles.base, styles.background, {borderWidth: 3, borderColor: '#f099f0'}]}
                    />
                    <Image
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                        style={[styles.base, styles.background, {borderWidth: 6, borderColor: '#f099f0'}]}
                    />
                    <Image
                        style={[styles.base, {borderRadius: 5}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {borderRadius: 19}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </View>
            )
        }
    },
    {
        title: '背景颜色',
        render() {
            return (
                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                    />
                    <Image
                        style={[styles.base, {backgroundColor: 'rgba(0, 0, 100, 0.25)'}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                    />
                    <Image
                        style={[styles.base, {backgroundColor: 'red'}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                    />
                    <Image
                        style={[styles.base, {backgroundColor: 'black'}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                    />
                </View>
            )
        }
    },
    {
        title: '不透明',
        description: '从左到右透明度(opacity)分别是1, 0.8, 0.6,0.4 ,0.2 ,0',
        render() {
            return (
                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                    <Image
                        style={[styles.base, {opacity: 1}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {opacity: 0.8}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {opacity: 0.6}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {opacity: 0.4}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {opacity: 0.2}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                    <Image
                        style={[styles.base, {opacity: 0}]}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                    />
                </View>
            )
        }
    },
    {
        title: '嵌套组件ImageBackground',
        render() {
            return (
                <ImageBackground
                    style={{width: 100, height: 100, backgroundColor: 'transparent'}}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                >
                    <Text style={styles.nestedText}>
                        React
                    </Text>
                </ImageBackground>
            )
        }
    },
    {
        title: '给图片着色',
        description: '使用tintColor属性改变图片颜色,对网络加载的图片也可以使用该属性',
        render() {
            return (
                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                    <Image
                        source={require('./file/uie_thumb_normal.png')}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#5ac8fa'}]}
                    />
                    <Image
                        source={require('./file/uie_thumb_normal.png')}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#4cd964'}]}
                    />
                    <Image
                        source={require('./file/uie_thumb_normal.png')}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#ff2d55'}]}
                    />
                    <Image
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#5ac8fa'}]}
                    />
                    <Image
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#ff2d55'}]}
                    />
                    <Image
                        source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}}
                        style={[styles.icon, {borderRadius: 5, tintColor: '#4cd964'}]}
                    />
                </View>
            )
        }
    },
    {
        title: 'resizeMode属性',
        description: 'resizeMode样式属性控制图片在框中如何重新调整渲染',
        render() {
            return (
                <View>
                    {[{uri: 'https://facebook.github.io/react/img/logo_small_2x.png'}, {uri: 'https://facebook.github.io/react/img/logo_og.png'}].map((image, index) => {
                        return (
                            <View key={index} style={{marginTop: 20}}>
                                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                                    <View>
                                        <Text style={styles.resizeModeText}>Contain</Text>
                                        <Image
                                            style={styles.resizeMode}
                                            resizeMode={Image.resizeMode.contain}
                                            source={image}
                                        />
                                    </View>
                                    <View>
                                        <Text style={[styles.resizeModeText]}>
                                            Cover
                                        </Text>
                                        <Image
                                            style={styles.resizeMode}
                                            resizeMode={Image.resizeMode.cover}
                                            source={image}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                                    <View>
                                        <Text style={styles.resizeModeText}>Stretch</Text>

                                        <Image
                                            style={styles.resizeMode}
                                            resizeMode={Image.resizeMode.stretch}
                                            source={image}
                                        />
                                    </View>
                                    {
                                        Platform.OS === 'ios' ?
                                            <View>
                                                <Text style={styles.resizeModeText}>Repeat</Text>
                                                <Image
                                                    style={styles.resizeMode}
                                                    resizeMode={Image.resizeMode.repeat}
                                                    source={image}
                                                />
                                            </View> : null
                                    }
                                    {
                                        Platform.OS === 'android' ?
                                            <View>
                                                <Text style={styles.resizeModeText}>Center</Text>
                                                <Image
                                                    style={styles.resizeMode}
                                                    resizeMode={Image.resizeMode.center}
                                                    source={image}
                                                />
                                            </View> : null
                                    }
                                </View>
                            </View>
                        )
                    })}
                </View>
            )
        }
    },
    {
        title: 'Gif图片',
        render() {
            return (
                <Image
                    style={styles.gif}
                    source={{uri: 'https://38.media.tumblr.com/9e9bd08c6e2d10561dd1fb4197df4c4e/tumblr_mfqekpMktw1rn90umo1_500.gif'}}
                />
            )
        },
        platform: 'ios',
    },
    {
        title: 'Base64',
        render() {
            return (
                <Image
                    style={{flex: 1}}
                    source={[
                        {uri: 'https://facebook.github.io/react/img/logo_small.png', width: 38, height: 38},
                        {uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 76, height: 76},
                        {uri: 'https://facebook.github.io/react/img/logo_og.png', width: 400, height: 400}
                    ]}
                />
            );
        },
        platform: 'ios'
    },
    {
        title: '多图片资源',
        description: 'source属性可以接收一个数组uris，根据组件的大小加载对应的图片',
        render() {
            return (
                <View style={{width: 100, height: 100}}>
                    <Image
                        style={{flex: 1}}
                        source={[
                            {uri: 'https://facebook.github.io/react/img/logo_small.png', width: 38, height: 38},
                            {uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 76, height: 76},
                            {uri: 'https://facebook.github.io/react/img/logo_og.png', width: 400, height: 400}
                        ]}
                    />
                </View>
            );
        }
    },
    {
        title: 'Blur Radius',
        description: '为图片添加一个指定半径的模糊滤镜',
        render: function () {
            return (
                <View style={[styles.horizontal, {justifyContent: 'space-around'}]}>
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={0}
                    />
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={5}
                    />
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={10}
                    />
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={15}
                    />
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={20}
                    />
                    <Image
                        style={styles.base}
                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                        blurRadius={25}
                    />
                </View>
            );
        },
    },
    {
        title: 'Image组件从网络加载图片的回调事件',
        render() {
            return (
                <ImageLoadCallbackComponent
                    source={{uri: 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now()}}
                    prefetchedSource={{uri: IMAGE_PREFETCH_URL}}
                />
            )
        }

    },
    {
        title: '图片下载进度',
        render() {
            return (
                <ImageProgressComponent
                    source={{uri: 'http://origami.design/public/images/bird-logo.png?r=1'}}
                />
            )
        },
        platform: 'ios'
    }
]
const IMAGE_PREFETCH_URL = 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now();
var prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);

class ImageLoadCallbackComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            startLoadPrefetched: false,
            mountTime: new Date()
        }
    }

    componentWillMount() {
        this.setState({
            mountTime: new Date()
        })
    }

    render() {
        var {mountTime} = this.state
        return (
            <View>
                <Image
                    source={this.props.source}
                    style={[styles.base, {overflow: 'visible'}]}
                    onLoadStart={() => this._loadEventFired(`✔ onLoadStart (+${new Date() - mountTime}ms)`)}
                    onLoad={(event) => {
                        if (event.nativeEvent.source) {
                            const url = event.nativeEvent.source.url
                            this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms) for URL ${url}`)
                        } else {
                            this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms)`);
                        }
                    }}
                    onLoadEnd={() => {
                        this._loadEventFired(`✔ onLoadEnd (+${new Date() - mountTime}ms)`);
                        this.setState({startLoadPrefetched: true}, () => {
                            prefetchTask.then(() => {
                                this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms)`);
                            }, error => {
                                this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms)`);
                            })
                        })
                    }}
                />
                {this.state.startLoadPrefetched ? <Image
                    source={this.props.prefetchedSource}
                    style={[styles.base, {overflow: 'visible'}]}
                    onLoadStart={() => this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms)`)}
                    onLoad={(event) => {
                        if (event.nativeEvent.source) {
                            const url = event.nativeEvent.source.url
                            this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms) for URL ${url}`)
                        } else {
                            this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`);
                        }
                    }}
                    onLoadEnd={() => this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`)}
                /> : null}
                <Text style={{marginTop: 20}}>
                    {this.state.events.join('\n')}
                </Text>
            </View>
        )
    }

    _loadEventFired(event) {
        this.setState((state) => {
            return state.events = [...state.events, event]
        })
    }
}

class ImageProgressComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: false,
            progress: 0
        }
    }

    render() {
        var loader = this.state.loading ?
            <View style={styles.progress}>
                <Text>{this.state.progress}%</Text>
                <ActivityIndicator style={{marginLeft: 5}}/>
            </View> : null;
        return this.state.error ?
            <Text>{this.state.error}</Text> :
            <ImageBackground
                source={this.props.source}
                style={[styles.base, {overflow: 'visible'}]}
                onLoadStart={(event) => this.setState({loading: true})}
                onError={(event) => this.setState({
                    error: e.nativeEvent.error,
                    loading: false
                })}
                onProgress={(event) => {
                    console.log('onProgress')
                    this.setState({
                        progress: Math.round(100 * event.nativeEvent.loaded / event.nativeEvent.total)
                    })
                }}
                onLoad={() => this.setState({loading: false, error: false})}
            >
                {loader}
            </ImageBackground>

    }
}

const styles = StyleSheet.create({
    base: {
        width: 38,
        height: 38,
    },
    horizontal: {
        flexDirection: 'row'
    },
    icon: {
        width: 15,
        height: 15,
    },
    background: {
        backgroundColor: '#222222'
    },
    nestedText: {
        marginLeft: 12,
        marginTop: 20,
        backgroundColor: 'transparent',
        color: 'white'
    },
    resizeMode: {
        width: 90,
        height: 60,
        borderWidth: 0.5,
        borderColor: 'black'
    },
    gif: {
        flex: 1,
        height: 200,
    },
})
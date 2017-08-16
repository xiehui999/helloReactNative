import React, {Component, PureComponent} from 'react';
import {
    Image,
    Platform,
    Animated,
    TouchableHighlight,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View
} from 'react-native';

const HORIZ_WIDTH = 200;
const ITEM_HEIGHT = 72;
type Item = { title: string, text: string, key: string, pressed: boolean, noImage?: boolean }
genItemData = (count: number, start: number = 0): Array<Item> => {
    const dataBlob = [];
    for (let ii = start; ii < count + start; ii++) {
        const itemHash = Math.abs(hashCode('Item ' + ii));
        dataBlob.push({
            title: 'Item ' + ii,
            text: infoStr.substr(0, itemHash % 301 + 20),
            key: String(ii),
            pressed: false,
        });
    }
    return dataBlob;
}

class ItemComponent extends PureComponent {
    props: {
        fixedHeight?: boolean,
        horizontal?: boolean,
        item: Item,
        onPress: (key: String) => void,
        onShowUnderlay?: () => void,
        onHideUnderlay?: () => void,
    }
    _onPress = () => {
        this.props.onPress(this.props.item.key);
    };
    render() {
        const {fixedHeight, horizontal, item} = this.props;
        const itemHash = Math.abs(hashCode(item.title));
        const imgSource = IMAGE_URLS[itemHash % IMAGE_URLS.length];
        return (
            <TouchableHighlight
                onPress={this._onPress}
                onShowUnderlay={this.props.onShowUnderlay}
                onHideUnderlay={this.props.onHideUnderlay}
                style={horizontal ? styles.horizontalItem : styles.item}>
                <View
                    style={[styles.row, horizontal && {width: HORIZ_WIDTH}, fixedHeight && {height: ITEM_HEIGHT}]}>
                    {!item.noImage && <Image style={styles.thumb} source={imgSource}/>}
                    <Text style={styles.text}
                          numberOfLines={(horizontal || fixedHeight) ? 3 : undefined}>
                        {item.title}-{item.text}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

class SeparatorComponent extends PureComponent {
    render() {
        return <View style={styles.separator}/>;
    }
}

const renderStackedItem = ({item}: { item: Item }) => {
    const itemHash = Math.abs(hashCode(item.title));
    const imgSource = IMAGE_URLS[itemHash % IMAGE_URLS.length];
    return (
        <View style={styles.stacked}>
            <Text style={styles.stackedText}>{item.title} - {item.text}</Text>
            <Image style={styles.thumb} source={imgSource}/>
        </View>
    );
};

class FooterComponent extends PureComponent {
    render() {
        return (
            <View style={styles.headerFooterContainer}>
                <SeparatorComponent/>
                <View style={styles.headerFooter}>
                    <Text>我是Footer</Text>
                </View>
            </View>
        )
    }
}

class HeaderComponent extends PureComponent {
    render() {
        return <View style={styles.headerFooterContainer}>
            <View style={styles.headerFooter}>
                <Text>我是Header</Text>
            </View>
            <SeparatorComponent/>
        </View>
    }
}

class ItemSeparatorComponent extends PureComponent {
    render() {
        const style = this.props.hignlighted ? [styles.itemSeparator, {
            marginLeft: 0,
            backgroundColor: 'rgb(217,217,217)'
        }] : styles.itemSeparator;
        return <View style={style}></View>
    }
}

class Spindicator extends PureComponent {
    render() {
        return (
            <Animated.View style={[styles.spindicator, {
                transform: [{
                    rotate: this.props.value.interpolate({
                        inputRange: [0, 5000],
                        outputRange: ['0deg', '360deg'],
                        extrapolate: 'extend',
                    })
                }]
            }]}>

            </Animated.View>
        )
    }
}

const IMAGE_URLS = [
    require('./Thumbnails/like.png'),
    require('./Thumbnails/dislike.png'),
    require('./Thumbnails/call.png'),
    require('./Thumbnails/fist.png'),
    require('./Thumbnails/bandaged.png'),
    require('./Thumbnails/flowers.png'),
    require('./Thumbnails/heart.png'),
    require('./Thumbnails/liking.png'),
    require('./Thumbnails/party.png'),
    require('./Thumbnails/poke.png'),
    require('./Thumbnails/superlike.png'),
    require('./Thumbnails/victory.png'),
];
const HEADER = {height: 30, width: 100};
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const infoStr = 'React Native 是Facebook发布的，可以让我们广大开发者使用JavaScript和React开发我们的应用，该提倡组件化开发，' +
    '也就是说React Native给我们提供一个个封装好的组件让开发者来进行使用，甚至我们可以相关嵌套形成新的组件.' +
    '使用React Native我们可以维护多种平台(Web,Android和IOS)的同一份业务逻辑核心代码来创建原生应用';
const hashCode = (str) => {
    let hash = 15;
    for (let i = str.length - 1; i >= 0; i--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
    }
    return hash;
}
const getItemLayout = (data: any, index: number, horizontal?: boolean) => {
    const [length, separator, header] = horizontal ? [HORIZ_WIDTH, 0, HEADER.width] : [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER.height];
    return {length, offset: (length + separator) * index + header, index};
}
const pressItem = (context, key) => {
    const index = Number(key);
    const pressed = !context.state.data[index].pressed;
    context.setState((state) => {
        const newData = [...state.data];
        newData[index] = {
            ...state.data[index],
            pressed,
            title: 'Item ' + key + (pressed ? ' (pressed)' : '')
        }
        return {data: newData};
    })
}
const renderSmallSwitchOption = (context: Object, key: string) => {
    return (
        <View style={styles.option}>
            <Text>{key}:</Text>
            <Switch
                style={styles.smallSwitch}
                value={context.state[key]}
                onValueChange={(value) => context.setState({[key]: value})}
            />
        </View>
    );
}
const PlainInput = (props: Object) => {
    return (
        <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            style={styles.searchTextInput}
            {...props}
        />
    );
}
const styles = StyleSheet.create({
        headerFooter: {
            ...HEADER,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
        },
        headerFooterContainer: {
            backgroundColor: 'rgb(239,239,244)'
        },
        horizontalItem: {
            alignSelf: 'flex-start',
        },
        searchTextInput: {
            backgroundColor: 'white',
            borderColor: '#cccccc',
            borderRadius: 3,
            borderWidth: 1,
            paddingLeft: 8,
            paddingVertical: 0,
            height: 26,
            fontSize: 14,
            flexGrow: 1,
        },
        item: {
            flex: 1,
        },
        itemSeparator: {
            height: SEPARATOR_HEIGHT,
            backgroundColor: 'rgb(200,199,204)',
            marginLeft: 60,
        },
        option: {
            flexDirection: 'row',
            padding: 8,
            paddingRight: 0,
        },
        row: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'white',
        },
        serchTextInput: {
            backgroundColor: 'white',
            borderColor: '#cccccc',
            borderRadius: 3,
            borderWidth: 1,
            paddingLeft: 8,
            paddingVertical: 0,
            height: 26,
            fontSize: 14,
            flexGrow: 1,
        },
        separator: {
            height: SEPARATOR_HEIGHT,
            backgroundColor: 'rgb(200,199,204)',
        },
        smallSwitch: Platform.select({
            android: {
                top: 1,
                margin: -6,
                transform: [{scale: 0.7}],
            },
            ios: {
                top: 4,
                margin: -10,
                transform: [{scale: 0.5}],
            },
        }),
        stacked: {
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 10,
        },
        thumb: {
            width: 50,
            height: 50,
            left: -5,
        },
        spindicator: {
            marginLeft: 'auto',
            marginTop: 8,
            width: 2,
            height: 16,
            backgroundColor: 'darkgray',
        },
        stackedText: {
            padding: 4,
            fontSize: 18,
        },
        text: {
            flex: 1,
        },

    }
)

module.exports = {
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    ItemSeparatorComponent,
    PlainInput,
    SeparatorComponent,
    Spindicator,
    genItemData,
    getItemLayout,
    pressItem,
    renderSmallSwitchOption,
    renderStackedItem,
};
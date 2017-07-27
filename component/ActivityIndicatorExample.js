

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
type State = { animating: boolean; };
type Timer = number;

class ToggleAnimatingActivityIndicator extends Component {
    state: State;
    _timer: Timer;

    constructor(props) {
        super(props);
        this.state = {
            animating: true,
        };
    }

    componentDidMount() {
        this.setToggleTimeout();
    }

    componentWillUnmount() {
        clearTimeout(this._timer);
    }

    setToggleTimeout() {
        this._timer = setTimeout(() => {
            this.setState({animating: !this.state.animating});
            this.setToggleTimeout();
        }, 8000);
    }

    render() {
        return (
            <ActivityIndicator
                animating={this.state.animating}
                style={[styles.centering, {height: 80}]}
                size="large"
            />
        );
    }
}


//下面也可以以使用exports.displayName
export const displayName = (undefined: ?string);
export const framework = 'React';
export const title = '<ActivityIndicator>';
export const description = 'Animated loading indicators.';
/*
* ActivityIndicator
* animating:是否顯示指示器，默认为true，表示显示
* color ：旋转滚轮的前景色
*size enum('small', 'large') :指示器的大小。small的高度为20，large为36。
*
* */


export var examples = [
    {
        title: 'Default (small, white)',
        render() {
            return (
                <ActivityIndicator
                    style={[styles.centering, styles.gray]}
                    color="white"
                />
            );
        }
    },
    {
        title: 'Gray',
        render() {
            return (
                <View>
                    <ActivityIndicator
                        style={[styles.centering]}
                        color='#cccccc'
                    />
                    <ActivityIndicator
                        style={[styles.centering, {backgroundColor: '#eeeeee'}]}
                    />
                </View>
            );
        }
    },
    {
        title: '自定义颜色[#0000ff,#aa00aa,#aa3300,#00aa00]',
        render() {
            return (
                <View style={styles.horizontal}>
                    <ActivityIndicator color="#0000ff" />
                    <ActivityIndicator color="#aa00aa" />
                    <ActivityIndicator color="#aa3300" />
                    <ActivityIndicator color="#00aa00" />
                </View>
            );
        }
    },
    {
        title: 'size="large"',
        render() {
            return (
                <ActivityIndicator
                    style={[styles.centering, styles.gray]}
                    size="large"
                    color="white"
                />
            );
        }
    },
    {
        title: 'Large自定义颜色',
        render() {
            return (
                <View style={styles.horizontal}>
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                    />
                    <ActivityIndicator
                        size="large"
                        color="#aa00aa"
                    />
                    <ActivityIndicator
                        size="large"
                        color="#aa3300"
                    />
                    <ActivityIndicator
                        size="large"
                        color="#00aa00"
                    />
                </View>
            );
        }
    },
    {
        title: '使用animating设置暂停开始',
        render() {
            return <ToggleAnimatingActivityIndicator />;
        }
    },
    {
        title: '使用transform:scale:1.5',
        render() {
            return (
                <ActivityIndicator
                    style={[styles.centering, {transform: [{scale: 1.5}]}]}
                    size="large"
                />
            );
        }
    },
    {
        platform: 'android',
        title: '自定义大小 (size: 75)',
        render() {
            return (
                <ActivityIndicator
                    style={styles.centering}
                    size={75}
                />
            );
        }
    },
];


const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    gray: {
        backgroundColor: '#cccccc',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
    },
});

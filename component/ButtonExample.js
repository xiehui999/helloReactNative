'use strict'
import React, {Component} from 'react'
import {Button, View, Alert} from 'react-native'

export const displayName = 'ButtonExample'
export const framework = 'React'
export const title = '<Button>';
export const description = 'Button组件知识'


const onButtonPress = () => {
    Alert.alert('按下了按钮');
}
export var examples = [
    {
        title: '基本',
        description: '标题title和onPress事件是必须的，使用无障碍标签accessibilityLabels使你的APP可以被每个人使用',
        render() {
            return (
                <Button
                    onPress={onButtonPress}
                    title="点击我"
                    accessibilityLabel="显示了一个Alert"
                />
            );
        }
    }, {
        title: '调整颜色color',
        description: '在android平台color属性是背景颜色,ios平台是修改文本颜色',
        render() {
            return (
                <Button
                    onPress={onButtonPress}
                    title="点击我(color)"
                    color="#841584"
                    accessibilityLabel="学习更多关于color的内容"
                />
            );
        }
    }, {
        title: '按钮不可点击',
        description: '组件的交互是被禁止的',
        render() {
            return (
                <Button
                    disabled
                    onPress={onButtonPress}
                    title="我是不可点击的,不信你试试"
                    accessbilityLabel="alert显示了"
                />
            )
        }
    },
    {
        title: '布局自适应',
        description: '这种策略是根据标题定义按钮的宽度',
        render() {
            return <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                    onPress={onButtonPress}
                    title="我是左边"
                    color="#841584"
                    accessibilityLabel="左边的按钮"
                />
                <Button
                    onPress={onButtonPress}
                    title="我是右边,是真的，不信拉倒"
                    accessibilityLabel="右边的按钮"
                />
            </View>
        }
    }]
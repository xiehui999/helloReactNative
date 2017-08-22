/**
 * 官方文档对应地址:
 * https://facebook.github.io/react-native/docs/datepickerios.html
 * https://facebook.github.io/react-native/docs/datepickerandroid.html
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */


'use strict'
import React, {Component} from 'react'
import {
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    View,
    Platform
} from 'react-native'
import TestBlock from "./TestBlock";

//注意月份传入值是实际月份减1.例如传4，则是五月份.
class DatePickerAndroidExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            simpleDate: new Date(2020, 4, 5),
            spinnerDate: new Date(2020, 4, 5),
            calendarDate: new Date(2020, 4, 5),
            defaultDate: new Date(2020, 4, 5),
            textStr: '未选择',
        }
    }

    render() {
        return ( <View>
            <Text style={styles.text}>选择日期：{this.state.textStr}</Text>
            <TouchableOpacity
                onPress={() => this.showPicker('simple', {date: this.state.simpleDate})}>
                <Text style={styles.button}>默认日期选择,根据系统选择spinner,calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.showPicker('spinner', {date: this.state.spinnerDate, mode: 'spinner'})}>
                <Text style={styles.button}>日期mode(spinner)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.showPicker('calendar', {date: this.state.calendarDate, mode: 'calendar'})}>
                <Text style={styles.button}>日历选择日期mode(calendar)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.showPicker('calendar', {
                    date: this.state.calendarDate,
                    mode: 'calendar',
                    minDate: new Date(2017, 6, 5),
                    maxDate: new Date(2017, 7, 26)
                })}>
                <Text style={styles.button}>日历minDate/maxDate设置最小和最大可选日期</Text>
            </TouchableOpacity>
        </View>)
    }

    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState['textStr'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState['textStr'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };
}

//date:当前被选中的日期
//maximumDate:可选最大日期
//minimumDate:可选最小日期
//minuteInterval :可选的最小分钟间隔
//mode 'date', 'time', 'datetime'
//timeZoneOffsetInMinutes 指定时区
class DatePickerIOSExample extends Component {
    static defaultProps = {
        date: new Date(),
        timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    }

    constructor(props) {
        super(props)
        this.state = {
            date: this.props.date,
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
        }
    }

    render() {
        return <View>
            <Text>{this.state.date.toLocaleDateString() + '  ' + this.state.date.toLocaleTimeString()}</Text>
            <Text style={styles.text}>日期和时间选择</Text>
            <DatePickerIOS
                date={this.state.date}
                mode="datetime"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this._onDateChange}
            />
            <Text style={styles.text}>日期选择</Text>
            <DatePickerIOS
                date={this.state.date}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this._onDateChange}
            />
            <Text style={styles.text}>时间选择</Text>
            <DatePickerIOS
                date={this.state.date}
                mode="time"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this._onDateChange}
                minuteInterval={10}
            />
        </View>
    }

    _onDateChange = (date) => {
        this.setState({date: date});
    }
}

class TimePickerAndroidExample extends Component {
    state = {
        defaultText: '选择时间',
        presetText: '选择时间,默认时间4:30AM',
        presetHour: 4,
        presetMinute: 30,
    }

    render() {
        return (
            <View>
                <Text>默认,默认时间格式为手机设置的时间格式（24小时或者12小时）</Text>
                <TouchableOpacity
                    onPress={() => this._onPress('default', {})}
                    activeOpacity={0.5}>
                    <Text style={styles.button}>{this.state.defaultText}</Text>
                </TouchableOpacity>
                <Text>设置默认时间(hour,minute)4:30AM,is24Hour设置了true（24小时制）</Text>
                <TouchableOpacity
                    onPress={() => this._onPress('preset', {
                        hour: this.state.presetHour,
                        minute: this.state.presetMinute,
                        is24Hour: true,
                    })}
                    activeOpacity={0.5}>
                    <Text style={styles.button}>{this.state.presetText}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _onPress = async (key, options) => {
        console.log('_onPress')
        console.log(key)
        console.log(options)
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {}
            console.log(action)
            if (action === TimePickerAndroid.timeSetAction) {
                newState[key + 'Text'] = hour + ':' + (minute < 10 ? '0' + minute : minute);
                newState[key + 'Hour'] = hour;
                newState[key + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[key + 'Text'] = '取消了选择';
            }
            this.setState(newState);
        } catch ({code, message}) {
            Alert.alert('出现了错误' + message);
        }
    }
}

export const title = Platform.OS === 'android' ? 'DatePickerAndroid' : '<DatePickerIOS>';
export const description = Platform.OS === 'android' ? '使用DatePickerAndroid 进行日期选择,以及TimePickerAndorid选择时间' : 'DatePickerIOS组件进行日期选择.';
export const examples = [
    {
        title: 'DatePickerAndroid',
        render() {
            return <DatePickerAndroidExample/>
        },
        platform: "android",
    },
    {
        title: 'TimePickerAndroid',
        render() {
            return <TimePickerAndroidExample/>
        },
        platform: "android",
    },
    {
        title: '<DatePickerIOS>',
        render() {
            return <DatePickerIOSExample/>
        },
        platform: "ios",
    }]

const styles = StyleSheet.create({
    text: {
        marginTop: 20,
        fontWeight: '500',
        fontSize: 14
    },
    button: {
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#38adff',
        color: '#fff',
        fontSize: 16,
    }
});
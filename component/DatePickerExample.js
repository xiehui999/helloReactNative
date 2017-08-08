import React, {Component} from 'react'
import {
    DatePickerAndroid,
    DatePickerIOS,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    Platform
} from 'react-native'

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
                style={styles.button}
                onPress={() => this.showPicker('simple', {date: this.state.simpleDate})}>
                <Text>默认日期选择,根据系统选择spinner,calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.showPicker('spinner', {date: this.state.spinnerDate, mode: 'spinner'})}>
                <Text>日期mode(spinner)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.showPicker('calendar', {date: this.state.calendarDate, mode: 'calendar'})}>
                <Text>日历选择日期mode(calendar)</Text>
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

export const title = Platform.OS === 'android' ? 'DatePickerAndroid' : '<DatePickerIOS>';
export const description = Platform.OS === 'android' ? '使用DatePickerAndroid 进行日期选择' : 'DatePickerIOS组件进行日期选择.';
export const examples = [{
    title: 'DatePickerAndroid',
    render() {
        return <DatePickerAndroidExample/>
    }
}]

const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
    button: {
        height: 50,
        padding: 10,
        borderColor: '#38adff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ccc'
    }
});
import React from 'react'
import {TouchableOpacity, TouchableNativeFeedback, Platform, View, StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'

Button = ({onPress, disabled,style, titleStyle,title, ...props}) => {
    const children = typeof title === 'string' ? <Text style={[styles.title, titleStyle]}>{title}</Text> : title;

    return <TouchableOpacity
        style={[styles.container,style]}
        disabled={disabled}
        onPress={() => {
            const clickTime = Date.now();
            //500ms防重复
            if (
                (!this.lastTime ||
                    Math.abs(this.lastTime - clickTime) > 500)
            ) {
                if (onPress) {
                    onPress();
                }
            }
        }}
        {...props}
    >
        <View style={disabled && styles.disabled}>
            {children}
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: "#007abf",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    circle: {
        borderRadius: 45,
    },
    disabled: {
        opacity: 0.5,
    },
})
export default Button
'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class TestBlock extends Component {

    props: {
        title?: string,
        description?: string,
    };
    //可以使用defaultProps设置默认属性
    //属性类型约束
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
    };

    state = {description: (null: ?string)};

    render() {
        var description;
        if (this.props.description) {
            description =
                <Text style={styles.descriptionText}>
                    {this.props.description}
                </Text>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                    {description}
                </View>
                <View style={styles.children}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
//fontWeight:定义粗细的字符。400 等同于 normal，而 700 等同于 bold
var styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: '#ffffff',
        margin: 10,
        marginVertical: 15,
        overflow: 'hidden',
    },
    titleContainer: {
        borderBottomWidth: 0.5,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 2.5,
        borderBottomColor: '#d6d7da',
        backgroundColor: '#f6f7f8',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '500',
    },
    descriptionText: {
        fontSize: 13,
    },
    children: {
        margin: 10,
    }
});

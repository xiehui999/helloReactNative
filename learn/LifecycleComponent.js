import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
/*周期API:https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops*/
/*
* 组件生命周期
*Mounting:an instance of a component is being created and inserted into the DOM
*constructor()
*componentWillMount()
*render()
*componentDidMount()
*Updating:changes to props or state.component is being re-rendered
*componentWillReceiveProps()
*shouldComponentUpdate()
*componentWillUpdate()
*render()
*componentDidUpdate()
*Unmounting:a component is being removed from the DOM
*componentWillUnmount()
* */
export default class LifecycleComponent extends Component {
    static  defaultProps = {
        count: 5
    }

    constructor(props) {
        super(props)
        //ES6写法，ES5 getInitialState
        this.state = {
            count: this.props.count,
        }
        console.log('constructor')
    }

    //组件被装载之前
    componentWillMount() {
        console.log('componentWillMount')
    }

    //组件被装载完成
    componentDidMount() {
        console.log('componentDidMount')
    }

    //组件更新，属性发生改变
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        this.setState({
            count: nextProps.count
        })
    }

    //组件是不是要更新，返回值true:表示执行刷新，即执行componentWillUpdate，render，componentDidUpdate。返回false，则不执行后续操作
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        return true;
    }

    //组件更新之前
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate')
    }

    //组件更新之后
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
    }

    //组件被移除之前
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        console.log('render')
        return <View style={styles.container}>
            <Text
                style={styles.reduce}
                onPress={this.reduce}
            >-</Text>
            <Text
                style={styles.text}
            >{this.state.count}</Text>
            <Text
                style={styles.add}
                onPress={this.add}
            >+</Text>
        </View>
    }

    reduce = () => {
        this.setState({
            count: this.state.count > 1 ? this.state.count - 1 : 0
        })
    }
    add = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
    },
    reduce: {
        width: 50,
        height: 40,
        borderWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#ccc',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    text: {
        width: 50,
        height: 40,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#ccc',
    },
    add: {
        width: 50,
        height: 40,
        borderWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#ccc',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    }
})
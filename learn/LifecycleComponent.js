import React, {Component} from 'react';
import {
    Text,
    View
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
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
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
        return <View>
            <Text
                onPress={() => {
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}
            >点击更改state，点击了{this.state.count}次</Text>
            <Text>属性name值：{this.props.count}</Text>
        </View>
    }
}
import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
/*https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops*/
export default class LifecycleComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
        console.log('constructor')
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
    }

    componentWillUnmount() {
    }

    render() {
        console.log('render')
        return <View><Text
            onPress={() => {
                this.setState({
                    count: this.state.count + 1,
                })
            }}
        >LifecycleComponent，点击了{this.state.count}次</Text></View>
    }
}
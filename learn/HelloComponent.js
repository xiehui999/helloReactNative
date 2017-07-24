import React, {Component} from 'react';
import {
    Text,
} from 'react-native';
/*
* 创建组件的三种方式：ES6，ES5，函数
* 如何导出组件及变量
* */
/*
* 方法1：ES6
* 使用属性return <Text>Hello React {this.props.name}</Text>
* */
// export default class HelloComponent extends Component{
//     render(){
//         return <Text>Hello React</Text>
//     }
// }
/*
* 方式2:ES5
* 使用属性return <Text>Hello React {this.props.name}</Text>
* */
var HelloComponent = React.createClass({
    render() {
        return <Text>Hello React {this.props.name}</Text>
    }
})
module.exports = HelloComponent;

/*
* 方式3：函数式
* 无状态，不能使用this
* */
// function HelloComponent() {
//     return <Text>Hello React</Text>
// }
// // //增加属性
// // function HelloComponent(props) {
// //     return <Text>Hello React {props.name}</Text>
// // }
// module.exports=HelloComponent;
//单个导出方式export var name='Code4Android'
var name = 'Code4Android'
var address = 'china'
//多个导出方式
export {name, address}

//导出方法
export function sum(a, b) {
    return a + b
}
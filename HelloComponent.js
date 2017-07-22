import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
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
var HelloComponent=React.createClass({
    render(){
        return <Text>Hello React</Text>
}
})
module.exports=HelloComponent;

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
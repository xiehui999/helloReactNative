import React,{Component,PropTypes} from 'react'
import {View,Text} from 'react-native'
export default class PropsTest extends Component{
    //默认属性，如果上一级页面没有传值时，则显示默认值
    static  defaultProps={
        describes:"我是默认描述",
        describes1:'我是默认描述1'
    }
    //属性类型检查，约束,isRequired限制必须传递，不给默认值，会提示警告
    static propTypes={
        describes:PropTypes.string,
        describes1:PropTypes.string.isRequired,
    }
    render() {
        return <Text>Props使用： {this.props.describes} {this.props.describes1}</Text>
    }
}
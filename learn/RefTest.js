import  React,{Component} from "react"
import {Text} from 'react-native'
export default class StateTest extends Component{
    //初始化state方式1，如果同时使用方式1,2初始化state，最后显示的值是constructor方式2的值
    state={
        count:1
    }
    constructor(props){
        super(props)
        //初始化state方式2
        this.state={
            count:0
        }
    }
    getCount(){
        return this.state.count
    }
    render(){
        return <Text
            onPress={()=>{
            this.setState({
                count:this.state.count+1
            })
            }}
        >点击测试state:{this.state.count}</Text>
    }
}
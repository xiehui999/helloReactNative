/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import ReactDom from 'react-dom';

export default class Child extends Component {
    state = {
        b: false,
    }

    componentDidMount() {
        //setState 的批量更新按照先进先出的原则，顺序更新
        // this.props.changeA();//改变父组件的a属性
        // this.setState({b: true})

        //无论你在多少个组件中调用多少个 setState，它们都会在最后一次 setState 后，全部放在同一个队列里，
        // 然后执行一个统一的更新，而不会说是 在父组件 re-render 一次，在子组件又 re-render 一次
        // this.setState({b: true})
        // console.log(this.state, 'first')
        // this.setState({c: true})
        // console.log(this.state, 'second')

        //但是在 Ajax、setTimeout 等异步方法中，每 setState 一次，就会 re-render 一次
        // let aPromise = new Promise((resolve)=> {
        //     resolve(100)
        // })
        // aPromise.then((value)=> {
        //     // this.setState({b:true}) //re-render
        //     // console.log(this.state,'first')
        //     // this.setState({c:true}) //re-render
        //     // console.log(this.state,'second')
        //     ReactDom.unstable_batchedUpdates(()=>{
        //         this.setState({b:true}) //re-render
        //         console.log(this.state,'first')
        //         this.setState({c:true}) //re-render
        //         console.log(this.state,'second')
        //     })
        //
        // });
        let aPromise = new Promise((resolve) => {
            resolve(100)
        })
        aPromise.then((value) => {

            ReactDom.unstable_batchedUpdates(() => {
                this.setState({b: true})
                console.log(this.state, 'first')

                this.setState({c: true})
                console.log(this.state, 'second')

            })
        });
        this.setState({d: true,})
    }

    render() {
        console.log("--------------Child:render", this)

        return (
            <View style={styles.container}>
                <Text>11111111</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        flexWrap: 'nowrap',
    },
});
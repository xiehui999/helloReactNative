/**
 * @author Code4Android
 * @date  2017/12/22  00:44
 */
import React from 'react'
import {Scene, Router, Stack} from 'react-native-router-flux'
import ExampleList from './ExampleList'
import ComponentTest from './ComponentTest'
import HelloReactNative from '../learn/HelloReactNative'
import RoutePlanExample from '../learn/RoutePlanExample'
import Parent from "../learn/setState/Parent";

export default class App extends React.Component {

    render() {
        return <Router>
            <Scene key="root">
                <Scene key="ExampleList" component={ExampleList} title="Login"/>
                <Scene key="ComponentTest" component={ComponentTest} title="学习记录"/>
                <Scene key="RoutePlanExample" component={RoutePlanExample} title="路径规划"/>
                <Scene key="HelloReactNative" component={HelloReactNative} title="简单使用"/>
                <Scene key="Parent" component={Parent} title="简单使用"/>
            </Scene>
        </Router>
    }
}

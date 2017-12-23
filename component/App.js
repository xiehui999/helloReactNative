/**
 * @author Code4Android
 * @date  2017/12/22  00:44
 */
import React from 'react'
import {Scene, Router, Stack} from 'react-native-router-flux'
import ExampleList from './ExampleList'
import ComponentTest from './ComponentTest'

export default class App extends React.Component {

    render() {
        return <Router>
            <Scene key="root">
                <Scene key="ExampleList" component={ExampleList} title="Login"/>
                <Scene key="ComponentTest" component={ComponentTest} title="学习记录"/>
            </Scene>
        </Router>
    }
}

import React, {Component} from 'react'
import {View, Text} from 'react-native'
import RoutePlan from '../utils/RoutePlan'
import Button from '../component/com/Button'

export const title = "RoutePlanExample";
export const description = "路径规划，唤起地图进行导航";
export default class RoutePlanExample extends Component {

    render() {
        return <View style={{padding: 20}}>
            <Button
                onPress={() => {
                    RoutePlan.isInstallAmap().then(res => alert(res)).catch(err => alert(err))
                }}
                title="是否安装高德地图"
            />
            <Button
                style={{marginTop: 10}}
                onPress={() => {
                    RoutePlan.isInstallQQMap().then(res => alert(res)).catch(err => alert(err))
                }}
                title="是否安装腾讯地图"
            />
            <Button
                style={{marginTop: 10}}
                onPress={() => {
                    RoutePlan.isInstallBaiDuMap().then(res => alert(res)).catch(err => alert(err))
                }}
                title="是否安装百度地图"
            />
            <Button
                style={{marginTop: 30}}
                onPress={() => {
                    RoutePlan.openAmap({
                        slat: 39.92848272, slon: 116.39560823, sname: "A",
                        dlat: 39.98848272, dlon: 116.47560823, dname: "B",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
                }}
                title="打开高德地图"
            />
            <Button
                style={{marginTop: 10}}
                onPress={() => {
                    RoutePlan.openAmap({
                        slat: 39.92848272, slon: 116.39560823, sname: "A",
                        dlat: 39.98848272, dlon: 116.47560823, dname: "B",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
                }}
                title="打开腾讯地图"
            />
            <Button
                style={{marginTop: 10}}
                onPress={() => {
                    RoutePlan.openAmap({
                        slat: 39.92848272, slon: 116.39560823, sname: "A",
                        dlat: 39.98848272, dlon: 116.47560823, dname: "B",
                        mode: RoutePlan.Mode.DRIVING
                    }).then(res => alert(res)).catch(err => alert(err))
                }}
                title="打开百度地图"
            />
        </View>
    }
}

/**
 * 官方文档对应地址:https://facebook.github.io/react-native/docs/tabbarios.html
 * https://facebook.github.io/react-native/docs/tabbarios-item.html#content
 *
 * Code4Android
 * 我的简书:http://www.jianshu.com/u/d5b531888b2b
 * 新浪微博:http://weibo.com/745687294
 * CSDN:http://blog.csdn.net/xiehuimx?viewmode=contents
 */
'use strict'
import React, {Component} from 'react'
import {
    StyleSheet,
    TabBarIOS,
    Text,
    View
} from 'react-native'

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

/**
 * barTintColor：标签栏的背景颜色
 * tintColor：被选中时图标的颜色
 * unselectedItemTintColor:当前没有被选中的标签图标的颜色>ios10
 *
 * badge:在图标右上角显示一个红色的气泡
 * selected:是否被选中
 */
class TabBarIOSExample extends Component {
    static title = '<TabBarIOS>(ios)';
    static description = 'iOS TabBar学习';
    state = {
        selectedTab: 'redTab',
        notifCount: 0,
        presses: 0,
    };
    _renderContent = (color: string, pageText: string, num?: number) => {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    };

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                unselectedItemTintColor="red"
                barTintColor="darkslateblue"
            >
                <TabBarIOS.Item
                    title="Blue Tab"
                    icon={{uri: base64Icon, scale: 3}}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}>
                    {this._renderContent('#414A8C', 'Blue Tab')}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    icon={require('./file/uie_thumb_normal.png')}
                    selectedIcon={require('./file/uie_thumb_selected.png')}
                    title="Green Tab"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                            presses: this.state.presses + 1
                        });
                    }}>
                    {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
})
module.exports = TabBarIOSExample
'use strict';
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ProgressViewIOS
} from 'react-native'

class ProgressViewExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.interval= setInterval(() => {
            var progress = (this.state.progress + 0.02) % 1;
            this.setState({progress: progress});
        }, 100)
    }
    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
    }
    getProgress(offset) {
        var progress = this.state.progress + offset;
        return Math.sin(progress % Math.PI) % 1;
    }
    render(){
        return(
            <View style={styles.container}>
                <ProgressViewIOS style={styles.progressView} progress={this.getProgress(0)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="purple" progress={this.getProgress(0.2)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={this.getProgress(0.4)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="orange" progress={this.getProgress(0.6)}/>
                <ProgressViewIOS style={styles.progressView} progressTintColor="yellow" progress={this.getProgress(0.8)}/>
            </View>
        )
    }
}

export const displayName = (undefined: ?string);
export const framework = 'React';
export const title = 'ProgressViewIOS';
export const description = 'ProgressViewIOS';
export const examples = [{
    title: 'ProgressViewIOS',
    render() {
        return (
            <ProgressViewExample/>
        );
    }
}];

const styles = StyleSheet.create({
    container: {
        marginTop: -20,
        backgroundColor: 'transparent',
    },
    progressView: {
        marginTop: 20,
    }
})
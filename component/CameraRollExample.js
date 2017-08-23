import React, {Component} from 'react';
import {
    CameraRoll,
    Image,
    Slider,
    StyleSheet,
    Switch,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class CameraRollExample extends Component {
    state={
        groupTypes:'SavedPhotos',
        
    }
}

export const title = 'Camera Roll';
export const description =
    "使用 CameraRoll访问用户相册";
export const examples = [
    {
        title: 'Photos',
        render(): React.Element<any> {
            return <CameraRollExample/>;
        },
    },
];
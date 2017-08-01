'use strict';
export type ComponentExample = {
    key: string,
    module: Object,
};
const ComponentExamplesList: Array<ComponentExample> = [
    {
        key: 'ViewExample',
        module: require('./ViewExample'),
    },
    {
        key: 'TextExample',
        module: require('./TextExample'),
    },
    {
        key: 'ActivityIndicatorExample',
        module: require('./ActivityIndicatorExample'),
    },
    {
        key: 'ButtonExample',
        module: require('./ButtonExample'),
    },
    {
        key: 'ImageExample',
        module: require('./ImageExample'),
    },
    {
        key: 'PickerExample',
        module: require('./PickerExample'),
    },
    {
        key: 'ProgressBarAndroidExample',
        module: require('./ProgressBarAndroidExample'),
        platform: 'android'
    },
    {
        key: 'ProgressViewIOSExample',
        module: require('./ProgressViewIOSExample'),
        platform: 'ios'
    },
    {
        key: 'SwitchExample',
        module: require('./SwitchExample'),
    },
]
module.exports = ComponentExamplesList
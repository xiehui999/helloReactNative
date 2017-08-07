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
        key: 'TextInputExample',
        module: require('./TextInputExample'),
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
    {
        key: 'ToolbarAndroidExample',
        module: require('./ToolbarAndroidExample'),
        platform: 'android'
    },
    {
        key: 'TabBarIOSExample',
        module: require('./TabBarIOSExample'),
        platform: 'ios'
    },
    {
        key: 'StatusBarExample',
        module: require('./StatusBarExample'),
    },
    {
        key: 'SliderExample',
        module: require('./SliderExample'),
    },
    {
        key: 'ModalExample',
        module: require('./ModalExample'),
    },
    {
        key: 'TouchableExample',
        module: require('./TouchableExample'),
    },
    {
        key: 'ListViewExample',
        module: require('./ListViewExample'),
    },
    {
        key: 'ListViewGridLayoutExample',
        module: require('./ListViewGridLayoutExample'),
    },
    {
        key: 'ListViewPagingExample',
        module: require('./ListViewPagingExample'),
    },
    {
        key: 'SwipeableListViewExample',
        module: require('./SwipeableListViewExample'),
    },
]
module.exports = ComponentExamplesList
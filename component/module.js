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
        key: 'SectionListExample',
        module: require('./SectionListExample')
    },
    {
        key: 'FlatListExample',
        module: require('./FlatListExample')
    },
    {
        key: 'MultiColumnExample',
        module: require('./MultiColumnExample')
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
        key: 'DatePickerIOS',
        module: require('./DatePickerExample'),
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
        key: 'ScrollViewExample',
        module: require('./ScrollViewExample'),
    },
    {
        key: 'RefreshControlExample',
        module: require('./RefreshControlExample'),
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
    {
        key: 'ViewPagerAndroidExample',
        module: require('./ViewPagerAndroidExample'),
        platform: 'android'
    },
    {
        key: 'WebViewExample',
        module: require('./WebViewExample'),
    },
]
const Modules = {};

const APIExamples: Array<ComponentExample> = [
    {
        key: 'AlertExample',
        module: require('./AlertExample')
    },
    {
        key: 'AnimatedExample',
        module: require('./AnimatedExample')
    }, {
        key: 'AppStateExample',
        module: require('./AppStateExample')
    },
    {
        key: 'DatePickerAndroid',
        module: require('./DatePickerExample'),
        platform: 'android'
    }, {
        key: 'GeolocationExample',
        module: require('./GeolocationExample'),
    }, {
        key: 'LinkingAndShareExample',
        module: require('./LinkingAndShareExample'),
    }, {
        key: 'PermissionsAndToastExample',
        module: require('./PermissionsAndToastExample'),
        platform: 'android'
    }, {
        key: 'NetInfoExample',
        module: require('./NetInfoExample'),
    }, {
        key: 'VibrationAndOrientationExample',
        module: require('./VibrationAndOrientationExample'),
    }
]
APIExamples.concat(ComponentExamplesList).forEach(Example => {
    Modules[Example.key] = Example.module;
});
const TestExamplesList = {
    ComponentExamplesList,
    APIExamples,
    Modules
}
module.exports = TestExamplesList;

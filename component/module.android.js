'use strict';
export type ComponentExample = {
    key: string,
    module: Object,
};
const ComponentExamplesList :Array<ComponentExample>=[
    {
        key: 'ActivityIndicatorExample',
        module: require('./ActivityIndicatorExample'),
    },
    {
        key: 'ButtonExample',
        module: require('./ButtonExample'),
    },
]
module.exports=ComponentExamplesList
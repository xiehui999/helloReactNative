export type ComponentExample = {
    key: string,
    module: Object,
};
const ComponentExamplesList :Array<ComponentExample>=[
    {
        key: 'ActivityIndicatorExample',
        module: require('./ActivityIndicatorExample'),
    },
]
module.exports=ComponentExamplesList
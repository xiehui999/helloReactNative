import TestExamplesList from './module';

export type TestNavigationState = {
    openExample: ?string,
};

export default function TestNavigationReducer(state: ?TestNavigationState,
                                              action: any): TestNavigationState {

    if (
        // Default value is to see example list
    !state ||

    // Handle the explicit list action
    action.type === 'RNTesterListAction' ||

    // Handle requests to go back to the list when an example is open
    (state.openExample && action.type === 'RNTesterBackAction')
    ) {
        return {
            // A null openExample will cause the views to display the RNTester example list
            openExample: null,
        };
    }
    if (action.type === 'RNTesterExampleAction') {
        const ExampleModule = TestExamplesList.Modules[action.openExample];
        return state = {
            openExample: action.openExample,
        };


    }
    return state;
}

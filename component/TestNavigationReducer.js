
// $FlowFixMe : This is a platform-forked component, and flow seems to only run on iOS?
const RNTesterList = require('./module');

export type TestNavigationState = {
  openExample: ?string,
};

function TestNavigationReducer(
  state: ?TestNavigationState,
  action: any
): TestNavigationState {

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

    // Make sure we see the module before returning the new state
    const ExampleModule = RNTesterList[action.openExample];

    if (ExampleModule) {
      return {
        openExample: action.openExample,
      };
    }
  }

  return state;
}

module.exports = TestNavigationReducer;

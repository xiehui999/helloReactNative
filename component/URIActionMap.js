'use strict';
const TestActions = require('./TestActions');
const ComponentExamplesList = require('./module');
import {Alert} from 'react-native'

import type { RNTesterAction } from './TestActions';

function PathActionMap(path: string): ?RNTesterAction {
  // Warning! Hacky parsing for example code. Use a library for this!
  const exampleParts = path.split('/example/');
  const exampleKey = exampleParts[1];
  if (exampleKey) {
    if (!ComponentExamplesList[exampleKey]) {
      Alert.alert(`${exampleKey} example could not be found!`);
      return null;
    }
    return TestActions.ExampleAction(exampleKey);
  }
  return null;
}

export default function URIActionMap(uri: ?string): ?RNTesterAction {
  if (!uri) {
    return null;
  }
  // Warning! Hacky parsing for example code. Use a library for this!
  const parts = uri.split('rntester:/');
  if (!parts[1]) {
    return null;
  }
  const path = parts[1];
  return PathActionMap(path);
}


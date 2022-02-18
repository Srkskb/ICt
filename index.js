/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RootNavigator from './source/components/routes/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigator);

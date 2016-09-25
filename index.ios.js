/* @flow */
'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import HomeView from './home-view';

class NuclideReactNativeSampleApp extends React.Component {
  render(): React.Element<any> {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Nuclide React Native Sample App',
          component: HomeView,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(
  'NuclideReactNativeSampleApp',
  () => NuclideReactNativeSampleApp
);

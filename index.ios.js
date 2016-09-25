/* @flow */
'use strict';

const React = require('react');
const {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = require('react-native');
const HomeView = require('./home-view');

class NuclideReactNativeSampleApp extends React.Component {
  render() {
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

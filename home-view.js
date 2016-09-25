/* @flow */
'use strict';

import React from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import BlogView from './blog-view';

const Blogs = {
  FLUFF: [
    'marniethedog',
    'derpycats',
    'maddieonthings',
    'mensweardog',
    'thefluffingtonpost',
  ],
  COOL: [
    'bookshelfporn',
    'fullcravings',
    'geometrydaily',
    'humansofnewyork',
    'theblackworkshop',
    'theoceanrolls',
    'thingsorganizedneatly',
  ],
};

type EmojiButtonProps = {
  onPress: Function;
  text: string;
};

function EmojiButton(props: EmojiButtonProps): React.Element<any> {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.button}
      underlayColor='#d1f2a5'
    >
      <Text style={styles.text}>
        {props.text}
      </Text>
    </TouchableHighlight>
  );
}

type HomeViewProps = {
  navigator: Navigator;
};

export default class HomeView extends React.Component {
  props: HomeViewProps;

  constructor(props: HomeViewProps) {
    super(props);
    (this: any).navigateToOne = this.navigateToOne.bind(this);
  }

  render(): React.Element<any> {
    return (
      <View style={styles.container}>
        <EmojiButton
          onPress={() => { this.navigateToOne(Blogs.FLUFF); }}
          text='🐈'
        />
        <EmojiButton
          onPress={() => { this.navigateToOne(Blogs.COOL); }}
          text='💡'
        />
      </View>
    );
  }

  navigateToOne(blogs: Array<string>): void {
    const blogname = random(blogs);
    this.props.navigator.push({
      title: blogname,
      component: BlogView,
      passProps: {blogname},
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f56991',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#effab4',
    borderColor: '#ff9f80',
    borderRadius: 4,
    padding: 30,
  },
  text: {
    fontSize: 60,
  }
});

function random<T>(items: Array<T>): T {
  return items[Math.floor(Math.random() * items.length)];
}

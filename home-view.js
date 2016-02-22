/* @flow */
'use strict';

const React = require('react-native');
const {
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;
const BlogView = require('./blog-view');

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

function EmojiButton(props: EmojiButtonProps): ReactElement {
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

class HomeView extends React.Component {
  props: HomeViewProps;

  constructor(props: HomeViewProps) {
    super(props);
    this.navigateToOne = this.navigateToOne.bind(this);
  }

  render() {
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

module.exports = HomeView;

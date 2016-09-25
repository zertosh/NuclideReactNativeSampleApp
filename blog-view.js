/* @flow */
'use strict';

import type {
  PhotoPost,
} from './tumblr-types';

const React = require('react');
const {
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  View,
} = require('react-native');
const Dimensions = require('Dimensions');
const TumblrAPI = require('./tumblr-api');

type Props = {
  blogname: string;
  offset: number;
  navigator: Navigator;
};

type State = {
  dataSource: ListView.DataSource;
  posts: Array<PhotoPost>;
  offset: number;
  isLoading: boolean;
  hasMore: boolean;
  hasError: boolean;
};

class BlogView extends React.Component {
  static defaultProps = {
    offset: 0,
  };

  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      offset: props.offset,
      isLoading: false,
      hasError: false,
      hasMore: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    };
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    this.fetchNextPosts();
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>
            derp, something went wrong.
          </Text>
        </View>
      )
    }
    return (
      <View style={[styles.container, this.state.isLoading && styles.loading]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }

  renderRow(post: PhotoPost): ReactElement {
    const width = Dimensions.get('window').width;
    const images = post.photos.map(postPhoto => {
      // Get the photo that is closest in width to the viewport
      const photo = postPhoto.alt_sizes.reduce((best, alt) =>
        (Math.abs(best.width - width) <= Math.abs(alt.width - width) ? best : alt)
      );

      // Scale the height
      const height = Math.floor((photo.height / photo.width) * width);
      return (
        <Image
          key={photo.url}
          source={{uri: photo.url}}
          style={{height, width}}
        />
      );
    });
    const summary = null;
    // const summary = post.summary && <Text style={styles.summary}>{post.summary}</Text>;
    return (
      <View style={styles.row}>
        {images}
        {summary}
      </View>
    );
  }

  onEndReached() {
    this.fetchNextPosts();
  }

  async fetchNextPosts(): Promise<void> {
    if (
      this.state.isLoading ||
      !this.state.hasMore ||
      this.state.hasError
    ) return;
    this.setState({isLoading: true});
    try {
      const newPosts = await TumblrAPI.loadPhotoPosts(
        this.props.blogname,
        this.state.offset
      );
      const posts = this.state.posts.concat(newPosts);
      this.setState({
        offset: this.state.offset + newPosts.length,
        hasMore: !!newPosts.length,
        isLoading: false,
        hasError: false,
        posts: posts,
        dataSource: this.state.dataSource.cloneWithRows(posts),
      });
    } catch(err) {
      this.setState({
        isLoading: false,
        hasError: true,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    opacity: 0.5,
  },
  error: {
    fontSize: 40,
    margin: 10,
    paddingTop: 64,
  },
  row: {
    flex: 1,
  },
  summary: {
    alignItems: 'stretch',
    backgroundColor: '#eef',
    color: '#333',
    flex: 1,
    marginBottom: 20,
    paddingBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
  }
});

module.exports = BlogView;

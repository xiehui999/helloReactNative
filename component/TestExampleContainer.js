
const React = require('react');
const {
  Platform,
} = require('react-native');
const RNTesterBlock = require('./RNTesterBlock');
const RNTesterPage = require('./RNTesterPage');

class TestExampleContainer extends React.Component {
  renderExample(example, i) {
    // Filter platform-specific examples
    var {title, description, platform} = example;
    if (platform) {
      if (Platform.OS !== platform) {
        return null;
      }
      title += ' (' + platform + ' only)';
    }
    return (
      <RNTesterBlock
        key={i}
        title={title}
        description={description}>
        {example.render()}
      </RNTesterBlock>
    );
  }

  render(): React.Element<any> {
    if (!this.props.module.examples) {
      return <this.props.module />;
    }

    return (
      <RNTesterPage title={this.props.title}>
        {this.props.module.examples.map(this.renderExample)}
      </RNTesterPage>
    );
  }
}

module.exports = TestExampleContainer;

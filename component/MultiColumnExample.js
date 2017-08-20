import React, {PureComponent} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import TestPage from './TestPage';
import {
    FooterComponent,
    HeaderComponent,
    ItemComponent,
    PlainInput,
    SeparatorComponent,
    genItemData,
    getItemLayout,
    pressItem,
    renderSmallSwitchOption
} from './ListExampleShared';

class MultiColumnExample extends PureComponent {
    static title = '<FlatList> - MultiColumn';
    static description = '高性能多列可滚动列表';
    state = {
        data: genItemData(100),
        filterText: '',
        fixedHeight: true,
        numColumns: 2,
    }

    render() {
        const filterRegex = new RegExp(String(this.state.filterText), 'i');
        const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
        const filteredData = this.state.data.filter(filter);
        return (
            <TestPage
                noSpacer={true}
                noScroll={true}>
                <View style={styles.searchRow}>
                    <PlainInput
                        onChangeText={this._onChangeText}
                        placeholder="搜索..."
                        value={this.state.filterText}/>
                    <Text>设置列数:</Text>
                    <PlainInput
                        onChangeText={this._onChangeTextColumns}
                        clearButtonMode="never"
                        value={this.state.numColumns ? String(this.state.numColumns) : ''}/>
                </View>
                <View style={styles.row}>
                    {renderSmallSwitchOption(this, 'fixedHeight')}
                </View>
                <SeparatorComponent/>
                <FlatList
                    ListFooterComponent={FooterComponent}
                    ListHeaderComponent={HeaderComponent}
                    data={filteredData}
                    renderItem={this._renderItemComponent}
                    key={this.state.numColumns + (this.state.fixedHeight ? 'f' : 'v')}
                    numColumns={this.state.numColumns || 1}
                    onRefresh={() => alert('执行了onRefresh')}
                    refreshing={false}
                    legacyImplementation={false}
                />
            </TestPage>
        );
    }

    _renderItemComponent = ({item}) => {
        return <View style={styles.card}>
            <ItemComponent
                fixedHeight={this.state.fixedHeight}
                item={item}
                onPress={(key) => {
                    pressItem(this, key);
                }}/>
        </View>
    }
    _onChangeText = (text) => {
        this.setState({
            filterText: text,
        })
    }
    _onChangeTextColumns = (text) => {
        const number = Number(text);
        if (isNaN(number)) {
            return;
        }
        this.setState({
            numColumns: number,
        })
    }
}

const styles = StyleSheet.create({
    searchRow: {
        padding: 10,
    },
    card: {
        margin: 5,
        borderRadius: 10,
        flex: 1,
        overflow: 'hidden',
        borderColor: 'lightgray',
        borderWidth: 1,
    },
})
module.exports = MultiColumnExample;
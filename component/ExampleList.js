'use strict';
import React, {PureComponent} from 'react'
import {TouchableHighlight, Text, StyleSheet, SectionList, View, Platform} from 'react-native'
import TestActions from './TestActions';
import {ComponentExample} from "./module";
import TestExamplesList from './module'
import {Actions} from 'react-native-router-flux'

class RowComponent extends PureComponent {
    props: {
        item: Object,
        onNavigate: Function,
        onPress?: Function,
        onShowUnderlay?: Function,
        onHideUnderlay?: Function,
    };


    render() {
        const {item} = this.props;
        var platform = item.platform ? item.platform : Platform.OS
        return (
            platform === Platform.OS ?
                <TouchableHighlight {...this.props} onPress={() => {
                    console.log("item", item.key)
                    Actions.ComponentTest({ExampleKey: item.key})
                }}>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {item.module.title}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {item.module.description}
                        </Text>
                    </View>
                </TouchableHighlight> : null
        )
            ;
    }
}

const renderSectionHeader = ({section}) =>
    <Text style={styles.sectionHeader}>
        {section.title}
    </Text>;

export default class ExampleList extends React.Component {
    props: Props

    render() {
        const sections = [
            {
                data: TestExamplesList.ComponentExamplesList,
                title: '组件',
                key: 'c',
            },
            {
                data: TestExamplesList.APIExamples,
                title: 'API',
                key: 'a',
            },
        ];
        console.log(this.props.list)
        return (
            <View style={[styles.listContainer]}>
                <SectionList
                    ItemSeparatorComponent={ItemSeparator}
                    contentContainerStyle={{backgroundColor: 'white'}}
                    style={styles.list}
                    sections={sections}
                    renderItem={this._renderItem}
                    enableEmptySections={true}
                    itemShouldUpdate={this._itemShouldUpdate}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustContentInsets={false}
                    keyboardDismissMode="on-drag"
                    legacyImplementation={false}
                    renderSectionHeader={renderSectionHeader}
                />
            </View>
        );
    }

    _itemShouldUpdate(curr, prev) {
        return curr.item !== prev.item;
    }

    _renderItem = ({item, separators}) => (
        < RowComponent
            item={item}
            onNavigate={this.props.onNavigate
            }
            onShowUnderlay={separators.highlight
            }
            onHideUnderlay={separators.unhighlight
            }
        />: null
    )
    ;

    _handleRowPress(exampleKey: string): void {
        this.props.onNavigate(TestActions.ExampleAction(exampleKey));
    }
}

const ItemSeparator = ({highlighted}) => (
    <View style={highlighted ? styles.separatorHighlighted : styles.separator}/>
);
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    list: {
        backgroundColor: '#eeeeee',
    },
    sectionHeader: {
        backgroundColor: '#eeeeee',
        padding: 5,
        fontWeight: '500',
        fontSize: 11,
    },
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    separatorHighlighted: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(217, 217, 217)',
    },
    rowTitleText: {
        fontSize: 17,
        fontWeight: '500',
    },
    rowDetailText: {
        fontSize: 15,
        color: '#888888',
        lineHeight: 20,
    },
    searchRow: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
    searchTextInput: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 3,
        borderWidth: 1,
        paddingLeft: 8,
        paddingVertical: 0,
        height: 35,
    },
});

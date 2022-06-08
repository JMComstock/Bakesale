import React from 'react';
import propTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import DealItem from './DealItem';

class DealList extends React.Component {
    static propTypes = {
        deals: propTypes.array.isRequired,
        onItemPress: propTypes.func.isRequired,
    }
    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.props.deals}
                    renderItem={({item}) => <DealItem deal={item} onPress={this.props.onItemPress} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
});

export default DealList;
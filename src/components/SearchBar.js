import React from 'react';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet } from 'react-native';

class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: propTypes.func.isRequired,
    }
    state = {
        searchTerm: '',
    };
    debouncedSearchDeals = debounce(this.props.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return (
            <TextInput 
                placeholder='Search All Deals'
                style={styles.input}
                onChange={this.handleChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
    },
})

export default SearchBar;
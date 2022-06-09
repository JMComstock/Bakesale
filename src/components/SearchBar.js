import React from 'react';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet } from 'react-native';

class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: propTypes.func.isRequired,
        initialSearchTerm: propTypes.string.isRequired,
    };
    state = {
        searchTerm: '',
    };
    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        this.inputElement.blur();
    };
    debouncedSearchDeals = debounce(this.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    };
    render() {
        return (
            <TextInput
                ref={(inputElement) => { this.inputElement = inputElement }}
                value={this.state.searchTerm} 
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
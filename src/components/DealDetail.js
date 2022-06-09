import React from 'react';
import propTypes from 'prop-types';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, PanResponder, Animated, Dimensions, Linking, StyleSheet } from 'react-native';

import { priceDisplay } from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
    imageXPos = new Animated.Value(0);
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs.dx);
                Animated.timing(this.imageXPos, {
                    toValue: direction * width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            }
        },
    });

    handleSwipe = (indexDirection) => {
        if(!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        });
    }

    static propTypes = {
        intitalDealData: propTypes.object.isRequired,
        onBack: propTypes.func.isRequired,
    };
    state = {
        deal: this.props.intitalDealData,
        imageIndex: 0,
    };
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal: fullDeal,
        });
    }
    openDealUrl = () => {
        Linking.openURL(this.state.deal.url);
    };
    render() {
        const { deal } = this.state;
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Animated.Image
                    {...this.imagePanResponder.panHandlers}
                    source={{ uri: deal.media[this.state.imageIndex] }} 
                    style={[{ left: this.imageXPos }, styles.image]} 
                />
                <View>
                    <Text style={styles.title}>{deal.title}</Text>
                </View>    
                <ScrollView style={styles.detail}>
                    <View style={styles.footer}>
                        <View style={styles.info}>
                            <Text style={styles.cause}>{deal.cause.name}</Text>
                            <Text style={styles.price}>{priceDisplay(deal.price)}</Text> 
                        </View>
                        { deal.user && (
                            <View>
                                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                                <Text>{deal.user.name}</Text>
                            </View> 
                        )}
                    </View>    
                    <View style={styles.description}>
                        <Text>{deal.description}</Text>
                    </View>
                    <Button title="Buy this deal!" onPress={this.openDealUrl()} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deal: {
        marginBottom: 20,
    },
    backLink: {
        marginBottom: 5,
        color: '#22f',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    detail: {
        borderColor: '#bbb',
        borderWidth: 1,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    avatar: {
        width: 60,
        height: 60,
    }
})

export default DealDetail;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const pokeImgUrl = 'https://pokeres.bastionbot.org/images/pokemon/';
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      pokemons: [],
      pageLimit: 20
    };
  }

  componentDidMount(){
    this.getPokemonsList();
  }

  getPokemonsList = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.pageLimit}`);
      if(res){
        this.setState({
          isLoading: false,
          pokemons: [...this.state.pokemons, ...res.data.results]
        })
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  renderItem = ({item, index}) => {
    let imgUrl;
    imgUrl = pokeImgUrl + (index+1) + ".png";
    return <View style={styles.item}>
      <Image style={styles.image} resizeMode="contain" source={{uri: imgUrl}}></Image>
      <Text>{item.name}</Text>
    </View>
  }

  handleLoadMore = () => {
    this.setState({
      pageLimit: this.state.pageLimit + 20
    }, () => {
      this.getPokemonsList();
    })
  }

  renderFooter = () => {
    return <View>
      <ActivityIndicator animating size="large"></ActivityIndicator>
    </View>
  }

  render(){

    if(this.state.isLoading){
      return <View style={{flex: 1, padding: 20, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    }

    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            numColumns={2}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
            ListFooterComponent={this.renderFooter}
            style={styles.container}
            data={this.state.pokemons}
            renderItem={this.renderItem}
            keyExtractor={item=>`${item.url}-${Math.random()}-key-${item.name}`}
          />
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    shadowColor: "#444",
    margin: 5
  },
  image: {
    height: 150,
    width: 150
  }
});


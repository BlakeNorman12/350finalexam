
import React, {Component, useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';

import { CubeNavigationHorizontal} from 'react-native-3dcube-navigation';




const App = () => {
  
  const imageURL = 'https://picsum.photos/200'

  const renderItem = ({item}) => {
    return(
      <View>
        <Text style={styles.item}>{item.TrailName}</Text>
        <Text style={styles.item}>{item.StateName}</Text>
        <Text style={styles.item}>{item.Season}</Text>
        <Text style={styles.item}>{item.Category}</Text>
        <Image style={styles.image} source={{ uri: imageURL}}/>
      </View>
    )
  }

  const [data, setData] = useState('');

  function DisplayData(state, season, category) {
    var SearchAPIURL="http://10.0.2.2:80/api/displaydata.php";
    var State = state
    var Season = season
    var Category = category

    var Data={
      State: State,
      Season: Season,
      Category: Category,

    }

    fetch(SearchAPIURL,
      {
        method: 'POST',
        body: JSON.stringify(Data)
      }
    )
    .then((response) => response.json())
    .then(data => {
      setData(data);
    })
    
  }
  
  function SubmitData(name, state, season, category) {
    var Name = name;
    var State = state;
    var Season = season;
    var Category = category;
    

    var InsertAPIURL="http://10.0.2.2:80/api/inserttrail.php";
    var headers={
        'Accept':'application/json',
        'Content-Type':'application/json'
    };

    var Data={
      Name: Name,
      State: State,
      Season: Season,
      Category: Category,
     
    };

    fetch(InsertAPIURL,
      {
        method: 'POST',
        headers:headers,
        body: JSON.stringify(Data)
      }  
      )

  };

  function SearchItem(state, season, category) {

    var InsertAPIURL="http://10.0.2.2:80/api/searchitem.php";
    var headers = {
      'Accept':'application/json',
      'Content-Type':'application/json'
    };

    var Data = {
      State: state,
      Season: season,
      Category: category,
    };

    fetch(InsertAPIURL,
      {
        method: 'POST',
        headers:headers,
        body: JSON.stringify(Data)
      }
      )
    .then((response) => response.text())
    .then((response) => {
      if (response === 'works'){
        Alert.alert("That entry exists!")
        console.log("Successful")
      } else {
        Alert.alert("That entry does not exist.")
        console.log("Unsuccessful")
      }
    })
  }

  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };

  const handleSearchPress = (state, season, category) => {
    SearchItem(state, season, category);
    DisplayData(state, season, category);
  };

  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');


    return (
      <CubeNavigationHorizontal ref={view => {this.cube = view;}}>

      
        <View style={styles.slide}>
          <Text>ADD ITEM</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Name"
            placeholderTextColor="#000"
            onChangeText={(name) => {setName(name)}}
            />
          <TextInput
            style={styles.inputBox}
            placeholder="State"
            placeholderTextColor="#000"
            onChangeText={(state) => {setState(state)}}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Season"
            placeholderTextColor="#000"
            onChangeText={(season) => {setSeason(season)}}
            />
          <TextInput
            style={styles.inputBox}
            placeholder="Category"
            placeholderTextColor="#000"
            onChangeText={(category) => {setCategory(category)}}
            />
            <TouchableOpacity style={styles.submitButton} onPress={() => SubmitData(name, state, season, category)}><Text>Add item to Database</Text></TouchableOpacity>

        </View>
        
        <View style={styles.slide}>
          <Text>SEARCH ITEM</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="State"
            placeholderTextColor="#000"
            onChangeText={(state) => {setState(state)}}
           />
          <TextInput
            style={styles.inputBox}
            placeholder="Season"
            placeholderTextColor="#000"
            onChangeText={(season) => {setSeason(season)}}
            />
          <TextInput
            style={styles.inputBox}
            placeholder="Category"
            placeholderTextColor="#000"
            onChangeText={(category) => {setCategory(category)}}
            />
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSearchPress(state, season, category)}><Text>Search Item</Text></TouchableOpacity>
        </View>
        <View style={styles.slide}>
            <FlatList
              style={styles.flatList}
              data={data}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={item => item.ID}
              renderItem={renderItem}
          
            />
          

        </View>
        <View style={styles.slide}>
          <Text>MAP</Text>
        </View>
      </CubeNavigationHorizontal>
    )
  }


const styles = StyleSheet.create({

  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },

  inputBox: {
    backgroundColor: "#d42e22",
    borderRadius: 10,
    width: "75%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#4CAF50", 
    padding: 5,
    borderRadius: 10,
  },

  flatList: {
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 10,
    flexGrow: 1,
    flex: 1,
  },

  item: {
    fontSize: 10,
  },

  image: {
    width: 100,
    height: 100,
  },
})


export default (App);
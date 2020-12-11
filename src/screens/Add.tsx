import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Form, Item, Input, Button, H1} from 'native-base';

import shortId from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}: any): JSX.Element => {
  const [name, setName] = useState('');
  const [totalSeason, setTotalSeason] = useState('');

  const addToList = async () => {
    try {
      const seasonToWatch = {
        id: shortId.generate(),
        name,
        totalSeason,
        isWatched: false,
      };

      const storedValue: any = await AsyncStorage.getItem('@season_list');
      const previousList = await JSON.parse(storedValue);

      if (!previousList) {
        const newList = [seasonToWatch];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        previousList.push(seasonToWatch);
        await AsyncStorage.setItem(
          '@season_list',
          JSON.stringify(previousList),
        );
      }

      setName('');
      setTotalSeason('');

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <H1 style={styles.heading}>Add to watch List</H1>
          <Form>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Season Name"
                style={{color: '#eee'}}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Total Seasons"
                style={{color: '#eee'}}
                value={totalSeason}
                onChangeText={(text) => setTotalSeason(text)}
              />
            </Item>
            <Button rounded block onPress={addToList}>
              <Text style={{color: '#eee'}}>Add</Text>
            </Button>
          </Form>
        </ScrollView>
      </Container>
    </>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});

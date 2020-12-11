import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Fab,
  List,
  ListItem,
  Icon,
  Button,
  Body,
  Left,
  Right,
  Subtitle,
  CheckBox,
  H1,
  Text,
  Container,
  Title,
  Spinner,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}: any): JSX.Element => {
  const [listOfSeasons, setListofSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
    setLoading(true);
    const storedValue: any = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setListofSeasons([]);
    }

    const list = JSON.parse(storedValue);

    setListofSeasons(list);
    setLoading(false);
  };

  const deleteSeason = async (id: any) => {
    const newList = await listOfSeasons.filter((list: any) => list.id == id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListofSeasons(newList);
  };

  const markComplete = async (id: any) => {
    const newList: any = listOfSeasons.map((list: any) => {
      if (list.id == id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    setListofSeasons(newList);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <Container style={styles.container}>
          <Spinner color="#00b7c2" />
        </Container>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {listOfSeasons.length === 0 ? (
            <Container style={styles.container}>
              <H1 style={styles.heading}>
                Watch List is empty . Please add a season
              </H1>
            </Container>
          ) : (
            <>
              <H1 style={styles.heading}>Next Series to watch</H1>
              <List>
                {listOfSeasons.map((season: any) => (
                  <ListItem key={season.id} style={styles.listItem}>
                    <Left>
                      <Button
                        style={styles.actionButton}
                        danger
                        onPress={() => deleteSeason(season.id)}>
                        <Icon name="trash" active />
                      </Button>
                      <Button style={styles.actionButton}>
                        <Icon name="edit" type="Feather" active />
                      </Button>
                    </Left>
                    <Body>
                      <Title style={styles.seasonName}>{season.name}</Title>
                      <Text note>{season.totalSeason} seasons to watch</Text>
                    </Body>
                    <Right>
                      <CheckBox
                        checked={season.isWatched}
                        onPress={() => markComplete(season.id)}
                      />
                    </Right>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Fab
            style={{backgroundColor: '#5067FF'}}
            position="bottomRight"
            onPress={() => navigation.navigate('Add')}>
            <Icon name="add" />
          </Fab>
        </ScrollView>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

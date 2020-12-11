import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Add = () => {
  return (
    <>
      <SafeAreaView>
        <Text>This is the Add Page</Text>
        <Text>This is amazing</Text>
      </SafeAreaView>
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

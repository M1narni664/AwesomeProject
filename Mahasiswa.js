import React from 'react';
import Datamahasiswa from './data/mahasiswa.json';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserGraduate,
  faMars,
  faVenus
} from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = () => {
  return (
    <FlatList
      data={Datamahasiswa}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'google.navigation:q=' + item.latitude + ',' + item.longitude,
            )
          }>
          <View style={styles.card}>
            <View style={styles.avatar}>
              <FontAwesomeIcon
                icon={faUserGraduate}
                size={50}
                color={item.gender === 'male' ? 'lightblue' : 'pink'}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardtitle}>
                {item.first_name} {item.last_name}
              </Text>
              <FontAwesomeIcon
                icon={item.gender === 'male' ? faMars : faVenus}
                color={item.gender === 'male' ? 'lightblue' : 'pink'}
                size={14}
                style={styles.genderIcon}
              />
              <Text numberOfLines={1} style={styles.cardText}>{item.class}</Text>
              <Text numberOfLines={1} style={styles.cardText}>{item.email}</Text>
              <Text style={styles.cardText}>
                {item.latitude}, {item.longitude}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Mahasiswa;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  cardtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  genderIcon: {
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
  }
});

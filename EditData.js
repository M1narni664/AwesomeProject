import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditData = () => {
  const jsonUrl = 'http://192.168.201.228:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  // Fetch data from API
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  // Handle form submission for add/edit
  const submit = () => {
    const data = { first_name, last_name, kelas, gender, email };
    const method = selectedUser ? 'PATCH' : 'POST';
    const url = selectedUser ? `${jsonUrl}/${selectedUser.id}` : jsonUrl;

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert(selectedUser ? 'Data berhasil diperbarui!' : 'Data berhasil ditambahkan!');
        resetForm();
        refreshPage();
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  // Handle item selection for editing
  const selectItem = (item) => {
    setSelectedUser(item);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedUser(null);
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
  };

  // Delete user data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data berhasil dihapus!');
        refreshPage();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {selectedUser ? 'Edit Data Mahasiswa' : 'Tambah Data Mahasiswa'}
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama Depan"
            value={first_name}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Belakang"
            value={last_name}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Kelas"
            value={kelas}
            onChangeText={setKelas}
          />
          <TextInput
            style={styles.input}
            placeholder="Jenis Kelamin"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Button title={selectedUser ? 'Perbarui Data' : 'Tambah Data'} onPress={submit} />
          {selectedUser && <Button title="Batal" color="red" onPress={resetForm} />}
        </View>

        <FlatList
          style={{ marginTop: 20 }}
          data={dataUser}
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <FontAwesomeIcon icon={faGraduationCap} size={50} />
              </View>
              <View>
                <Text style={styles.cardtitle}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text>{item.kelas}</Text>
                <Text>{item.gender}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ marginHorizontal: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                      { text: 'Tidak', style: 'cancel' },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])
                  }>
                  <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    marginRight: 15,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
});

export default EditData;

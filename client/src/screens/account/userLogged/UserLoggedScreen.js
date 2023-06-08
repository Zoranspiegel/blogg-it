import { View, Text, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './userLoggedScreen.styles';
import { logOut, logToDb } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { iconsProfile } from '../../../utils/iconOptions';
import { useNavigation } from '@react-navigation/native';
import { MY_IP } from 'react-native-dotenv';

const UserLoggedScreen = () => {
  const dispatch = useDispatch();
  const [about, setAbout] = useState('');
  const [withAbout, setWithAbout] = useState(false);
  const loggedUser = useSelector(state => state.loggedUser);
  const navigation = useNavigation();

  useEffect(() => {
    loggedUser.about && setWithAbout(true);
  }, [])

  const handleAboutChange = (text) => {
    setAbout(text);
  };

  const handleAboutSubmit = () => {
    const aboutBody = {
      about,
    }
    fetch(`http://${MY_IP}:4000/api/users/update/${loggedUser.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aboutBody)
    })
      .then(res => {
        if (!res.ok) throw new Error('Something went wrong');
        dispatch(logToDb(loggedUser.userId));
        setWithAbout(true);
      })
      .catch(error => console.error(error));
    setAbout('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: loggedUser.profileImage }} style={styles.profileImage} />
      <Text style={styles.userName}>{loggedUser.userName}</Text>
      {loggedUser.about &&
        <View style={{width: '75%'}}>
          <Text style={{ color: '#f5f5f5', marginTop: 30 }}>{loggedUser.about}</Text>
        </View>}
      <View style={styles.subContainer}>
        {!withAbout && <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={'#f5f5f5'}
            placeholder='Habla de tí...' multiline
            style={styles.textInput}
            value={about}
            onChangeText={handleAboutChange}
          />
          <TouchableOpacity onPress={handleAboutSubmit}>
            {iconsProfile.submit}
          </TouchableOpacity>
        </View>}
        <TouchableOpacity>
          <View style={styles.links}>
            {iconsProfile.plus}
            <Text style={styles.linksText}>Agrega tus enlaces</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.links}>
            {iconsProfile.heart}
            <Text style={styles.linksText}>Me gusta</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.links}>
            {iconsProfile.saved}
            <Text style={styles.linksText}>Guardados</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
          dispatch(logOut());
        }}>
          <View style={styles.links}>
            {iconsProfile.logout}
            <Text style={styles.linksText}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserLoggedScreen;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';
import styles from './SearchScreen.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { iconsSearch } from '../../utils/iconOptions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardArticle from '../../component/home/cardArticle/CardArticle';
import { simpleTimeLapse } from '../../utils/timeLapse';
import { ModalLogin } from '../../component/shared/ModalLogin';

export const SearchScreen = () => {
  const articles = useSelector((state) =>
    state.articles.length ? state.articles : null
  );
  const [search, setSearch] = useState('');
  const [searchArticles, setSearchArticles] = useState([]);
  const [sort, setSort] = useState('all');
  const [touched, setTouched] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleChange = (text) => {
    setTouched(true);
    setSearch(text);
  };

  useEffect(() => {
    const foundArticles = search.length
      ? [...articles].filter((art) => art.title.toLowerCase().includes(search.toLowerCase()))
      : [];
    if (sort === 'popularity') {
      setSearchArticles(
        [...foundArticles].sort(
          (a, b) => b.postLikes.length - a.postLikes.length
        )
      );
    }
    if (sort === 'date') {
      setSearchArticles(
        [...foundArticles].sort(
          (a, b) => simpleTimeLapse(a.createdAt) - simpleTimeLapse(b.createdAt)
        )
      );
    }
    if (sort === 'all') {
      setSearchArticles(foundArticles);
    }
  }, [search, sort, articles]);

  if (!articles) return <View style={styles.container}></View>;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.inputGradient}
        colors={['#34aba6', '#131af8', '#9344ca']}
        start={[0, 0]}
        end={[1, 0]}
        locations={[0, 0.5, 1]}
      >
        <View style={styles.inputContainer}>
          {touched ? iconsSearch.glass.shaded : iconsSearch.glass.default}
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange}
            placeholder='Blogs...'
            placeholderTextColor={'#f5f5f5'}
            value={search}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setTouched(false);
              setSearch('');
            }}
          >
            {iconsSearch.cross}
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.sortBtnsContainer}>
        <TouchableOpacity
          style={sort === 'all' ? styles.sortBtnActive : styles.sortBtn}
          onPress={() => setSort('all')}
          activeOpacity={0.6}
        >
          <Text style={styles.sortBtnText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sort === 'date' ? styles.sortBtnActive : styles.sortBtn}
          onPress={() => setSort('date')}
          activeOpacity={0.6}
        >
          <Text style={styles.sortBtnText}>Más Recientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={sort === 'popularity' ? styles.sortBtnActive : styles.sortBtn}
          onPress={() => setSort('popularity')}
          activeOpacity={0.6}
        >
          <Text style={styles.sortBtnText}>Populares</Text>
        </TouchableOpacity>
      </View>
      {!searchArticles.length ? (
        <View style={{ alignItems: 'center' }}>
          {touched && <Text style={styles.noResults}>No se encontraron</Text>}
          {touched && <Text style={styles.noResults}>resultados...</Text>}
        </View>
      ) : (
        <FlatList
          data={searchArticles}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CardArticle setModalVisibility={setModalVisibility} item={item} />;
          }}
        />
      )}
      <ModalLogin
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </View>
  );
};

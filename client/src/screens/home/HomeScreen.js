import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Filters from "../../component/home/filtersHome/FiltersHome";
import CardArticle from "../../component/home/cardArticle/CardArticle";
import { ModalLogin } from "../../component/shared/ModalLogin";
import React, { useEffect, useState } from "react";
import { styles } from "./homeScreen.styles";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../redux/actions";
import { iconOptions } from "../../utils/iconOptions";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const filtered = useSelector((state) => state.filtered);
  const isLogged = useSelector((state) => {
    state.logged;
  });
  const img = useSelector((state) => state.loggedUser.profileImage);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          {img === undefined ? (
            <TouchableOpacity
              onPress={() => !isLogged && setModalVisibility(true)}
            >
              {iconOptions.account.focused}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigate("account")}>
              <Image source={{ uri: img }} style={styles.profilePh} />
            </TouchableOpacity>
          )}

          <Text style={styles.logo}>BlogIT</Text>
        </View>
        <Filters />
        <FlatList
          data={filtered.length ? filtered : articles}
          renderItem={({ item }) => (
            <CardArticle setModalVisibility={setModalVisibility} item={item} />
          )}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ModalLogin
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
      />
    </>
  );
};

export default HomeScreen;

import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import { styles } from "./filtersHomeStyles";
import { getCategory } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  const [currentCategory, setCurrentCategory] = useState("ALL");
  const sendData = (category) => {
    if (category === currentCategory) {
      setCurrentCategory("ALL");
    } else {
      setCurrentCategory(category);
    }
  };

  useEffect(() => {
    dispatch(getCategory(currentCategory));
  }, [articles]);

  useEffect(() => {
    dispatch(getCategory(currentCategory));
  }, [currentCategory]);
  return (
    <View style={styles.containerFilter}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => sendData("UX/UI")}
          style={
            currentCategory == "UX/UI"
              ? styles.btnFilterFocus
              : styles.btnFilter
          }
        >
          <Text style={styles.buttonText}>UX/UI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendData("FRONT-END")}
          style={
            currentCategory == "FRONT-END"
              ? styles.btnFilterFocus
              : styles.btnFilter
          }
        >
          <Text style={styles.buttonText}>Front-end</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sendData("BACK-END")}
          style={
            currentCategory == "BACK-END"
              ? styles.btnFilterFocus
              : styles.btnFilter
          }
        >
          <Text style={styles.buttonText}>Back-end</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => sendData("NO-CODE")}
          style={
            currentCategory == "NO-CODE"
              ? styles.btnFilterFocus
              : styles.btnFilter
          }
        >
          <Text style={styles.buttonText}>No-code</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default Filters;

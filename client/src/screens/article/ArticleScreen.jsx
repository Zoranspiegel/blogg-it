import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { MY_IP } from "react-native-dotenv";
import { ModalLogin } from "../../component/shared/ModalLogin.jsx";
import { iconsArticle } from "client/src/utils/iconOptions.js";
import { styles, tagsStyles } from "./ArticleScreen.styles";
import { useNavigation } from "@react-navigation/native";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import { formatDate, setReadingTime } from "../../utils/formatData";
import { useSelector, useDispatch } from "react-redux";
import {
  getDetails,
  setArticleLike,
  getArticles,
  logToDb,
  updateSaved,
} from "../../redux/actions";
import {
  useFonts,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Arimo_700Bold } from "@expo-google-fonts/arimo";
const systemFonts = [
  ...defaultSystemFonts,
  "Nunito_500Medium",
  "Nunito_700Bold",
  "Arimo_700Bold",
];
//SAVED_IMPORTS
import ModalSave from "../../component/home/ModalSave/ModalSave.js";

export default function ArticleScreen({ route }) {
  let [fontsLoaded] = useFonts({
    Nunito_500Medium,
    Nunito_700Bold,
    Arimo_700Bold,
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [saved, setSaved] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const article = useSelector((state) => state.details);
  const fetchStatus = useSelector((state) => state.details_fetch);
  const loggedUser = useSelector((state) => {
    return state.logged ? state.loggedUser : null;
  });
  //SAVED_STATES
  const [alert, setAlert] = useState(false);
  const data = useSelector((state) => {
    return {
      userId: state.loggedUser.userId,
      postId: state.details._id,
      images: state.details.images,
      saved: state.loggedUser.saved,
    };
  });

  // MOUNT_DETAILS
  useEffect(() => {
    dispatch(getDetails(route.params));
  }, []);

  // NAVIGATE_TO_COMMENTS
  const handleNavigateToComments = () => {
    if (!loggedUser) {
      setModalVisibility(true);
    } else {
      navigation.navigate("comments");
    }
  };

  // SET_FAVORITES_LOCALLY
  useEffect(() => {
    if (fetchStatus.status === "success" && loggedUser) {
      if (article.postLikes.includes(loggedUser._id)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [loggedUser, article]);

  // HANDLE_FAVORITES
  const handleFavorite = () => {
    if (!loggedUser) {
      setModalVisibility(true);
    } else {
      const body = { userId: loggedUser._id };
      fetch(`http://${MY_IP}:4000/api/posts/like/${article._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          dispatch(setArticleLike(loggedUser._id));
          dispatch(getArticles());
        }
      });
    }
  };

  // SAVE_ARTICLE
  const savedArticle = () => {
    if (!saved) {
      const savedBody = {
        postId: article._id,
        title: "Leer más tarde",
        images: article.images,
      };

      fetch(`http://${MY_IP}:4000/api/users/saved/${loggedUser.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedBody),
      })
        .then((res) => {
          if (res.ok) {
            dispatch(updateSaved(loggedUser.userId));
            setAlert(true); //Mostrar el modal alert
            setSaved(true); // Rellenar el ícono
            console.log("Se ha agregado a Leer mas tarde");
          } else {
            throw new Error("ha habido un error");
          }
        })
        .catch((err) => console.error(err));
    } else {
      deleteSaved(article._id);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      const answer = loggedUser.saved.some((folder) =>
        folder.posts.some((post) => post.postId === article._id)
      );
      setSaved(answer);
    }
  }, [loggedUser]);

  // LOADING_RENDER
  if (fetchStatus.status === "loading" || !fontsLoaded)
    return (
      <View
        style={{
          paddingTop: 150,
          backgroundColor: "#090841",
          alignItems: "center",
          flex: 1,
        }}
      ></View>
    );
  // ERROR_RENDER
  if (fetchStatus.status === "rejected")
    return (
      <View
        style={{
          backgroundColor: "#090841",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#f5f5f5" }}>
          Error:
        </Text>
        <Text style={{ fontSize: 30, color: "#f5f5f5" }}>
          {fetchStatus.error}
        </Text>
      </View>
    );

  const getFolderName = (postId) => {
    let folderName = null;
    loggedUser.saved.forEach((folder) => {
      const post = folder.posts.some((post) => post.postId === postId);
      if (post) {
        folderName = folder.title;
      }
    });
    return folderName;
  };

  const deleteSaved = (id) => {
    let folder = getFolderName(id);
    const deleteBody = {
      postId: id,
      title: folder,
    };

    fetch(`http://${MY_IP}:4000/api/users/delete-saved/${loggedUser.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteBody),
    })
      .then((res) => {
        if (res.ok) {
          dispatch(updateSaved(loggedUser.userId));
          setSaved(false); //Vaciar el ícono
          console.log("fue eliminado correctamente de " + folder);
        } else {
          throw new Error("ha habido un error");
        }
      })
      .catch((err) => console.error(err));
  };

  // ARTICLE_RENDER
  if (fetchStatus.status === "success")
    return (
      <>
        <View style={styles.headerView}>
          <View style={styles.authorView}>
            <Image
              source={{ uri: article.profileImage }}
              style={styles.authorImage}
            />
            <View>
              <Text style={styles.authorName}>{article.userName}</Text>
              <Text style={styles.timeDate}>
                {formatDate(article.createdAt)}
              </Text>
              <Text style={styles.timeDate}>
                {setReadingTime(article.content)}
              </Text>
            </View>
          </View>
          <View style={styles.icons}>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <TouchableWithoutFeedback onPress={handleNavigateToComments}>
                {iconsArticle.comment}
              </TouchableWithoutFeedback>
              <Text style={styles.iconCounters}>{article.comments.length}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableWithoutFeedback onPress={handleFavorite}>
                {!favorite
                  ? iconsArticle.heart.empty
                  : iconsArticle.heart.filled}
              </TouchableWithoutFeedback>
              <Text style={styles.iconCounters}>
                {article.postLikes.length}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() =>
                loggedUser ? savedArticle() : setModalVisibility(true)
              }
            >
              {saved ? iconsArticle.saved.focused : iconsArticle.saved.default}
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.imageView}>
            <ImageBackground
              source={{ uri: article.images }}
              imageStyle={{ borderRadius: 10, height: 156 }}
            ></ImageBackground>
          </View>
          <RenderHtml
            contentWidth={Dimensions.get("window").width}
            source={{ html: article.content }}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
          />
        </ScrollView>
        <ModalLogin
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
        />
        <ModalSave
          alert={alert}
          setAlert={setAlert}
          data={data}
          deleteSaved={deleteSaved}
        />
      </>
    );
}

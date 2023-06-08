import {
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  FontAwesome5,
  Feather
} from "@expo/vector-icons";

import { View } from 'react-native';

export const iconOptions = {
  home: {
    default: <MaterialCommunityIcons color='#f5f5f5' size={32} name="home-outline" />,
    focused: <MaterialCommunityIcons color='#37b4a1' size={32} name="home-outline" />,
  },
  search: {
    default: <MaterialIcons name="search" size={30} color='#f5f5f5' />,
    focused: <MaterialIcons name="search" size={30} color='#37b4a1' />,
  },
  saved: {
    default: <MaterialCommunityIcons color='#f5f5f5' size={28} name="bookmark-outline" />,
    focused: <MaterialCommunityIcons color='#37b4a1' size={28} name="bookmark-outline" />,
  },
  notifications: {
    default: <MaterialCommunityIcons color={'#f5f5f5'} size={24} name="bell-outline" />,
    focused: <MaterialCommunityIcons color='#37b4a1' size={24} name="bell-outline" />,
  },
  account: {
    default: <Ionicons color={'#f5f5f5'} size={24} name="person-outline" />,
    focused: <Ionicons color="#f5f5f5" size={24} name="person" />,
  },
};

export const iconsCard = {
  heart: {
    empty: <MaterialCommunityIcons name="cards-heart-outline" size={24} color="#f5f5f5" />,
    filled: <MaterialCommunityIcons name="cards-heart" size={24} color="#f5f5f5" />,
  },
  saved: {
    empty: <MaterialCommunityIcons color="white" size={26} style={{ marginLeft: 18 }} name="bookmark-outline" />,
    filled: <MaterialCommunityIcons color="white" size={26} style={{ marginLeft: 18 }} name="bookmark" />,
  },
  account: {
    default: <Ionicons color={"grey"} size={24} name="person-outline" />,
    focused: <Ionicons color="white" size={24} name="person" />,
    dots: <Entypo name="dots-three-vertical" size={24} color="#f5f5f5" />,
  },
  glass: {
    default: <Entypo name="magnifying-glass" size={24} color="black" />,
  },
};

export const iconsArticle = {
  account: {
    default: (
      <MaterialCommunityIcons
        color={"black"}
        size={60}
        name="account-circle-outline"
      />
    ),
    focused: (
      <MaterialCommunityIcons color={"black"} size={60} name="account-circle" />
    ),
  },
  heart: {
    empty: <Entypo name="heart-outlined" size={24} color="#f5f5f5" />,
    filled: <Entypo name="heart" size={24} color="#f5f5f5" />,
  },
  comment: (
    <FontAwesome5 name="comment" size={20} color="#f5f5f5" style={{ marginTop: 2 }} />
  ),
  saved: {
    default: (
      <MaterialCommunityIcons color="#f5f5f5" size={24} name="bookmark-outline" />
    ),
    focused: <MaterialCommunityIcons color="#f5f5f5" size={24} name="bookmark" />,
  },
  commentModal: (
    <Fontisto name="comment" size={20} color="white" style={{ marginTop: 3 }} />
  ),
  plus: <Entypo name="plus" size={24} color="white" />,
  cross: <Entypo name="cross" size={24} color="white" />,
};

export const iconsComments = {
  account: {
    default: (
      <MaterialCommunityIcons
        color={"black"}
        size={40}
        name="account-circle-outline"
      />
    ),
    focused: (
      <MaterialCommunityIcons color={"black"} size={40} name="account-circle" />
    ),
  },
  heart: {
    empty: <Entypo name="heart-outlined" size={24} color="#f5f5f5" style={{marginTop: -2, marginRight: 6 }} />,
    filled: <Entypo name="heart" size={24} color="#f5f5f5" style={{marginTop: -2, marginRight: 6 }} />,
  },
  comment: (
    <FontAwesome5 name="comment" size={20} color="#f5f5f5" style={{ marginRight: 6 }} />
  ),
  saved: {
    default: <MaterialCommunityIcons color="white" size={24} name="bookmark-outline" />,
    focused: <MaterialCommunityIcons color="white" size={24} name="bookmark" />,
  },
  commentModal: (
    <Fontisto name="comment" size={20} color="white" style={{ marginTop: 3 }} />
  ),
  plus: <Entypo name="plus" size={24} color="white" />,
  cross: <Entypo name="cross" size={24} color="white" />,
  send: <MaterialCommunityIcons name="send-circle" size={30} color="#f05" />,
  dots: <Entypo name="dots-three-horizontal" size={16} color="#f5f5f5" />,
  trash: <FontAwesome5 name="trash-alt" size={16} color="#f5f5f5" />,
  edit: <FontAwesome5 name="edit" size={16} color="#f5f5f5" />
};

export const iconsProfile = {
  plus: <AntDesign name="plus" size={24} color="#f5f5f5" />,
  heart: <Entypo name="heart-outlined" size={24} color="#f5f5f5"/>,
  saved: <MaterialCommunityIcons color="#f5f5f5" size={24} name="bookmark-outline" />,
  logout: <Ionicons name="power" size={22} color="#f5f5f5" style={{ marginLeft: 2 }}/>,
  submit: <MaterialCommunityIcons name="send-circle-outline" size={24} color="#f5f5f5" style={{marginTop: 2, marginRight: 3}} />,
};

export const iconsSearch = {
  cross: <Feather name="x" size={24} color="#f5f5f5" />,  
  glass: {
    default: <MaterialIcons name="search" size={20} color="#f5f5f5" style={{marginRight: 5}} />,
    shaded: <MaterialIcons name="search" size={20} color="#959595" style={{marginRight: 5}} />
  },
}

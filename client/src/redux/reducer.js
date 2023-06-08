import {
  GET_ARTICLES,
  ARTICLES_PENDING,
  ARTICLES_REJECTED,
  DETAILS_PENDING,
  DETAILS_REJECTED,
  GET_DETAILS,
  SET_ARTICLE_LIKE,
  SET_ARTICLE_LIKE2,
  LOG_TO_DB,
  LOG_OUT,
  GET_CATEGORY,
  UPDATE_SAVED,
} from "./actions";

const initialState = {
  authors: [],
  blogs: [],
  articles: [],
  filtered: [],
  articles_fetch: {
    status: "idle",
    error: null,
  },
  details: {},
  details_fetch: {
    status: "idle",
    error: null,
  },
  loggedUser: {},
  logged: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ARTICLES_PENDING:
      return {
        ...state,
        articles_fetch: { status: "loading", error: null },
      };
    case ARTICLES_REJECTED:
      return {
        ...state,
        articles_fetch: { status: "rejected", error: action.payload },
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles_fetch: { status: "success", error: null },
        articles: action.payload,
      };
    case DETAILS_PENDING:
      return {
        ...state,
        details_fetch: { status: "loading", error: null },
      };
    case DETAILS_REJECTED:
      return {
        ...state,
        details_fetch: { status: "rejected", error: action.payload },
      };
    case GET_DETAILS:
      return {
        ...state,
        details_fetch: { status: "success", error: null },
        details: action.payload,
      };
    case LOG_TO_DB:
      return {
        ...state,
        loggedUser: action.payload,
        logged: true,
      };
    case UPDATE_SAVED:
      return {
        ...state,
        loggedUser: { ...state.loggedUser, saved: action.payload },
      };
    case LOG_OUT:
      return {
        ...state,
        loggedUser: initialState.loggedUser,
        logged: initialState.logged,
      };
    case GET_CATEGORY:
      if (action.payload === "ALL") {
        return {
          ...state,
          filtered: [],
        };
      }
      return {
        ...state,
        filtered: [...state.articles].filter((obj) =>
          action.payload.includes(obj.category)
        ),
      };

    case SET_ARTICLE_LIKE:
      return {
        ...state,
        details: {
          ...state.details,
          postLikes: state.details.postLikes.includes(action.payload)
            ? [...state.details.postLikes].filter((lk) => lk !== action.payload)
            : [...state.details.postLikes, action.payload],
        },
      };
    case SET_ARTICLE_LIKE2:
      const { userId, articleId } = action.payload;
      return {
        ...state,
        articles: state.articles.map((art) => {
          if (art._id === articleId) {
            return art.postLikes.includes(userId)
              ? {
                  ...art,
                  postLikes: art.postLikes.filter((id) => id !== userId),
                }
              : { ...art, postLikes: [...art.postLikes, userId] };
          }
          return art;
        }),
      };

    default:
      return { ...state };
  }
}

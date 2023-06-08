import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Modal,
  Dimensions,
  Alert
} from 'react-native';
import { styles } from './CommentsScreen.styles';
import { iconsComments } from '../../../utils/iconOptions';
import { useSelector, useDispatch } from 'react-redux';
import { getDetails } from '../../../redux/actions';
import { timeLapse } from '../../../utils/timeLapse';
import { LinearGradient } from 'expo-linear-gradient';
import { MY_IP } from 'react-native-dotenv';

const replyInitialState = {
  status: false,
  receiver: '',
  commentId: '',
};

const editInitialState = {
  status: false,
  type: '',
  // commentId: '',
};

const { width } = Dimensions.get('window');

export default function CommentsScreen() {
  const dispatch = useDispatch();
  const { comments, _id } = useSelector((state) => state.details);
  const loggedUser = useSelector((state) => {
    return state.logged ? state.loggedUser : null;
  });
  const inputRef = useRef(null);
  const commentListRef = useRef(null);
  const replyListRef = useRef(null);
  const [replying, setReplying] = useState(replyInitialState);
  const [articleComment, setArticleComment] = useState('');
  const [reply, setReply] = useState('');
  const [repliesVisibility, setRepliesVisibility] = useState('');
  const [editDelete, setEditDelete] = useState('');
  const [deletionType, setDeletionType] = useState('');
  const [deteleVisibility, setDeteleVisibility] = useState(false);
  const [editing, setEditing] = useState(editInitialState);

  // COMMENT_SCROLLING (EVALUATE)
  useEffect(() => {
    if (!repliesVisibility && comments.length > 0) {
      commentListRef.current.scrollToEnd({ animated: true });
    }
  }, [comments]);

  // HANDLE_COMMENT_CHANGE
  const handleArticleCommentChange = (text) => {
    setArticleComment(text);
  };

  // POST_COMMENT
  const handleArticleCommentSubmit = () => {
    if (editing.status && editing.type === 'comment') {
      Keyboard.dismiss();
      const editBody = { comment: articleComment };
      setArticleComment('');
      fetch(`http://${MY_IP}:4000/api/comments/update/${editing.editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(editBody)
      })
        .then(res => {
          if (!res.ok) throw new Error('Something went wrong');
          dispatch(getDetails(_id));
        })
        .catch(error => {
          console.error(error);
          dispatch(getDetails(_id));
        })
        setEditing(editInitialState);
    } else if (editing.status && editing.type === 'reply') {
      Keyboard.dismiss();
      const editBody = { comment: articleComment };
      setArticleComment('');
      fetch(`http://${MY_IP}:4000/api/comments/reply-update/${editing.editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(editBody)
      })
        .then(res => {
          if (!res.ok) throw new Error('Something went wrong');
          dispatch(getDetails(_id));
        })
        .catch(error => {
          console.error(error.message);
          dispatch(getDetails(_id));
        })
        setEditing(editInitialState);
    } else {
      Keyboard.dismiss();
      const commentBody = {
        postId: _id,
        userId: loggedUser._id,
        userName: loggedUser.userName,
        comment: articleComment,
        profileImage: loggedUser.profileImage,
      };
      setArticleComment('');
      fetch(`http://${MY_IP}:4000/api/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentBody),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Something went wrong');
          dispatch(getDetails(_id));
        })
        .catch(() => dispatch(getDetails(_id)));
    }
  };

  // LIKE/UNLIKE_COMMENT
  const handleLikeComment = (commentId) => {
    const likeCommentBody = {
      userId: loggedUser._id,
      commentId,
    };
    fetch(`http://${MY_IP}:4000/api/comments/like/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeCommentBody),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong');
        dispatch(getDetails(_id));
      })
      .catch(() => dispatch(getDetails(_id)));
  };

  // LIKE/UNLIKE_REPLY
  const handleLikeReply = (commentId, replyCommentId) => {
    const likeReplyBody = {
      userId: loggedUser._id,
      replyCommentId,
    };

    fetch(`http://${MY_IP}:4000/api/comments/reply/like/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeReplyBody),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong');
        dispatch(getDetails(_id));
      })
      .catch(() => dispatch(getDetails(_id)));
  };

  // HANDLE_REPLIES_VISIBILITY
  const handleRepliesVisibility = (commentId) => {
    setRepliesVisibility(commentId);
  };

  // SET_REPLY_INPUT_FOCUS
  const handleReply = (comment) => {
    setEditing(editInitialState);
    setArticleComment('');
    setReplying({
      status: true,
      receiver: comment.userName,
      commentId: comment._id,
    });
    setReply(`@${comment.userName} `);
    inputRef.current.focus();
  };

  // SET_REPLY_REPLY_INPUT_FOCUS
  const handleReplyReply = (reply) => {
    setEditing(editInitialState);
    setArticleComment('');
    setReplying({
      status: true,
      receiver: reply.userName,
      commentId: reply.commentId,
    });
    setReply(`@${reply.userName} `);
    inputRef.current.focus();
  };

  // HANDLE_REPLY_CHANGE
  const handleReplyChange = (text) => {
    setReply(text);
  };

  // POST_REPLY
  const handleReplySubmit = () => {    
    Keyboard.dismiss();
    const replyBody = {
      userId: loggedUser._id,
      userName: loggedUser.userName,
      comment: reply,
      profileImage: loggedUser.profileImage,
    };
    fetch(`http://${MY_IP}:4000/api/comments/reply/${replying.commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyBody),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong');
        dispatch(getDetails(_id));
      })
      .catch(() => dispatch(getDetails(_id)));
      setRepliesVisibility(replying.commentId);
      setReplying(replyInitialState);
  };

  // DELETE_COMMENT/REPLY
  const deleteComment = () => {
    if (deletionType === 'comment') {
      fetch(`http://${MY_IP}:4000/api/comments/delete/${editDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        }})
        .then(res => {
          if (res.ok) dispatch(getDetails(_id));
          else throw new Error('No response from server')
        })
        .catch(error => console.error(error));
    } else if (deletionType === 'reply') {
      fetch(`http://${MY_IP}:4000/api/comments/reply-delete/${editDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }})
      .then(res => {
        if (res.ok) dispatch(getDetails(_id));
        else throw new Error('No response from server')
      })
      .catch(error => console.error(error));
    } else {
      console.error('Invalid deletion process')
    }
    setDeteleVisibility(false);
  };

  const handleEditing = (comment, editingId, type) => {
    setReplying(replyInitialState);
    setEditing({
      status: true,
      type,
      editingId,
    });
    setArticleComment(comment);
    inputRef.current.focus();
  }

  return (
    <View style={styles.container}>
      {!comments.length ? (
        <View style={styles.noCommentView}>
          <Text style={styles.noCommentText}>
            ¡Hola, {loggedUser.userName}!
          </Text>
          <Text>{'\n'}</Text>
          <Text style={styles.noCommentText}>El primer comentario está</Text>
          <Text style={styles.noCommentText}>esperando por tí.</Text>
          <Text>{'\n\n\n\n'}</Text>
        </View>
      ) : (
        <FlatList
          ref={commentListRef}
          data={comments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.commentView}>
                <View style={styles.authorView}>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{ uri: item.profileImage }}
                  />
                  <View>
                    <View style={{flex: 1, width: width * 0.80, flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={styles.authorName}>{item.userName}</Text>
                      {editDelete === item._id
                        ? <View style={{flexDirection: 'row', gap: 30}}>
                            <TouchableOpacity onPress={() => {
                              setDeletionType('comment')
                              setDeteleVisibility(true);
                            }}>
                              {iconsComments.trash}
                            </TouchableOpacity>
                            {/* UNDER_DEV */}
                            <TouchableOpacity onPress={() => handleEditing(item.comment, item._id, 'comment')}>
                              {iconsComments.edit}
                            </TouchableOpacity>
                          </View>
                        : <TouchableOpacity onPress={() => setEditDelete(item._id)}>
                            {loggedUser.userName === item.userName && iconsComments.dots}
                          </TouchableOpacity>
                      }                      
                    </View>
                    <Text style={styles.timeLapse}>
                      {timeLapse(item.createdAt)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
                <View style={styles.footerIcons}>
                  <View style={styles.likeResIcons}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => handleLikeComment(item._id)}
                      >
                        {item.commentLikes.includes(loggedUser._id)
                          ? iconsComments.heart.filled
                          : iconsComments.heart.empty}
                      </TouchableOpacity>
                      <Text style={{ color: '#f5f5f5', fontSize: 13 }}>
                        {item.commentLikes.length}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => handleRepliesVisibility(item._id)}
                      >
                        {iconsComments.comment}
                      </TouchableOpacity>
                      <Text style={{ color: '#f5f5f5', fontSize: 13 }}>
                        {item.replyComment.length}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.responseBtn}>
                    <TouchableOpacity onPress={() => handleReply(item)}>
                      <Text style={{ color: '#f5f5f5' }}>Responder</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {repliesVisibility === item._id &&
                  item.replyComment.length > 0 && (
                    <View style={styles.repliesView}>
                      <FlatList
                        ref={replyListRef}
                        data={item.replyComment.map((r) => {
                          return { ...r, commentId: item._id };
                        })}
                        keyExtractor={(reply) => reply._id.toString()}
                        renderItem={({ item }) => {
                          return (
                            <View style={{ marginTop: '3%' }}>
                              <View style={styles.authorView}>
                                <Image
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                  }}
                                  source={{ uri: item.profileImage }}
                                />
                                <View>
                                  <View style={{flex: 1, width: width * 0.74, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.authorName}>{item.userName}</Text>
                                    {editDelete === item._id
                                      ? <View style={{flexDirection: 'row', gap: 30}}>
                                          <TouchableOpacity onPress={() => {
                                            setDeletionType('reply');
                                            setDeteleVisibility(true);
                                          }}>
                                            {iconsComments.trash}
                                          </TouchableOpacity>
                                          <TouchableOpacity onPress={() => handleEditing(item.comment, item._id, 'reply')}>
                                            {iconsComments.edit}
                                          </TouchableOpacity>
                                        </View>
                                      : <TouchableOpacity onPress={() => setEditDelete(item._id)}>
                                          {loggedUser.userName === item.userName && iconsComments.dots}
                                        </TouchableOpacity>
                                    }
                                  </View>
                                  <Text style={styles.timeLapse}>
                                    {timeLapse(item.createdAt)}
                                  </Text>
                                </View>
                              </View>
                              <Text style={styles.replyText}>
                                {item.comment}
                              </Text>
                              <View style={styles.footerIcons}>
                                <View style={styles.likeResIcons}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleLikeReply(
                                          item.commentId,
                                          item._id
                                        )
                                      }
                                    >
                                      {item.commentLikes.includes(
                                        loggedUser._id
                                      )
                                        ? iconsComments.heart.filled
                                        : iconsComments.heart.empty}
                                    </TouchableOpacity>
                                    <Text style={{ color: '#f5f5f5' }}>
                                      {item.commentLikes.length}
                                    </Text>
                                  </View>
                                </View>
                                <View style={styles.responseBtn}>
                                  <TouchableOpacity
                                    onPress={() => handleReplyReply(item)}
                                  >
                                    <Text style={{ color: '#f5f5f5' }}>
                                      Responder
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </View>
                  )}
              </View>
            );
          }}
        />
      )}
      {replying.status && (
        <View style={styles.overInput}>
          <Text style={styles.overInputText}>Respondiendo a {replying.receiver}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setReplying(replyInitialState);
              Keyboard.dismiss();
            }}
          >
            <Text style={{ fontSize: 18, color: '#f5f5f5' }}>x</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      {editing.status && (
        <View style={styles.overInput}>
          <Text style={styles.overInputText}>Editando {editing.type === 'reply' && "respuesta"}{editing.type === 'comment' && "comentario"}...</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setEditing(editInitialState);
              setArticleComment('');
              Keyboard.dismiss();
            }}
          >
            <Text style={{ fontSize: 18, color: '#f5f5f5' }}>x</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.commentContainer}>
        <LinearGradient
          colors={['#34aba6', '#131af8', '#9344ca']}
          start={[0, 0]}
          end={[1, 0]}
          locations={[0, 0.5, 1]}
          style={{ flex: 1, marginVertical: 12, minHeight: 26 + (20 * articleComment.split('\n').length) ,borderRadius: 15 }}
        >
          <TextInput
            ref={inputRef}
            style={styles.commentInput}
            placeholder={
              replying.status
                ? '¿Cuál es tu respuesta?'
                : '¿Cuál es tu opinión?'
            }
            placeholderTextColor={'#f5f5f5'}
            multiline={true}
            onChangeText={
              replying.status ? handleReplyChange : handleArticleCommentChange
            }
            value={replying.status ? reply : articleComment}
          />
        </LinearGradient>
        <TouchableOpacity
          disabled={!articleComment.length && !reply.length}
          onPress={
            replying.status ? handleReplySubmit : handleArticleCommentSubmit
          }
        >
          <View style={{ backgroundColor: '#3a3969', borderRadius: 20 }}>
            {articleComment.length || reply.length ? (
              <Image
                source={require('../../../../assets/send-active.png')}
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <Image
                source={require('../../../../assets/send-inactive.png')}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Modal visible={deteleVisibility} transparent>
        <View style={styles.modalDeleteBack}>
          <View style={styles.modalDeleteFront}>
            <Text style={styles.modalDeleteText1}>¿Esta publicación</Text>
            <Text style={styles.modalDeleteText1}>no te gusta?{'\n'}</Text>
            <Text style={styles.modalDeleteText2}>¿Estás seguro que ya no</Text>
            <Text style={styles.modalDeleteText2}>te gusta esta publicación?{'\n'}</Text>
            <View style={{alignItems: 'stretch', backgroundColor: '#37b4a1'}}>
              <TouchableOpacity onPress={deleteComment} activeOpacity={0.5} style={styles.modalDeleteBtn}>
                <Text style={styles.modalDeleteText1}>Si</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDeteleVisibility(false)} activeOpacity={0.5} style={styles.modalDeleteBtn}>
                <Text style={styles.modalDeleteText1}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

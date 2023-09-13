import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, color, userID } = route.params;  // Get the name and selected background color for the chat
  const [messages, setMessages] = useState([]);
  
  let unsubMessages;
  
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);


  // useEffect(() => {
  //   // Set initial example messages
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://picsum.photos/140'
  //       },
  //       // location: {
  //         //   latitude: 48.864601,
  //         //   longitude: 2.398704,
  //         // },
  //       },
  //       {
  //         _id: 2,
  //         text: 'This is a system message',
  //         createdAt: new Date(),
  //         system: true,
  //       },
  //     ]);
  //   }, []);
    
    useEffect(() => {
      if (isConnected === true) {
        if (unsubMessages) {
          unsubMessages();
        }
        unsubMessages = null;
        
        // Listen for new messages in Firestore
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (querySnapshot) => {
          let newMessages = [];
          querySnapshot.forEach((doc) => {
            newMessages.push({
              _id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            });
          });
          setMessages(newMessages);
          cacheMessages(newMessages); // Cache the new messages
        });
      } else {
        loadCachedMessages();
      }
      
      return () => {
        if (unsubMessages) {
          unsubMessages();
        }
      };
    }, [db, isConnected]);

        // Load cached messages from AsyncStorage
    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
      setMessages(JSON.parse(cachedMessages));
    };

    // Cache messages in AsyncStorage
    const cacheMessages = async (messages) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error caching messages:', error);
      }
    };

        // Function to handle sending new messages
    const onSend = (newMessages) => {
      console.log('onSend function called with:', newMessages);
      addDoc(collection(db, "messages"), newMessages[0]);
    }

        // Custom rendering of the input toolbar based on network connectivity
    const renderInputToolbar = (props) => {
      if (isConnected) 
        return <InputToolbar {...props} />;
      else return null;
    }

    // Custom styling for chat message bubbles
    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

    
    // Custom actions for additional functionality (e.g., attaching images)
    const renderCustomActions = (props) => {
      return <CustomActions onSend={onSend} userID={userID} storage={storage} {...props} />;
    };


    
    // Custom rendering for map location messages
    const renderCustomView = (props) => {
      const { currentMessage} = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      }
      return null;
    }
    
    
    
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
      {/* GiftedChat component for rendering the chat interface */}
      
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        onSend={(messages) => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{
          _id: userID, // Extract the user ID from route.params
          name: name,  // Extract the name from route.params
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;

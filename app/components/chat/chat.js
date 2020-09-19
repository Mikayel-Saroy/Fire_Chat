import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import firebase from 'firebase';
import {tracked} from "@glimmer/tracking";


export default class ChatChatComponent extends Component {
  @service firebaseApp;
  @service store;
  @service local;

  @tracked currentMessage = "";

  @action addMessage() {
    if (this.currentMessage.trim()) {
      firebase.firestore().collection("chat").add({
        username: this.local.myUserName,
        message: this.currentMessage,
      });
    }
    this.currentMessage = "";
  }

  @action getChatData() {
    firebase.firestore().collection("chat").onSnapshot((snapshot) => {
      this.local.chatData = [];
      snapshot.docs.map(doc => {
          let usernameWithUpperCase = doc.data().username[0].toUpperCase().concat(doc.data().username.slice(1));
          let isMyMessage;
          isMyMessage = this.local.myUserName.toUpperCase() === doc.data().username.toUpperCase();
          this.local.chatData.push({
            id: doc.id,
            username: usernameWithUpperCase,
            message: doc.data().message,
            isMyMessage: isMyMessage,
          });
        }
      )
    })
  }
}

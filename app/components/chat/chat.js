import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import firebase from 'firebase';
import {tracked} from "@glimmer/tracking";

const MAIL_EXTENSION = "@gmail.com";

export default class ChatChatComponent extends Component {
  @service firebaseApp;
  @service store;
  @service local;
  @service session;

  @tracked currentMessage = "";


  @action
  addMessage() {
    firebase.firestore().collection("chat").onSnapshot((snapshot) => {
      snapshot.docs.map(doc => {
          if (doc.data().username === this.session.data.authenticated.user.email) {
            this.local.myUserName = doc.data().username;
          }
        }
      )
    })
    if (this.currentMessage.trim()) {
      this.local.myUserName = this.session.data.authenticated.user.email
      firebase.firestore().collection("chat").add({
        username: this.local.myUserName,
        message: this.currentMessage,
        date: Date.now(),
      });
    }
    this.currentMessage = "";

    // console.log('----');
    // const container = document.querySelector(".abdul");
    // console.log(container);
    // console.log(container.scrollHeight);
    // container.scrollTo(0, container.scrollHeight);
  }

  @action
  getChatData() {
    document.addEventListener('keydown', (e) => {
      if (e.key === "Enter") {
        this.addMessage();
      }
    });
    firebase.firestore().collection("chat").orderBy("date").onSnapshot((snapshot) => {
      this.local.chatData = [];
      snapshot.docs.map(doc => {
          if (doc.data().username === this.session.data.authenticated.user.email) {
            this.local.myID = doc.id;
            this.local.myUserName = doc.data().username;
          }
          let usernameWithUpperCase = doc.data().username[0].toUpperCase().concat(doc.data().username.slice(1));
          let isMyMessage;
          isMyMessage = this.local.myUserName.toUpperCase() === doc.data().username.toUpperCase();
          this.local.chatData.push({
            id: doc.id,
            username: usernameWithUpperCase,
            message: doc.data().message,
            date: doc.data().date,
            isMyMessage: isMyMessage,
          });
        }
      )
    })
  }
}

import Component from '@glimmer/component';
import {action} from '@ember/object';
import firebase from 'firebase/app';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';


const HIDE_TYPE = "password";
const SHOW_TYPE = "text";
const HIDE_PASS = "hide";
const SHOW_PASS = "show";
const DEFAULT_MAIL_EXTENSION = "@gmail.com";

export default class LoginLoginComponent extends Component {
  @service session;
  @service firebaseApp;
  @service router;
  @service local;
  @service store;

  @tracked username = "mikayel";
  @tracked password = "qwerty";
  @tracked passwordType = HIDE_TYPE;
  @tracked passwordTypeButtonName = SHOW_PASS;

  @action
  changePasswordType() {
    if (this.passwordType === HIDE_TYPE) {
      this.passwordType = SHOW_TYPE;
      this.passwordTypeButtonName = HIDE_PASS;
    } else {
      this.passwordType = HIDE_TYPE;
      this.passwordTypeButtonName = SHOW_PASS;
    }
  }

  @action setActiveStatus() {
    firebase.firestore().collection("userData").doc(this.local.myID).set({
      isActive: true,
      username: this.username.toLowerCase(),
    });
  }

  @action getID() {
    firebase.firestore().collection("userData").onSnapshot((snapshot) => {
      snapshot.docs.map(doc => {
        // console.log(`${doc.data().username} - ${this.username}`);
        if (doc.data().username.toUpperCase() === this.username.toUpperCase()) {
          this.local.myID = doc.id;
        }
      });
      // console.log(this.local.myID);
      this.setActiveStatus();
    });
  }

  @action
  async signIn() {
    const auth = await this.firebaseApp.auth();
    try {
      await auth.signInWithEmailAndPassword(this.username + DEFAULT_MAIL_EXTENSION, this.password);
      this.local.myUserName = this.username;
      this.router.transitionTo('auth');
      this.getID();

      // firebase.firestore().collection("userData").doc(doc.id).set({
      //   isActive: true,
      //   username: this.local.myUserName,
      // });
    } catch (error) {
      console.log(error);
    }
  }
}

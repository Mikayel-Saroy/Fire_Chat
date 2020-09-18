import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import firebase from 'firebase';
import {tracked} from '@glimmer/tracking';

const HIDE_TYPE = "password";
const SHOW_TYPE = "text";
const HIDE_PASS = "hide";
const SHOW_PASS = "show";
const DEFAULT_MAIL_EXTENSION = "@gmail.com";


export default class RegistrationRegistrationComponent extends Component {
  @service session;
  @service firebaseApp;
  @service router;
  @service local;

  @tracked username;
  @tracked password;
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

  @action
  createUserData() {
    firebase.firestore().collection("userData").add({
      username: this.username,
      isActive: true,
    });
  }

  @action
  async submitData() {
    const auth = await this.firebaseApp.auth();
    try {
      await auth.createUserWithEmailAndPassword(this.username + DEFAULT_MAIL_EXTENSION, this.password);
      this.local.myUserName = this.username;
      this.local.isActive = true;
      this.createUserData();
      this.router.transitionTo('');
    } catch (error) {
      console.log(error);
    }
  }
}


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
  async signIn() {
    const auth = await this.firebaseApp.auth();
    try {
      await auth.signInWithEmailAndPassword(this.username + DEFAULT_MAIL_EXTENSION, this.password);
      this.local.myUserName = this.username;
      this.local.isActive = true;
      this.router.transitionTo('');
    } catch (error) {
      console.log(error);
    }
  }
}

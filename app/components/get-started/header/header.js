import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {inject as service} from "@ember/service";
import {action} from "@ember/object";
import firebase from 'firebase';

export default class HeaderHeaderComponent extends Component {
  @tracked collapsed = true;
  @service session;
  @service router;
  @service local;
  @service firebaseApp;
  @service store;

  @action changeActiveStatus() {
    firebase.firestore().collection("userData").doc(this.local.myID).set({
        isActive: false,
        username: this.local.myUserName,
      }
    );
  }

  @action
  async logout() {
    await this.session.invalidate();
    this.router.transitionTo("login");
    // console.log(this.local.myID);
    // setInterval(() => {
      this.changeActiveStatus();
    // }, 1000);
  }

  @action testFunction() {
    console.log(`isAuthenticated: ${this.session.isAuthenticated}`);
    console.log(`myUserName: ${this.local.myUserName}`);
    console.log(`myID: ${this.local.myID}`);
  }
}

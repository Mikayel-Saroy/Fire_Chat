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

  @action
  async logout() {
    console.log(this.local.myID);
    firebase.firestore().collection("userData").onSnapshot((snapshot) => {
      snapshot.docs.map(doc => {
          if (doc.id === this.local.myID) {
            console.log(doc.data().isActive);
            doc.data().isActive = false;
            console.log(doc.data().isActive);
          }
        }
      )
    })
    await this.session.invalidate();
    // const user = await this.store.findRecord("userData", this.local.myID);
    // console.log(user);
    // user.isActive = false;
    // user.save();

    //    const post = await this.store.findRecord('post', this.local.currentID);
    //       post.title = this.local.currentTitle;
    //       post.body = this.local.currentBody;
    //       post.save();
  }

  @action testFunction() {
    console.log(`isAuthenticated: ${this.session.isAuthenticated}`);
    console.log(`myUserName: ${this.local.myUserName}`);
    console.log(`myID: ${this.local.myID}`);
  }
}

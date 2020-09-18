import Component from '@glimmer/component';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import firebase from 'firebase';

export default class UsersUsersComponent extends Component {
  @service firebaseApp;
  @service store;
  @service local;

  @action getUsernames() {
    firebase.firestore().collection("userData").onSnapshot((snapshot) => {
      this.local.usersData = [];
      snapshot.docs.map(doc => {

          console.log(doc.data().username);
          if (doc.data().username.toLowerCase() === this.local.myUserName.toLowerCase()) {
            this.local.myID = doc.id;
          }
          this.local.usersData.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      )
    })
  }
}

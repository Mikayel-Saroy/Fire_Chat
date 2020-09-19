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
          // console.log(doc.data().username);
          // if (doc.data().username.toUpperCase() === this.local.myUserName.toUpperCase()) {
          //   this.local.myID = doc.id;
          // }
          let usernameWithUpperCase = doc.data().username[0].toUpperCase().concat(doc.data().username.slice(1));
          console.log(usernameWithUpperCase);
          this.local.usersData.push({
            id: doc.id,
            username: usernameWithUpperCase,
            isActive: doc.data().isActive,
          });
        }
      )
    })
  }
}

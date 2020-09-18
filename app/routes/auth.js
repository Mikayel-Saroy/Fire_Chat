import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class AuthRoute extends Route {
  @service session;
  @service store;
  @service local;

  beforeModel(transition) {
    if (!this.session.isAuthenticated) {
      this.transitionTo("");
    }
  }

  // model() {
  //   return this.store.query('testUser', {query: ref => ref});
  // }
}

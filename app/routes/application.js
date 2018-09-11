import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  beforeModel() {
    // nezavola se mi pri loginu 
    
    return this.get('session').fetch().then(data => {
      return this.store.findRecord('user', this.get('session.currentUser.uid')).then(user => {
        this.set('session.content.loggedUser', user);
        console.log('Logged user data loaded.')
      }).catch(error => console.log(error));
    }).catch(() => {
      this.transitionTo('login');
    });
  }
});

import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default Route.extend({
    session: service(),
    beforeModel: function() {
      if(this.get('session.curentUser.isAuthenticated')) {
        return this.get('session').fetch().then(data => {
          return this.store.findRecord('user', this.get('session.currentUser.uid')).then(user => {
            this.set('session.content.loggedUser', user);
            console.log('Logged user data loaded.')
            return user;
          });
        }).catch(function(error) {
          console.error(error);
        });
      }      
    }
});

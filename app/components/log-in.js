import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    session: service(),
    router: service(),
    actions: {
        logUser() {
            let email = this.get('email');
            let password = this.get('password');

            this.get('session').open('firebase', {
                provider: 'password',
                email,
                password
            }).then(data => {
                this.get('router').transitionTo('tasks');
            }).catch(error => {
                console.log(error)
            });
        }
    }
});

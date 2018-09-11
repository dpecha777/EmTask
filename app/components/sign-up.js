import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
    session: service(),
    store: service(),
    firebaseApp: service(),
    beforeModel: function () {
        return this.get('session').fetch().catch(function () { });
    },
    actions: {
        createUser: function (/*provider*/) {
            let email = this.get('email');
            let firstName = this.get('firstName');
            let lastName = this.get('lastName');
            let password = this.get('password');
            let repeatedPassword = this.get('repeatedPassword');
            let displayName = this.get('displayName');

            let that = this;
            if (password === repeatedPassword) {
                that.get('firebaseApp').auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(userData => {
                        let user = that.get('store').createRecord('user', {
                            id: userData.uid,
                            firstName: firstName,
                            lastName: lastName,
                            displayName: displayName
                        });
                        user.save().then(data => {
                            console.log('User data added to database.')
                        }).catch( error =>
                            console.error(error))
                    }).catch(function (error) {
                        alert('Error' + error.message);
                        set(that.currentModel, 'error', true);
                        set(that.currentModel, 'errorMessage', error.message);
                    });
            } else {
                alert('Your passwords do not match... /nPlease type it again.');
            }
        }
    }
});

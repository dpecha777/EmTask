import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';
import { inject as service } from '@ember/service';

export default ToriiFirebaseAdapter.extend({
    firebase: service(),
    close() {
        return this._super().then(() => {
            return window.location.replace('/');
        });
        

    }
});
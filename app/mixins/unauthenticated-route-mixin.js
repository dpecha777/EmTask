import Mixin from '@ember/object/mixin';
import {inject as service} from '@ember/service';

export default Mixin.create({
    session: service(),
    router: service(),
    beforeModel(){
        if(this.get('session.isAuthenticated')) {
            this.get('router').transitionTo('header');
        }
        this._super(...arguments);
    }

});

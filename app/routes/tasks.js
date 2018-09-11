import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from '../mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
    model: function () {
        return this.store.query('task', { orderBy: 'createdBy', equalTo: this.get('session.currentUser.uid') })
    }
});

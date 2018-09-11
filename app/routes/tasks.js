import Route from '@ember/routing/route';

export default Route.extend({
    model: function () {
        return this.store.query('task', { orderBy: 'createdBy', equalTo: this.get('session.loggedUser.id') })
    }
});

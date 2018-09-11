import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),
    actions: {
        addTask: function () {
            let title = this.get('title');
            let description = this.get('description');
            let date = this.get('date');

            // Create New Task
            let newTask = this.store.createRecord('task', {
                title: title,
                description: description,
                date: new Date(date),
                createdBy: this.get('session.loggedUser')
            });

            // Save to Database
            newTask.save().catch((error) => {
                console.log(error)
            });

            // Clear Form
            this.setProperties({
                title: '',
                description: '',
                date: ''
            });
        }
    }
});

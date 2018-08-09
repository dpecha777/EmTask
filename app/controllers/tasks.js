import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        deleteTask: function (id) {
            this.store.findRecord('task', id).then(function (task) {
                task.deleteRecord();
                task.save();
            })
        },

        addTask: function () {
            var title = this.get('title');
            var description = this.get('description');
            var date = this.get('date');

            // Create New Task
            var newTask = this.store.createRecord('task', {
                title: title,
                description: description,
                date: new Date(date)
            });

            // Save to Database
            newTask.save();

            // Clear Form
            this.setProperties({
                title: '',
                description: '',
                date: ''
            });

            this.transitionToRoute('tasks');
        }

    }
});

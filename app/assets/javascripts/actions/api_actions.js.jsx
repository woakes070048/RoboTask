(function(root) {
  'use strict';

  root.ApiActions = {
    createTask: function(task) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.CREATE_TASK,
        action: task
      });
    },

    receiveCreatedTasks: function(createdTasks) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.CREATED_TASKS_RECEIVED,
        action: createdTasks
      });
    },

    deleteTask: function(task) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.DELETE_TASK,
        action: task
      });
    },

    receiveValidWorkers: function(workers) {
      root.AppDispatcher.dispatch({
        actionType: UserConstants.VALID_WORKERS_RECEIVED,
        action: workers
      });
    },

    resetTask: function(task) {
      root.AppDispatcher.dispatch({
        actionType: TaskConstants.ASSIGN_TASK_WORKER,
        action: task
      });
    },

    receiveBio: function(bio) {
      root.AppDispatcher.dispatch({
        actionType: UserConstants.USER_BIO_RECEIVED,
        action: bio
      });
    },

    profileUpdateOK: function() {
      root.AppDispatcher.dispatch({
        actionType: FlashConstants.PROFILE_FORM_OK
      });
    }

  };

}(this));

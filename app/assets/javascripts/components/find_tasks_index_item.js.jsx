(function(root) {
  'use strict';
  // this.props.workableTask
  // this.props.isApplyDisabled
  // this.props.assignmentStatus
  root.FindTasksIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    handleMouseOver: function(task) { TaskMapActions.highlightOn(task.id); },

    handleMouseOut: function(task) { TaskMapActions.highlightOff(task.id); },

    handleClick: function(task) {
      TaskMapActions.zoomToTask({ lat: task.lat, lng: task.lng });
    },

    render: function() {
      var task = this.props.workableTask;
      return (
        <div
          className="panel workable-task-item"
          onMouseEnter={this.handleMouseOver.bind(null, task)}
          onMouseLeave={this.handleMouseOut.bind(null, task)}
          onClick={this.handleClick.bind(null, task)}
          id={"task-" + task.id}
        >
          <div className="row" id="inner-panel-polaroid-adjust">
            <div id="find-tasks-index-item-header">
              <div className="task-date-scheduled">
                {task.datetime[0]} {task.datetime[1]}
              </div><br/>
              <span className="mini-wage" id="mini-wage-margin-right">
                §{task.wage}/hr
              </span>
              <span className="task-title" id="find-tasks-index-item-title">
                {task.title}
              </span><br/>
            </div>
            <div className="task-title-divider" />
            <span className="task-location">{task.location}</span><br/>
            <span className="task-description">{task.description}</span><br/>
            <div className="footer">
              <div id="find-tasks-index-item-creator-holder">
                <img
                  id="find-tasks-index-item-creator-pic"
                  src={task.creator.image}
                />
                <div id="find-tasks-index-item-creator-name">{task.creator.shortName}</div>
              </div>
              <div className="apply-button-holder">
                <ConfirmOpenTaskApplyModal
                  applyToTask={this.props.applyToTask.bind(null, this.props.workableTask)}
                  task={this.props.workableTask}
                  resetAssignmentStatus={this.props.resetAssignmentStatus}
                 />
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));

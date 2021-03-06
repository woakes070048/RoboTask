(function(root) {
  'use strict';
  // this.props.createdTask
  // this.props.userIsRobot
  var Button = ReactBootstrap.Button;
  var Glyphicon = ReactBootstrap.Glyphicon;
  var Popover = ReactBootstrap.Popover;
  var OverlayTrigger = ReactBootstrap.OverlayTrigger;

  var hashCode = function(string) {
    var hash = 0, i, chr, len;
    if (string.length === 0) return hash;
    for (i = 0, len = string.length; i < len; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  };

  var CreatedTasksIndexItem = root.CreatedTasksIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    cancelTask: function() { ApiUtil.deleteTask(this.props.createdTask); },

    _findValidWorkers: function(task) {
      var idx = root.TaskStore.all().indexOf(task);
      this.history.pushState(null, "/task/" + idx + "/findWorker");
    },

    handleFindWorker: function(task) {
      if (task.isOpen) {
        return (<div className="open-task-wage">§{task.wage}/hr</div>);
      } else {
        return (
          <Button
            bsStyle="primary"
            bsSize="medium"
            id="created-task-button-complete-or-find-worker"
            onClick={this._findValidWorkers.bind(null, task)}
          >
            Find Worker
          </Button>
        );
      }
    },

    renderProfilePicture: function(userIsRobot) {
      if (typeof this.props.createdTask.worker !== "undefined") {
        var task = this.props.createdTask;
        return (
          <div className="col-xs-12 col-sm-3" id="polaroid">
            <strong className="text-center">
              <img
                className="worker-taskview-pic"
                id="polaroid-picture"
                src={userIsRobot ? task.creator.image : task.worker.image}
              />
              <div id="worker-profile-shortName-no-margin">
                {userIsRobot ? task.creator.shortName : task.worker.shortName}
              </div>
              <div><span className="mini-wage">§{task.wage}/hr</span></div>
            </strong>
          </div>
        );
      }
    },

    renderReview: function(userIsRobot) {
      var task = this.props.createdTask;
      return (
        <div>
          <div className="task-title-divider" />
          <span className="task-review-result">
            {task.review.is_positive ?
              <strong>
                <Glyphicon
                  glyph="thumbs-up"
                  className="review-icon-holder-ok-inline"
                  id="review-icon"
                />
                {userIsRobot ?
                  "You received a good rating for this task."
                :
                  "You liked this RoboTasker for this task."
                }
              </strong>
            :
              <strong>
                <Glyphicon
                  glyph="thumbs-down"
                  className="review-icon-holder-bad-inline"
                  id="review-icon" />
                {userIsRobot ?
                  "You received a bad rating for this task."
                :
                  "You did not like this RoboTasker for this task."
                }
              </strong>
            }
          </span><br/>
          Review Details: {task.review.description}<br/>
        </div>
      );
    },

    renderTaskFooter: function(userIsRobot) {
      var task = this.props.createdTask;
      if (typeof task.review !== "undefined") {
        return this.renderReview(userIsRobot);
      } else {
        var overlay = (
          <Popover title="Are you sure?">
            <Button onClick={this.cancelTask}>Yes</Button>
          </Popover>
        );
        return (
          <div className="created-task-button-holder">
            {userIsRobot ?
              <div className="robot-helper-message">
                If your client does not mark this task as complete upon completion within 3 business days, please contact us and provide the following reference number: {hashCode(String(task.id))*hashCode(String(task.id))}
              </div>
            :
              <div>
                <OverlayTrigger
                  rootClose
                  trigger="click"
                  placement="right"
                  overlay={overlay}
                >
                  <Button
                    bsStyle="danger"
                    bsSize="medium"
                    id="created-task-button-cancel"
                  >
                    Cancel Task
                  </Button>
                </OverlayTrigger>
                {typeof task.worker === "undefined" ?
                  this.handleFindWorker(task)
                :
                  <TaskReviewFormModal task={task}/>
                }
              </div>
            }
          </div>
        );
      }
    },

    render: function() {
      var task = this.props.createdTask;
      var hasWorker = (typeof task.worker === "undefined") ? false : true;
      var userIsRobot = this.props.userIsRobot;
      return (
        <div>
          <div className="panel">
            <div className="row" id="inner-panel-polaroid-adjust">
              {this.renderProfilePicture(userIsRobot)}
              <div className={hasWorker ? "col-xs-12 col-sm-9" : ""}>
                <div className="task-date-scheduled">
                  {task.datetime[0]} {task.datetime[1]}
                </div>
                <span className="task-title">{task.title}</span><br/>
                <div className="task-title-divider" />
                <span className="task-location">{task.location}</span><br/>
                <span className="task-description">{task.description}</span><br/>
                {this.renderTaskFooter(userIsRobot)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

}(this));

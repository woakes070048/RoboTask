(function(root) {
  'use strict';

  // NOTE: I expect workTimes formatted as below:
  var workTimes = [
    {
      sun: {
      morning: true,
      afternoon: true,
      evening: true
      }
    },
    {
      mon: {
      morning: true,
      afternoon: false,
      evening: true
      }
    }
  ];

  root.ProfileForm = React.createClass({
    getInitialState: function() {
      return ({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });
    },

    _updateProfile: function() {
      // NOTE: this is updating properly. now need to set user work_times
      // on componentDidMount
      this.setState({
        bio: root.WorkerUserStore.getBio(),
        workTimes: root.WorkerUserStore.getWorkTimes()
      });

    },

    handleBioChange: function(e) {
      this.setState({ bio: e.target.value });
    },

    handleSubmission: function() {
      ApiUtil.updateBio({
        bio: this.state.bio
      });
    },

    componentDidMount: function() {
      // root.ApiUtil.fetchBio();

      root.ApiUtil.fetchCurrentUserDetails();

      root.WorkerUserStore.addCurrentUserChangeListener(this._updateProfile);

    },

    componentWillUnmount: function() {
      root.WorkerUserStore.removeCurrentUserChangeListener(this._updateProfile);
    },

    render: function() {
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var intervals = ["anytime", "morning", "afternoon", "evening"];


      return (
        <div className="component-container" id="profile-form">
          <div className="component-container-heading" id="profile-form-heading">
            Edit profile
          </div><br/>

          <div className="profile-element-title">Bio</div><br/>
          <textarea
            placeholder="default bio"
            value={this.state.bio}
            onChange={this.handleBioChange}
            id="bio-entry"
          /><br/><br/>

          <div className="profile-element-title">workTimes</div><br/>
          <ul className="worktime-container">
            { days.map(function(day) {
              return (
                <li className="worktime">
                  <input
                    className="day-checkbox"
                    type="checkbox"
                  />{day}
                    <div className="worktime-interval">
                      { intervals.map(function(interval){
                        return (
                          <div>
                            <input
                              className="interval-checkbox"
                              type="checkbox"
                            />{interval}
                          </div>
                        );
                      })}
                    </div>
                </li>
              );
            })}
          </ul>

          <div
            className="submit-link"
            id="save-profile-link"
            onClick={this.handleSubmission}>
          saveProfile
          </div>
        </div>    );
      }
  });

}(this));

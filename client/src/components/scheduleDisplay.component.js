module.exports = {
  bindings: {
    schedule: '<'
  },
  template: `
  <div class="schedule">
    <div class="schedule-day" ng-repeat="day in $ctrl.schedule.days track by $index">
      <p class="schedule-date">{{day.date}}</p>
      <ul>
        <li ng-repeat="appointment in day.timetable track by $index">
          <div>Time: {{appointment.time}}</div>
          <div>Activity: {{appointment.activity}}</div>
          <div>Location: {{appointment.location}}</div>
        </li>
      </ul>
    </div>
  </div>
  `
};
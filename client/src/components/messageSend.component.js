module.exports = {
  bindings: {
    user: '<',
    group: '<'
  },
  controller(groups, websockets, $mdDialog, $scope) {
    this.$onChanges = (changesObj) => {
      if (changesObj.group.currentValue || changesObj.user.currentValue) {
        this.clearInputs();
      }
    };

    this.clearInputs = () => {
      this.messageTitle = '';
      this.messageBody = '';
      this.messageTo = this.user.role === 'organizer' ? [] : [JSON.stringify([this.group.id, this.group.name])];
    };

    this.showSendMessageDialog = (ev) => {
      $mdDialog.show({
        controller: $scope.DialogController,
        templateUrl: 'messageSendDialog.template.html',
        preserveScope: true,
        targetEvent: ev,
        clickOutsideToClose: true,
        escapeToClose: true
      })
        .then((input) => {
          this.sendMessage();
        })
        .catch(console.error);
    };

    $scope.DialogController = ($scope) => {
      $scope.msg = {
        user: this.user,
        messageTitle: this.messageTitle,
        messageTo: this.messageTo,
        messageBody: this.messageBody
      };

      groups.get()
        .then((groupData) => {
          $scope.groups = groupData;
        })
        .catch(console.error);

      $scope.hide = () => {
        $mdDialog.hide();
      };

      $scope.sendAndClose = () => {
        this.messageTo = $scope.msg.messageTo;
        this.messageTitle = $scope.msg.messageTitle;
        this.messageBody = $scope.msg.messageBody;
        $mdDialog.hide();
      };
    };

    this.sendMessage = () => {
      const toGroupIds = [];
      const toGroupNames = [];
      this.messageTo = this.messageTo.map(toGroup => JSON.parse(toGroup));
      this.messageTo.forEach((toGroup) => {
        toGroupIds.push(toGroup[0]);
        toGroupNames.push(toGroup[1]);
      });
      websockets.send(JSON.stringify({
        recipients: toGroupNames,
        toIds: toGroupIds,
        title: this.messageTitle,
        text: this.messageBody,
        fromName: `${this.user.firstName} ${this.user.lastName}`,
        fromId: this.user.id,
        eventId: 1
      }));
      this.clearInputs();
    };
  },
  templateUrl: 'messageSend.template.html'
};

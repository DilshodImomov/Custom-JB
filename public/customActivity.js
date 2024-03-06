define(["postmonger"], function (Postmonger) {
    "use strict";

    var connection = new Postmonger.Session();
    var payload = {};

    $(window).ready(onRender);

    connection.on("initActivity", initialize);

    function onRender() {
      // JB will respond the first time 'ready' is called with 'initActivity'
      connection.trigger("ready");

      // Disable the next button if a value isn't selected
      $("#select1").change(function () {
        var message = getMessage();

        $("#message").html(message);
      });
    }

    function initialize(data) {
      if (data) {
        payload = data;
      }

      var message;
      var hasInArguments = Boolean(
        payload["arguments"] &&
          payload["arguments"].execute &&
          payload["arguments"].execute.inArguments &&
          payload["arguments"].execute.inArguments.length > 0
      );

      var inArguments = hasInArguments
        ? payload["arguments"].execute.inArguments
        : {};

    console.log('-------- triggered:onInitActivity({obj}) --------');
    console.log('activity:\n ', JSON.stringify(activity, null, 4));
    console.log('Has In Arguments: ', hasInArguments);
    console.log('inArguments', inArguments);
    console.log('-------------------------------------------------');

      $.each(inArguments, function (index, inArgument) {
        $.each(inArgument, function (key, val) {
          if (key === "message") {
            message = val;
          }
        });
      });
    }

    function save() {
      var name = $("#select1").find("option:selected").html();
      var value = getMessage();

      // 'payload' is initialized on 'initActivity' above.
      // Journey Builder sends an initial payload with defaults
      // set by this activity's config.json file.  Any property
      // may be overridden as desired.
      payload.name = name;

      payload["arguments"].execute.inArguments = [{ message: value }];

      payload["metaData"].isConfigured = true;

      connection.trigger("updateActivity", payload);
    }

    function getMessage() {
      return $("#select1").find("option:selected").attr("value").trim();
    }
  });

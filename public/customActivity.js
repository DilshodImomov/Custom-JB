define(["postmonger"], function (Postmonger) {
    "use strict";

    var connection = new Postmonger.Session();
    var payload = {};

    $(window).ready(onRender);

    connection.on("initActivity", initialize);

    connection.on('clickedNext', () => {
        var configuration = {
            metaData: {
                isConfigured: true
            },
            arguments: {
                execute: {
                    inArguments: [
                        { "contactKey": "{{Contact.Key}}" },
                        { "FirstName": "{{Contact.Attribute.JourneyEntrySource.FirstName}}" }
                    ]
                },
                url: "https://eo6kawh7mrrsr6x.m.pipedream.net/execute"
            }
        };
        connection.trigger('updateActivity', configuration);
    })

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

  });

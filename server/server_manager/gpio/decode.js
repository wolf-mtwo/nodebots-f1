module.exports = (function(module) {

  module.command = function(command) {
    return module.commandParser.decode(command);
  }

  module.commandParser = (function() {

    var validCommands = [];
    validCommands[0] = 'forward';
    validCommands[1] = 'back';
    validCommands[2] = 'left';
    validCommands[3] = 'right';

    module.decode = function(command) {
      var commands = command.split('');
      var commandStates = [];
      for (var i  in commands) {
        commandStates.push({
          command: validCommands[i],
          value: commands[i]
        });
      }
      return commandStates;
    }

    return module;
  })({});

  return module;
})({});

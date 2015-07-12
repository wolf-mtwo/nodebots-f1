(function(module){

  var POSITIONS = {
    FORWARD: '{0}',
    BACK: '{1}',
    LEFT: '{2}',
    RIGHT: '{3}'
  };

  function getCmd() {
    var str = '';
    for (var i in POSITIONS) {
      str += POSITIONS[i];
    };
    return str;
  }

  module.setDefault = function(cmd) {
    cmd = cmd || getCmd()
    for(var i in POSITIONS) {
      cmd = cmd.replace(POSITIONS[i], '0');
    };
    return cmd;
  }

  module.move = (function(module) {

    function updateCmd(position, cmd) {
      if (!position) {
        throw new Error('position is undefined');
      };
      if (!cmd) {
        throw new Error('cmd is undefined');
      };
      return cmd.replace(position, '1');
    }

    module.forward = function(cmd) {
      cmd = cmd || getCmd()
      return updateCmd(POSITIONS.FORWARD, cmd);
    }

    module.back = function(cmd) {
      cmd = cmd || getCmd()
      return updateCmd(POSITIONS.BACK, cmd);
    }

    module.left = function(cmd) {
      cmd = cmd || getCmd()
      return updateCmd(POSITIONS.LEFT, cmd);
    }

    module.right = function(cmd) {
      cmd = cmd || getCmd()
      return updateCmd(POSITIONS.RIGHT, cmd);
    }

    return module;
  })({});

  window.CmdBuilder = module;  
})({});
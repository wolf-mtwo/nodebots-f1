(function(module) {

  if (!CmdBuilder) {
    throw new Error('CmdBuilder is not loaded');
  };

  var move = CmdBuilder.move;

  function addEmpty(cmd) {
    return CmdBuilder.setDefault(cmd)
  }

  module.move = {
    '119': addEmpty(move.forward()),
    '115': addEmpty(move.back()),
    '97': addEmpty(move.left()),
    '100': addEmpty(move.right()),
    '114': addEmpty(),
    '55': addEmpty(move.forward(move.left())),
    '56': addEmpty(move.forward()),
    '57': addEmpty(move.forward(move.right())),
    '52': addEmpty(move.left()),
    '53': addEmpty(),
    '54': addEmpty(move.right()),
    '49': addEmpty(move.back(move.left())),
    '50': addEmpty(move.back()),
    '51': addEmpty(move.back(move.right()))
  };

  module.run = function(keyCode) {
    if(module.move[keyCode]) {
      EventManager.emit.command(module.move[keyCode]);
    } else {
      console.info('invalid command:', keyCode);
    }
  }

  // Browser key-event-emiter
  document.onkeypress = function(e) {
    module.run(e.keyCode);
  }

  window.KeyMonitor = module;
})({});




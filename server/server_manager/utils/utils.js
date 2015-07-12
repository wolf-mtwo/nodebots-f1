
var environmentState = false;
if (!process.argv[2]) {
  console.info('PRODUCTION');
  environmentState = true;
} else {
  console.info('DEVELOPMENT');
  environmentState = false;
}
module.exports.getEnvironmentState = function() {
  return environmentState;
}

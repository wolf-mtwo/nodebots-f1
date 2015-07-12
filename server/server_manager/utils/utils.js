
var environmentState = false;
if (!process.argv[2]) {
  console.info('THE PROJECT WAS INITIALIZE AS PRODUCION');
  environmentState = true;
} else {
  console.info('THE PROJECT IS ON DEVELOPMENT');
  environmentState = false;
}
module.exports.getEnvironmentState = function() {
  return environmentState;
}

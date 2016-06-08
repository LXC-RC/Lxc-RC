var lxcrc = require('./functions.js');
var menus = require('./head.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  menus.header();
  menus.first();
  rl.question("", function (res) {
    lxcrc.menus(res);
  });

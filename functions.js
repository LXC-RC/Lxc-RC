var shell = require('shelljs');
var head = require('./head.js')
const readline = require('readline');
var config = {};
const exec = require('child_process').exec;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function askNumberMachine() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE NUMBER OF MACHINES TO CREATE / DESTROY :', function (number) {
            resolve(number);
            config.number = number;
        });
    });
}
function askMonitoring() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE NAME OF MACHINE TO MONITORING :', function (NameMon) {
            resolve(NameMon);
            config.NameMon = NameMon;
        });
    });
}
function askSizeRAM() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE SIZE IN MEGABYTES :', function (sizeRAM) {
            resolve(sizeRAM);
            config.sizeRAM = sizeRAM + 'M';
        });
    });
}
function askNameRAMMachine() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE NAME OF MACHINE TO MODIFY THE RAM SIZE :', function (NameRAMsize) {
            resolve(NameRAMsize);
            config.NameRAMsize = NameRAMsize;
        });
    });
}
function askNameMachine() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE NAME OF MACHINE, CONSIDERING THAT IF SEVERAL ARE THESE WILL BE PREFIX :', function (name) {
            resolve(name);
            config.name = name;
        });
    });
}

function askTemplate() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE NAME OF THE TEMPLATE :', function (template) {
            resolve(template);
            config.template = template;
        });
    });
}

function askUser() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE USER :', function (user) {
            resolve(user);
            config.user = user;
        });
    });
}

function askOneOrAll() {
    return new Promise(function (resolve) {
        rl.question('IT BELONGS A SET[Y/N] :', function (oneorall) {
            resolve(oneorall);
            config.oneorall = oneorall;
        })

    })
}
function askDeleteOneOrAll() {
    return new Promise(function (resolve) {
        rl.question('ARE YOU DESTROY ALL[Y/N] :', function (deleteoneorall) {
            resolve(deleteoneorall);
            config.deleteoneorall = deleteoneorall;
        })

    })
}
function askPasswd() {
    return new Promise(function (resolve) {
        rl.question('INTRODUCE THE PASSWORD :', function (passwd) {
            resolve(passwd);
            config.size = passwd;
        });
    });
}
module.exports = {
    clear: function () {
        exec('clear', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },

    menus: function (opcion) {

        if (opcion === '1') {

            head.header();
            console.log("                                 |¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|");
            console.log("                                 |           VIRTUAL MACHINE CREATOR             |");
            console.log("                                 |_______________________________________________|");
            askNumberMachine().then(askNameMachine).then(askTemplate).then(askUser).then(function () {

                var timer = setInterval(function () { process.stdout.write('.'); }, 1000);
                if (config.number > 1) {

                    for (cont = 1; cont <= config.number; cont++) {

                        var name = config.name + cont;
                        exec('lxc-create -n ' + name + ' -t ' + config.template, (error, stdout, stderr) => {
                            clearInterval(timer);
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);

                        });


                        /*var firstmachine = config.name+'1';
                        if (cont === 1){
                        exec('lxc-create -n ' + name + ' -t ' + config.template + ' -- --user ' + name + ' --password ' + name, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        });    
                        }
                        else{
                           exec('lxc-clone -o ' + firstmachine + ' -n ' + name + ' -- --user ' + name + ' --password ' + name, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        }); 
                           } */

                    }
                }
                else {

                    exec('lxc-create -n ' + config.name + ' -t ' + config.template , (error, stdout, stderr) => {
                        clearInterval(timer);
                        if (error) {

                            console.error(`exec error: ${error}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                        return;
                    });
                }
            });
        }
        else if (opcion === '2') {
            head.header();
            console.log("                                 |¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|");
            console.log("                                 |           VIRTUAL MACHINE DESTROYER           |");
            console.log("                                 |_______________________________________________|");
            askDeleteOneOrAll().then(askNameMachine).then(function () {
                const path = "/var/lib/lxc/";
                if (config.deleteoneorall === 'Y') {
                    exec('rm -rf ' + path + config.name + '*', (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                    });
                }
                else {
                    exec('rm -rf ' + path + config.name, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            return;
                        }
                        console.log("The machine was destroyed")
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                        process.exit();
                    });
                }
            })
        }
        else if (opcion === '3') {
            head.header();
            console.log("                                 |¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|");
            console.log("                                 |           VIRTUAL MACHINE MONITOR             |");
            console.log("                                 |_______________________________________________|");
            askMonitoring().then(function () {
                /*if (config.cantidad !== "") {
                    var sysExec = function (command, onData, onClose) {
                        var lineReader = require('readline').createInterface({
                            input: require('fs').createReadStream('/tmp/maquinas.log')
                        });
                        lineReader.on('line', function (line) {
                            sysExec('lxc-info -n ' + line + ' >> /var/log/lxc/mon_lxc.log');
                            sysExec('lxc-info -n ' + line);
                        });
                    }
                }
                else {*/
                exec('lxc-info -n ' + config.NameMon, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    return;
                });
                //}
            })
        }
        else if (opcion === '4') {
            console.log("                                 |¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯|");
            console.log("                                 | 1. Allocate Memory RAM                        |");
            console.log("                                 |_______________________________________________|");

            askNameRAMMachine().then(askSizeRAM).then(function () {
                exec('lxc-cgroup -n ' + config.NameRAMsize + ' memory.limit_in_bytes' + config.sizeRAM, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                });

            })
        }
        else {
            console.log('INTRODUCE A TRUE VALUE')
        }
    }
}
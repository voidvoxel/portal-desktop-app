const { fork } = require("child_process");

const serverProcess = fork(__dirname + "/portal-desktop-server.js");

const { ApplicationDesktopClient } = require("../../src/client");

const desktopApplication = new ApplicationDesktopClient();

desktopApplication.startSync();

serverProcess.kill();

const { Application } = require("..");


async function main() {
    const application = new Application();

    await application.start();
}


main();

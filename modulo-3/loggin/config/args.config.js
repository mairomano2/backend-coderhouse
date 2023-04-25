const { Command } = require("commander");

const program = new Command();

program.option("-m, --mode <mode>", "Development environment", "production");

program.parse();

module.exports = program.opts();
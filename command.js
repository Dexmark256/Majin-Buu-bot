// Command handler system

const commands = []

function cmd(info, func) {

info.function = func
commands.push(info)

}

export { cmd, commands }

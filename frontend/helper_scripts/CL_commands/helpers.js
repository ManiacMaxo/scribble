const figlet = require('figlet')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const replace = require('replace-in-file')

const modules = {}

modules.config = {
    pagesDir: './src',
    componentsDir: './src/components',
    templatesDir: './helper_scripts/templates'
}

modules.writeStart = (callback) => {
    chalk.yellow(
        'creator',
        figlet.text(
            {
                verticalLayout: 'full'
            },
            (err, data) => {
                process.stdout.write(`\n${data}\n`)
                if (callback) callback()
            }
        )
    )
}

modules.isUsedOnDir = (startPath, filter, onlyDirectories = false) => {
    if (!fs.existsSync(startPath)) {
        return false
    }

    if (onlyDirectories) {
        return fs.existsSync(`${startPath}/${filter}`)
    }

    const files = fs.readdirSync(startPath)
    let isFound = false

    for (let i = 0; i < files.length; i += 1) {
        const filename = path.join(startPath, files[i])
        const stat = fs.lstatSync(filename)
        if (stat.isDirectory()) {
            modules.isUsedOnDir(filename, filter) // recurse
        } else if (filename.indexOf(filter) >= 0) {
            isFound = true
        }
    }

    return isFound
}

modules.getFilesOnDir = (startPath) => {
    if (!fs.existsSync(startPath)) {
        return []
    }

    const files = fs.readdirSync(startPath)
    const isFound = []

    for (let i = 0; i < files.length; i += 1) {
        const filename = path.join(startPath, files[i])
        const stat = fs.lstatSync(filename)
        if (stat.isDirectory()) {
            isFound.concat(modules.getFilesOnDir(filename)) // recurse
        } else {
            const pagename = files[i].replace('.tsxs', '')
            if (pagename !== '_document') isFound.push(pagename)
        }
    }

    return isFound
}

modules.getTempfromHandlebar = (tempPath, data, callback) => {
    fs.readFile(tempPath, 'utf-8', (err, source) => {
        if (err) throw err
        const template = handlebars.compile(source)
        const exportCode = template(data)

        callback(exportCode)
    })
}

modules.addTexttoFile = (filePath, from, text, cb, before = true) => {
    const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g
    const re = new RegExp(from.replace(matchOperatorsRe, '\\$&'))

    replace(
        {
            encoding: 'utf8',
            files: filePath,
            from: re,
            to: before ? `${text}${from}` : `${from}\n${text}`
        },
        (error) => {
            if (error) {
                throw error
            }
            cb()
        }
    )
}

modules.createPageFromTemplate = (filename, callback) => {
    const dir = `${modules.config.pagesDir}/${filename}`
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    modules.getTempfromHandlebar(
        `${modules.config.templatesDir}/page.hbs`,
        {
            filename
        },
        (code) => {
            fs.writeFile(
                `${dir}/${filename}.tsx`,
                code,
                { flag: 'wx' },
                (_err) => {
                    if (_err) throw _err

                    callback()
                }
            )
        }
    )

    fs.writeFile(
        `${dir}/${filename}.module.scss`,
        `@import '../scss/const';\n`,
        { flag: 'wx' },
        (_err) => {
            if (_err) throw _err

            callback()
        }
    )

    modules.createIndexExporter({ filename, path: dir })

    callback()
}

modules.createComponentFromTemplate = (options, callback = () => {}) => {
    const dir = `${modules.config.componentsDir}/${options.filename}`

    if (!fs.statSync(`${dir}`, { throwIfNoEntry: false })) {
        fs.mkdirSync(`${dir}`)
    }

    modules.getTempfromHandlebar(
        `${modules.config.templatesDir}/component.hbs`,
        options,
        (code) => {
            fs.writeFile(
                `${dir}/${options.filename}.tsx`,
                code,
                { flag: 'wx' },
                (_err) => {
                    if (_err) throw _err

                    callback()
                }
            )
        }
    )

    if (options.haveStyle) {
        fs.writeFile(
            `${dir}/${options.filename}.module.scss`,
            `@import '../../scss/const';\n`,
            { flag: 'wx' },
            (_err) => {
                if (_err) throw _err

                callback()
            }
        )
    }

    modules.createIndexExporter({
        filename: options.filename,
        path: dir,
        isPage: false
    })

    fs.writeFile(
        `${modules.config.componentsDir}/index.ts`,
        `export { ${options.filename} } from './${options.filename}'`,
        { flag: 'a+' },
        (_err) => {
            if (_err) throw _err

            callback()
        }
    )

    callback()
}

modules.createIndexExporter = ({ filename, path, isPage = true }) => {
    modules.getTempfromHandlebar(
        `${modules.config.templatesDir}/index.hbs`,
        {
            filename,
            isPage
        },
        (code) => {
            fs.writeFile(`${path}/index.ts`, code, { flag: 'wx' }, (_err) => {
                if (_err) throw _err
            })
        }
    )
}

module.exports = modules

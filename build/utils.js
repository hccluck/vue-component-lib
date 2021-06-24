const fs = require('fs');
const path = require('path');

const join = path.join;
const resolve = dir => join(__dirname, '../', dir);

exports.join = join;
exports.resolve = resolve;
exports.getComponentEntries = function (path) {
  let files = fs.readdirSync(resolve(path));

  const componentEntries = files.reduce((ret, item) => {
    const itemPath = join(path, item);
    const isDir = fs.statSync(itemPath).isDirectory();

    if (isDir) {
      const index = resolve(join(itemPath, 'index.js'));
      try {
        fs.accessSync(index, fs.constants.F_OK);
        ret[item] = index;
      } catch (error) {
        console.log('跳过 ', itemPath);
      }
    } else {
      const [name] = item.split('.');
      ret[name] = resolve(`${itemPath}`);
    }

    return ret;
  }, {});

  console.dir(componentEntries);

  return componentEntries;
};

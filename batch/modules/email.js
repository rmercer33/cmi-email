
module.exports = {
  getTemplate: function(name) {
    const t = require(`./templates/${name}`);
    return t;
  }
};


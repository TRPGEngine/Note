const debug = require('debug')('trpg:component:note');
const event = require('./event');

module.exports = function NoteComponent(app) {
  initStorage.call(app);
  initSocket.call(app);
}

function initStorage() {
  let app = this;
  let storage = app.storage;
  storage.registerModel(require('./models/note.js'));

  app.on('initCompleted', function(app) {
    // 数据信息统计
    debug('storage has been load 1 note db model');
  });
}

function initSocket() {
  let app = this;
  app.registerEvent('note::get', event.get);
  app.registerEvent('note::save', event.save);
}

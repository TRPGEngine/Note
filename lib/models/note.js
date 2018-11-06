const striptags = require('striptags');

module.exports = function Note(orm, db) {
  let Note = db.define('note_note', {
    uuid: {type: 'text', required: true},
    title: {type: 'text', required: true},
    content: {type: 'text', big: true},
    createAt: {type: 'date', time: true},
    updateAt: {type: 'date', time: true},
  }, {
    hooks: {
      beforeCreate: function(next) {
        if (!this.createAt) {
  				this.createAt = new Date();
  			}
        if (!this.updateAt) {
  				this.updateAt = new Date();
  			}
  			return next();
      },
      beforeSave: function(next) {
				this.updateAt = new Date();
        return next();
      },
    },
    methods: {
      getCoverImage: function() {
        let content = this.content;
        let imgIndex = content.indexOf('<img');
        if(imgIndex >= 0) {
          let match = content.match(/<img.*?src="(.*?)".*?>/);
          if(match && match[1]) {
            return match[1];
          }
        }

        return null;
      },
      getSummary: function() {
        let content = this.content;
        let summary = striptags(content) || '';
        summary = summary.substr(0, 100).trim() + '...' // 长度100
        return summary;
      }
    }
  });

  let User = db.models.player_user;
  if(!!User) {
    Note.hasOne('owner', User, { reverse: "notes" });
  }

  return Note;
}

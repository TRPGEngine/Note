module.exports = function Note(orm, db) {
  let Note = db.define('note_note', {
    uuid: {type: 'text', required: true},
    title: {type: 'text', required: true},
    content: {type: 'text', size: 1000},
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

    }
  });

  let User = db.models.player_user;
  if(!!User) {
    Note.hasOne('owner', User, { reverse: "notes" });
  }

  return Note;
}

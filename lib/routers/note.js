const Router = require('koa-router');
const router = new Router();

router.get('/:noteUUID', async (ctx, next) => {
  const noteTemplate = require('../views/note');
  const notFoundTemplate = require('../views/404');

  let noteUUID = ctx.params.noteUUID;
  let db = await ctx.trpgapp.storage.connectAsync();

  try {
    let note = await db.models.note_note.oneAsync({uuid: noteUUID});
    if(note) {
      let user = await db.models.player_user.getAsync(note.owner_id);
      let pkg = {
        author: user,
        note: note,
      };
      ctx.render(noteTemplate, pkg);
    }else {
      ctx.render(notFoundTemplate);
      ctx.status = 404;
    }
  }finally {
    db.close();
  }
});

module.exports = router;

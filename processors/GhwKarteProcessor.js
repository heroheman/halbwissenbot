const Processor = require('./Processor');
const GhwKarte = require('../services/GhwKarte');

class GhwKarteProcessor extends Processor {

  constructor(bot) {
    super(bot);
    let self = this;
    self.ghwKarte = new GhwKarte();
    self.karteURL = 'https://halbwissenbot.herokuapp.com';

    self.bot.onText(/\/ghwkarte/, function(msg) {
      self.bot.sendMessage(msg.chat.id, `Die #ghwkarte findest du auf ${self.karteURL}`);
      self.bot.sendMessage(msg.chat.id, 'Falls du deinen Standort auch zur #ghwkarte hinzufügen möchtest verwende "/ghwkarte ORT"');
    });

    self.bot.onText(/\/ghwkarte (.+)/, function (msg, match) {
      let location = match[1];
      console.log(location);
      self.ghwKarte.addEntryWithGeocoding(location, location)
        .then(entry => {
          self.bot.sendMessage(msg.chat.id, 'Dein Standort wurde zur #ghwkarte hinzugefügt.');
          self.bot.sendMessage(msg.chat.id, self.karteURL);
        }).catch(error => console.log(error));
    });
  }
}

module.exports = GhwKarteProcessor;
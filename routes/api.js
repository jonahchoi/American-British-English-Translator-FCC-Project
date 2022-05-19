'use strict';

const Translator = require('../components/translator.js');
const translate = new Translator();

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      let translation; 

      //If inputs are undefined, return error
      if(text === undefined || !locale) return res.json({ error: 'Required field(s) missing'});

      //If text input is empty, return error
      if(text === '') return res.json({ error: 'No text to translate' });

      //Check locale for translation type, 
      //If locale is neither, return an error
      if(locale == 'american-to-british'){
        translation = translate.amerToBrit(text);
      }
      else if(locale == 'british-to-american'){
        translation = translate.britToAmer(text);
      }
      else{
        return res.json({ error: 'Invalid value for locale field' });
      }

      //return the final object
      res.json({
        text: text,
        translation: translation
      })
    });
};

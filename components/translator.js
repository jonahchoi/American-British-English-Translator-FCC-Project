const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  //Dictionary parser to find and replace matches in input string
  //Default will use keys of dictionaries to replace as values
  //For british to american, useKey should be false
  dictParser(input, dict, useKey = true){
    let dictKeys;
    if(useKey){
      dictKeys = Object.keys(dict);
    }
    else if(!useKey){
      dictKeys = Object.values(dict);
    }

    //Filter through the dictionary keys/values
    dictKeys = dictKeys.filter((key)=> {

      //Replace . with \. for regex
      if(key.includes('.')){
        key = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      //Set regex using key. Check that the word is whole and not a substring by using lookarounds
      let re = new RegExp(`(?<!\\w)${key}(?!\\w)`, 'g');
      
      return re.test(input.toLowerCase());
    });

    //Sort remaining keys/values by decreasing length, so words like trashcan get replaced before trash
    dictKeys = dictKeys.sort((a,b)=> b.length - a.length );

    if(useKey){
      //Loop through keys 
      dictKeys.forEach((key)=> {
        //For titles, capitalize the first letter
        if(dict === americanToBritishTitles){
          let capitalized = dict[key].charAt(0).toUpperCase() + dict[key].slice(1);
          //Replace the key with capitlized value and surround with span
          input = input.replace(new RegExp(key, 'gi'), '<span class="highlight">' + capitalized + '</span>');
        }
        //For non-titles, simply replace key with value and surround with span
        else{
          input = input.replace(new RegExp(key, 'gi'), '<span class="highlight">' + dict[key] + '</span>');
        }
      });
    }
    else if(!useKey){
      //Loop through values
      dictKeys.forEach((value)=> {
        //For titles, capitalize the first letter
        if(dict === americanToBritishTitles){
          //Find the key that correlates to the value
          let word = Object.keys(dict).find((key)=> dict[key] === value);
          let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
          //Replace matched value with capitalized key surrounded by span
          input = input.replace(new RegExp(value, 'gi'), '<span class="highlight">' + capitalized + '</span>');
        }
        else{
          //Find the key that correlates to the value
          let word = Object.keys(dict).find((key)=> dict[key] === value);
          //Replace matched value with key surrounded by span
          input = input.replace(new RegExp(value, 'gi'), '<span class="highlight">' + word + '</span>');
        }
      });
    }
    
    return input;
  }
  
  //translator function for American to British
  amerToBrit(input){
    let translated = input;
    
    //For times, replace the colon with .
    //Also surround with span
    if(/\d?\d:\d\d/.test(translated)){
      translated = translated.replace(/(\d?\d):(\d\d)/, '<span class="highlight">$1.$2</span>'); 
    }

    //Use dictParser on all 3 dictionaries
    translated = this.dictParser(translated, americanOnly);

    translated = this.dictParser(translated, americanToBritishSpelling);

    translated = this.dictParser(translated, americanToBritishTitles);
    
    //If no changes were made, 
    if(translated === input) return 'Everything looks good to me!';

    return translated;
  }

  //translator function for British to American
  britToAmer(input){
    let translated = input;

    //For times, replace . with :
    //Also surround with span
    if(/\d?\d\.\d\d/.test(translated)){
      translated = translated.replace(/(\d?\d)\.(\d\d)/, '<span class="highlight">$1:$2</span>'); 
    }

    //Use dictParser on all 3 dictionaries
    
    translated = this.dictParser(translated, britishOnly);

    //Set useKey to false to parse through values instead
    translated = this.dictParser(translated, americanToBritishSpelling, false);

    translated = this.dictParser(translated, americanToBritishTitles, false);
    
    //If no changes were made
    if(translated === input) return 'Everything looks good to me!';

    return translated;
  }
  
}
 

module.exports = Translator;

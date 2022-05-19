const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translate = new Translator();

suite('Unit Tests', () => {
  suite('American to British Tests', ()=>{
    //#1
    test('', ()=>{
      let string = 'Mangoes are my favorite fruit.';
      assert.equal(translate.amerToBrit(string), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    })

    //#2
    test('', ()=>{
      let string = 'I ate yogurt for breakfast.';
      assert.equal(translate.amerToBrit(string), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    })

    //#3
    test('', ()=>{
      let string = "We had a party at my friend's condo.";
      assert.equal(translate.amerToBrit(string), 'We had a party at my friend\'s <span class="highlight">flat</span>.');
    })

    //#4
    test('', ()=>{
      let string = 'Can you toss this in the trashcan for me?';
      assert.equal(translate.amerToBrit(string), 'Can you toss this in the <span class="highlight">bin</span> for me?');
    })

    //#5
    test('', ()=>{
      let string = 'The parking lot was full.';
      assert.equal(translate.amerToBrit(string), 'The <span class="highlight">car park</span> was full.');
    })

    //#6
    test('', ()=>{
      let string = 'Like a high tech Rube Goldberg machine.';
      assert.equal(translate.amerToBrit(string), 'Like a high tech <span class="highlight">Heath Robinson device</span>.');
    })

    //#7
    test('', ()=>{
      let string = 'To play hooky means to skip class or work.';
      assert.equal(translate.amerToBrit(string), 'To <span class="highlight">bunk off</span> means to skip class or work.');
    })

    //#8
    test('', ()=>{
      let string = 'No Mr. Bond, I expect you to die.';
      assert.equal(translate.amerToBrit(string), 'No <span class="highlight">Mr</span> Bond, I expect you to die.');
    })
    //#9
    test('', ()=>{
      let string = 'Dr. Grosh will see you now.';
      assert.equal(translate.amerToBrit(string), '<span class="highlight">Dr</span> Grosh will see you now.');
    })
    //#10
    test('', ()=>{
      let string = 'Lunch is at 12:15 today.';
      assert.equal(translate.amerToBrit(string), 'Lunch is at <span class="highlight">12.15</span> today.');
    })
  })

  suite('British to American Tests', ()=>{
    //#11
    test('', ()=>{
      let string = 'We watched the footie match for a while.';
      assert.equal(translate.britToAmer(string), 'We watched the <span class="highlight">soccer</span> match for a while.');
    })

    //#12
    test('', ()=>{
      let string = 'Paracetamol takes up to an hour to work.';
      assert.equal(translate.britToAmer(string), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    })

    //#13
    test('', ()=>{
      let string = 'First, caramelise the onions.';
      assert.equal(translate.britToAmer(string), 'First, <span class="highlight">caramelize</span> the onions.');
    })

    //#14
    test('', ()=>{
      let string = 'I spent the bank holiday at the funfair.';
      assert.equal(translate.britToAmer(string), 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.');
    })

    //#15
    test('', ()=>{
      let string = 'I had a bicky then went to the chippy.';
      assert.equal(translate.britToAmer(string), 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.');
    })

    //#16
    test('', ()=>{
      let string = "I've just got bits and bobs in my bum bag.";
      assert.equal(translate.britToAmer(string), "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.");
    })

    //#17
    test('', ()=>{
      let string = 'The car boot sale at Boxted Airfield was called off.';
      assert.equal(translate.britToAmer(string), 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.');
    })

    //#18
    test('', ()=>{
      let string = 'Have you met Mrs Kalyani?';
      assert.equal(translate.britToAmer(string), 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
    })

    //#19
    test('', ()=>{
      let string = 'Prof Joyner of King\'s College, London.';
      assert.equal(translate.britToAmer(string), '<span class="highlight">Prof.</span> Joyner of King\'s College, London.');
    })

    //#20
    test('', ()=>{
      let string = 'Tea time is usually around 4 or 4.30.';
      assert.equal(translate.britToAmer(string), 'Tea time is usually around 4 or <span class="highlight">4:30</span>.');
    })

    
  })
  suite('Highlight translation tests', ()=>{
    //#21
    test('', ()=>{
      let string = 'Mangoes are my favorite fruit.';
      assert.equal(translate.amerToBrit(string), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    })

    //#22
    test('', ()=>{
      let string = 'I ate yogurt for breakfast.';
      assert.equal(translate.amerToBrit(string), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    })

    //#23
    test('', ()=>{
      let string = 'We watched the footie match for a while.';
      assert.equal(translate.britToAmer(string), 'We watched the <span class="highlight">soccer</span> match for a while.');
    })

    //#24
    test('', ()=>{
      let string = 'Paracetamol takes up to an hour to work.';
      assert.equal(translate.britToAmer(string), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    })
  })
});


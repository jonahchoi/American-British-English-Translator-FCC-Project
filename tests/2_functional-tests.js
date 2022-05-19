const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  //#1
  test('Valid text and locale', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Mangoes are my favorite fruit.',
        locale: 'american-to-british'
      })
      .end((err, res)=>{
        assert.property(res.body, 'text');
        assert.equal(res.body.text, 'Mangoes are my favorite fruit.', 'The text should be the original input text');
        assert.property(res.body, 'translation');
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
        done();
      })
  })

  //#2
  test('Invalid locale', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Mangoes are my favorite fruit.',
        locale: 'american-to-european'
      })
      .end((err, res)=>{
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid value for locale field');
        done();
      })
  })

  //#3
  test('Missing text', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        locale: 'american-to-british'
      })
      .end((err, res)=>{
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      })
  })

  //#4
  test('Missing locale', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Mangoes are my favorite fruit.'
      })
      .end((err, res)=>{
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field(s) missing')
        done();
      })
  })

  //#5
  test('Empty text', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        text: '',
        locale: 'american-to-british'
      })
      .end((err, res)=>{
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'No text to translate')
        done();
      })
  })

  //#6
  test('Text needs no translation', (done)=>{
    chai.request(server)
      .post('/api/translate')
      .send({
        text: 'Hello, my name is Tom.',
        locale: 'american-to-british'
      })
      .end((err, res)=>{
        assert.property(res.body, 'text');
        assert.equal(res.body.text, 'Hello, my name is Tom.', 'The text should be the original input text');
        assert.property(res.body, 'translation');
        assert.equal(res.body.translation, 'Everything looks good to me!');
        done();
      })
  })
});

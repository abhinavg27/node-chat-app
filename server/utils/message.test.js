const expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=> {
    var from = 'Abhinav';
    var text = 'Hi! I am Abhinav';
    var message = generateMessage(from, text);
    it('Should return object from generateMessage call', (done) => {
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
        done();
    });
});
const expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', ()=> {
    var from = 'Abhinav';
    var latotude = 14;
    var longitiude = 23;
    var url = 'https://www.google.com/maps?q=14,23';
    var message = generateLocationMessage(from, latotude,longitiude);
    it('Should return url from generateLocationMessage call', (done) => {
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(typeof message.createdAt).toBe('number');
        done();
    });
});
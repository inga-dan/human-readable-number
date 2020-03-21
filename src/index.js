module.exports = function toReadable (num, custom_join_character) {
    var string = num.toString(),
    units, tens, scales, start, end, parts, partsLen, part, ints, i, word, words;

var and = custom_join_character || 'and';

if (parseInt(string) === 0) {
    return 'zero';
}
units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

start = string.length;
parts = [];
while (start > 0) {
    end = start;
    parts.push(string.slice((start = Math.max(0, start - 3)), end));
}

partsLen = parts.length;
if (partsLen > scales.length) {
    return '';
}

words = [];
for (i = 0; i < partsLen; i++) {
    part = parseInt(parts[i])
    if (part) {
        ints = parts[i].split('').reverse().map(parseFloat);
        if (ints[1] === 1) {
            ints[0] += 10;
        }
        if ((word = scales[i])) {
            words.push(word);
        }
        if ((word = units[ints[0]])) {
            words.push(word);
        }
        if ((word = tens[ints[1]])) {
            words.push(word);
        }
        if (ints[0] || ints[1]) {
            if (ints[2] || !i && partsLen) {
                words.push();
            }
        }
        if ((word = units[ints[2]])) {
            words.push(word + ' hundred');
        }
    }
}
return words.reverse().join(' ');
}

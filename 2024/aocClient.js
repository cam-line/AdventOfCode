const {  AocClient } = require('advent-of-code-client');

const client = new AocClient({
    year: 2024,
    day: 1,
    token: '',
});

async function fetchInput(day) {
    const input = await client.getInput(day);
    return input;
}

async function submit(part, answer) {
    client.submit(part, answer);
}

module.exports = { fetchInput, submit }; 
const name = "Leonardo";

const intersets = ["arts", "architecture", "science", "music", "mathematics"];
const birth = { year: 1452, place: 'Florence' };
const text = `${name} was an Itlian ~~~ ${intersets.join(",")}. He was born ${birth.year} in ${birth.place}`

console.log(text);

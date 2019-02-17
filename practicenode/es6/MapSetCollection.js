const profiles = new Map();

profiles.set('twitter','@wjdgkals23');
profiles.set('facebook','@wjdgkals74');
profiles.set('google','@wjdgkals75');

console.log(profiles.size);
console.log("has twitter id" + " " +profiles.has('twitter'));
for(let entry of profiles) {
    console.log(entry);
}
profiles.set('twitter','@wjdgkals22');
console.log("---------modify twitter----------");

for(let entry of profiles) {
    console.log(entry);
}

console.log("---------delete google----------");
profiles.delete('google');

for(let entry of profiles) {
    console.log(entry);
}


/// 함수와 객체를 map의 키로 활용할 수 있다?

const tests = new Map();

tests.set(() => 2*2, 4);
tests.set(() => 2/2, 4);

for(let [key,value] of tests.entries()) {
    console.log(key());
}


/// SET

const sets = new Set([0,1,2,3]);
console.log(sets.size);
console.log(sets.delete(0));
console.log(sets.size);

console.log("---------for Set----------");
for(let entry of sets) {
    console.log(entry);
}


function* idGenerator() {
  let id = 0;
  yield id;
  id++
}
const genUUID = idGenerator();
console.log(genUUID.next())
console.log(genUUID.next())
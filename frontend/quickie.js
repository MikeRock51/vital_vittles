function calcTokenExp() {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 23);
  currentDate.setMinutes(currentDate.getMinutes() + 59);

  return currentDate;
}

console.log(new Date(), calcTokenExp())

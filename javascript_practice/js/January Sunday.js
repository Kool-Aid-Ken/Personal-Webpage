console.log('--------------------');
for (var year = 2014; year <= 2050; year++) {
  var d = new Date(year, 0, 1);
  if (d.getDay() === 0)
    console.log("15th September is being a Saturday  " + year);
}
console.log('--------------------');

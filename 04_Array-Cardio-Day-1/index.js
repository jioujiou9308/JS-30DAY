// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
	{ first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
	{ first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
	{ first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
	{ first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
	{ first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
	{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
	{ first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
	
];

const people = [
	'Bernhard, Sandra',
	'Bethea, Erin',
	'Becker, Carl',
	'Bentsen, Lloyd',
	'Beckett, Samuel',
	'Blake, William',
	'Berger, Ric',
	'Beddoes, Mick',
	'Beethoven, Ludwig',
	'Belloc, Hilaire',
	'Begin, Menachem',
	'Bellow, Saul',
	'Benchley, Robert',
	'Blair, Robert',
	'Benenson, Peter',
	'Benjamin, Walter',
	'Berlin, Irving',
	'Benn, Tony',
	'Benson, Leana',
	'Bent, Silas',
	'Berle, Milton',
	'Berry, Halle',
	'Biko, Steve',
	'Beck, Glenn',
	'Bergman, Ingmar',
	'Black, Elk',
	'Berio, Luciano',
	'Berne, Eric',
	'Berra, Yogi',
	'Berry, Wendell',
	'Bevan, Aneurin',
	'Ben-Gurion, David',
	'Bevel, Ken',
	'Biden, Joseph',
	'Bennington, Chester',
	'Bierce, Ambrose',
	'Billings, Josh',
	'Birrell, Augustine',
	'Blair, Tony',
	'Beecher, Henry',
	'Biondo, Frank',
];
// ---------------------------------------------------------1
// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const fifteen = inventors.filter(function (inventor) {
	if (inventor.year >= 1500 && inventor.year <= 1600) {
		return true;
	}
});
// console.table(fifteen);
const q1Answer = inventors.filter((inventor) => (inventor.year >= 1500 && inventor.year <= 1600));
// console.table(q1Answer);
// ---------------------------------------------------------2
// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const nameFilter = inventors.map(item => item.first + '' +item.last)
// console.table(nameFilter);
// ---------------------------------------------------------3
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const birthArry = inventors.sort((x,y) => {
    return (x.year) - (y.year)
})
// console.log(birthArry);
// 另一種寫法，使用三元運算子
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
// ---------------------------------------------------------4
// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const totleYear = inventors.reduce((total,inventor)=>{
    return total + (inventor.passed-inventor.year)
},0)
// console.log(totleYear);
// ---------------------------------------------------------5
// 5. Sort the inventors by years lived

const oldest = inventors.sort((x,y)=>{
    let xlive = x.passed - x.year;
    let ylive = y.passed - y.year;
    return ylive - xlive
})
// console.table(oldest);
// --------------------------------------------------------6
// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
 
// const all = document.querySelector('.mw-category')
// const links = Array.from(document.querySelectorAll('a'))
// const de = links
//     .map(link=>{link.textContent})
//     .filter(streetName=>streetName.includes('de'))
// console.log(de);
// --------------------------------------------------------7
// 7. sort Exercise
// Sort the people alphabetically by last name


const alpha = people.sort(function(lastOne,nextOne){
    const [alast, afirst] = lastOne.split(', ');
    const [blast, bfirst] = nextOne.split(', ');
 return alast > blast ? 1:-1
})
// console.log(alpha);

// -----------------------------------------------------------8
// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car',
 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

// 設定第一個參數為空物件
const instancesNum = data.reduce((obj, item) => {
  // 若 obj 物件沒有 item 屬性(item 為 data 內的各元素)，就增加該屬性，並設定值為 0
  if(!obj[item]) {
    obj[item] = 0;
  }
  // 再次碰到該屬性的話，值+1
    //   obj[item] =obj[item] +1;
    obj[item]++;
  return obj;
}, {})
console.log(instancesNum);
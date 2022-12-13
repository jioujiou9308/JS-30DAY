# 14. JavaScript References VS Copying

## 摘要

-   介紹 JavaScript 中陣列與物件的引用(refrence)及複製(Copying)。

## 內容

### 1. 基礎類型的複製 (strings,numbers,booleans,Null,Undefine)

-   對變數來說:無論型別是 integer, String 及 boolen 都是 copy。

```javascript =
let name = 'Ken';
let name2 = name;
console.log(name, name2); // ken   ken
name = 'Steve';
console.log(name, name2); // Steve  ken

let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);
```

### 2. 針對陣列中的質的改變

-   在陣列中，如果直接賦值，他們是指向同一個位置，所以會改變原陣列，但也有方法可以不要指向同一個地址，就算改變了陣列中的值，也不會改變原陣列

```javascript =
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
let team1 = players;
team1[3] = '★';
console.log(players); //['Wes', 'Sarah', 'Ryan', '★']
```

-   以下方法可以不要指向同一個地址，就算改變了陣列中的值，也不會改變原陣列

```javascript =
let team2 = players.slice();
team2[3] = '★';
console.log(team2); //['Wes', 'Sarah', 'Ryan', '★']
console.log(players); //['Wes', 'Sarah', 'Ryan', 'Poppy']

let team3 = [...players];
team3[3] = '★';
console.log(team3); //['Wes', 'Sarah', 'Ryan', '★']
console.log(players); //['Wes', 'Sarah', 'Ryan', 'Poppy']

let team4 = Array.from(players);
team4[3] = '★';
console.log(team4); //['Wes', 'Sarah', 'Ryan', '★']
console.log(players); //['Wes', 'Sarah', 'Ryan', 'Poppy']

let team5 = [].concat(players);
team5[3] = '★';
console.log(team5); //['Wes', 'Sarah', 'Ryan', '★']
console.log(players); //['Wes', 'Sarah', 'Ryan', 'Poppy']
```

### 3.針對物件的複製

-   如果直接使用等到複製，那麼也會指向同一個地址

```javascript =
const person = {
	name: 'Wes Bos',
	age: 80,
};
const dev = person;
dev.name = '㊣';
// dev['name'] = '㊣';
console.log(person); //{name: '㊣', age: 80}
console.log(dev); //{name: '㊣', age: 80}
```

-   但使用下面的方法，可以複製元物件的內容，但不會指向同一個地址，可以更改複製的內容而不改變原物件，但僅限於第一層(所謂的淺)拷貝

```javascript =
const dev2 = { ...person };
dev2.name = '㊣';
console.log(person); //{name: 'Wes Bos', age: 80}
console.log(dev2); //{name: '㊣', age: 80}

const dev3 = Object.assign({}, person, { name: '㊣' });
console.log(person); //{name: 'Wes Bos', age: 80}
console.log(dev3); //{name: '㊣', age: 80}
```

-   以上為所謂的淺拷貝，有深拷貝的問題存在，以下看範例

-   這裡使用 Object.assign 的方法創建了 au1 來複製 auth 的值，分別對 name、social.line 的值做改變，但可以看到原物件中(auth)，雖然 name 的值沒有被改變，但是 social 中 line 的值卻被改變了，這就是所謂的深淺拷貝的問題，第二層的內容還是指向同一個地址

```javascript =
const auth = {
	name: 'Ken',
	age: '28',
	social: {
		line: '123456',
		facebook: '12458',
	},
};
const au1 = Object.assign({}, auth, { name: '⊕' });
au1.social.line = '§';
console.log(auth); // name : 'ken'   line:'§'
console.log(au1); // name: '⊕'   line:'§'
```

-   解決方式為

```javascript =
// 解決淺拷貝問題，深拷貝，使用json
const au2 = JSON.parse(JSON.stringify(auth));
au2.name = '●';
au2.social.line = '●';
console.log(auth); // name : 'ken'   line:'123456'
console.log(au2); // name: '●'   line:'●'
```

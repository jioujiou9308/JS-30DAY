# 12 - Key Sequence Detection - 密技的輸入

## 摘要

-   做一個打密碼出現彩蛋的功能，像是以前打遊戲的密技（WWSSAADD）

## js

-   keyup - 鍵盤輸入案件的 key
-   join('')
-   splice()
-   include()

## 步驟

### 1. 先設定密技與一個空陣列

```javascript =
let secretCode = '778899';
let pressed = [];
```

### 2. 建立 window 的事件監聽 keyup

```javascript =
window.addEventListener('keyup', (e) => {
	// 可以看到我們鍵盤打書來的鍵是哪一個
	console.log(e.key);
});
```

### 3. 將打得字放進陣列中，並且擷取最後打的字，包含了秘技 code，如果為 true 就調用 cornify_add()

-   用 splice 來拼接，splice(從第幾個位置刪除，刪除幾個數，要插入的東西是什麼)
-   第幾個位置刪除可以是負，刪除幾個數不能為負數但可以不寫(那就是後面的全部)，要插入的地方也可以不寫
-   splice 會改變原來的陣列
-   splice 可以用變數去接，接到的值是刪除後的陣列
    > 這裡特別說一下我思考的邏輯，因為不管我們 push 進 pressed 的陣列多少東西，我們最後就是要讓 pressed 的陣列只含有與 secretCode 一樣的字母陣列，搭配者 splice，我設置的起始刪除位置就是整個-pressed.length()，這個-號是重點，至於要刪除幾個數呢，剛剛有講過邏輯，元陣列是不會顯示刪除的東西，所以要刪除幾個數呢，換個方向思考我們要保留的是 secretCode.length 的字數，那自然的要刪除的就是 pressed.length - secretCode.length 得個數，也就是從頭-pressed.length 開始刪除，到 pressed.length - secretCode.length 的位置
-   includes()是裡面包含 secretCode 就為 true，就調用

-   這裡附上，作者的思考邏輯，但我覺得比較難懂拉
    > `pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);`以此範例來說，第一個參數始終會是-7，第二個參數會是當前輸入陣列長度-6，
    > 所以當事件觸發到第七個陣列值（第七個輸入被觸發且 push 進 pressed 時），
    > 例如[1,2,3,4,5,6,7]時會變成 pressed.splice(-7,1)，
    > 等於刪除倒數第七個元素（也就是 index0 第一筆），
    > 並透過陣列長度-設定密碼長度來決定刪除數量，使其維持在固定長度，
    > 之後每次的 push 會加在尾段，而 splice 會刪除第一個元素。

```javascript =
pressed.splice(-pressed.length, pressed.length - secretCode.length);
pressed.push(e.key);
if (pressed.join('').includes(secretCode)) {
	cornify_add();
}
```

## 補充

這次雖然只是小小的效果，在寫心得的時候真的也是學到很多以前沒注意的東西，
並在寫 includes()才也知道 string 也有這個效果，以往我都只會使用 match()，
includes()屬於 ES6 的語法，爬文後整理到關於字串比對的使用還有以下各種方法：

```javascript =
var str = 'abcde';
var check1 = 'ab'; //包含ab，期待值是true
var check2 = 'ac'; //包含ac，期待值是false

//用includes()來取得true/false
str.includes(check1); //true
str.includes(check2); //false

//用match()來處理，判斷是否為null來取得true/false
str.match(check1); // object
str.match(check2); // null

//用indexOf()來處理，判斷是否為-1來取得true/false
str.indexOf(check1); // 0
str.indexOf(check2); // -1

//用search()，判斷是否為-1來取得true/false
str.search(check1); // 0
str.search(check2); // -1

//用RegExp正規表示式來取得true/false
var reg1 = /ab/;
var reg2 = /ac/;
reg1.test(str); // true
reg2.test(str); // false
```

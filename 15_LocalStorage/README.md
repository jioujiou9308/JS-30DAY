# LocalStorage and Event Delegate

## 摘要

-   LocalStorage 的使用。
-   Event Delegate 的介紹 -事件委託
-   join("") - 將陣列字串化時，中間要用什麼隔開ㄋ

## 步驟

### 1. 記得我們再提交表單的時候，要記得加入 e.preventDefault() ，不要讓他跳轉到其他頁面

```javascript =
function addTask(e) {
	e.preventDefault();
	console.log('hello');
}

addTasks.addEventListener('submit', addTask);
```

### 2. 要獲取輸入框填寫的內容，並且先放在我們自製的 tasks 的陣列中

```javascript =
//...略
const tasks = [];

//...略

const text = this.querySelector('[name=task]').value;
// 這是要放進local storage的東西
const task = {
	text: text,
	done: false,
};
// 將task內容放進task陣列
tasks.push(task);

console.log('hello');
// 每次動作都會清除框框內內容
this.reset();

//...略
```

-   做到這麼我們開啟 log 頁面可以輸入一些值，如果再 tasks 裡面可以發現我們輸入的值就代表目前沒有問題

### 3. 把拿到的值渲染出來在 ul 上面

```javascript =
//將拿到的資料展示到 ul -> class=tasks 中
// tasks = [] es6 語法 空數值
function showTask(tasks = [], taskList) {
	taskList.innerHTML = tasks
	// i 就是我們後面要拿到的id
		.map((task,i) => {
			// 下面的
			return `
                        <li>
							<input type="checkbox" id="task${i}" />
                            <lagel for="test${i}">${task.text}</label>
                        </li>
                    `;
		})
		// 如果沒有用join('')，中間內容又會有逗點，但是我們html並沒有
		.join('');
}

function addTask(e) {
	...略
	//將我們製作好的showTask放進來，在內容被push進task後
	//並將這兩個參數放進來
	showTask(tasks, taskList);
	...略
}

```

-   做到這裡回網頁測試的話可以正常地將我們輸入的內容放進到 list 中可以正確顯示內容

### 4. 將資料存取到 Local Storage

```javascript =
function addTask(e) {
...略
asks.push(task);
// 如果不用JSON.stringify 就會只顯示object
localStorage.setItem('tasks', JSON.stringify(tasks));
showTask(tasks, taskList);
...略
```

### 5. 要將存儲在 local storage 的資料拿出來渲染

```javascript
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//記得要在最後插入這段，否則每次re-load之後還要按下submit才會出現資料!
showTask(tasks, taskList);
```

### 6. 更新數據中的 done 屬性值(是否有勾選的狀態)

-   接下來要介紹 Event Delegate
-   Event Delegate:在一般時候，使用 event binding 即可達到每一個要求。Event binding 主要是綁定特定 DOM 元素後透過註冊 Event 觸發 DOM function 達到效果。而 Event Delegate 則是綁定 DOM 的父元件而非子元件，讓子元件在更新後也可以透過父元件操作。
-   最簡單的例子則是先用 Event binding 綁定子元件後新增元件，此時新增的元件並不會有已經綁定的事件。此時若透過 Event Delegate 綁定父元件，子元件也會被父元件綁定的事件觸發，事件會上傳給父元件，父元件會帶著子元件一同返回事件。
-   toggleDone()則是要利用此一特性，用 click 事件綁定 itemsList(.plates)，當子元件('input')被 click 後會觸發 toggleDone，此時印出 e.target 會發現返回 input 及 label 兩個元素。此時我們僅需要 input 元素，篩選 if (!e.target.matches('input')) return;後把點擊的項目儲存後拿來改變 done 的值，並存入 LocalStorage。

```javascript =
// 先拿到所有的tasks裡面的 checkbox
//並且增加監聽功能
const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach((checkbox) => checkbox.addEventListener('click', toggleDone));\

所以改成
taskList.addEventListener('click', toggleDone);
```

-   接者開始從 storage 拿出資料 、並將打勾的選項儲存回 local storage
-   幾個注意的點
    -   一開始使用 `console.log('hi')`我們會發現，無論打勾或取消打勾，都會做兩次
        出現兩次 hi，這其實是分別印出了 input 和 label，所以我們要先把 label 篩選掉
-   因為我們要知道我們打勾的是我們存進 local storage 資料中的第幾個，所以我們用 dataset 拿出一開始在 input 中設定的自訂屬性 `const index = el.dataset.index;`
-   接者就是 done 的呈現，是 true 就變成 false，是 false 就變成 true`tasks[index].done = !tasks[index].done;` 然後再將資料存進去 `localStorage.setItem('tasks', JSON.stringify(tasks));`

```javascript =
function toggleDone(e) {
	// 會發現除了做兩次 除了 input 還有labeo 所以我們要過濾掉label
	const el = e.target;
	// 不是input 就被過濾掉 ，有就接者做
	if (!el.matches('input')) return;
	const index = el.dataset.index;
	tasks[index].done = !tasks[index].done;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	console.log(index);
}
```

## 7. 最後一步驟顯示問題

-   其實做到這裡就差不多了，但是我們會發現，怎麼原本打勾的，重新整理又消失了，先打開 application 檢查，結果發現裡面有更改沒做，那問題就出在顯示上面了
-   在顯示的資料中運用三元運算顯示 checked

```javascript =
 ${task.done ? 'checked' : ''}
```

# 26 - Stripe Follow Along Nav -

## 摘要

-   功能
    -   連結 Hover 時白色區塊要出現在該連結下方
-   畫面
    -   白色區塊的寬高要符合該連結的下拉區塊
    -   滑鼠移開時白色區塊要消失
    -   白色區塊出現內容才出現
    -   下拉區塊尚未完全出現，滑鼠移動時要取消顯示內容

## js

-   querySelectorAll('.cool>li') - .cool 底下所有的 li 元素
-   setProperty
-   getBoundingClientRect()

## 步驟內容

### 1. 先取好三個節點

```javascript =
const navList = document.querySelectorAll('.cool>li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');
```

### 2. 先事件監聽三個 li 的滑鼠移入移出功能

```javascript =
function handleEnter() {
	console.log('enter');
}
function handleLeave() {
	console.log('leave');
}

// 綁定三個li的移入與移出
navList.forEach((li) => li.addEventListener('mouseenter', handleEnter));
navList.forEach((li) => li.addEventListener('mouseleave', handleLeave));
```

### 3. 先做出滑鼠移入會跑出內容，與 highlight 的框框

-   但這裡的 hightlight 的框還沒有移動到正確的位置
-   setTimeout 是為了給她有漸層的效果

```javascript =
function handleEnter() {
	// 分開的原因是因為漸進式的效果，
	this.classList.add('trigger-enter');
	setTimeout(() => {
		this.classList.add('trigger-enter-active');
	}, 150);
	// 顯示白色背景
	background.classList.add('open');
}
function handleLeave() {
	this.classList.remove('trigger-enter');
	this.classList.remove('trigger-enter-active');
	background.classList.remove('open');
}
```

### 4. 接下來要做的是 這個 hightlight 的尺寸以及位置

-   拿到自訂一的內容尺寸

```javascript =
function handleEnter() {
	// 分開的原因是因為漸進式的效果，
	this.classList.add('trigger-enter');
	setTimeout(() => {
		this.classList.add('trigger-enter-active');
	}, 150);
	// 顯示白色背景
	background.classList.add('open');
	// 先拿到自訂議內容的尺寸等等等訊息
	const dropdownRect = this.querySelector('.dropdown').getBoundingClientRect();
	// 把拿到的尺寸加進background
	const backgroundRect = {
		width: dropdownRect.width,
		height: dropdownRect.height,
	};
	background.style.setProperty('width', `${backgroundRect.width}px`);
	background.style.setProperty('height', `${backgroundRect.height}px`);
}
```

### 5. 現在大小沒問題，現在要移動到相對應的位置

```javascript =
function handleEnter() {
    ...略
	const backgroundRect = {
		width: dropdownRect.width,
		height: dropdownRect.height,
		top: dropdownRect.top,
		left: dropdownRect.left,
	};
	background.style.setProperty('width', `${backgroundRect.width}px`);
	background.style.setProperty('height', `${backgroundRect.height}px`);
	background.style.setProperty('transform', `translate(${backgroundRect.left}px, ${backgroundRect.top}px)`);
}
```

### 6. 現在處理最後的問題，如果我們在上方加了內容，那框框就會跑掉

```javascript =
function handleEnter() {
    ...略
	const navRect = nav.getBoundingClientRect();
	// 把拿到的尺寸加進background
	const backgroundRect = {
		width: dropdownRect.width,
		height: dropdownRect.height,
		top: dropdownRect.top - navRect.top,
		left: dropdownRect.left - navRect.left,
	};
}
```

### 7. 因為有 setTimeout 的關係，會有移動速度過快時會有重疊的感覺

-   所以要在 setTimeout 加上判斷

```javascript =
setTimeout(() => {
	if (this.classList.contains('trigger-enter')) {
		this.classList.add('trigger-enter-active');
	}
}, 150);
```

-   可以簡寫成

```javascript =
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 10);
```

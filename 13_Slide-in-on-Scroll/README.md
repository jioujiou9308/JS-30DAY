# 13 - Slide in on Scroll

## 摘要

-   功能
    -   捲到特定位置會載入特定圖片
-   畫面
    -   進入畫面時，左邊的圖從左邊滑入，右邊的圖從右邊滑入
    -   離開畫面時，左邊的圖從左邊滑出，右邊的圖從右邊滑出
    -   滑入同時，要從透明漸漸出現
    -   滑出同時，要從漸漸消失至透明

## 步驟

### 1. 選取所有照片，並做 windows 的滾輪事件監聽

-   因為我們是要以畫面上的滾來做捲動，進而影響照片的淡入淡出，所以是要針對 windows 做事件監聽

```javascript =
const images = document.querySelectorAll('.slide-in');

function checkSlide(e) {
	// 可以先檢查，當我們滾動滾輪時，是否有值產生
	console.log(e);
}
window.addEventListener('scroll', checkSlide);
```

### 2. 先製作兩個默認值，第一個:假設當照片滾動到一半時，第二個: 當畫面未超出滾動畫面時

> 程式碼如下

```javascript =
function checkSlide(e) {
	images.forEach((image) => {
		const isHalf = false;
		const isNotScrollPass = false;
		if (isHalf && isNotScrollPass) {
			image.classList.add('active');
		} else {
			image.classList.remove('active');
		}
	});
}
```

> 拆解

-   先對所有的照片做 forEach 套用下面的判斷式
-   isHalf :我們預設當滾輪滑到照片的一半時
-   isNotScrollPass :當滾輪滑到準備要超出照片的臨界值
-   下面做的 if 判斷是，當上面這兩個值為 true 的時候，就在該照片的 class 加入 active，當其中一個為 false 時就移除 adctiv

### 3. 確實地做出 isHalf & isNotScrollPass 的判斷

-   window.scrollY(滾輪移動距離)
-   window.innerHeight(畫面距離)
-   image.offsetTop(照片頂部到畫面頂部距離)
-   classList.add & classList.remove

```javascript =
function checkSlide(e) {
	images.forEach((image) => {
		const scrolled = window.scrollY + window.innerHeight;
		const imageHalf = image.offsetTop + image.height / 2;
		const imageTotal = image.offsetTop + image.height;
		console.log(imageHalf);
		const isHalf = scrolled > imageHalf;
		const isNotScrollPass = window.scrollY < imageTotal;
		if (isHalf && isNotScrollPass) {
			image.classList.add('active');
		} else {
			image.classList.remove('active');
		}
	});
}
```

-   先算出滾輪移動的距離 + 畫面的距離 `const scrolled = window.scrollY + window.innerHeight;`
-   在算出照片頂部到畫面頂部 + 照片一半的距離 `const imageHalf = image.offsetTop + image.height / 2;`
-   isHalf 就是要 scrolled > imageHalf 為 true 時，，照片會彈出(&& isNotScrollPass)
-   最後一個算出，照片頂部到畫面頂部 + 整張照片的距離 `const imageTotal = image.offsetTop + image.height;`
-   就可以設定最後一個 isNotScrollPass ，我們的滾輪距離在小於 imageTotal 時，設為 true，這樣照片就可以運作了

### 4. 因為每當我們滾輪移動就會不斷觸發 scroll 的事件監聽，這樣太吃效能，也可能發生抖動問題，作者做了一個防抖動的 code 我們直接帶入就可以

```javascript =
window.addEventListener('scroll', debounce(checkSlide));
```

### JavaScript 語法備註

Window.scrollY 目前瀏覽器視窗已滾動的 Y 軸（垂直位置）

參閱：MDN-Window.scrollY

Window.innerHeight 目前瀏覽器視窗的高度

參閱：MDN-Window.innerHeight

HTMLElement.offsetTop 返回指定元素相對於有父元素(offsetParent)中的頂端位置，
以此練習來說，sliderImage 的父元素就是 window。

參閱：MDN-Window.innerHeight

[筆記參考網址 1](https://github.com/guahsu/JavaScript30/tree/master/13_Slide-in-on-Scroll/)

[筆記參考網址 2](https://ithelp.ithome.com.tw/articles/10221939)

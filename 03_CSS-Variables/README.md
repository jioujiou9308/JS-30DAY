# 03 CSS Variables

---

## 實作步驟

### 第一步: querySelectorAll 抓取 inputs

### 第二步: 將 inputs 做事件監聽，包含 change ， mousemove

### 第三步: 創建一個事件監聽的 function handleUpdate

### 第四步: 抓取 dataset 的 px 用來下個步驟可改變 property 的值

### 第五步: 將改變 blur、spacing、bace 連結到 input

---

## Javascript 語法&備註

### 1. querrySelectorAll 得到的值是 array 還是 nodelist

NodeList vs Array:當使用 querySelectorAll('.controls input')時會回傳一個 NodeList, 可以使用 forEach function，但是它不是一個 Array，可以無法使用像是 map, reduce 等 function。
array 和 nodelist 的差別

### 2. dataset 是什麼

https://hsuchihting.github.io/javascript/20201019/3849135081/ -我們自己設定的 dataset 可以有很多個 ex: data-coo:"" , data-time:"", 當我們 console 時都會列出，並以物件的形式呈現

用 dataset 可以取出對象的 data-\*屬性，也等同於 getAttribute

接者為什麼在這裡要使用 dataset
因為改變 blur 與 spacing 的值是 value 在控制，但她又需要 px

```javascript =
<div id='test' data-no='123'></div>;
document.querySelector('#test').dataset.no; // 輸出123
document.querySelector('#test ').getAttribute('data-no'); // 輸出123
```

### 3. 什麼是 documentElement

Document.documentElement 會回傳目前文件（document）中的根元素（Element），如：HTML 文件中的 元素
CSS 內的 :root 對應的就是 元素，所以要改變 :root 內設定的元素值就是使用 Document.documentElement

[w3school 參考](https://www.w3schools.com/jsref/prop_document_documentelement.asp)、
[MDN 參考](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/documentElement)

### 4. setProperty

```javascript =
document.documentElement.style.setProperty('--<varName>', '<varValue>');
```

[w3school 參考](https://www.w3schools.com/jsref/met_cssstyle_setproperty.asp)、
[MDN 參考](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)

---

## CSS 補充

### 1. root 用法

-   `:root` 是 DOM 元件的根元素，相當於<html>，一般會把 CSS 的變數聲明在內，CSS3 原生的變數表示法:` --variable`

```javascript =
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}

img {
  padding: var(--spacing);
  background-color: var(--base);
  filter: blur(var(--blur));
}
```

### 2. 照片的 filter

如果新增兩個以上的照片濾鏡

```javascript =
/* 這樣會變成覆蓋，剩下garyscale的效果 */
img {
    filter: blur(10px);
    filter: grayscale(10%);
}
/* 寫在同一處，才能吃到兩個效果 */
img {
    filter: blur(10px) grayscale(10%);
}

```

---

參考筆記 :

https://github.com/a90100/JavaScript30/tree/master/03%20-%20CSS%20Variables
https://github.com/guahsu/JavaScript30/tree/master/03_CSS-Variables
https://github.com/dustinhsiao21/Javascript30-dustin/tree/master/03%20-%20CSS%20Variables
https://ithelp.ithome.com.tw/articles/10216893

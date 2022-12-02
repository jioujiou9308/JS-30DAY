# 025- Event Capture, Propagation, Bubbling and Once

## 摘要

-   細說 addEventListener
-   四大重點
    -   Event Capture
    -   Propagation
    -   Bubbling
    -   Once(new property)

### 內容

> 冒泡事件 budding

```javascript =
const divs = document.querySelectorAll('div');
function log() {
	console.log(this);
}
divs.forEach((div) => div.addEventListener('click', log));
```

-   對每一樣 div 都做了 click 的事件監聽，如果我們只點了 .three 的那個，其他第二層，第三層也會依序跑出 click 事件，這就叫做冒泡事件

> 事件捕獲

```javascript =
divs.forEach((div) =>
	div.addEventListener('click', log, {
		capture: true,
	})
);
```

-   如果們我們在事件監聽加上第三個參數，capture:true ，那我們的 click three 時資訊會從外層開始，one -> two -> three 這叫做事件捕獲，但如果點 one 就只有 one，點 two 就是 one=>two，那有 ture 就會有 false(就如同冒泡事件)

-   應該理解為事件被調用的先後順序

> 如何阻止事件的傳遞

-   使用 stopPropagation() - 這會使原本向外延伸的氣泡事件停止。

```javascript =
function log(e) {
	e.stopPropagation();
	console.log(this);
}
```

-   使用 stopPropagation()雖說可以阻止調用但值得注意的是，以下兩點

1. 當 capture:false (冒泡事件時候)，雖說可以阻止冒泡，這樣的結果就是我們點擊哪一層就會顯示哪一層
2. 但當 capture:true (捕獲事件，從最外層開始調用)，這時使用 stopPropagation()，在這個事件監聽中，永遠只會監聽最外層(class='one')，點擊第二第三都沒用

> addEventListener 的第三個參數-2:once

-   代表這個事件監聽只執行一次，執行完後即會 removeEventListener。因此當 once : true 時，只會執行一次監聽事件。

[補充連結](https://teagan-hsu.coderbridge.io/2021/01/01/javascript-dom-event-and-event-delegation/)

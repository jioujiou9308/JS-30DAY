# 05 - Flex Panel Gallery

## 摘要目標

用 CSS 與 JS 來製作一個點擊後會動畫展開的圖片展示效果，
運用到了 CSS 的 flex、transform、transition.. 這篇比較偏向 css 知識！

-   功能
    -   點擊指定區塊，產生變化
    -   在點擊一次恢復原狀
-   畫面
    -   主要區塊變大，中間的字出現
    -   變大之後上下字要進來

## 使用功能摘要

-   CSS
    -   flex(flex-grow、fˇlex-shirk、flex-basic)-這個是下再要使用的那個層級，而 display:flex 的作用是作用在他的 children-[參考網址](http://zhoon.github.io/css3/2014/08/23/flex.html)
    -   Selector 相關 : element > element / element:nth-child(n) / element:before / element::after / element:first-child / element:last-child
-   JS
    -   this 的用法
    -   classList
    -   toggle
    -   transitioned
    -   e.propertyName & includes()

## 步驟

1. 由於整體 HTML 的 tag 是由 1 個 panels 包覆 5 個 panel，
   為了使其設定為 flex，先在外層容器 panels 加上 display: flex
   接著為每個 panel 加上 flex: 1 來使各子元件最大占比為 1
   也就會變成同容器中的 5 個元件都設 1，那就是每個元件最大占比為 20%。

2. 在為 panel 加上 justify-content: center 使其水平置中，
   並在加上了 display: flex 及 flex-direction: column，
   再加上一層 display: flex 可以使 panel 底下的元件也變成 flex 控管
3. 對 panel 底下的 first-child 及 last-child 做位移效果，
   使其能在預設狀態於可視範圍外，並設計 open-active
   當觸發時，配合 transition 產生移回原位的動畫，
   也在.panel.open 中新增了 flex: 5 使其觸發時會有展開的動畫。
4. 編寫 JS 先取得所有 panel 的節點，
   接著設計 toggle function 使執行的物件藉由.classList.toggle 來新增/移除動畫 class
   並透過 addEventListener 來監測當 click&transitionend 時觸發 toggle function。

.classList&transitionend &toggle 在>第一篇<剛好有提到。

## JS 語法注意

1. transitionend 是 js 的一種語法，寫完事件監聽後，我們 log 出 e.propertyName 可以看到做了哪些 transition
2. 之所以用 if(e.propertyName.includes('flex'))，而不是用
   if(e.propertyName === 'flex')，是因為有一點 bug 存在，雖然我們在 css 寫的 transtion 是 flex ，但是從網頁中看到的卻是 flex-flow

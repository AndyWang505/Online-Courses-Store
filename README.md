# LearnSphere 學習天地 - React EC Project
![image1](/public/image1.png)
![image2](/public/image2.png)
![image3](/public/image3.png)

## 專案介紹

此專案採用前後端分離，開發前端部分，使用 React 搭配 Tailwind，並串接後端 API（36個） 進行開發。

### 專案 src 結構

```
│  App.js
│  App.test.js
│  index.js
│  list.txt
│  logo.svg
│  reportWebVitals.js
│  setupTests.js
│  store.js
│  
├─api/
│      
├─assets/
│      
├─components/
│      
├─pages/
│  │  Login.js
│  │  
│  ├─admin/
│  │      
│  └─front/
│          
├─slice/
│      
└─stylesheets/
```
* index.js：專案進入點。
* App.js：動態路由設置之元件。
* store.js：設定及管理 Redux Toolkit 的全域狀態。
* api/：用於存放所有 API 請求相關的檔案。
* assets/：儲存靜態資源，例如：圖片和 SVG 檔案。
* components/：可重複利用之通用元件。
* pages/：主要的頁面結構和畫面。
* pages/Login.js：登入頁面。
* pages/admin/：後台管理者畫面。
* pages/front/：前台使用者畫面。
* slice/：Redux Toolkit 的狀態管理片段 (slice)，用於定義 reducers 和 actions 管理特定狀態區塊。
* stylesheets/：全域樣式和自訂 SCSS。

### Live Demo

本專案為技術練習作品，不具任何商業行為，勿留下真實個人資料。

* 前台：[https://andywang505.github.io/Online-Courses-Store/#](https://andywang505.github.io/Online-Courses-Store/#)
* 後台：[https://andywang505.github.io/Online-Courses-Store/#/login](https://andywang505.github.io/Online-Courses-Store/#/login)
* 管理員帳號因涉及個人資訊，不方便公開，若有需要請麻煩私訊 Email：`andywang890505@gmail.com`

## 功能

### 前台
* 課程商品瀏覽
* 購物車
* 套用優惠券
* 結帳
* 學員心得牆

### 後台
* 管理員登入、登出
* 課程商品管理
* 訂單管理
* 優惠券管理
* 文章管理

## 來源

* API: [hexschool](https://github.com/hexschool/ec-courses-api-swaggerDoc)
* Image: [Unsplash](https://unsplash.com/)

## 使用技術

* CRA
* React
* React Hooks
* React Router
* Redux Toolkit
* React Hook Form
* React Loading Skeleton
* ESLint
* Tailwind 
* Sass
* Sweetalert2
* Swiper
* Axios
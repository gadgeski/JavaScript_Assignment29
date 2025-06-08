const itemList = document.getElementById("itemList");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const pageInfo = document.getElementById("pageInfo");

const itemsPerPage = 5; // 1ページあたりの項目数
let currentPage = 1; // 現在のページ

// ダミーデータとして大量のリスト項目を生成
const allItems = [];
for (let i = 1; i <= 25; i++) {
  // 例として25個の項目を生成
  allItems.push(`アイテム ${i}`);
}

const totalPages = Math.ceil(allItems.length / itemsPerPage); // 総ページ数を計算

// リスト項目をHTMLに挿入する関数
function renderItems() {
  itemList.innerHTML = ""; // 一度リストをクリア

  allItems.forEach((itemText, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = itemText;
    itemList.appendChild(listItem);
  });

  // JavaScriptで取得し直すため、要素を再取得
  const displayedItems = document.querySelectorAll(".item-list li");

  // 現在のページに基づいて表示する項目を制御
  displayedItems.forEach((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (index >= startIndex && index < endIndex) {
      item.classList.remove("hidden"); // 表示
    } else {
      item.classList.add("hidden"); // 非表示
    }
  });

  updatePaginationControls();
}

// ページネーションコントロールの表示を更新する関数
function updatePaginationControls() {
  pageInfo.textContent = `ページ ${currentPage} / ${totalPages}`;

  prevPageBtn.disabled = currentPage === 1; // 最初のページなら「前へ」を無効
  nextPageBtn.disabled = currentPage === totalPages; // 最後のページなら「次へ」を無効
}

// 「前へ」ボタンのクリックイベント
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderItems();
  }
});

// 「次へ」ボタンのクリックイベント
nextPageBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderItems();
  }
});

// 初期表示
renderItems();

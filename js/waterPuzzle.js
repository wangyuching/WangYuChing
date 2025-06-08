document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("level-select");
  const playButton = document.getElementById("play-button");
  const gameContainer = document.getElementById("game-container");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "indigo",
    "violet",
    "gold",
    "silver",
    "maroon",
    "navy",
    "olive",
    "coral",
  ];
  const tubes = [];
  let selectedTube = null;
  let levelCount = 1;

  // 1.選擇遊戲的關卡
  function chooseLevel(level) {
    levelCount = level;
    document.getElementById("level-count").textContent = levelCount;
  }
  /*
    當函式被呼叫時，會傳入一個參數 level。
      將 level 的值指定給全域變數 levelCount。
      取得網頁上 id 為 level-count 的元素，並將其 textContent 屬性設為 levelCount。
  */

  //2.處理關卡選擇
  levelSelect.addEventListener("change", (event) => {
    const selectedLevel = parseInt(event.target.value, 10);
    chooseLevel(selectedLevel);
  });
  /* 
    將levelSelect 這個元素綁定一個 "change" 事件監聽器，改變選單選項時，事件處理函式從事件物件 event 中取得目前選中的值。
      將選中的值轉換為十進位整數。
      呼叫 chooseLevel 函式，傳入選中的關卡數字。
  */

  // 3. 開始遊戲按鈕
  playButton.addEventListener("click", () => {
    tubes.length = 0;
    createTubes();
    fillTubes();
  });

  // 4. 建立試管 有顏色:levelCount+1 沒顏色:2
  function createTubes() {
    gameContainer.innerHTML = "";
    tubes.length = 0;
    /* 清空 gameContainer & tubes(目前關卡中產生的試管（tube）DOM 元素)*/

    // 創建 full試管:levelCount+1
    for (let i = 0; i < levelCount + 1; i++) {
      const tube = document.createElement("div");
      tube.classList.add("tube");
      tube.addEventListener("click", () => selectTube(tube));
      gameContainer.appendChild(tube);
      tubes.push(tube);
    }
    /*
      建立 0 到 levelCount（包含 levelCount）試管。
        創建一個新的 div 元素
        class 設為 "tube"
        試管添加一個點擊事件監聽器，當試管被點擊時，呼叫 selectTube 函式並傳入該試管。
        將新創建的試管添加到 gameContainer 。
        試管加入到 tubes 陣列尾端。
    */

    // 添加 empty試管 : 2
    for (let i = 0; i < 2; i++) {
      const emptyTube = document.createElement("div");
      emptyTube.classList.add("tube");
      emptyTube.addEventListener("click", () => selectTube(emptyTube));
      gameContainer.appendChild(emptyTube);
      tubes.push(emptyTube);
    }
    /*
      建立 2 試管。
        創建一個新的 div 元素
        class 設為 "tube"
        試管添加一個點擊事件監聽器，當試管被點擊時，呼叫 selectTube 函式並傳入該試管。
        將新創建的試管添加到 gameContainer 。
        試管加入到 tubes 陣列尾端。
    */
  }

  // 5. 填充水塊
  function fillTubes() {
    const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
    const waterBlocks = [];
    /*從 colors 陣列的第 0 個元素開始，取出最小值( levelCount + 1 個元素 或 colors.length )
      創建一個空的 waterBlocks 陣列，用來存放水塊的顏色。*/

    gameColors.forEach((color) => {
      for (let i = 0; i < 4; i++) {
        waterBlocks.push(color);
      }
    });
    /* 
      gameColors裡每個顏色重複 4 次
        加到 waterBlocks 陣列(由後往前擠入)。
    */

    //隨機打亂 waterBlocks 陣列
    waterBlocks.sort(() => 0.5 - Math.random());
    /*
      對陣列中的任意兩個元素進行比較
      0.5 - Math.random() 結果會落在 -0.5 ~ 0.5 之間
      當結果為正，sort 會把元素往前排；為負則往後排
    */

    // 分配水塊填入試管
    let blockIndex = 0;
    tubes.slice(0, levelCount + 1).forEach((tube) => {
      for (let i = 0; i < 4; i++) {
        if (blockIndex < waterBlocks.length) {
          const water = document.createElement("div");
          water.classList.add("water");
          water.style.backgroundColor = waterBlocks[blockIndex];
          water.style.height = "20%";
          tube.appendChild(water);
          blockIndex++;
        }
      }
    });
    /*
      blockIndex 變數並初始化為 0，用來追蹤目前已經分配到第幾個水塊
      對 tubes 陣列裡從第 0 個到第 levelCount 個（不包含第 levelCount + 1 個）的每個元素（tube）執行一次指定的函式。
        在每個 tube 中，使用 for 迴圈來創建 4 個水塊。
        如果 blockIndex 的長度 < waterBlocks 的長度
          創建一個新的 div 元素
          class 設為 "water"
          背景顏色為 waterBlocks 中當前的 blockIndex
          高度為 20%。
          將水塊添加到 tube 中。
          blockIndex 增加 1。
    */
  }

  // 6.收到一個被點擊的試管
  function selectTube(tube) {
    if (selectedTube) {
      if (selectedTube !== tube) {
        pourWater(selectedTube, tube);
      }
      selectedTube.classList.remove("selected");
      selectedTube = null;
    } else {
      selectedTube = tube;
      tube.classList.add("selected");
    }
  }
  /*
    當試管被點擊時，會呼叫 selectTube 函式(在function createTubes() 已呼叫)。
      如果已經有一個被選中的試管
        如果這次點擊的不是同一根試管
          呼叫 pourWater 函式，將水從已經被選中的試管倒到目前點擊的試管。
        不論有無倒水，都會把原本選中的試管移除 "selected" 樣式
        將 selectedTube 設為 null（代表現在沒有選中的試管）。
      如果是目前沒有選中的試管
        將點擊的試管設為選中的試管
        class 設為 "selected" 
  */

  // 7. 倒水
  function pourWater(fromTube, toTube) {
    let fromWater = fromTube.querySelector(".water:last-child");
    let toWater = toTube.querySelector(".water:last-child");

    if (!toWater) {
      const color = fromWater ? fromWater.style.backgroundColor : null;
      while (
        fromWater &&
        fromWater.style.backgroundColor === color &&
        toTube.childElementCount < 4
      ) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
      }
    } else {
      while (
        fromWater &&
        fromWater.style.backgroundColor === toWater.style.backgroundColor &&
        toTube.childElementCount < 4
      ) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
        toWater = toTube.querySelector(".water:last-child");
      }
    }
    checkGameState();
  }

  // 8. 檢查遊戲狀態
  function checkGameState() {
    /*定義一個判斷試管內是否全為同色且滿4格的箭頭函式。(tube)目前正在檢查的那一個試管（DOM 元素）。
        將 tube（試管的 <div>）裡面的所有子元素(water)，轉換成陣列並指派給常數 waters。
        回傳True/False:
          判斷 waters 的長度是否等於 4，
          且 waters 中的每個 water 的背景顏色是否都與第一個 water 的背景顏色相同。
            ( 對 waters 陣列中的每個元素（每個 water 物件）執行你給的箭頭函式 (water)=>...... )
      */
    const allSameColor = (tube) => {
      const waters = Array.from(tube.children);
      return (
        waters.length === 4 &&
        waters.every((water) => water.style.backgroundColor === waters[0].style.backgroundColor)
      );
    };

    let completedTubes = 0;
    tubes.forEach((tube) => {
      if (allSameColor(tube)) {
        completedTubes++;
      }
    });
    document.getElementById("completed-tubes-count").textContent = completedTubes;

    if (
      tubes.every((tube) => tube.childElementCount === 0 || allSameColor(tube))
    ) {
      if (levelCount === 10) {
        alert("恭喜!你已經完成所有挑戰!!");
      } else {
        alert("你已經完成本關卡!");
        levelCount++;
        document.getElementById("level-count").textContent = levelCount;
        document.getElementById("completed-tubes-count").textContent = 0;
        chooseLevel(levelCount);
        createTubes();
        fillTubes();
      }
    }
  }
});

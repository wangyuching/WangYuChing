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
  /*
    當函式被呼叫時，會傳入一個參數 level。
      將 level 的值指定給全域變數 levelCount。
      取得網頁上 id 為 level-count 的元素，並將其 textContent 屬性設為 levelCount。
  */
  function chooseLevel(level) {
    levelCount = level;
    document.getElementById("level-count").textContent = levelCount;
  }

  //2.處理關卡選擇
  /* 
    將levelSelect 這個元素綁定一個 "change" 事件監聽器，改變選單選項時，事件處理函式從事件物件 event 中取得目前選中的值。
      將選中的值轉換為十進位整數。
      呼叫 chooseLevel 函式，傳入選中的關卡數字。
  */
  levelSelect.addEventListener("change", (event) => {
    const selectedLevel = parseInt(event.target.value, 10);
    chooseLevel(selectedLevel);
  });

  // 3. 開始遊戲按鈕
  playButton.addEventListener("click", () => {
    tubes.length = 0;
    createTubes();
    fillTubes();
  });

  // 4. 建立試管
  function createTubes() {
    gameContainer.innerHTML = "";
    tubes.length = 0;

    for (let i = 0; i < levelCount + 1; i++) {
      const tube = document.createElement("div");
      tube.classList.add("tube");
      tube.addEventListener("click", () => selectTube(tube));
      gameContainer.appendChild(tube);
      tubes.push(tube);
    }

    for (let i = 0; i < 2; i++) {
      const emptyTube = document.createElement("div");
      emptyTube.classList.add("tube");
      emptyTube.addEventListener("click", () => selectTube(emptyTube));
      gameContainer.appendChild(emptyTube);
      tubes.push(emptyTube);
    }
  }

  // 5. 填充水塊
  function fillTubes() {
    const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
    const waterBlocks = [];

    gameColors.forEach((color) => {
      for (let i = 0; i < 4; i++) {
        waterBlocks.push(color);
      }
    });

    waterBlocks.sort(() => 0.5 - Math.random());

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
  }

  // 6. 選擇試管
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

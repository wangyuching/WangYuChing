document.addEventListener('DOMContentLoaded',()=>{
    const levelSelect = document.getElementById('level-select')
    const playButton = document.getElementById('play-button');
    const gameContainer = document.getElementById('game-container');

    const tubes = [];
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'blueviolter', 'pink', 'brown', 'gray', 'antiquewhite', 'white'];
    let levelCount = 1;

    function chooseLevel(Level){
        levelCount = Level;
        document.getElementById('level-count').textContent = levelCount;
    }

    levelSelect.addEventListener('change', (event)=>{ /*evevt 觸發事件的相關參數。可自行取名*/
        const selectedLevel = parseInt(event.target.value, 10); // 將選中的值（字串）轉換為整數(是下拉選單中選中的值, 十進位制)
        chooseLevel(selectedLevel);
    })

    function createTubes(){
        gameContainer.innerHTML = '';
        tubes.length = 0;

        for (let i = 0; i < levelCount+1; i++){ //產生關卡數+1的tubes
            const tube = document.createElement('div'); //創建一個名為 tube 的div元素
            tube.classList.add('tube');
            //tube.addEventListener
            gameContainer.appendChild(tube); //將 tube 添加到gameContainer中
            tubes.push(tube); //將 tube 添加到 tubes 陣列中
        }

        //add empty tubes to more safe
        for (let i=0; i<2; i++){
            const emptyTube = document.createElement('div');
            emptyTube.classList.add('tube');
            gameContainer.appendChild(emptyTube);
            tubes.push(emptyTube);
        }
    }

    function fillTubes(){
         const gameColors = colors.slice(0, Math.min(levelCount+1, colors.length)); //從顏色陣列中選擇顏色
         const waterBlocks = [];

        //every color has 4 blocks
        gameColors.forEach(color => {
            for (let i = 0; i < 4; i++){
                waterBlocks.push(color); //將顏色添加到水塊陣列中
            }
        })

        //random colors,
        waterBlocks.sort(()=> 0.5 - Math.random());//???

        //put random tubes
        let blockIndex = 0;
        tubes.slice(0, levelCount+1).forEach(tube =>{
            for (let i =0; i<4; i++){
                if (blockIndex < waterBlocks.length){
                    const water = document.createElement('div'); //創建水塊元素
                    water.classList.add('water');
                    water.style.backgroundColor = waterBlocks[blockIndex];
                    water.style.height = '20%';
                    tube.appendChild(water); //將水塊添加到 tube 中
                    blockIndex++;
                }
            }
        })
    }

    playButton.addEventListener('click', ()=>{
        tubes.length = 0;
        createTubes();
        fillTubes();
    });
});
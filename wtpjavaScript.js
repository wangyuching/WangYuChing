document.addEventListener('DOMContentLoaded',()=>{
    const levelSelect = document.getElementById('level-select')
    const playButton = document.getElementById('play-button');
    const gameContainer = document.getElementById('game-container');

    const tubes = [];
    let levelCount = 1;

    function chooseLevel(Level){
        levelCount = Level;
        document.getElementById('level-count').textContent = levelCount;
    }

    levelSelect.addEventListener('change', (event)=>{ /*evevt 觸發事件的相關參數。可自行取名*/
        const selectedLevel = parseInt(event.target.value, 10); // 將選中的值（字串）轉換為整數(是下拉選單中選中的值, 十進位制)
        chooseLevel(selectedLevel);
    })

    playButton.addEventListener('click', ()=>{
        alert('Start Game')
    });
});
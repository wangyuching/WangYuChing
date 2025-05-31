function Phone() {
    const btn = document.getElementById('phone');
    btn.addEventListener('mouseenter', function () {
        // 取得body寬高與按鈕寬高
        const body = document.body;
        const html = document.documentElement;
        const width = Math.max(body.clientWidth, html.clientWidth);
        const height = Math.max(body.clientHeight, html.clientHeight);
        const maxLeft = width - btn.offsetWidth;
        const maxTop = height - btn.offsetHeight;
        // 隨機產生新位置
        const left = Math.random() * maxLeft;
        const top = Math.random() * maxTop;
        btn.style.left = left + 'px';
        btn.style.top = top + 'px';
    });
}

function myFunction() {
    var n = document.getElementById('numberInput').value;

    var str = "<table>";

    for (let i = 1; i <= n; i++) {
        str += "<tr>";
        for (let j = 1; j <= n; j++) {
            str += `<td> ${i} x ${j} = ${i * j} </td>`;
        }
        str += "</tr>";
    }
    str += "</table>";

    document.getElementById('nxnTable').innerHTML = str;
}
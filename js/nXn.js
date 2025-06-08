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
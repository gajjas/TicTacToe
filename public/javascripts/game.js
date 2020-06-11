var game = Array.from(st.toString());
console.log(game)

var count = 0;

var prev = function () {
    if (count > 0) {
        count--;
        var value = game[count];
        var square = document.getElementsByClassName(value)[0];
        square.removeChild(square.lastChild);
    }
}

var next = function () {
    if (count < game.length) {
        var value = game[count];
        var square = document.getElementsByClassName(value)[0];
        if (count % 2 == 0) {
            var elem = document.createElement("img");
            elem.setAttribute("src", "/images/X.png");
            square.appendChild(elem)
        }
        else {
            var elem = document.createElement("img");
            elem.setAttribute("src", "/images/O.png");
            square.appendChild(elem)
        }
        count++;
    }
}
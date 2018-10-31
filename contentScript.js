window.onload = replacer;

var keys = ["replacer", "bad", "installing"] 
var values = ["ReplaceR", "good", "INSTALLING"] 

console.log("ReplaceR Active: https://www.iamtravisw.com/p/replacer.html");

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex; 
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "gi");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

function replacer() {
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replaceArray(keys, values)
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }                         
        }
    }
}

function replaceWords() {
    // Get User Input from options.html
    var bannedWords = document.getElementById("bannedWord").value;
    var newWords = document.getElementById("newWord").value;
    // Push the user's values to the Array
    keys.push(bannedWords);
    values.push(newWords);
    // Print the results on the screen
    var table = document.getElementById("table");
    var row = table.insertRow(1); // Always put at top but below headers
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = bannedWords;
    cell2.innerHTML = newWords;
    cell3.innerHTML = "<td><input type='button' value='Delete Row'></td>";
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function removeWords(col1, col2) {
    console.log("before keys "+keys)
    console.log("before values "+values)
    keys.remove(col1);
    values.remove(col2);
    console.log("after keys "+keys);
    console.log("after values "+values)
}
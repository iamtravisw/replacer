window.onload = replacer;
window.onload = loadTable;

var keys = ["replacer", "bad", "fuck"] 
var values = ["ReplaceR", "good", "frick"] 

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
    cell3.innerHTML = "<a href=#>Delete</a></td>";
}

function loadTable() {
    // Load existing values into the table
    for (var i = 0; i < keys.length; i++){
        for (var i = 0; i < values.length; i++){
            var existingKeys = keys[i]; 
            var existingValues = values[i]; 
            var table = document.getElementById("table");
            var row = table.insertRow(1); // Always put at top but below headers
            var cell1 = row.insertCell(0);
            cell1.innerHTML = existingKeys;
            var cell2 = row.insertCell(1);
            cell2.innerHTML = existingValues;
            var cell3 = row.insertCell(2);
            cell3.innerHTML = "<a href=#>Delete</a></td>";
            console.log(keys[i]);
            console.log(values[i]);
        }
    }
} 
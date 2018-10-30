window.onload = noSpoilers;

var keys = ["replacer",] 
var values = ["ReplaceR"] 

var result = {};
keys.forEach((key, i) => result[key] = values[i]);
console.log("Words Replaced by ReplaceR:\n" +result);

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex; 
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "gi");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

function noSpoilers() {
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
    document.getElementById("original").innerHTML = keys;
    document.getElementById("replaced").innerHTML = values;

}
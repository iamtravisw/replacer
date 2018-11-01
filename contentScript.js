window.onload = replacer;
replaceStart();

var keys = [] 
var values = [] 

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

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit');
    // onClick's logic below:
    link.addEventListener('click', function() {
        replaceWords()
    });
});

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

    console.log("saving")
    chrome.storage.sync.set({
        keys: keys,
        values: values
    }, function(result) {
        console.log("saved")
        console.log(result);
    });
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
    keys.remove(col1);
    values.remove(col2);
    console.log("saving")
    chrome.storage.sync.set({
        keys: keys,
        values: values
    }, function(result) {
        console.log("saved")
        console.log(result);
    }); 
}

// Only run this function on the options page!
if(window.location.href.indexOf("options") > -1) {
    window.onload = loadTable;
        function loadTable() {

            chrome.storage.sync.get(['keys', 'values'], function(result) {
                console.log("loaded")
                console.log(result)
        
                if (result.keys && result.values) {
                    keys = result.keys
                    values = result.values
                }

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
                cell3.innerHTML = "<td><input type='button' value='Delete Row'></td>"   
                $('td').click(function(){
                var row_index = $(this).parent().index();
                var currentRow=$(this).closest("tr"); 
                var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
                var col2=currentRow.find("td:eq(1)").text(); // get current row 1st TD value
                removeWords(col1, col2);
                });
            }
        // Removing data from the table
        $('table').on('click', 'input[type="button"]', function(e){
            $(this).closest('tr').remove()
            console.log('woo')
        })
   
        }
        console.log(keys,values);
        });
    }
}

function replaceStart() {
chrome.storage.sync.get(['keys', 'values'], function(result) {
    console.log("loaded")
    console.log(result)
    if (result.keys && result.values) {
        keys = result.keys
        values = result.values
    }
    console.log('Loading ReplaceR');
    });
}
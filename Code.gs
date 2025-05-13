function onEdit(e) 
{
  var ss = SpreadsheetApp.getActive(); // get active spreadsheet
  var sheet = ss.getSheetByName('Inhaler Tracker'); // get the needed sheet in spreadsheet
  var colList = ['A']; // list of column letters to iterate over (checkbox column)
  var rowRange = [3, 121]; // range of row numbers to iterate over, starts at 3 to allow for headers and priming dose
  for (var col in colList) { // for each column in the column list
    var colnum = letterToColumn(colList[col]); // transform the column letter into a number
    for (r = rowRange[0]; r <= rowRange[rowRange.length - 1]; r++) { // iterate over rows in checkbox column
      if(sheet.getRange(r, colnum).isChecked()) { // if checkbox is checked
        if(sheet.getRange(r, colnum + 1).isBlank()) { // and if the row in the column next to it is blank
          sheet.getRange(r, colnum + 1).setValue(new Date()) // set the value in the next column to the current date + time
          sheet.getRange(r,colnum + 2).setFormula('= ' + sheet.getRange(r - 1,colnum + 2).getA1Notation() + ' - 1'); // set the value two columns over to a formula: the previous row - 1
        }
      } else { // if checkbox isnt checked or row next to it isnt blank
        sheet.getRange(r, colnum + 1).clear() //  clear the date column
        sheet.getRange(r,colnum + 2).clear(); // and clear the formula column
      }
    }
  }
}

function letterToColumn(letter) { // takes column letter and converts it to the corresponding number
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++) { // iterate, increasing i until i = letter length
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
}

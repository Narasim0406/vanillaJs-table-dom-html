import "./styles.css";
import moment from "moment";

var input = [
  {
    Organization: "Google",
    UserId: "akumar",
    UserName: "Ashok Kumar",
    Department: "Google",
    Designation: "Sales",
    CheckInTime: 1548909000000,
    CheckOutTime: 1548945000000
  },
  {
    Organization: "Google",
    UserId: "akumar",
    UserName: "Ashok Kumar",
    Department: "Sales",
    Designation: "Sales",
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000
  },
  {
    Organization: "FB",
    UserId: "phanis",
    UserName: "Phani Sai",
    Department: "Sales",
    Designation: "Sales",
    CheckInTime: 1548909000000,
    CheckOutTime: 1548945000000
  },
  {
    Organization: "FB",
    UserId: "phanis",
    UserName: "Phani Sai",
    Department: "Sales",
    Designation: "Sales",
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000
  },
  {
    Organization: "FB",
    UserId: "lakshmig",
    UserName: "Laskhmi Gayathri",
    Department: "Quality",
    Designation: "QA Engineer",
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000
  },
  {
    Organization: "FB",
    UserId: "lakshmig",
    UserName: "Laskhmi Gayathri",
    Department: "Quality",
    Designation: "QA Engineer",
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000
  }
];

var conf = [
  {
    HeaderName: "Organization",
    Column: "Organization",
    Merge: true
  },
  {
    HeaderName: "Department",
    Column: "Department",
    Merge: true
  },
  {
    HeaderName: "UserName",
    Column: "UserName",
    Merge: true
  },
  {
    HeaderName: "Date",
    Column: ({ CheckInTime }) => {
      return moment(CheckInTime).format("DD/MM/YYYY");
    },
    Merge: false
  },
  {
    HeaderName: "Time",
    Column: ({ CheckInTime, CheckOutTime }) => {
      const secs = (CheckOutTime - CheckInTime) / 1000;
      return secs / 60 + " Mins";
    },
    Merge: false
  }
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key.HeaderName);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  var list = [];
  for (var key of data) {

    let row = table.insertRow();
    var obj = {};
    for (var cf of conf) {
      let cell = row.insertCell();
      let text = "null";
      let aa = cf.HeaderName;
      obj[aa] = key[aa];
      if (typeof key[aa] === "string") {
        text = document.createTextNode(key[aa]);
      } else {
        console.log("", typeof key[aa], key[aa]);
        var dates = cf.Column;
        if (data.HeaderName === "Date") {
          var dt = key.CheckInTime;
        } else {
          dt = {
            CheckInTime: key.CheckInTime,
            CheckOutTime: key.CheckOutTime
          };
        }

        var da = dates(dt);
        text = document.createTextNode(da);
      }
      cell.appendChild(text);
    }
    list.push(obj);
  }
}

let table = document.querySelector("table");
generateTable(table, input);
generateTableHead(table, conf);

// function getArg(data) {
//   var str = data.toString();

//   var chars = str.split(")");
//   console.log(chars[0], "chars");

//   var words = chars[0].split("(");
//   console.log(words[1], "word", typeof words[1]);

//   var strr = words[1]
//     .split(" ")
//     .join("")
//     .split("{")
//     .join("")
//     .split("}")
//     .join("")
//     .split(",");

//   console.log(strr, "replace");
//   return strr;
// }

var elements = document.querySelectorAll("#table_row td, #table_row th");
for (var i = 0; i < elements.length; i++) {
  elements[i].style.border = "2px solid gray";
  elements[i].style.rowSpan = "0";
}

var db = db.getSiblingDB('customermanager');

//Customers
var customerNames =
[
    "Marcus,HighTower,Male,acmecorp.com",
    "Jesse,Smith,Female,gmail.com",
    "Albert,Einstein,Male,outlook.com",
    "Dan,Wahlin,Male,yahoo.com",
    "Ward,Bell,Male,gmail.com",
    "Brad,Green,Male,gmail.com",
    "Igor,Minar,Male,gmail.com",
    "Miško,Hevery,Male,gmail.com",
    "Michelle,Avery,Female,acmecorp.com",
    "Heedy,Wahlin,Female,hotmail.com",
    "Thomas,Martin,Male,outlook.com",
    "Jean,Martin,Female,outlook.com",
    "Robin,Cleark,Female,acmecorp.com",
    "Juan,Paulo,Male,yahoo.com",
    "Gene,Thomas,Male,gmail.com",
    "Pinal,Dave,Male,gmail.com",
    "Fred,Roberts,Male,outlook.com",
    "Tina,Roberts,Female,outlook.com",
    "Cindy,Jamison,Female,gmail.com",
    "Robyn,Flores,Female,yahoo.com",
    "Jeff,Wahlin,Male,gmail.com",
    "Danny,Wahlin,Male,gmail.com",
    "Elaine,Jones,Female,yahoo.com"
];
var addresses =
[
    "1234 Anywhere St.",
    "435 Main St.",
    "1 Atomic St.",
    "85 Cedar Dr.",
    "12 Ocean View St.",
    "1600 Amphitheatre Parkway",
    "1604 Amphitheatre Parkway",
    "1607 Amphitheatre Parkway",
    "346 Cedar Ave.",
    "4576 Main St.",
    "964 Point St.",
    "98756 Center St.",
    "35632 Richmond Circle Apt B",
    "2352 Angular Way",
    "23566 Directive Pl.",
    "235235 Yaz Blvd.",
    "7656 Crescent St.",
    "76543 Moon Ave.",
    "84533 Hardrock St.",
    "5687534 Jefferson Way",
    "346346 Blue Pl.",
    "23423 Adams St.",
    "633 Main St.",
];

var citiesStates =
[
    "Richmond,VA,Virginia",

];

var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38];


var zip = 23220;

var orders =
[
  { "service": "Mowing", "technician": "Steve", "price": 29.99, "quantity": 1 },
  { "service": "Hedge Trim", "technician": "Peter", "price": 19.99, "quantity": 1 },
  { "service": "Leaf Rake", "technician": "Paul", "price": 35.99, "quantity": 2 },
  { "service": "Pwr Wash Wlkwy", "technician": "Mary", "price": 99.99, "quantity": 1 },
  { "service": "Weed Treating", "technician": "Steve", "price": 29.99, "quantity": 1 },
  { "service": "Leaf Collection", "technician": "Peter", "price": 29.99, "quantity": 3 },
  { "service": "Clipping Disposal", "technician": "Paul", "price": 29.99, "quantity": 4 },
  { "service": "Lawn Edging", "technician": "Mary", "price": 9.99, "quantity": 5 },
  { "service": "Pest Treatment", "technician": "Steve", "price": 59.99, "quantity": 1 },
  { "service": "Raised Beds", "technician": "Peter", "price": 99.99, "quantity": 1 },
  { "service": "Tree Limb Remvl", "technician": "Paul", "price": 99.99, "quantity": 1 },
  { "service": "Winterizing", "technician": "Mary", "price": 49.99, "quantity": 1 },
  { "service": "Watering", "technician": "Steve", "price": 9.99, "quantity": 5 },
  { "service": "Sod", "technician": "Peter", "price": 199.99, "quantity": 1 }
];

db.customers.remove({});


var l = customerNames.length,
    i,
    j,
    firstOrder,
    lastOrder,
    tempOrder,
    n = orders.length;

for (i = 0; i < l; i++) {
    var nameGenderHost = customerNames[i].split(',');
    var cityState = citiesStates[i].split(',');
    var s = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] }
    var c = {
        'firstName': nameGenderHost[0]
        , 'lastName': nameGenderHost[1]
        , 'email': nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3]
        , 'address': addresses[i]
        , 'city': cityState[0]
        , 'state': s
        , 'stateId': citiesIds[i]
        , 'zip': zip + i
        , 'gender': nameGenderHost[2]
        , 'id': i + 1
        , 'orderCount': 3
    };
    //Random Customer Order Math
    firstOrder = Math.floor(Math.random() * orders.length);
    lastOrder = Math.floor(Math.random() * orders.length);
    if (firstOrder > lastOrder) {
        tempOrder = firstOrder;
        firstOrder = lastOrder;
        lastOrder = tempOrder;
    }
    c.orders = [];
    print('firstOrder: ' + firstOrder + ", lastOrder: " + lastOrder);
    for (j = firstOrder; j <= lastOrder && j < n; j++) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + (Math.random() * 100));

        var o = {
            "service": orders[j].service,
            "date": tomorrow,
            "technician": orders[j].technician,
            "quantity": orders[j].quantity,
            "price": orders[j].price,
        };
        c.orders.push(o);
    }
    c.orderCount = c.orders.length;

    db.customers.insert(c);
}


//Settings
db.settings.remove({});
var r = { 'nextSeqNumber': 24, 'collectionName': "customers" };
db.settings.insert(r);

//States
var states = [
  { "name": "Alabama", "abbreviation": "AL" },
  { "name": "Montana", "abbreviation": "MT" },
  { "name": "Alaska", "abbreviation": "AK" },
  { "name": "Nebraska", "abbreviation": "NE" },
  { "name": "Arizona", "abbreviation": "AZ" },
  { "name": "Nevada", "abbreviation": "NV" },
  { "name": "Arkansas", "abbreviation": "AR" },
  { "name": "New Hampshire", "abbreviation": "NH" },
  { "name": "California", "abbreviation": "CA" },
  { "name": "New Jersey", "abbreviation": "NJ" },
  { "name": "Colorado", "abbreviation": "CO" },
  { "name": "New Mexico", "abbreviation": "NM" },
  { "name": "Connecticut", "abbreviation": "CT" },
  { "name": "New York", "abbreviation": "NY" },
  { "name": "Delaware", "abbreviation": "DE" },
  { "name": "North Carolina", "abbreviation": "NC" },
  { "name": "Florida", "abbreviation": "FL" },
  { "name": "North Dakota", "abbreviation": "ND" },
  { "name": "Georgia", "abbreviation": "GA" },
  { "name": "Ohio", "abbreviation": "OH" },
  { "name": "Hawaii", "abbreviation": "HI" },
  { "name": "Oklahoma", "abbreviation": "OK" },
  { "name": "Idaho", "abbreviation": "ID" },
  { "name": "Oregon", "abbreviation": "OR" },
  { "name": "Illinois", "abbreviation": "IL" },
  { "name": "Pennsylvania", "abbreviation": "PA" },
  { "name": "Indiana", "abbreviation": "IN" },
  { "name": "Rhode Island", "abbreviation": "RI" },
  { "name": "Iowa", "abbreviation": "IA" },
  { "name": "South Carolina", "abbreviation": "SC" },
  { "name": "Kansas", "abbreviation": "KS" },
  { "name": "South Dakota", "abbreviation": "SD" },
  { "name": "Kentucky", "abbreviation": "KY" },
  { "name": "Tennessee", "abbreviation": "TN" },
  { "name": "Louisiana", "abbreviation": "LA" },
  { "name": "Texas", "abbreviation": "TX" },
  { "name": "Maine", "abbreviation": "ME" },
  { "name": "Utah", "abbreviation": "UT" },
  { "name": "Maryland", "abbreviation": "MD" },
  { "name": "Vermont", "abbreviation": "VT" },
  { "name": "Massachusetts", "abbreviation": "MA" },
  { "name": "Virginia", "abbreviation": "VA" },
  { "name": "Michigan", "abbreviation": "MI" },
  { "name": "Washington", "abbreviation": "WA" },
  { "name": "Minnesota", "abbreviation": "MN" },
  { "name": "West Virginia", "abbreviation": "WV" },
  { "name": "Mississippi", "abbreviation": "MS" },
  { "name": "Wisconsin", "abbreviation": "WI" },
  { "name": "Missouri", "abbreviation": "MO" },
  { "name": "Wyoming", "abbreviation": "WY" }
];

var l = states.length,
    i;

db.states.remove({});

for (i = 0; i < l; i++) {
    var r = { 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation };
    db.states.insert(r);
}

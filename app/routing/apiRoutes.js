// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    //   app.get("/api/waitlist", function(req, res) {
    //     res.json(waitListData);
    //   });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
    app.post("/api/friends", (req, res) => {
        // When the form is submited the data gets pushed to the friendsData array
        console.log(req.body.scores);
        var newFriend = req.body;
        var masterCounter = [(4 * newFriend.scores.length), 0];
        for (i = 0; i < friendsData.length; i++) {
            var counter = 0;
            for (j = 0; j < friendsData[i].scores.length; j++) {
                counter = +Math.abs(newFriend.scores[j] - friendsData[i].scores[j]);
            }
            if (masterCounter[0] > counter) {
                masterCounter[0] = counter;
                masterCounter[1] = i;
            }
        }
        // console.log(masterCounter);
        console.log(friendsData[masterCounter[1]]);
        friendsData.push(req.body);
        res.json(friendsData[masterCounter[1]]);
    });
    // app.post("/api/friends", function (req, res) {
    //     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    //     // It will do this by sending out the value "true" have a table
    //     // req.body is available since we're using the body-parser middleware
    //     friendsData.push(req.body);
    //     res.json(true);

    //     // if (friendsData.length < 5) {
    //     //   tableData.push(req.body);
    //     //   res.json(true);
    //     // }
    //     // else {
    //     //   waitListData.push(req.body);
    //     //   res.json(false);
    //     // }
    // });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function () {
        // Empty out the arrays of data
        friendsData = [];
        // waitListData = [];

        console.log(friendsData);
    });
};

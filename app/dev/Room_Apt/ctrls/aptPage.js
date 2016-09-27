
/*app.controller('apt_list_user', function($scope, myserv) {
     $scope.apt=myserv.func();
});*/
var Apartment = angular.module('ApartmentApp');
Apartment.controller('apt_list_admin', function($scope, myfact) {
    var apt = {};
    var usr = {};
    var apt2={};
    var id;
    $scope.hide = false;//Used for ng-shows and hides in html
    $scope.show = false;
    $scope.hidden = true;
    $scope.sheath = false;
    $scope.Apartmenthide=true;
    $scope.Userhide=true;
    $scope.Lookuphide=true;
    $scope.dynamic=true;
    var list = [];
    var newUser = [];
    console.log(myfact);
    myfact.getUser()//finds all users in our database
        .then(
            function(data) {
                usr = data.data;
            }
        );
    myfact.getAllApartments()//finds all apartment in database
        .then(
            function(data) {
                apt = data.data;
            });
    $scope.trigger = function() {
            myfact.getUser()
        .then(
            function(data) {
                usr = data.data;
            }
        );
        myfact.getAllApartments()
        .then(
            function(data) {
                apt = data.data;
            });
         $scope.newUser=[];
         $scope.aptList=[];
         console.log(apt[1].addr.num);
         for (x in apt) {
                $scope.aptList.push(apt[x].addr)
        }
        for (x in usr) {
            if (usr[x].aptId === null||usr[x].aptId === "null") {
                $scope.newUser.push(usr[x].username)
            }
        };
        $scope.sheath = true;
    };
    $scope.search = function() {
            myfact.getUser()
        .then(
            function(data) {
                usr = data.data;
            }
        );
        for (x in usr) {
            if (usr[x].username === $scope.username) {
                id = usr[x].aptId;
                break;
            }
        };
        for (x in apt) {
             console.log(apt[x]._id);
            if (apt[x]._id === id) {
                $scope.data = apt[x];
                $scope.show = true;
            }
        }
    };
    var x = false;
    $scope.dosomething = function(event, username) {
        if (event.which === 13) {
            $scope.search(username);
        }
    };
    $scope.anotherApt = function() {
        if ($scope.aptNum === undefined || $scope.Street === undefined || $scope.State === undefined || $scope.City === undefined || $scope.Zip === undefined || $scope.SuiteNo === undefined) {
            confirm("Value was left blank");
        } else {
            console.log("KEVIN");
            console.log(apt);
            for(a in apt){
                console.log('d');
                if (($scope.aptNum === apt[a].addr.num) && ($scope.Street === apt[a].addr.street) && ($scope.City === apt[a].addr.city) &&( $scope.Zip === apt[a].addr.zip ) && ($scope.SuiteNo === apt[a].addr.suite)){
                    confirm('apartment taken');
                    break;
                }
                else{
                apt.addr = {
                "num": $scope.aptNum,
                "street": $scope.Street,
                "state": $scope.State,
                "city": $scope.City,
                "zip": $scope.Zip,
                "suite": $scope.SuiteNo
            };
            $scope.hide = true;
            console.log(apt);
            break;
                }
            }
            //myfact.addApartment(add);
        };
    }
    $scope.updateApt = function() {
        if ($scope.chairs === undefined || $scope.beds === undefined) {
            confirm("Value was left blank");
        }
        apt.rooms = [{
            "bedrooms": [{
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }, {
                "room": {
                    "chair": $scope.chairs,
                    "bed": $scope.beds
                }
            }]
        }];
        $scope.hide = true;
        console.log(apt.rooms);
        console.log(apt);
        myfact.addApartment(apt);
    };
    $scope.changeApt = function() {
        $scope.hidden = false;
        $scope.show = false;
    };
    $scope.editApt = function() {
        console.log($scope.username);
        console.log($scope.NewAptID);
        myfact.updateUser($scope.username, $scope.NewAptID);
    };
    $scope.assign = function(username) {
       /* var AptID = prompt('Please input new apartment ID');*/
        /*myfact.updateUser(username, AptID);*/
/*        names.splice(index, 1);*/
       $scope.usernames=username;
       console.log(username);
        $scope.dynamic=false;
    };
    $scope.assign2 = function() {
        myfact.updateUser($scope.username, null);
        myfact.getUser()
            .then(
                function(data) {
                    usr = data.data;
                }
            );
        for (x in usr) {
            if (usr[x].aptId === null) {
                console.log(usr[x].username);
            }
        }
        $scope.username="";
        $scope.data="";
        $scope.NewAptID="";
        $scope.hidden=true;
        $scope.trigger();
    };
    $scope.assign3=function(index){
        console.log(apt[index]._id);
        myfact.updateUser($scope.usernames, apt[index]._id);
        confirm('This user has now been assigned an apartment');
         $scope.dynamic=true;
         $scope.sheath=false;
        };
    $scope.iDGen = function() {
        $scope.AptId = $scope.aptNum;
    };
    $scope.Lookup=function(){
            $scope.Apartmenthide=true;
            $scope.Userhide=true;
            $scope.Lookuphide=false;
            $scope.sheath=false;
            $scope.newUser=[];
    };
    $scope.New=function(){
        $scope.Apartmenthide=false;
            $scope.Userhide=true;
            $scope.Lookuphide=true;
            $scope.sheath=false;
            $scope.newUser=[];
    };
    $scope.Vacant=function(){
        $scope.Apartmenthide=true;
            $scope.Userhide=false;
            $scope.Lookuphide=true;
            $scope.sheath=false;
            $scope.newUser=[];
    };
}
    );
Apartment.controller('apt_list_user', function($scope, $window, seshkeys, myfact) {
    var usr = {};
    var apt = {};
    var id;
    $scope.data = {};
    var getAllUsers = function() {
        myfact.getAllApartments()
            .then(
                function(data) {
                    apt = data.data;
                    display();
                },
                function(err) {
                    console.log(err);
                }
            );

    };
    var display = function() {
        for (x in apt) {
            console.log($window.sessionStorage.getItem(seshkeys.aptid));
            if (apt[x].aptId === $window.sessionStorage.getItem(seshkeys.aptid)) {
                $scope.data = apt[x];
            }
        }
    };
    getAllUsers();


});
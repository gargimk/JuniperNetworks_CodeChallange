var app = angular.module("jsonQueryApp", []);

app.controller("jsonQueryController", ["$scope", function ($scope) {
    $scope.title = "Juniper Networks Coding Challenge";
    $scope.subTitle = "JSON Query Builder";
    $scope.formTitle = "JSON Query Builder Form";
    $scope.jsonQuery = "JSON Query";
    $scope.input = {
        andOrSelect: "AND", name: "", value: "", operator: ""
    };

    $scope.inputs = [];
    $scope.submit = false;



    $scope.onAddClause = function (inp) {
        $scope.showErrWhereClauseMsg = false;
        $scope.errWhereClauseMsg = "";
        if (inp.andOrSelect != "" && inp.value != "" && inp.operator != "") {
            $scope.showErrWhereClauseMsg = false;
            if (inp.andOrSelect == "OR" || $scope.jsonObj.where_clause.length == 0) {
                $scope.jsonObj.where_clause.push([]);
            }
            $scope.jsonObj.where_clause[$scope.jsonObj.where_clause.length - 1].push({
                name: inp.name, value: inp.value, operator: inp.operator
            });
        }
        else {
            $scope.errWhereClauseMsg = "Fill all fields";
            $scope.showErrWhereClauseMsg = true;
        }
        // $scope.showErrWhereClauseMsg = false;
        $scope.input = {
            andOrSelect: "AND", name: "", value: "", operator: ""
        };
    };

    $scope.removeErrMsg = function () {
        $scope.showErrWhereClauseMsg = false;
    };

    $scope.convertTime = function (field, time) {
        var dt = new Date(time);
        if (field == "start") {
            $scope.jsonObj.start_time = dt.getTime();
        } else if (field == "end") {
            $scope.jsonObj.end_time = dt.getTime();
        }
    }

    $scope.onRemoveClause = function (parentIndex, index) {
        $scope.jsonObj.where_clause[parentIndex].splice(index, 1);
        if ($scope.jsonObj.where_clause[parentIndex].length == 0) {
            $scope.jsonObj.where_clause.splice(parentIndex, 1);
        }
    }

    $scope.fields = ['time', 'source_vn', 'destination_vn', 'source_port', 'destination_port', 'traffic'];

    $scope.jsonObj = {
        start_time: "",
        end_time: "",
        table_name: '',
        select_field: [],
        where_clause: []
    };


    // $scope.jsonObj.select_field =[];
    $scope.toggleSelection = function toggleSelection(fieldName) {
        var idx = $scope.jsonObj.select_field.indexOf(fieldName);

        // Is currently selected
        if (idx > -1) {
            $scope.jsonObj.select_field.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.jsonObj.select_field.push(fieldName);
        }
    };




    $scope.validateJsonQuery = function () {
        if ($scope.jsonObj.start_time != "" && $scope.jsonObj.end_time != "" && $scope.jsonObj.table_name != "") {
            $scope.submit = true;
        }
        $scope.jsonObj = {
            start_time: "",
            end_time: "",
            table_name: '',
            select_field: [],
            where_clause: []
        };
        console.log(angular.toJson($scope.jsonObj));
    };
    $scope.checkDateErr = function (start_time, end_time) {
        $scope.errMessage = '';
        $scope.showDateErrMsg = false;
        var curDate = new Date();

        if (new Date(start_time) > new Date(end_time)) {
            $scope.errMessage = 'End time should be greater than start time';
            $scope.showTimeErrMsg = true;
            return false;
        }
        else {
            $scope.showTimeErrMsg = false;
            return false;
        }
    }
}
]);
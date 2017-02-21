describe('Testing app.js ', function () {
    beforeEach(module('jsonQueryApp')),

        describe('Testing app.js controller - jsonQueryController', function () {
            var scope, ctrl, compile;
            beforeEach(inject(function ($controller, $rootScope, $compile) {
                compile = $compile;
                scope = $rootScope.$new();
                ctrl = $controller('jsonQueryController', { $scope: scope })
            })),

                afterEach(function () {
                    //Clean up code 
                });

            it('should initialize the all titles in the scope', function () {
                expect(scope.title).toBeDefined();
                expect(scope.subTitle).toBeDefined();
                expect(scope.formTitle).toBeDefined();
                expect(scope.title).toBe("Juniper Networks Coding Challenge");
                expect(scope.subTitle).toBe("JSON Query Builder");
                expect(scope.formTitle).toBe("JSON Query Builder Form");

            });

            it('should have 6 values in fields ', function () {
                expect(scope.fields).toBeDefined();
                expect(scope.fields.length).toBe(6);

            });


            it('should have 2 element in where_clause', function () {
                var input1 = { andOrSelect: "AND", name: "source_vn", value: "frontend-vn", operator: "=" },
                    input2 = { andOrSelect: "OR", name: "destination_vn", value: "backend-vn", operator: "!=" },
                    output1 = [{ name: "source_vn", value: "frontend-vn", operator: "=" }],
                    output2 = [{ name: "destination_vn", value: "backend-vn", operator: "!=" }],
                    input = { andOrSelect: "AND", name: "", value: "", operator: "" };
                scope.onAddClause(input1);
                scope.onAddClause(input2);
                expect(scope.jsonObj.where_clause.length).toBe(2);
                expect(scope.jsonObj.where_clause[0]).toEqual(output1);
                expect(scope.jsonObj.where_clause[1]).toEqual(output2);
                expect(scope.input).toEqual(input);

            });

            it('should have 2 element in where_clause with diffrent input and output', function () {

                var input1 = { andOrSelect: "AND", name: "source_vn", value: "frontend-vn", operator: "=" },
                    input2 = { andOrSelect: "AND", name: "source_port", value: 9000, operator: "=" },
                    input3 = { andOrSelect: "OR", name: "destination_vn", value: "backend-vn", operator: "!=" },
                    input4 = { andOrSelect: "AND", name: "destination_port", value: 9001, operator: "=" },

                    output = [[{ "name": "source_vn", "value": "frontend-vn", "operator": "=" },
                    { "name": "source_port", "value": 9000, "operator": "=" }],
                    [{ "name": "destination_vn", "value": "backend-vn", "operator": "!=" },
                    { "name": "destination_port", "value": 9001, "operator": "=" }]];

                scope.onAddClause(input1);
                scope.onAddClause(input2);
                scope.onAddClause(input3);
                scope.onAddClause(input4);
                expect(scope.jsonObj.where_clause.length).toBe(2);
                expect(scope.jsonObj.where_clause).toEqual(output);

            });

            it('should have 1 element in where_clause after removing the other', function () {
                var input1 = { andOrSelect: "AND", name: "source_vn", value: "frontend-vn", operator: "=" },
                    input2 = { andOrSelect: "AND", name: "source_port", value: 9000, operator: "=" },
                    input3 = { andOrSelect: "OR", name: "destination_vn", value: "backend-vn", operator: "!=" },

                    output = [[{ "name": "source_vn", "value": "frontend-vn", "operator": "=" },
                    { "name": "source_port", "value": 9000, "operator": "=" }],
                    ];
                scope.onAddClause(input1);
                scope.onAddClause(input2);
                scope.onAddClause(input3);
                scope.onRemoveClause(1, 0)
                expect(scope.jsonObj.where_clause.length).toBe(1);
                expect(scope.jsonObj.where_clause).toEqual(output);
            });

            it('should have 2 element in where_clause after removing the one from other', function () {
                var input1 = { andOrSelect: "AND", name: "source_vn", value: "frontend-vn", operator: "=" },
                    input2 = { andOrSelect: "AND", name: "source_port", value: 9000, operator: "=" },
                    input3 = { andOrSelect: "OR", name: "destination_vn", value: "backend-vn", operator: "!=" },
                    input4 = { andOrSelect: "AND", name: "destination_port", value: 9001, operator: "=" },

                    output = [[{ "name": "source_vn", "value": "frontend-vn", "operator": "=" },
                    { "name": "source_port", "value": 9000, "operator": "=" }],
                    [{ "name": "destination_vn", "value": "backend-vn", "operator": "!=" }]];
                scope.onAddClause(input1);
                scope.onAddClause(input2);
                scope.onAddClause(input3);
                scope.onAddClause(input4);
                scope.onRemoveClause(1, 1)
                expect(scope.jsonObj.where_clause.length).toBe(2);
                expect(scope.jsonObj.where_clause).toEqual(output);
            });

            it('should convert start time to UNIX epoch format', function () {
                scope.convertTime("start", "1994-11-05T13:15:30Z");
                expect(scope.jsonObj.start_time).toBe(784041330000);

            });


            it('should remove the field on unchecking the select fields input', function () {
                scope.jsonObj.select_field = ['time', 'source_vn', 'destination_vn'];
                expect(scope.jsonObj.select_field.length).toEqual(3);
                scope.toggleSelection("destination_vn");
                expect(scope.jsonObj.select_field.length).toEqual(2);
            });

            it('should add the field on checking the select fields input', function () {
                scope.jsonObj.select_field = ['source_vn', 'destination_vn'];
                expect(scope.jsonObj.select_field.length).toEqual(2);
                scope.toggleSelection("'time'");
                expect(scope.jsonObj.select_field.length).toEqual(3);
            });

            it('should throw error message if end time is greater than start time', function () {
                var start_time= "1994-11-05T13:15:30Z",
                    end_time= "1994-11-05T11:15:30Z";
                scope.checkDateErr(start_time,end_time);
                expect(scope.errMessage).toEqual('End time should be greater than start time');
            });



        });



});
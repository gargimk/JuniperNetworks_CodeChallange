describe('jsonQueryApp', function () {

    beforeEach(function () {
        browser.get('http://localhost:8000');
    });
    afterEach(function () {
        //clean up code 
    });

    it('should have a title', function () {
        expect(browser.getTitle()).toEqual('JSON Query Builder');
    });

    it('should have table name input value', function () {
        var el = element(by.model("jsonObj.table_name")).sendKeys("table_name");
        expect(el.getAttribute('value')).toEqual("table_name");
    });

    it('should have 6 elements in select field check box', function () {
        element.all(by.css(".form-check")).then(function (items) {
            expect(items.length).toBe(6);

        })
    });

    it('should have error message div hidden on page load and no values inputted', function () {
        var hasClass = function (element, cls) {
            return element.getAttribute('class').then(function (classes) {
                return classes.split(' ').indexOf(cls) !== -1;
            });
        };

        expect(hasClass(element(by.css('.errTimeMsg')), 'ng-hide')).toBe(true);
    });

    it('should have 5,2,3 elements in select_field, andOrSelect, operator dropdown including blank field for select_field and operator', function () {
        element.all(by.css(".selectFields option")).then(function (items) {
            expect(items.length).toBe(5);

        });
        element.all(by.css(".andOrSelect option")).then(function (items) {
            expect(items.length).toBe(2);

        });

        element.all(by.css(".operator option")).then(function (items) {
            expect(items.length).toBe(3);

        })
    });

    it('should have error message when fields are not filled', function () {
        element(by.buttonText("Add Clause")).click();
        expect(element(by.css(".errMsg")).isPresent()).toBeTruthy();
        expect(element(by.css(".whereClause")).isPresent()).toBeFalsy();
    });

    it('should not have JSON if form not filled', function () {
        element(by.model("jsonObj.table_name")).sendKeys("table_name");
        element(by.buttonText("Submit")).click();
        expect(element(by.css(".result")).isPresent()).toBeFalsy();

    });

    it('should add to where clause when fields are filled', function () {
        element(by.model("input.name")).$("[value='source_vn']").click();
        element(by.model("input.operator")).$("[value='=']").click();
        element(by.model("input.value")).sendKeys("test");
        element(by.buttonText("Add Clause")).click();
        expect(element(by.css(".whereClause")).isPresent()).toBe(true);
    });

    it('should have 1 div of where clause when AND(default) is selected', function () {
        element(by.model("input.name")).$("[value='source_vn']").click();
        element(by.model("input.operator")).$("[value='=']").click();
        element(by.model("input.value")).sendKeys("test1");
        element(by.buttonText("Add Clause")).click();

        element(by.model("input.name")).$("[value='source_port']").click();
        element(by.model("input.operator")).$("[value='!=']").click();
        element(by.model("input.value")).sendKeys("test2");
        element(by.buttonText("Add Clause")).click();

        element.all(by.css(".whereClause")).then(function (items) {
            expect(items.length).toBe(1);

        });
    });

    it('should have 1 div of where clause when AND(default) is selected', function () {
        element(by.model("input.name")).$("[value='source_vn']").click();
        element(by.model("input.operator")).$("[value='=']").click();
        element(by.model("input.value")).sendKeys("test1");
        element(by.buttonText("Add Clause")).click();

        element(by.model("input.andOrSelect")).$("[value='OR']").click();;
        element(by.model("input.name")).$("[value='source_port']").click();
        element(by.model("input.operator")).$("[value='!=']").click();
        element(by.model("input.value")).sendKeys("test2");
        element(by.buttonText("Add Clause")).click();

        element.all(by.css(".whereClause")).then(function (items) {
            expect(items.length).toBe(2);

        });
    });

    it('should have 1 div of where clause when two from AND clause is removed', function () {
        element(by.model("input.name")).$("[value='source_vn']").click();
        element(by.model("input.operator")).$("[value='=']").click();
        element(by.model("input.value")).sendKeys("test1");
        element(by.buttonText("Add Clause")).click();

        element(by.model("input.name")).$("[value='source_port']").click();
        element(by.model("input.operator")).$("[value='!=']").click();
        element(by.model("input.value")).sendKeys("test2");
        element(by.buttonText("Add Clause")).click();

        element(by.model("input.andOrSelect")).$("[value='OR']").click();;
        element(by.model("input.name")).$("[value='source_port']").click();
        element(by.model("input.operator")).$("[value='!=']").click();
        element(by.model("input.value")).sendKeys("test2");
        element(by.buttonText("Add Clause")).click();

        element.all(by.buttonText("Remove")).then(function (items) {
            items[0].click();
        });


        element.all(by.css(".whereClause")).then(function (items) {
            expect(items.length).toBe(2);

        });
    });

    it('should have 1 div of where clause when one from OR clause is removed', function () {
        element(by.model("input.name")).$("[value='source_vn']").click();
        element(by.model("input.operator")).$("[value='=']").click();
        element(by.model("input.value")).sendKeys("test1");
        element(by.buttonText("Add Clause")).click();

        element(by.model("input.andOrSelect")).$("[value='OR']").click();;
        element(by.model("input.name")).$("[value='source_port']").click();
        element(by.model("input.operator")).$("[value='!=']").click();
        element(by.model("input.value")).sendKeys("test2");
        element(by.buttonText("Add Clause")).click();

         element.all(by.buttonText("Remove")).then(function (items) {
            items[0].click();
        });

        element.all(by.css(".whereClause")).then(function (items) {
            expect(items.length).toBe(1);

        });
    });





});



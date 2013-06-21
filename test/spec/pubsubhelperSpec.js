//Makes Resharper less annoying
var describe = window.describe;
var it = window.it;
var beforeEach = window.beforeEach;
var afterEach = window.afterEach;
var expect = window.expect;
var runs = window.runs;
var waits = window.waits;
var spyOn = window.spyOn;


describe("PubSubHelper", function () {

    var dummyObserver = new PubSubHelper();
    var dummyObj = {};

    beforeEach(function () {
        dummyObj.dummyMethod = function () {
        };
    });

    describe("when initialised", function () {
        it("should have subscribe, unsubscribe, notify methods", function () {
            
            // expect properties to be defined
            expect(!!dummyObserver["subscribe"]).toBe(true);
            expect(!!dummyObserver["unsubscribe"]).toBe(true);
            expect(!!dummyObserver["notify"]).toBe(true);
        });

        it("should have a subscribers array property", function () {
            var hasOwnProperty = dummyObserver.hasOwnProperty("subscribers");
            var isArray = Object.prototype.toString.call(dummyObserver.subscribers) === "[object Array]";

            expect(hasOwnProperty && isArray).toBe(true);
        });
    });

    describe("when subscribing", function () {
        var subscribers;

        beforeEach(function () {
            subscribers = dummyObserver.subscribe(dummyObj.dummyMethod);
        });

        afterEach(function () {
            dummyObserver.unsubscribe(dummyObj.dummyMethod);
        });

        it("should add the callback function to the subscribers array", function () {

            expect(dummyObserver.subscribers[0] === dummyObj.dummyMethod).toBe(true);
        });

        it("should return the current list of subscribers", function () {
            var isArray = Object.prototype.toString.call(dummyObserver.subscribers) === "[object Array]";
            var isInArray = $.inArray(dummyObj.dummyMethod, dummyObserver.subscribers) === 0;

            expect(isArray && isInArray).toBeTruthy();
        });


    });

    describe("when unsubscribing", function () {
        beforeEach(function () {
            dummyObserver.subscribe(dummyObj.dummyMethod);
        });

        afterEach(function () {
            dummyObserver.unsubscribe(dummyObj.dummyMethod);
        });
        
        it("should remove the callback function from the subscribers array", function () {

            dummyObserver.unsubscribe(dummyObj.dummyMethod);

            expect(dummyObserver.subscribers.length).toBeLessThan(1);
        });

        it("should return the current list of subscribers", function () {
            var isArray = Object.prototype.toString.call(dummyObserver.subscribers) === "[object Array]";
            var isInArray = $.inArray(dummyObj.dummyMethod, dummyObserver.subscribers) === 0;

            expect(isArray && isInArray).toBeTruthy();
        });
    });

    describe("when notifying", function () {
        it("should execute all functions in the subscribers array", function () {
            spyOn(dummyObj, "dummyMethod");

            dummyObserver.subscribe(dummyObj.dummyMethod);

            dummyObserver.notify();
            
            expect(dummyObj.dummyMethod).toHaveBeenCalled();
        });
    });

});
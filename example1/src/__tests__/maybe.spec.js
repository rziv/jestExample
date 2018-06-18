//Demonstrate jest spy
import maybe from '../maybe'

describe("maybe", function () {

  var callbackSpy;

  beforeEach(function () {
    callbackSpy = jest.fn((...args) => args);
  });
  test("should be defined as a function", function () {
    expect(typeof maybe).toBe("function")
  });
  test("should return a function when called with a funtion", function () {
    expect(typeof maybe(() => { })).toBe("function");
  });
  test("should return undefined when not passed a function", function () {
    expect(typeof maybe("foo")).toBe("undefined");
  });
  test("should not apply the returned function if called without parameters", function () {
    expect(typeof maybe(() => 5)()).toBe("undefined");
    expect(callbackSpy).not.toHaveBeenCalled();
  })

  test("should  apply the returned function if called with defined parameters", function () {
    maybe(callbackSpy)(5, 7);
    expect(callbackSpy).toBeCalledWith(5, 7);
  })

  test("should  return the  result of the callback funciton if called with defined parameters", function () {
    expect(maybe(callbackSpy)(5, 7)).toEqual([5, 7]);
  })

  test("should  not apply the returned function if called with undefined parameter", function () {
    expect(maybe(callbackSpy)(undefined, 7)).toBe(undefined)
    expect(callbackSpy).not.toHaveBeenCalled();
  })

  test("should  not apply the returned function if called with null parameter", function () {
    expect(maybe(callbackSpy)(null, 7)).toBe(undefined)
    expect(callbackSpy).not.toHaveBeenCalled();
  });

  describe("on prototype method", function () {
    function Car(color) {
      this.color = color;
    };

    Car.prototype.setColor = maybe(function (value) {
      this.color = value;
    });

    test("should activate the method when its called with defined value", function () {
      let myCar = new Car("red");
      myCar.setColor("blue");
      expect(myCar.color).toEqual("blue");
    });

    test("should not activate the method when its called with undefined value", function () {
      let myCar = new Car("red");
      myCar.setColor();
      expect(myCar.color).toEqual("red");
    });
  });
})

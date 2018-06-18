import { getForms } from '../getForms'
import getData, { __setData } from '../getData'
jest.mock('../getData')

describe("getForms", function () {

  var formsBefore = [
    {
      "id": 1, "formID": "dr1@test.gov.il", "processID": 45, "name": "dr1"
    },
    {
      "id": 2, "formID": "dr2@test.gov.il", "processID": 46, "name": "dr2"
    },
    {
      "id": 3, "formID": "dr3@test.gov.il", "processID": 100, "name": "dr3"
    }
  ];

  const formsAfter = ["dr1", "dr2", "dr3"];

  beforeEach(()=> {    
    getData.mockClear();    
  })

  afterEach(() => { 
    __setData([]) 
  })

  test("should map to forms list", function (done) {
    __setData(formsBefore);    
    getForms()
      .then(mappedData => {
        expect(mappedData).toEqual(formsAfter);
        done();
      })
  });

  test("should map to forms list 2", function () {
    expect.assertions(2);
    __setData(formsBefore);
    return getForms("http://localhost:4000/forms")
      .then(mappedData => {
        expect(getData).toBeCalledWith("http://localhost:4000/forms");
        expect(mappedData).toEqual(formsAfter);
      })
  });

  test("should map to forms list 3", function () {
    expect.assertions(1);
    __setData(formsBefore);
    return expect(getForms()).resolves.toEqual(formsAfter);
  });

  test("should return empty array for empty list", function (done) {
    getForms("http://localhost:4000/forms")
      .then(mappedData => {
        expect(mappedData).toEqual([]);
        done();
      })
  });

  test("should throw when the ajax operation fails", function (done) {    
    getForms("ftp://localhost:4000/forms")
      .catch(err => {
        expect(err.message).toBe("Can't get forms");
        done();
      })
  });

  test("should throw when the ajax operation fails 2", function () {
    expect.assertions(1);    
    return getForms("ftp://localhost:4000/forms")
      .catch(err => {        
        expect(err.message).toBe("Can't get forms");       
      })
  });
})



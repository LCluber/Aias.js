import { HTTP } from "../dist/aias";

// const mockup = true;
// HTTP.setMockup({ data: mockup });
// HTTP.setEventType("observable");

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

test("get returns true", done => {
  HTTP.observable.get("http://httpbin.org/get", "text").subscribe(data => {
    expect(data).toContain("headers");
    done();
  });
});

test("post returns true", done => {
  HTTP.observable.post("http://httpbin.org/post", "text", scientist).subscribe(data => {
    expect(data).toContain("headers");
    done();
  });
});

test("put returns true", done => {
  HTTP.observable.put("http://httpbin.org/put", "text", scientist).subscribe(data => {
    expect(data).toContain("headers");
    done();
  });
});

test("delete returns true", done => {
  HTTP.observable.delete("http://httpbin.org/delete", "text").subscribe(data => {
    expect(data).toContain("headers");
    done();
  });
});

// test("connect returns true", done => {
//   HTTP.observable.connect("http://httpbin.org/connect", "text").subscribe(data => {
//     expect(data).toContain("headers");
//     done();
//   });
// });

// test("options returns true", done => {
//   HTTP.observable.options("http://httpbin.org/options", "text").subscribe(data => {
//     expect(data).toContain("status");
//     done();
//   });
// });

// test("trace returns true", done => {
//   HTTP.observable.trace("http://httpbin.org/trace", "text").subscribe(data => {
//     expect(data).toContain("headers");
//     done();
//   });
// });

test("patch returns true", done => {
  HTTP.observable.patch("http://httpbin.org/patch", "text", scientist).subscribe(data => {
    expect(data).toContain("headers");
    done();
  });
});

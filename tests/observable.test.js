import { HTTP } from "../dist/aias";

const mockup = true;
HTTP.setMockup({ data: mockup });
HTTP.setEventType("observable");

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

test("get returns true", done => {
  HTTP.get("http://httpbin.org/get", "text").subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("post returns true", done => {
  HTTP.post("http://httpbin.org/post", "text", scientist).subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("put returns true", done => {
  HTTP.put("http://httpbin.org/put", "text", scientist).subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("delete returns true", done => {
  HTTP.delete("http://httpbin.org/delete", "text").subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("connect returns true", done => {
  HTTP.connect("http://httpbin.org/connect", "text").subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("options returns true", done => {
  HTTP.options("http://httpbin.org/options", "text").subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("trace returns true", done => {
  HTTP.trace("http://httpbin.org/trace", "text").subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

test("patch returns true", done => {
  HTTP.patch("http://httpbin.org/patch", "text", scientist).subscribe(data => {
    expect(data).toBe(true);
    done();
  });
});

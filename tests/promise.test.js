import { HTTP } from "../dist/aias";

// const mockup = true;
// HTTP.setMockup({ data: mockup });

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

test("get returns true", async () => {
  await expect(HTTP.promise.get("http://httpbin.org/get", "text")).resolves.toContain("headers");
});

test("post returns true", async () => {
  await expect(
    HTTP.promise.post("http://httpbin.org/post", "text", scientist)
  ).resolves.toContain("headers");
});

test("put returns true", async () => {
  await expect(
    HTTP.promise.put("http://httpbin.org/put", "text", scientist)
  ).resolves.toContain("headers");
});

test("delete returns true", async () => {
  await expect(HTTP.promise.delete("http://httpbin.org/delete", "text")).resolves.toContain("headers");
});

// test("connect returns true", async () => {
//   await expect(
//     HTTP.promise.connect("http://httpbin.org/connect", "text")
//   ).resolves.toContain("headers");
// });

// test("options returns true", async () => {
//   await expect(
//     HTTP.promise.options("http://httpbin.org/options", "text")
//   ).resolves.toContain("status");
// });

// test("trace returns true", async () => {
//   await expect(HTTP.promise.trace("http://httpbin.org/trace", "text")).resolves.toContain("headers");
// });

test("patch returns true", async () => {
  await expect(
    HTTP.promise.patch("http://httpbin.org/patch", "text", scientist)
  ).resolves.toContain("headers");
});

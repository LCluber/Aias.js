import { HTTP } from "../dist/aias";

const mockup = true;
HTTP.setMockupData(mockup);

const scientist = {
  firstname: "Galileo",
  lastname: "Galilei",
  born: 1564,
  died: 1642
};

test("get returns true", async () => {
  await expect(HTTP.GET("http://httpbin.org/get", "text")).resolves.toBe(true);
});

test("post returns true", async () => {
  await expect(
    HTTP.POST("http://httpbin.org/post", "text", scientist)
  ).resolves.toBe(true);
});

test("put returns true", async () => {
  await expect(
    HTTP.PUT("http://httpbin.org/put", "text", scientist)
  ).resolves.toBe(true);
});

test("delete returns true", async () => {
  await expect(HTTP.DELETE("http://httpbin.org/delete", "text")).resolves.toBe(
    true
  );
});

test("connect returns true", async () => {
  await expect(
    HTTP.CONNECT("http://httpbin.org/connect", "text")
  ).resolves.toBe(true);
});

test("options returns true", async () => {
  await expect(
    HTTP.OPTIONS("http://httpbin.org/options", "text")
  ).resolves.toBe(true);
});

test("trace returns true", async () => {
  await expect(HTTP.TRACE("http://httpbin.org/trace", "text")).resolves.toBe(
    true
  );
});

test("patch returns true", async () => {
  await expect(
    HTTP.PATCH("http://httpbin.org/patch", "text", scientist)
  ).resolves.toBe(true);
});

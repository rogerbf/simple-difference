const { difference } = require(process.env.NODE_ENV === "development"
  ? "../source/main"
  : "../")

describe("sameness tests", () => {
  const table = [
    // See table "Sameness Comparisons":
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
    [undefined, undefined, true],
    [null, null, true],
    [true, true, true],
    [false, false, true],
    ["foo", "foo", true],
    [0, 0, true],
    [+0, -0, false],
    [+0, 0, true],
    [-0, 0, false],
    [0, false, false],
    ["", false, false],
    ["", 0, false],
    ["0", 0, false],
    ["17", 17, false],
    [[1, 2], "1,2", false],
    [new String("foo"), "foo", true],
    [null, undefined, false],
    [null, false, false],
    [undefined, false, false],
    [{ foo: "bar" }, { foo: "bar" }, true],
    [new String("foo"), new String("foo"), true],
    [0, null, false],
    [0, NaN, false],
    ["foo", NaN, false],
    [NaN, NaN, true],
    // Not in "Sameness Comparisons":
    [new Map(), new Map(), true],
    [
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      true,
    ],
    [
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      new Map([[1, { a: "a" }], [2, { b: "c" }]]),
      false,
    ],
    [new Set(), new Set(), true],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), true],
    [new Set([1, 2, 3]), new Set([1, 2, 3, 4]), false],
    [new Set([{ a: 1 }]), new Set([{ a: 1 }]), true],
    [new Set([{ a: 1 }]), new Set([{ a: 2 }]), false],
  ]

  test.each(table)("%p, %p", (a, b, same) => {
    expect(difference(a, b).equal).toEqual(same)
  })
})

describe("difference", () => {
  test("typeof", () => {
    expect(typeof difference).toEqual("function")
  })

  test("()", () => {
    expect(difference()).toEqual({ equal: true })
  })

  test.each([
    [1, 1, { equal: true }],
    [1, 2, { equal: false, diff: 2 }],
    ["a", "a", { equal: true }],
    ["a", "b", { equal: false, diff: "b" }],
    [[1, 2, 3], [1, 2, 3], { equal: true }],
    [[1, 2, 3], [1, 2, 3, 4], { equal: false, diff: [4] }],
    [[1, 2, 5], [1, 2, 3, 4], { equal: false, diff: [3, 4] }],
    [[1, 2, 3, 4], [1, 2, 5], { equal: false, diff: [5] }],
    [[1, 2, 3, 4], [1, 2, 2, 4], { equal: false, diff: [2] }],
    [
      { a: "a", b: "b" },
      { a: "a", b: "c" },
      { equal: false, diff: { b: "c" } },
    ],
    [
      { b: "b" },
      { a: "a", b: "c" },
      { equal: false, diff: { a: "a", b: "c" } },
    ],
    [
      { a: "a", b: { c: "c", d: "d" } },
      { a: "a", b: { c: "c", d: "e" } },
      { equal: false, diff: { b: { d: "e" } } },
    ],
    [{ a: {} }, { a: [] }, { equal: false, diff: { a: [] } }],
    [{ a: [1, 2, 3] }, { a: [1, 3, 4] }, { equal: false, diff: { a: [3, 4] } }],
    [{ a: "a" }, { a: "a" }, { equal: true }],
    [{ a: { b: "b" } }, { a: { b: "b" } }, { equal: true }],
    [undefined, "b", { equal: false, diff: "b" }],
    [
      { a: { b: "b" }, c: "c" },
      { a: { b: "b" } },
      { equal: false, diff: { c: undefined } },
    ],
    [null, null, { equal: true }],
    [{ a: "a" }, { a: null }, { equal: false, diff: { a: null } }],
    [{ a: "a" }, { a: undefined }, { equal: false, diff: { a: undefined } }],
    [{ a: "a" }, { a: 0 }, { equal: false, diff: { a: 0 } }],
    [
      { name: "simple", age: 0 },
      { name: "difference", age: 0 },
      {
        equal: false,
        diff: {
          name: "difference",
        },
      },
    ],
    [[], { string: "" }, { equal: false, diff: { string: "" } }],
    [
      {
        one: 1,
        collections: {
          numbers: [1, 2, 3],
          things: [
            {
              id: 1,
              name: "ball",
            },
            {
              id: 2,
              name: "plane",
            },
          ],
        },
      },
      {
        one: 1,
        collections: {
          numbers: [1, 2, 3],
          things: [
            {
              id: 2,
              name: "plane",
            },
            {
              id: 3,
              name: "monkey",
            },
          ],
        },
      },
      {
        equal: false,
        diff: {
          collections: {
            things: [
              {
                id: 2,
                name: "plane",
              },
              {
                id: 3,
                name: "monkey",
              },
            ],
          },
        },
      },
    ],
    // See table "Sameness Comparisons":
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
    [undefined, undefined, { equal: true }],
    [null, null, { equal: true }],
    [true, true, { equal: true }],
    [false, false, { equal: true }],
    ["foo", "foo", { equal: true }],
    [0, 0, { equal: true }],
    [+0, -0, { equal: false, diff: -0 }],
    [+0, 0, { equal: true }],
    [-0, 0, { equal: false, diff: 0 }],
    [0, false, { equal: false, diff: false }],
    ["", false, { equal: false, diff: false }],
    ["", 0, { equal: false, diff: 0 }],
    ["0", 0, { equal: false, diff: 0 }],
    ["17", 17, { equal: false, diff: 17 }],
    [[1, 2], "1,2", { equal: false, diff: "1,2" }],
    [new String("foo"), "foo", { equal: true }],
    [null, undefined, { equal: false, diff: undefined }],
    [null, false, { equal: false, diff: false }],
    [undefined, false, { equal: false, diff: false }],
    [{ foo: "bar" }, { foo: "bar" }, { equal: true }],
    [
      { numbers: { one: 1 } },
      { numbers: { one: 1, two: 2 } },
      { equal: false, diff: { numbers: { two: 2 } } },
    ],
    [new String("foo"), new String("foo"), { equal: true }],
    [0, null, { equal: false, diff: null }],
    [0, NaN, { equal: false, diff: NaN }],
    ["foo", NaN, { equal: false, diff: NaN }],
    [NaN, NaN, { equal: true }],
    // Not in "Sameness Comparisons":
    [new Map(), new Map(), { equal: true }],
    [
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      { equal: true },
    ],
    [
      new Map([[1, { a: "a" }], [2, { b: "b" }]]),
      new Map([[1, { a: "a" }], [2, { b: "c" }]]),
      { equal: false, diff: new Map([[2, { b: "c" }]]) },
    ],
    [
      new Map([[2, { a: "a" }]]),
      new Map([[1, { a: "a" }]]),
      { equal: false, diff: new Map([[1, { a: "a" }]]) },
    ],
    [
      new Map([["a", 1], ["b", 2]]),
      new Map([["a", 1], ["b", 2]]),
      { equal: true },
    ],
    [
      new Map([["a", 1], ["b", 1]]),
      new Map([["a", 1], ["b", 2]]),
      { equal: false, diff: new Map([["b", 2]]) },
    ],
    [new Map([[{ a: "a" }, 1]]), new Map([[{ a: "a" }, 1]]), { equal: true }],
    [
      new Map([[{ a: "a" }, 1], [2, 3]]),
      new Map([[{ a: "a" }, 1]]),
      { equal: false, diff: new Map([[{ a: "a" }, 1]]) },
    ],
    [new Set(), new Set(), { equal: true }],
    [new Set([{}]), new Set([{}]), { equal: true }],
    [new Set([1, 2, 3]), new Set([1, 2, 3]), { equal: true }],
    [
      new Set([1, 2, 3]),
      new Set([1, 2, 3, 4]),
      { equal: false, diff: new Set([4]) },
    ],
    [new Set([{ a: 1 }]), new Set([{ a: 1 }]), { equal: true }],
    [
      new Set([{ a: 1 }]),
      new Set([{ a: 2 }]),
      { equal: false, diff: new Set([{ a: 2 }]) },
    ],
    [
      new Set([{ a: 1, b: 1 }]),
      new Set([{ a: 1, b: 2 }]),
      { equal: false, diff: new Set([{ b: 2 }]) },
    ],
  ])("%p, %p", (a, b, expected) => {
    expect(difference(a, b)).toEqual(expected)
  })
})

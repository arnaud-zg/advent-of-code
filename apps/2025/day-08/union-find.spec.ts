import { UnionFind } from "./union-find";

describe("UnionFind", () => {
  it("initializes correctly", () => {
    const unionFind = new UnionFind(3);

    expect(unionFind.find(0)).toBe(0);
    expect(unionFind.find(1)).toBe(1);
    expect(unionFind.find(2)).toBe(2);

    const sizes = unionFind.getSizes().sort((a, b) => a - b);
    expect(sizes).toEqual([1, 1, 1]);
  });

  it("can union two elements", () => {
    const unionFind = new UnionFind(3);
    const merged = unionFind.union(0, 1);
    expect(merged).toBe(true);

    const root0 = unionFind.find(0);
    const root1 = unionFind.find(1);
    expect(root0).toBe(root1);

    const sizes = unionFind.getSizes().sort((a, b) => a - b);
    expect(sizes).toEqual([1, 2]);
  });

  it("returns false when unioning already connected elements", () => {
    const unionFind = new UnionFind(2);
    unionFind.union(0, 1);
    expect(unionFind.union(0, 1)).toBe(false);
  });

  it("merges multiple sets correctly", () => {
    const unionFind = new UnionFind(4);

    const merged01 = unionFind.union(0, 1);
    const merged23 = unionFind.union(2, 3);
    const merged12 = unionFind.union(1, 2);

    expect(merged01).toBe(true);
    expect(merged23).toBe(true);
    expect(merged12).toBe(true);

    const root = unionFind.find(0);
    expect(unionFind.find(1)).toBe(root);
    expect(unionFind.find(2)).toBe(root);
    expect(unionFind.find(3)).toBe(root);

    expect(unionFind.getSizes()).toEqual([4]);
  });

  it("handles chain of unions creating deep tree", () => {
    const unionFind = new UnionFind(6);

    // Create a chain: 0-1, 1-2, 2-3, 3-4, 4-5
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(2, 3);
    unionFind.union(3, 4);
    unionFind.union(4, 5);

    // All should have the same root
    const root = unionFind.find(0);
    expect(unionFind.find(1)).toBe(root);
    expect(unionFind.find(2)).toBe(root);
    expect(unionFind.find(3)).toBe(root);
    expect(unionFind.find(4)).toBe(root);
    expect(unionFind.find(5)).toBe(root);

    expect(unionFind.getSizes()).toEqual([6]);
  });

  it("handles multiple disjoint sets", () => {
    const unionFind = new UnionFind(9);

    // Create 3 separate groups
    unionFind.union(0, 1);
    unionFind.union(1, 2); // Group 1: {0, 1, 2}

    unionFind.union(3, 4);
    unionFind.union(4, 5);
    unionFind.union(5, 6); // Group 2: {3, 4, 5, 6}

    unionFind.union(7, 8); // Group 3: {7, 8}

    const sizes = unionFind.getSizes().sort((a, b) => a - b);
    expect(sizes).toEqual([2, 3, 4]);

    // Verify elements are in correct groups
    expect(unionFind.find(0)).toBe(unionFind.find(1));
    expect(unionFind.find(1)).toBe(unionFind.find(2));

    expect(unionFind.find(3)).toBe(unionFind.find(4));
    expect(unionFind.find(4)).toBe(unionFind.find(5));
    expect(unionFind.find(5)).toBe(unionFind.find(6));

    expect(unionFind.find(7)).toBe(unionFind.find(8));

    // Verify groups are separate
    expect(unionFind.find(0)).not.toBe(unionFind.find(3));
    expect(unionFind.find(0)).not.toBe(unionFind.find(7));
    expect(unionFind.find(3)).not.toBe(unionFind.find(7));
  });

  it("handles merging large groups efficiently", () => {
    const unionFind = new UnionFind(10);

    // Create two large groups
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(2, 3);
    unionFind.union(3, 4); // Group 1: {0, 1, 2, 3, 4} - size 5

    unionFind.union(5, 6);
    unionFind.union(6, 7);
    unionFind.union(7, 8);
    unionFind.union(8, 9); // Group 2: {5, 6, 7, 8, 9} - size 5

    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([5, 5]);

    // Merge the two large groups
    const merged = unionFind.union(4, 5);
    expect(merged).toBe(true);

    expect(unionFind.getSizes()).toEqual([10]);
  });

  it("detects indirect connections", () => {
    const unionFind = new UnionFind(5);

    // 0-1-2-3-4 (chain)
    unionFind.union(0, 1);
    unionFind.union(1, 2);
    unionFind.union(2, 3);
    unionFind.union(3, 4);

    // Even though 0 and 4 were never directly connected,
    // they should be in the same set
    expect(unionFind.find(0)).toBe(unionFind.find(4));

    // Trying to union them should return false
    expect(unionFind.union(0, 4)).toBe(false);
  });

  it("handles complex merge patterns", () => {
    const unionFind = new UnionFind(8);

    // Create pattern:
    //   0-1     4-5
    //   2-3     6-7
    unionFind.union(0, 1);
    unionFind.union(2, 3);
    unionFind.union(4, 5);
    unionFind.union(6, 7);

    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([2, 2, 2, 2]);

    // Merge pairs: (0,1)+(2,3) and (4,5)+(6,7)
    unionFind.union(1, 2); // Now {0, 1, 2, 3}
    unionFind.union(5, 6); // Now {4, 5, 6, 7}

    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([4, 4]);

    // Final merge
    unionFind.union(3, 4); // Merge all into one group

    expect(unionFind.getSizes()).toEqual([8]);
  });

  it("maintains size accuracy through multiple operations", () => {
    const unionFind = new UnionFind(7);

    unionFind.union(0, 1); // {0,1} size 2
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([
      1, 1, 1, 1, 1, 2,
    ]);

    unionFind.union(2, 3); // {0,1}, {2,3}
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([1, 1, 1, 2, 2]);

    unionFind.union(0, 2); // {0,1,2,3} size 4
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([1, 1, 1, 4]);

    unionFind.union(4, 5); // {0,1,2,3}, {4,5}
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([1, 2, 4]);

    unionFind.union(1, 4); // {0,1,2,3,4,5} size 6
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([1, 6]);

    unionFind.union(6, 0); // All connected, size 7
    expect(unionFind.getSizes()).toEqual([7]);
  });

  it("handles star topology (one central node)", () => {
    const unionFind = new UnionFind(6);

    // Connect all nodes to node 0 (star pattern)
    unionFind.union(0, 1);
    unionFind.union(0, 2);
    unionFind.union(0, 3);
    unionFind.union(0, 4);
    unionFind.union(0, 5);

    // All should be in same set
    for (let i = 1; i < 6; i++) {
      expect(unionFind.find(i)).toBe(unionFind.find(0));
    }

    expect(unionFind.getSizes()).toEqual([6]);
  });

  it("handles redundant unions gracefully", () => {
    const unionFind = new UnionFind(4);

    unionFind.union(0, 1);
    unionFind.union(1, 2);

    // Try to union elements already in same set
    expect(unionFind.union(0, 1)).toBe(false);
    expect(unionFind.union(0, 2)).toBe(false);
    expect(unionFind.union(1, 2)).toBe(false);

    // Size should remain unchanged
    expect(unionFind.getSizes().sort((a, b) => a - b)).toEqual([1, 3]);
  });

  it("handles edge case with single element", () => {
    const unionFind = new UnionFind(1);

    expect(unionFind.find(0)).toBe(0);
    expect(unionFind.getSizes()).toEqual([1]);

    // Cannot union with itself
    expect(unionFind.union(0, 0)).toBe(false);
  });

  it("stress test: many unions leading to single component", () => {
    const n = 100;
    const unionFind = new UnionFind(n);

    // Connect 0 to all others
    for (let i = 1; i < n; i++) {
      expect(unionFind.union(0, i)).toBe(true);
    }

    // All should be in same component
    expect(unionFind.getSizes()).toEqual([n]);

    // All should have same root
    const root = unionFind.find(0);
    for (let i = 1; i < n; i++) {
      expect(unionFind.find(i)).toBe(root);
    }
  });
});

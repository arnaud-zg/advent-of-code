export class UnionFind {
  parent: number[] = [];
  size: number[] = [];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(member: number): number {
    const isNotTeamLeader = this.parent[member] !== member;

    if (isNotTeamLeader) {
      this.parent[member] = this.find(this.parent[member]!);
    }

    return this.parent[member]!;
  }

  union(x: number, y: number): boolean {
    const leaderOfTeamX = this.find(x);
    const leaderOfTeamY = this.find(y);
    const areAlreadyInSameTeam = leaderOfTeamX === leaderOfTeamY;

    if (areAlreadyInSameTeam) {
      return false;
    }

    const teamXMembers = this.size[leaderOfTeamX]!;
    const teamYMembers = this.size[leaderOfTeamY]!;
    const isTeamXSmaller = teamXMembers < teamYMembers;

    if (isTeamXSmaller) {
      this.parent[leaderOfTeamX] = leaderOfTeamY;
      this.size[leaderOfTeamY]! += teamXMembers;
    } else {
      this.parent[leaderOfTeamY] = leaderOfTeamX;
      this.size[leaderOfTeamX]! += teamYMembers;
    }

    return true;
  }

  getSizes(): number[] {
    const roots = new Set<number>();

    for (let i = 0; i < this.parent.length; i++) {
      roots.add(this.find(i));
    }

    return Array.from(roots).map((root) => this.size[root]!);
  }
}

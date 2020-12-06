# adventofcode

On this repository you can find my solutions to Advent of Code.
> Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as a speed contest, interview prep, company training, university coursework, practice problems, or to challenge each other.

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node

Supported versions

```sh
$ node --version
v12.20.0

$ yarn --version
6.1.0
```

---

### Install dependencies

```sh
> yarn
```

### Test

Every tests have been run multiple devices, the table below show some specifications.
> You don't need a computer science background to participate - just a little programming knowledge and some problem solving skills will get you pretty far. Nor do you need a fancy computer; every problem has a solution that completes in at most 15 seconds on ten-year-old hardware.

|           | Raspberry Pi 1 Model B+ |         Laptop 1         |
|-----------|:-----------------------:|:------------------------:|
| CPU       |         BCM2835         |  Intel Core 2 Duo T6400  |
| CPU Cores |            1            |            2             |
| CPU Speed |         700 MHz         |           2 Ghz          |
| RAM       |          512 MB         |           3 GB           |

### Resolve a puzzle

Let's say you want to solve the puzzle of day 1 of 2020, you need to execute command according to following patter `yarn cli solvePuzzle -y=[year] -d=[day]`.

```sh
$ yarn cli solvePuzzle -y=2020 -d=1
```


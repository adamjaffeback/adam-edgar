# adam-edgar

This is a test project for Virtual Facility to ETL EDGAR data from the SEC.

#### Table of Contents

- [Setup](#setup)
- [Run](#run)
- [Testing](#testing)
- [Project Specs](#project-specs)
- [Decision Points](#decision-points)
- [Todos](#todos)

## Setup

Computer prerequisites:

- Node.js v10
- npm corresponding to that version of Node.js
- Internet connection

```bash
git clone https://github.com/adamjaffeback/adam-edgar.git
cd adam-edgar/
npm install
```

## Run

```bash
node --max-old-space-size=8192
> const edgar = require('./');
undefined
> edgar(2, 2018).then(console.log).catch(console.error);
```

## Testing

Rather than providing your own variables and doing the command line setup described in [Run](#run), you can also do `npm test`, which runs the script for Q1 2019.

## Project Specs

- Pulls financial income statement data from EDGAR
- Stores it in the environment in a directory YYYYqQ
- Does data transformations to format as JSON as needed
- Stores the output in the environment in the YYYYqQ directory
- The output is auditable; any transformation logs to the YYYYqQ directory
- The output would integrate with a front-end as JSON.
- Logs in quarter directory
  - 1. Download original zip
  - 2. Unzip original zip to track original `*.txt` files
  - 3. Read and save `*.txt` files as `read-*.txt`
  - 4. Save individual files as `*.json`
  - 5. Concatenated all json files as `YYYYqQ.json`

## Decision Points

- To constrain the problem, I focused on quarterly data only. A more mature API would allow filtering on company, etc.
- These quarterly files are pretty dang big! I had to up the node memory limitations with `--max-old-space-size` and do transformations on files in series, rather than in parallel
- I knew I wanted to save the individual `*.txt => *.json` file transformations for auditability, but I wavered on whether to create one giant JSON file for the entire quarter containing the concatenation of the smaller files. In the end, I *was* able to accomplish this, but it was difficult because native `JSON.stringify` runs out of memory due to the V8 engine's constraints
- I didn't trust JSZip to read and interpret data with validity. As a result, I use JSZip to get the zip metadata (filenames), but then unzip the directory fully as part of the ETL and do direct work on the `*.txt` files

## Todos

- Add unit testing, especially for `helpers/transform.js`
- Provide a better logging system that logs each transformation, not just the end result, to a log.txt file
- Make this into a npm package which can be used as a command line tool

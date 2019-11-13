module.exports =   {
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testMatch: [
      '**/src/**.(test|spec).ts',
      '**/tests/**.(test|spec).js'
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
  }
  
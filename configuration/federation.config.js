
// starter federation.config.js

const fs = require("fs")
const path = require("path")
const stage = process.env.BUILD_STAGE ?? "beta"

const remoteUrls = {
  "local": {},
  "beta": {},
  "gamma": {},
  "prod": {}
}

federationConfig = {
  name: "Shared",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./ContactCard": "./src/components/ContactCard/ContactCard.tsx"
  },
  shared: {
    "react": {
      "requiredVersion": "^18.2",
      "singleton": true,
    },
    "react-dom": {
      "requiredVersion": "^18.2",
      "singleton": true,
    },
    "@mui/material": {
      "requiredVersion": "^5.11.10",
      "singleton": true,
    },
    "@emotion/react": {
      "requiredVersion": "^11.10.6",
      "singleton": true,
    },
    "@emotion/styled": {
      "requiredVersion": "^11.10.6",
      "singleton": true,
    },
    "lodash": {
      "requiredVersion": "^4.17.21",
      "singleton": true,
    },
    "axios": {
      "requiredVersion": "^1.3.4",
      "singleton": true,
    },
  }
}

if (stage === "prod") {
  // do not provide override capability
  federationConfig.remotes = Object.keys(remoteUrls.prod).reduce((s, k) => {
    return {
      ...s,
      [k]: k + '@' + remoteUrls.prod[k]
    }
  }, {})
}

if (process.env.DEV_DOMAIN !== undefined) {
  federationConfig.remotes = Object.keys(federationConfig.remotes).reduce((s, k) => {
    return {
      ...s,
      [k]: federationConfig.remotes[k].replace("localhost", process.env.DEV_DOMAIN)
    }
  }, {})
}

let rootDir = __dirname;
// find the root dir by iteratively going up until we find a package.json
while (!fs.existsSync(path.resolve(rootDir, "package.json")) && rootDir !== process.cwd() && rootDir !== "/") {
  rootDir = path.resolve(rootDir, "..");
}

Object.keys(federationConfig.exposes).forEach((k) => {
  const exposePath = path.resolve(rootDir, federationConfig.exposes[k]);
  if (!fs.existsSync(exposePath)) {
    console.warn("expose path does not exist: " + exposePath + " omitting from config")
    delete federationConfig.exposes[k];
  }
})

exports.federationConfig = federationConfig;

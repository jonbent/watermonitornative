/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const getWorkspaces = require('get-yarn-workspaces');
const workspaces = getWorkspaces(__dirname);
const path = require('path');
const watchFolders = [
  path.resolve(__dirname, '..', '..', 'node_modules'),
  ...workspaces.filter(workspaceDir => !(workspaceDir === __dirname))
      .map(workspaceDir => path.resolve(__dirname, '..', workspaceDir, "node_modules")),
];

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};



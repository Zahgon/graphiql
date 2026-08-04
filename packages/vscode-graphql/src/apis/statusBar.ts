import {
  StatusBarAlignment,
  StatusBarItem,
  TextEditor,
  window,
  ThemeColor,
  version,
} from 'vscode';

import { LanguageClient, State } from 'vscode-languageclient/node';

enum Status {
  INIT = 1,
  RUNNING = 2,
  ERROR = 3,
}

// const statusBarText = 'GraphQL';

const oldStatusBarUIElements = {
  [Status.INIT]: {
    icon: 'sync',
    tooltip: 'GraphQL language server is initializing',
  },
  [Status.RUNNING]: {
    icon: 'plug',
    tooltip: 'GraphQL language server is running',
  },
  [Status.ERROR]: {
    icon: 'stop',
    color: new ThemeColor('list.warningForeground'),
    tooltip: 'GraphQL language server has stopped',
  },
};

// Uses an API added in Feb 2022
const statusBarUIElements = {
  [Status.INIT]: {
    icon: 'graphql-loading',
    tooltip: 'GraphQL language server is starting up, click to show logs',
  },
  [Status.RUNNING]: {
    icon: 'graphql-logo',
    tooltip: 'GraphQL language server is running, click to show logs',
  },
  [Status.ERROR]: {
    icon: 'graphql-error',
    color: new ThemeColor('list.warningForeground'),
    tooltip: 'GraphQL language server has stopped, click to show logs',
  },
};

// const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 0);
let extensionStatus: Status = Status.RUNNING;
let serverRunning = true; // TODO: See comment with client.onNotification("init".....

const statusBarActivationLanguageIds = [
  'graphql',
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
  'vue',
  'svelte',
  'astro',
];

export const createStatusBar = () => {
    throw new Error("STUB");
};

export function initStatusBar(
  statusBarItem: StatusBarItem,
  client: LanguageClient,
  editor: TextEditor | undefined,
) {
    throw new Error("STUB");
}

function updateStatusBar(
  statusBarItem: StatusBarItem,
  editor: TextEditor | undefined,
) {
    throw new Error("STUB");
}

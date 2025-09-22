import path from "path";
import * as vscode from "vscode";
import { getParentFolderUri } from "./utils";
import Options from "./const";

type LanguageEnum = keyof typeof Options;
async function initFileWithType(
  uri: vscode.Uri,
  context: vscode.ExtensionContext,
  ele: "FILE" | "FOLDER"
) {
  const fileName = await vscode.window.showInputBox({});

  switch (ele) {
    case "FILE":
      if (fileName && fileName.includes(".")) {
        const url = await getParentFolderUri(uri);
        const filePath = path.join(url.fsPath, fileName);
        await vscode.workspace.fs.writeFile(
          vscode.Uri.file(filePath),
          Buffer.from("")
        );
        await vscode.window.showTextDocument(vscode.Uri.file(filePath));
      }
      break;
    case "FOLDER":
      if (fileName) {
        const url = await getParentFolderUri(uri);
        const filePath = path.join(url.fsPath, fileName);
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(filePath));
        await vscode.commands.executeCommand(
          "revealInExplorer",
          vscode.Uri.file(filePath)
        );
      }
      break;
  }
}
async function init(
  uri: vscode.Uri,
  type: LanguageEnum,
  context: vscode.ExtensionContext
) {
  const fileName = await vscode.window.showInputBox({});
  const fileType = await vscode.window.showQuickPick(Options[type], {
    canPickMany: false,
    matchOnDescription: false,
    matchOnDetail: false,
  });

  if (fileName && fileType?.id) {
    const url = await getParentFolderUri(uri);
    const filePath = path.join(url.fsPath, fileName + "." + fileType.id);
    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(filePath),
      Buffer.from("")
    );
    await vscode.window.showTextDocument(vscode.Uri.file(filePath));
  }
}
export function activate(context: vscode.ExtensionContext) {
  const arr: LanguageEnum[] = [
    "FOLDER",
    "FILE",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "STYLE SHEET",
    "HTML",
  ];
  try {
    const commands = arr.map((ele) => {
      return vscode.commands.registerCommand(ele, async (uri: vscode.Uri) => {
        if (ele === "FILE" || ele === "FOLDER") {
          initFileWithType(uri, context, ele);
          return;
        }
        init(uri, ele, context);
      });
    });
    context.subscriptions.push(...commands);
  } catch (error: unknown) {
    if (error && error instanceof Error && error.message) {
      vscode.window.showErrorMessage(error.message);
    }
  }
}

export function deactivate() {}

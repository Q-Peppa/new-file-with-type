import path from "path";
import * as vscode from "vscode";
import { getParentFolderUri } from "./utils";
import Options from "./const";

type LanguageEnum = keyof typeof Options;

async function init(uri: vscode.Uri, type: LanguageEnum, context: vscode.ExtensionContext) {

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
    vscode.window.showTextDocument(vscode.Uri.file(filePath));
  }

}
export function activate(context: vscode.ExtensionContext) {
  const arr: LanguageEnum[] = ["JAVASCRIPT", "TYPESCRIPT", "STYLE SHEET", "HTML"];
  const commands = arr.map((ele) => {
    return vscode.commands.registerCommand(ele, async (uri: vscode.Uri) => {
      init(uri, ele, context);
    });
  });
  context.subscriptions.push(...commands);
}

export function deactivate() {}
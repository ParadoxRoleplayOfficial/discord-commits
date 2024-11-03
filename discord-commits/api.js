export function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case "false":
    case "no":
    case "0":
    case "":
    case null:
      return false;
    default:
      return true;
  }
}

export function createCommit(commit) {
  const messageSections = commit.message.split("\n\n");
  return {
    title: messageSections[0],
    description: messageSections.slice(1).join("\n\n"),
    ...commit,
  };
}
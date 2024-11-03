import core from "@actions/core";
import github from "@actions/github";
import fetch from "node-fetch";
import {
  createCommit,
  stringToBoolean,
} from "./api.js";

// Haal inputs op
const webhook = core.getInput("webhook");
const lastCommitOnly = stringToBoolean(core.getInput("last-commit-only"));

// Verkrijg de commits; beperk tot de laatste als dat gespecificeerd is
let commits = github.context.payload.commits;
if (lastCommitOnly) {
  commits = commits.slice(-1);
}

// Bouw de embeds op
let embeds = [];

// Hoofdembed met repo-informatie
embeds.push({
  title: "ParadoxRoleplay",
  description: `Aantal commits: ${commits.length}`,
  color: 3447003, // Kies een kleur naar wens in hexadecimale notatie
});

// Voeg een embed toe voor elke commit
commits.forEach((commit) => {
  embeds.push({
    description: commit.message, // De commit message
    footer: {
      text: `Auteur: ${commit.author.name}`,
      icon_url: commit.author.avatar_url, // Auteur's avatar
    },
    color: 16777215, // Wit of een andere kleur naar wens
  });
});

// Payload voor de webhook
const payload = {
  embeds: embeds,
};

try {
  const webhookURL = new URL(webhook);
  webhookURL.searchParams.set('wait', 'true');
  await fetch(webhookURL.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
    },
    body: JSON.stringify(payload),
  });
} catch (err) {
  console.error(err);
  core.error(err);
  core.setFailed("Fout tijdens versturen van het bericht: ", err.response ? err.response.data : err.message);
}
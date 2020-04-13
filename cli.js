#!/usr/bin/env node

const githubTrends = require('@huchenme/github-trending');

const [,, sinceSwitch] = process.argv

let assignedLang = 'javascript'
let assignedSince = '';

if (sinceSwitch === '-d') {
  assignedSince = 'daily'
} else if (sinceSwitch === '-m') {
  assignedSince = 'monthly'
} else if (sinceSwitch === '' || sinceSwitch === '-w') {
  assignedSince = 'weekly'
}

console.log(assignedSince);

const capitalize = words =>
  words.charAt(0).toUpperCase() + words.slice(1);

const line = length => (new Array(length)).fill('-').join('');

githubTrends.fetchRepositories({ language: assignedLang, since: assignedSince })
  .then(repo => {
    const topThree = repo.slice(0, 3);
    const randomEmoji = ['🚀', '❤️', '🎉'];
    const message = `
Javascript Trending ${capitalize(assignedSince)} ✨✨✨

${line(40)}

${
  topThree
  .map((top, i) => `
Number ${i + 1} ${randomEmoji[i]} : ${top.name}

${top.description}
Built by ${top.author} 🕺 @ ${top.url}

  - ${top.stars} Stars ⭐️
  - ${top.forks} Forks 🥂
`)
  .join('\n')
}
`
    console.log(message);
  })

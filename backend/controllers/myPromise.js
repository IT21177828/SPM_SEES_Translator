import badWordsList from "../db/badWords.js";

class AhoCorasickNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.failureLink = null;
    this.outputLink = null;
  }
}
class AhoCorasick {
  constructor() {
    this.root = new AhoCorasickNode();
    this.buildFailureLinks();
  }

  addPattern(pattern) {
    let currentNode = this.root;
    for (const char of pattern) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new AhoCorasickNode());
      }
      currentNode = currentNode.children.get(char);
    }
    currentNode.isEndOfWord = true;
  }

  buildFailureLinks() {
    const queue = [];
    // Initialize failure links for level 1 nodes
    for (const [char, node] of this.root.children) {
      node.failureLink = this.root;
      queue.push(node);
    }

    while (queue.length > 0) {
      const currentNode = queue.shift();

      for (const [char, childNode] of currentNode.children) {
        let failureLinkNode = currentNode.failureLink;

        while (
          failureLinkNode !== null &&
          !failureLinkNode.children.has(char)
        ) {
          failureLinkNode = failureLinkNode.failureLink;
        }

        if (failureLinkNode === null) {
          childNode.failureLink = this.root;
        } else {
          childNode.failureLink = failureLinkNode.children.get(char);
        }

        if (childNode.failureLink.isEndOfWord) {
          childNode.outputLink = childNode.failureLink;
        } else {
          childNode.outputLink = childNode.failureLink.outputLink;
        }

        queue.push(childNode);
      }
    }
  }

  search(text) {
    const results = [];
    let currentNode = this.root;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      while (currentNode !== null && !currentNode.children.has(char)) {
        currentNode = currentNode.failureLink;
      }

      if (currentNode === null) {
        currentNode = this.root;
        continue;
      }

      currentNode = currentNode.children.get(char);

      let outputLinkNode = currentNode;
      while (outputLinkNode !== null) {
        if (outputLinkNode.isEndOfWord) {
          const startIndex = i - text.length + 1;
          const endIndex = i;
          results.push({ word: text, startIndex, endIndex });
        }
        outputLinkNode = outputLinkNode.outputLink;
      }
    }

    return results;
  }
}

function findWordWithoutSpace(sentence, pattern) {
  const ac = new AhoCorasick();
  ac.addPattern(pattern);
  const results = ac.search(sentence);
  return results.length > 0;
}

function hide(word) {
  let staredWord = "";
  for (let index = 0; index < word.length; index++) {
    staredWord += "X";
  }
  return staredWord;
}

export function myPromises(sentence) {
  return new Promise((resolve, reject) => {
    try {
      const badWordsContainer = [];
      const text = sentence.toLowerCase().trim();
      let startPhase = sentence;
      let hasBadWords = false;

      badWordsList.forEach((word) => {
        const result = findWordWithoutSpace(text, word.toLowerCase());
        if (result) {
          badWordsContainer.push(word);
          console.log(`The sentence contains the word '${word}'.`);
        }
      });

      if (badWordsContainer.length) {
        hasBadWords = true;
      }
      resolve({ badWordsContainer, hasBadWords, startPhase });
    } catch (error) {
      reject(error);
    }
  });
}

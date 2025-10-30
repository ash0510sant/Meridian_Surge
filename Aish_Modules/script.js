// Sample demo data
const demoData = {
    module1: {
        english: "The recent technological advancements in artificial intelligence are transforming various industries.",
        hindi: "यह भारत सरकार की नई डिजिटल पहल है। This is a new digital initiative by the Indian government.",
        mixed: "Natural language processing या प्राकृतिक भाषा प्रसंस्करण is a fascinating field. এটি একটি গুরুত্বপূর্ণ প্রযুক্তি।"
    },
    module2: {
        tokenization: "Tokenization splits text into individual words, punctuation marks, and other meaningful elements.",
        stemming: "Stemming is the process of reducing words to their root or base form by removing suffixes or prefixes. For example, 'running', 'runner', and 'runs' can all be reduced to 'run'.",
        ngrams: "N-grams capture sequential patterns in text. Bigrams and trigrams are commonly used language models."
    },
    module3: {
        pos: "The quick brown fox jumps over the lazy dog near the riverbank.",
        parsing: "The intelligent computer system processes natural language text efficiently and accurately.",
        constituency: "Students study computational linguistics and machine learning algorithms in modern universities."
    },
    module4: {
        wsd: "The bank near the river bank reported that customers bank their money safely in the financial bank.",
        ner: "Apple Inc. CEO Tim Cook met with President Biden at the White House in Washington D.C. on January 15, 2024.",
        similarity: "Machine learning and artificial intelligence are related concepts in computer science and technology."
    },
    module5: {
        anaphora: "The company released a new product. It became very popular. The CEO was pleased with its success.",
        coherence: "Machine learning is advancing rapidly. These algorithms process vast amounts of data. The technology enables better predictions.",
        reference: "John went to the store. He bought some groceries. The man was satisfied with his purchases."
    },
    module6: {
        news: "The Indian Space Research Organisation (ISRO) successfully launched a satellite mission yesterday. The mission aims to improve weather forecasting capabilities across South Asia. Scientists are optimistic about the potential benefits for agriculture and disaster management.",
        sentiment: "This new smartphone is absolutely amazing! The camera quality is outstanding and the battery life is incredible. I'm so happy with this purchase!",
        qa: "Artificial intelligence is revolutionizing healthcare through advanced diagnostic tools and personalized treatment recommendations. Machine learning algorithms can analyze medical images with high accuracy."
    }
};
let SENTIMENT_LEXICON = { positive: [], negative: [] };

// Load sentiment words from JSON file
fetch('sentiment_words.json')
  .then(response => response.json())
  .then(data => {
    SENTIMENT_LEXICON = data;
    console.log('✅ Sentiment word list loaded:', SENTIMENT_LEXICON);
  })
  .catch(err => console.error('⚠️ Error loading sentiment words:', err));




// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            const moduleId = btn.getAttribute('data-module');
            document.getElementById(moduleId).classList.add('active');
        });
    });
    
    console.log('Multilingual NLP System loaded successfully!');
});

// Demo data loading
function loadDemo(module, type) {
    const textareaId = `${module}-text`;
    const textarea = document.getElementById(textareaId);
    if (textarea && demoData[module] && demoData[module][type]) {
        textarea.value = demoData[module][type];
    }
}

// Utility functions
function showLoading(moduleNum) {
    document.getElementById(`m${moduleNum}-loading`).style.display = 'block';
    document.getElementById(`m${moduleNum}-results`).style.display = 'none';
}

function hideLoading(moduleNum) {
    document.getElementById(`m${moduleNum}-loading`).style.display = 'none';
}

function showResults(moduleNum, content) {
    hideLoading(moduleNum);
    const resultsDiv = document.getElementById(`m${moduleNum}-results`);
    resultsDiv.innerHTML = content;
    resultsDiv.style.display = 'block';
}

// Language detection patterns
const languagePatterns = {
    'hi': /[\u0900-\u097F]+/g,  // Devanagari (Hindi)
    'ta': /[\u0B80-\u0BFF]+/g,  // Tamil
    'te': /[\u0C00-\u0C7F]+/g,  // Telugu
    'bn': /[\u0980-\u09FF]+/g,  // Bengali
    'en': /[a-zA-Z]+/g          // English
};

const languageNames = {
    'en': 'English',
    'hi': 'Hindi',
    'ta': 'Tamil',
    'te': 'Telugu',
    'bn': 'Bengali'
};

// MODULE 1: Foundation Analysis
function analyzeFoundation() {
    const text = document.getElementById('m1-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(1);

    setTimeout(() => {
        const language = detectLanguage(text);
        const wordCount = text.split(/\s+/).length;
        const charCount = text.length;
        const ambiguousWords = findAmbiguousWords(text);
        const cleanText = preprocessText(text);

        const results = `
            <h3>🔍 Foundation Analysis Results</h3>
            <div class="result-item">
                <strong>Detected Language:</strong> ${languageNames[language] || 'Mixed/Unknown'}
                <div class="feature-grid">
                    <div class="feature-item">Words: ${wordCount}</div>
                    <div class="feature-item">Characters: ${charCount}</div>
                    <div class="feature-item">Language: ${language.toUpperCase()}</div>
                </div>
            </div>
            <div class="result-item">
                <strong>Ambiguous Words Found:</strong>
                <div class="tag-container">
                    ${ambiguousWords.map(word => `<span class="tag">${word}</span>`).join('')}
                </div>
                ${ambiguousWords.length === 0 ? '<p>No common ambiguous words detected.</p>' : ''}
            </div>
            <div class="result-item">
                <strong>Preprocessed Text:</strong>
                <p style="background:#f8f9fa; padding:10px; border-radius:5px; margin-top:10px;">${cleanText}</p>
            </div>
            <div class="result-item">
                <strong>Language Distribution:</strong>
                ${getLanguageDistribution(text)}
            </div>
        `;

        showResults(1, results);
    }, 1500);
}

function detectLanguage(text) {
    const scores = {};
    
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
        const matches = text.match(pattern);
        scores[lang] = matches ? matches.join('').length : 0;
    }
    
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
}

function findAmbiguousWords(text) {
    const ambiguous = ['bank', 'bark', 'bat', 'crane', 'fair', 'light', 'right', 'left', 'rock', 'spring'];
    const words = text.toLowerCase().split(/\W+/);
    return ambiguous.filter(word => words.includes(word));
}

function preprocessText(text) {
    return text.replace(/\s+/g, ' ')
              .replace(/[^\w\s\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F\u0980-\u09FF]/g, ' ')
              .trim();
}

function getLanguageDistribution(text) {
    const distribution = {};
    const total = text.length;
    
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
        const matches = text.match(pattern);
        const count = matches ? matches.join('').length : 0;
        const percentage = ((count / total) * 100).toFixed(1);
        if (count > 0) {
            distribution[lang] = percentage;
        }
    }
    
    let html = '<div class="feature-grid">';
    for (const [lang, percentage] of Object.entries(distribution)) {
        html += `
            <div class="feature-item">
                ${languageNames[lang]}: ${percentage}%
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    
    return html;
}

// MODULE 2: Word Analysis
function showDemo(type) {
    const demoText = demoData.module2[type];
    if (!demoText) return;

    const demoDiv = document.getElementById("m2-demo");
    demoDiv.style.display = "block";
    demoDiv.innerHTML = `
        <h3>📖 ${type.charAt(0).toUpperCase() + type.slice(1)} Demo</h3>
        <p style="background:#f8f9fa; padding:12px; border-radius:6px;">
            ${demoText}
        </p>
    `;
}

function showDemo(type) {
    const demoText = demoData.module2[type];
    if (!demoText) return;

    const demoDiv = document.getElementById("m2-demo");
    demoDiv.style.display = "block";
    demoDiv.innerHTML = `
        <h3>📖 ${type.charAt(0).toUpperCase() + type.slice(1)} Demo</h3>
        <p style="background:#f8f9fa; padding:12px; border-radius:6px;">
            ${demoText}
        </p>
    `;
}


function analyzeWords() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const stemmed = tokens.map(token => porterStem(token));
        const filtered = tokens.filter(token => !isStopWord(token));

        const results = `
            <h3>🔤 Word-Level Analysis Results</h3>
            <div class="result-item">
                <strong>Tokenization (${tokens.length} tokens):</strong>
                <div class="tag-container">
                    ${tokens.slice(0, 20).map(token => `<span class="tag">${token}</span>`).join('')}
                    ${tokens.length > 20 ? '<span class="tag">...</span>' : ''}
                </div>
            </div>
            <div class="result-item">
                <strong>Stemmed Words:</strong>
                <div class="tag-container">
                    ${stemmed.slice(0, 15).map(stem => `<span class="tag">${stem}</span>`).join('')}
                    ${stemmed.length > 15 ? '<span class="tag">...</span>' : ''}
                </div>
            </div>
            <div class="result-item">
                <strong>After Stop Word Removal (${filtered.length} words):</strong>
                <div class="tag-container">
                    ${filtered.slice(0, 15).map(word => `<span class="tag">${word}</span>`).join('')}
                    ${filtered.length > 15 ? '<span class="tag">...</span>' : ''}
                </div>
            </div>
            <div class="result-item">
                <strong>Word Statistics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Total Tokens: ${tokens.length}</div>
                    <div class="feature-item">Unique Words: ${new Set(tokens).size}</div>
                    <div class="feature-item">Avg Word Length: ${(tokens.reduce((sum, word) => sum + word.length, 0) / tokens.length).toFixed(1)}</div>
                </div>
            </div>
        `;

        showResults(2, results);
    }, 1500);
}

function generateNgrams() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const bigrams = generateNgramList(tokens, 2);
        const trigrams = generateNgramList(tokens, 3);
        const bigramCounts = countNgrams(bigrams);
        const trigramCounts = countNgrams(trigrams);

        const results = `
            <h3>📊 N-gram Analysis Results</h3>
            <div class="result-item">
                <strong>Bigrams (${bigrams.length} total):</strong>
                <div class="tag-container">
                    ${Object.entries(bigramCounts).slice(0, 10).map(([ngram, count]) => 
                        `<span class="tag">${ngram} (${count})</span>`).join('')}
                </div>
            </div>
            <div class="result-item">
                <strong>Trigrams (${trigrams.length} total):</strong>
                <div class="tag-container">
                    ${Object.entries(trigramCounts).slice(0, 8).map(([ngram, count]) => 
                        `<span class="tag">${ngram} (${count})</span>`).join('')}
                </div>
            </div>
            <div class="result-item">
                <strong>N-gram Statistics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Unique Bigrams: ${Object.keys(bigramCounts).length}</div>
                    <div class="feature-item">Unique Trigrams: ${Object.keys(trigramCounts).length}</div>
                    <div class="feature-item">Vocabulary Size: ${new Set(tokens).size}</div>
                </div>
            </div>
        `;

        showResults(2, results);
    }, 1500);
}

function calculatePerplexity() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const perplexity = calculateTextPerplexity(tokens);
        const entropy = Math.log2(perplexity);

        const results = `
            <h3>📈 Perplexity Analysis Results</h3>
            <div class="result-item">
                <strong>Language Model Metrics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Perplexity: ${perplexity.toFixed(2)}</div>
                    <div class="feature-item">Entropy: ${entropy.toFixed(2)} bits</div>
                    <div class="feature-item">Model Quality: ${getModelQuality(perplexity)}</div>
                </div>
            </div>
            <div class="result-item">
                <strong>Interpretation:</strong>
                <p>${getPerplexityInterpretation(perplexity)}</p>
            </div>
        `;

        showResults(2, results);
    }, 1500);
}

// EXTRA FEATURES FOR MODULE 2

function posTagging() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter text for POS Tagging!');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const tags = performPOSTagging(tokens);

        const results = `
            <h3>🔖 POS Tagging Results</h3>
            <div class="tag-container">
                ${tags.map(([w,t]) => `<span class="tag">${w}/${t}</span>`).join('')}
            </div>
        `;

        showResults(2, results);
    }, 1200);
}

function wordFrequency() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter text for Word Frequency!');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const freq = {};
        tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);

        const results = `
            <h3>🔢 Word Frequency Results</h3>
            <div class="tag-container">
                ${Object.entries(freq).slice(0,20).map(([w,c]) => `<span class="tag">${w} (${c})</span>`).join('')}
            </div>
        `;
        showResults(2, results);
    }, 1000);
}

function removeStopwords() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter text for Stopword Removal!');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const filtered = tokens.filter(t => !isStopWord(t));

        const results = `
            <h3>🚫 Stopword Removal</h3>
            <div class="tag-container">
                ${filtered.slice(0,30).map(w => `<span class="tag">${w}</span>`).join('')}
                ${filtered.length > 30 ? '<span class="tag">...</span>' : ''}
            </div>
        `;
        showResults(2, results);
    }, 1000);
}

function generateWordCloud() {
    const text = document.getElementById('m2-text').value.trim();
    if (!text) {
        alert('Please enter text for Word Cloud!');
        return;
    }

    showLoading(2);

    setTimeout(() => {
        const tokens = tokenize(text);
        const freq = {};
        tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);

        // placeholder cloud as tags
        const results = `
            <h3>☁️ Word Cloud (Simple Demo)</h3>
            <div class="tag-container">
                ${Object.entries(freq).map(([w,c]) =>
                    `<span class="tag" style="font-size:${12 + c*3}px">${w}</span>`
                ).join(' ')}
            </div>
        `;
        showResults(2, results);
    }, 1000);
}

function runAdvancedWordAnalysis() {
  const text = document.getElementById('m2-advanced-text').value.trim();
  if (!text) {
    alert('Please enter some text.');
    return;
  }

  document.getElementById('m2-advanced-loading').style.display = 'block';
  document.getElementById('m2-advanced-results').style.display = 'none';

  setTimeout(() => {
    const tokens = tokenize(text);                              // already in your JS
    const stemmed = tokens.map(token => porterStem(token));     // already in your JS
    const lemmatized = tokens.map(token => lemmatizeWord(token)); // new function below

    const html = `
      <h3>🔤 Analysis Results</h3>
      <div class="result-item">
        <strong>Tokenization (${tokens.length} tokens):</strong>
        <div class="tag-container">${tokens.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="result-item">
        <strong>Stemming:</strong>
        <div class="tag-container">${stemmed.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="result-item">
        <strong>Lemmatization:</strong>
        <div class="tag-container">${lemmatized.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
      <div class="result-item">
        <strong>Word Statistics:</strong>
        <div class="feature-grid">
          <div class="feature-item">Unique: ${new Set(tokens).size}</div>
          <div class="feature-item">Avg Length: ${(tokens.reduce((s,w)=>s+w.length,0)/tokens.length).toFixed(1)}</div>
        </div>
      </div>
    `;

    document.getElementById('m2-advanced-loading').style.display = 'none';
    const res = document.getElementById('m2-advanced-results');
    res.innerHTML = html;
    res.style.display = 'block';
  }, 1200);
}

// simple lemmatizer stub — extend rules as needed
function lemmatizeWord(word) {
  const irregulars = {
    'went':'go','gone':'go','better':'good','best':'good',
    'children':'child','mice':'mouse','geese':'goose'
  };
  if (irregulars[word]) return irregulars[word];
  // regular plural
  if (word.endsWith('ies')) return word.slice(0,-3)+'y';
  if (word.endsWith('s') && word.length>2) return word.slice(0,-1);
  return word;
}

function runRegexUnknownDemo() {
  const patternInput = document.getElementById('regex-pattern').value.trim();
  const testText = document.getElementById('regex-text').value.trim();
  const knownWordsInput = document.getElementById('known-words').value.trim();
  const unknownText = document.getElementById('unknown-text').value.trim();

  if (!patternInput && !unknownText) {
    alert('Please enter a regex pattern/test text OR a sentence for unknown words.');
    return;
  }

  document.getElementById('regex-unknown-loading').style.display = 'block';
  document.getElementById('regex-unknown-results').style.display = 'none';

  setTimeout(() => {
    let html = '<h3>🔍 Results</h3>';

    // --- Regex matching ---
    if (patternInput && testText) {
      try {
        const regex = new RegExp(patternInput, 'g');
        const matches = testText.match(regex) || [];
        const highlighted = testText.replace(regex, m => `<span class="tag">${m}</span>`);

        html += `
          <div class="result-item">
            <strong>Regex Pattern:</strong> <code>${patternInput}</code>
          </div>
          <div class="result-item">
            <strong>Matches (${matches.length}):</strong>
            <div class="tag-container">${matches.map(m=>`<span class="tag">${m}</span>`).join('') || '<p>No matches found.</p>'}</div>
            <p style="margin-top:10px;">Highlighted text:</p>
            <div style="background:#f8f9fa;padding:10px;border-radius:5px;">${highlighted}</div>
          </div>
        `;
      } catch (e) {
        html += `<div class="result-item"><strong style="color:red;">Invalid regex pattern</strong></div>`;
      }
    }

    // --- Unknown word detection ---
    if (unknownText) {
      const known = knownWordsInput.split(',').map(w => w.trim().toLowerCase()).filter(Boolean);
      const tokens = tokenize(unknownText); // reuse your tokenize() helper
      const unknowns = tokens.filter(t => !known.includes(t));

      html += `
        <div class="result-item">
          <strong>Unknown Words (OOV):</strong>
          <div class="tag-container">${unknowns.map(u=>`<span class="tag" style="background:#dc3545">${u}</span>`).join('') || '<p>No unknown words found.</p>'}</div>
        </div>
        <div class="result-item">
          <strong>Known Words Detected:</strong>
          <div class="tag-container">${tokens.filter(t=>known.includes(t)).map(k=>`<span class="tag" style="background:#28a745">${k}</span>`).join('') || '<p>No known words detected.</p>'}</div>
        </div>
      `;
    }

    document.getElementById('regex-unknown-loading').style.display = 'none';
    const res = document.getElementById('regex-unknown-results');
    res.innerHTML = html;
    res.style.display = 'block';
  }, 1000);
}

// --- Morphology demo JS ---

function runMorphologyDemo() {
  const input = (document.getElementById('morph-input').value || '').trim();
  const knownInput = (document.getElementById('morph-known').value || '').trim();
  if (!input) { alert('Please enter a word or sentence to analyze.'); return; }

  document.getElementById('morph-loading').style.display = 'block';
  document.getElementById('morph-results').style.display = 'none';

  setTimeout(() => {
    // Use existing tokenize() if available, else fallback
    const tokens = (typeof tokenize === 'function') ? tokenize(input) : input.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(Boolean);
    const knownLemmas = knownInput ? knownInput.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean) : [];

    // Small dictionary for lookup (extend as needed)
    const dict = {
      'child': { lemma: 'child', pos: 'NOUN', gloss: 'young human' },
      'play': { lemma: 'play', pos: 'VERB', gloss: 'engage in activity' },
      'happy': { lemma: 'happy', pos: 'ADJ', gloss: 'feeling pleasure' },
      'modern': { lemma: 'modern', pos: 'ADJ', gloss: 'contemporary' },
      'run': { lemma: 'run', pos: 'VERB', gloss: 'move fast' },
      'dog': { lemma: 'dog', pos: 'NOUN', gloss: 'canine' }
    };
    // merge user-known lemmas into dict (simple)
    knownLemmas.forEach(k => { if (!dict[k]) dict[k] = { lemma: k, pos: 'UNKNOWN', gloss: 'user-supplied' }; });

    // Finite-state morphology rules (small set, example-driven)
    // Each rule: { name, type ('inflection'|'derivation'), matchSuffix, replaceWith, features }
    const fstRules = [
      { name:'plural-s', type:'inflection', matchSuffix:'s', replaceWith:'', features:{number:'PL'} },
      { name:'plural-es', type:'inflection', matchSuffix:'es', replaceWith:'', features:{number:'PL'} },
      { name:'past-ed', type:'inflection', matchSuffix:'ed', replaceWith:'', features:{tense:'PAST'} },
      { name:'progressive-ing', type:'inflection', matchSuffix:'ing', replaceWith:'', features:{aspect:'PROG'} },
      { name:'deriv-ness', type:'derivation', matchSuffix:'ness', replaceWith:'', features:{deriv:'-ness'} },
      { name:'deriv-ize', type:'derivation', matchSuffix:'ize', replaceWith:'', features:{deriv:'-ize'} },
      { name:'deriv-ly', type:'derivation', matchSuffix:'ly', replaceWith:'', features:{deriv:'-ly'} },
      { name:'deriv-er', type:'derivation', matchSuffix:'er', replaceWith:'', features:{deriv:'-er'} }
    ];

    // Helper: attempt dictionary lookup
    function dictLookup(word) {
      return dict[word] || null;
    }

    // Helper: naive lemmatize via FST rules (try longest suffix first)
    function fstLemmatize(word) {
      // returns array of candidate analyses: {lemma, appliedRule, type, features}
      const lower = word.toLowerCase();
      const candidates = [];

      // direct dictionary match
      const d = dictLookup(lower);
      if (d) candidates.push({ lemma: d.lemma, source:'dictionary', pos: d.pos, gloss: d.gloss, rule:null, type:'lexical' });

      // try rules by descending suffix length (longest-first)
      const sorted = fstRules.slice().sort((a,b)=>b.matchSuffix.length - a.matchSuffix.length);
      for (const rule of sorted) {
        if (lower.endsWith(rule.matchSuffix) && lower.length > rule.matchSuffix.length) {
          const base = lower.slice(0, lower.length - rule.matchSuffix.length) + (rule.replaceWith || '');
          // check dictionary for base
          const baseDict = dictLookup(base);
          const analysis = {
            lemma: base,
            source: baseDict ? 'dictionary-base' : 'rule-base',
            rule: rule.name,
            type: rule.type,
            features: rule.features || {}
          };
          candidates.push(analysis);
        }
      }

      // fallback: try stripping common orthographic changes (e.g., 'ies' -> 'y')
      if (lower.endsWith('ies')) {
        const base = lower.slice(0, -3) + 'y';
        candidates.push({ lemma: base, source:'heuristic', rule:'ies->y', type:'heuristic' });
      }

      // if none, return itself as lemma (unknown)
      if (candidates.length === 0) candidates.push({ lemma: lower, source:'identity', rule:null, type:'unknown' });

      return candidates;
    }

    // Morphological parser using FST-like backtracking: attempt to decompose iteratively
    function morphologicalParse(word) {
      const parses = [];
      // breadth-first stack of (remainingForm, appliedRules)
      const queue = [{ form: word.toLowerCase(), path: [] }];
      const seen = new Set();

      while (queue.length) {
        const node = queue.shift();
        if (seen.has(node.form + '|' + JSON.stringify(node.path))) continue;
        seen.add(node.form + '|' + JSON.stringify(node.path));

        // dictionary hit -> record a parse
        const d = dictLookup(node.form);
        if (d) parses.push({ root: node.form, rootInfo: d, affixes: node.path.slice(), success:true });

        // try rules
        for (const rule of fstRules) {
          if (node.form.endsWith(rule.matchSuffix) && node.form.length > rule.matchSuffix.length) {
            const base = node.form.slice(0, node.form.length - rule.matchSuffix.length) + (rule.replaceWith || '');
            const newPath = node.path.concat([{ rule: rule.name, type: rule.type, suffix: rule.matchSuffix, features: rule.features }]);
            queue.push({ form: base, path: newPath });
          }
        }
        // orthographic -ies heuristic
        if (node.form.endsWith('ies') && node.form.length > 3) {
          const base = node.form.slice(0, -3) + 'y';
          queue.push({ form: base, path: node.path.concat([{ rule:'ies->y', type:'heuristic', suffix:'ies' }]) });
        }
      }

      // if no parse found, return fallback identity parse
      if (parses.length === 0) {
        parses.push({ root: word.toLowerCase(), rootInfo: dictLookup(word.toLowerCase()) || null, affixes: [], success:false });
      }
      return parses;
    }

    // Build HTML result for each token
    let html = `<h3>🧾 Morphology Analysis (${tokens.length} token${tokens.length>1?'s':''})</h3>`;
    tokens.forEach(tok => {
      const lemmas = fstLemmatize(tok);
      const parses = morphologicalParse(tok);

      html += `<div class="result-item"><strong>Token:</strong> <span class="morph-tag">${tok}</span>`;

      // dictionary lookup
      const d = dictLookup(tok.toLowerCase());
      html += `<div style="margin-top:8px;"><strong>Dictionary lookup:</strong> `;
      if (d) html += `<span class="tag">${d.lemma}</span> (${d.pos}) — ${d.gloss}`;
      else html += `<em>Not found in dictionary</em>`;
      html += `</div>`;

      // Lemmatizer candidates
      html += `<div style="margin-top:8px;"><strong>Lemmatizer & FST candidates:</strong><div style="margin-top:6px;">`;
      lemmas.forEach(c => {
        const cls = (c.type==='derivation') ? 'morph-deriv' : (c.type==='inflection' ? 'morph-inflect' : 'morph-tag');
        html += `<span class="${cls}" style="margin-right:8px">${c.lemma}</span> `;
        html += `<small style="color:#666">[source:${c.source}${c.rule? ', rule:'+c.rule : ''}${c.features? ', '+JSON.stringify(c.features):''}]</small><br/>`;
      });
      html += `</div></div>`;

      // Morphological parses (FST)
      html += `<div style="margin-top:8px;"><strong>FST-style parses:</strong>`;
      parses.forEach((p, idx) => {
        html += `<div style="margin-top:6px; padding:8px; background:#f8f9fa; border-radius:6px;">`;
        html += `<strong>Parse ${idx+1}:</strong> root = <code>${p.root}</code>`;
        if (p.rootInfo) html += ` (${p.rootInfo.pos || 'unknown'}${p.rootInfo.gloss? ' — '+p.rootInfo.gloss : ''})`;
        html += `<div style="margin-top:6px;"><strong>Affix sequence:</strong> `;
        if (p.affixes.length) {
          html += p.affixes.map(a => `<span class="morph-tag" style="background:#ffeaa7;color:#2d3436;margin-right:6px">${a.suffix}</span>`).join(' ');
        } else {
          html += `<em>none</em>`;
        }
        html += `</div>`;
        html += `<div style="margin-top:6px;"><strong>Success:</strong> ${p.success ? '<span style="color:green">yes</span>' : '<span style="color:#d63031">no</span>'}</div>`;
        html += `</div>`;
      });

      // classify inflectional vs derivational if we can detect an affix
      const infixes = fstRules.filter(r => tok.toLowerCase().endsWith(r.matchSuffix));
      if (infixes.length) {
        html += `<div style="margin-top:8px;"><strong>Detected affixes:</strong> `;
        html += infixes.map(r => `<span class="morph-tag ${r.type==='derivation'?'morph-deriv':'morph-inflect'}">${r.matchSuffix} (${r.type})</span>`).join(' ');
        html += `</div>`;
      }

      html += `</div>`; // end result-item
    });

    // short summary of models
    html += `<div class="result-item" style="margin-top:12px;"><strong>Morphological Models (brief):</strong>
      <ul style="margin-top:8px;">
        <li><b>Dictionary lookup:</b> directly find lemma/entry in lexicon (fast, limited coverage)</li>
        <li><b>Finite-state morphology:</b> use rewrite rules / FSTs to map between surface forms and lexical forms (efficient for concatenative morphology)</li>
        <li><b>FST Parser demo:</b> the parser above uses small rule set to simulate FST-based decomposition</li>
      </ul>
    </div>`;

    document.getElementById('morph-loading').style.display = 'none';
    const out = document.getElementById('morph-results');
    out.innerHTML = html;
    out.style.display = 'block';
  }, 700);
}

function runPorter() {
  const text = document.getElementById('porter-input').value.trim();
  if (!text) { alert('Please enter some text.'); return; }

  document.getElementById('porter-loading').style.display = 'block';
  document.getElementById('porter-output').style.display = 'none';

  setTimeout(() => {
    const tokens = text.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(Boolean);
    let html = `<h3>Stemming Results (${tokens.length} tokens)</h3>`;

    tokens.forEach(tok => {
      const stem = porterStem(tok);
      html += `<div class="porter-pair"><span class="porter-word">${tok}</span> → <span class="porter-stem">${stem}</span></div>`;
    });

    document.getElementById('porter-loading').style.display = 'none';
    const out = document.getElementById('porter-output');
    out.innerHTML = html + `<p style="margin-top:10px;font-size:12px;color:#555;">Note: Porter stemmer produces stems, not dictionary lemmas.</p>`;
    out.style.display = 'block';
  }, 300);
}

// --- complete Porter stemmer ---
function porterStem(w) {
  if (w.length < 3) return w;

  const c = '[^aeiou]', v = '[aeiouy]', C = c + '[^aeiouy]*', V = v + '[aeiou]*';
  const mgr0 = new RegExp('^(' + C + ')?' + V + C);
  const meq1 = new RegExp('^(' + C + ')?' + V + C + '(' + V + ')?$');
  const mgr1 = new RegExp('^(' + C + ')?' + V + C + V + C);
  const s_v = new RegExp(v);

  let stem, suffix, firstch, re, re2, re3, re4;
  if (w[0] == 'y') w = 'Y' + w.substr(1);

  // Step 1a
  re = /^(.+?)(ss|i)es$/; re2 = /^(.+?)([^s])s$/;
  if (re.test(w)) w = w.replace(re,'$1$2');
  else if (re2.test(w)) w = w.replace(re2,'$1$2');

  // Step 1b
  re = /^(.+?)eed$/; re2 = /^(.+?)(ed|ing)$/;
  if (re.test(w)) { var fp = re.exec(w); re = mgr0; if (re.test(fp[1])) w = w.replace(/.$/,''); }
  else if (re2.test(w)) {
    var fp = re2.exec(w); stem = fp[1];
    re = s_v; if (re.test(stem)) {
      w = stem;
      re = /(at|bl|iz)$/; re2 = new RegExp('([^aeiouylsz])\\1$'); re3 = new RegExp('^' + C + v + '[^aeiouwxy]$');
      if (re.test(w)) w = w + 'e';
      else if (re2.test(w)) w = w.replace(/.$/,'');
      else if (re3.test(w)) w = w + 'e';
    }
  }

  // Step 1c
  re = /^(.+?)y$/;
  if (re.test(w)) { var fp = re.exec(w); stem = fp[1]; re = s_v; if (re.test(stem)) w = stem + 'i'; }

  // Step 2
  re = /^(.+?)(ational|tional|enci|anci|izer|abli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
  if (re.test(w)) {
    var fp = re.exec(w); stem = fp[1]; suffix = fp[2];
    re = mgr0; if (re.test(stem)) {
      w = stem + ({
        'ational':'ate','tional':'tion','enci':'ence','anci':'ance','izer':'ize','abli':'able','alli':'al','entli':'ent','eli':'e','ousli':'ous','ization':'ize','ation':'ate','ator':'ate','alism':'al','iveness':'ive','fulness':'ful','ousness':'ous','aliti':'al','iviti':'ive','biliti':'ble','logi':'log'
      })[suffix];
    }
  }

  // Step 3
  re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
  if (re.test(w)) {
    var fp = re.exec(w); stem = fp[1]; suffix = fp[2];
    re = mgr0; if (re.test(stem)) {
      w = stem + ({
        'icate':'ic','ative':'','alize':'al','iciti':'ic','ical':'ic','ful':'','ness':''
      })[suffix];
    }
  }

  // Step 4
  re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ion|ou|ism|ate|iti|ous|ive|ize)$/;
  re2 = /^(.+?)(s|t)(ion)$/;
  if (re2.test(w)) {
    var fp = re2.exec(w); stem = fp[1]+fp[2]; re = mgr1; if (re.test(stem)) w = stem;
  } else if (re.test(w)) {
    var fp = re.exec(w); stem = fp[1]; re = mgr1; if (re.test(stem)) w = stem;
  }

  // Step 5a
  re = /^(.+?)e$/;
  if (re.test(w)) {
    var fp = re.exec(w); stem = fp[1]; re = mgr1; re2 = meq1;
    if (re.test(stem) || (re2.test(stem) && !(new RegExp('^' + C + v + '[^aeiouwxy]$').test(stem)))) w = stem;
  }

  // Step 5b
  re = /ll$/; re2 = mgr1;
  if (re.test(w) && re2.test(w)) w = w.replace(/.$/,'');

  if (w[0] == 'Y') w = 'y' + w.substr(1);

  return w;
}

function runNgramDemo() {
  const trainText = document.getElementById('ngram-training').value.trim();
  const testText = document.getElementById('ngram-test').value.trim();
  const n = parseInt(document.getElementById('ngram-n').value, 10);

  if (!trainText || !testText) {
    alert('Please enter both training text and a test sentence.');
    return;
  }

  document.getElementById('ngram-loading').style.display = 'block';
  document.getElementById('ngram-results').style.display = 'none';

  setTimeout(() => {
    const trainTokens = tokenizeText(trainText); // helper below
    const testTokens = tokenizeText(testText);

    const model = buildNgramModel(trainTokens, n);
    const evalResult = evaluateSentence(model, testTokens, n);

    let html = `<h3>Results for ${n}-gram Model</h3>`;

    html += `<div class="result-item"><strong>Sentence Probability:</strong> ${evalResult.prob.toExponential(4)}</div>`;
    html += `<div class="result-item"><strong>Perplexity:</strong> <span class="perplexity-badge">${evalResult.perplexity.toFixed(3)}</span></div>`;

    html += `<div class="result-item"><strong>Top ${n}-grams from Training Corpus:</strong>`;
    html += `<table class="ngram-table"><thead><tr><th>${n}-gram</th><th>Count</th></tr></thead><tbody>`;
    const topNgrams = Object.entries(model.counts)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,20);
    topNgrams.forEach(([gram,count])=>{
      html += `<tr><td>${gram}</td><td>${count}</td></tr>`;
    });
    html += `</tbody></table></div>`;

    html += `<div class="result-item" style="margin-top:10px;"><strong>Note:</strong> This is an <em>unsmoothed</em> model. Any unseen ${n}-gram gets probability 0, which leads to infinite perplexity. This illustrates N-gram sensitivity to training data.</div>`;

    document.getElementById('ngram-loading').style.display = 'none';
    const out = document.getElementById('ngram-results');
    out.innerHTML = html;
    out.style.display = 'block';
  }, 500);
}

// helper: simple tokenizer
function tokenizeText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g,'').split(/\s+/).filter(Boolean);
}

// build unsmoothed n-gram model
function buildNgramModel(tokens, n) {
  const counts = {};
  const prefixCounts = {}; // counts of n-1 prefix for probability denominator

  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i+n).join(' ');
    counts[gram] = (counts[gram] || 0) + 1;

    if (n > 1) {
      const prefix = tokens.slice(i, i+n-1).join(' ');
      prefixCounts[prefix] = (prefixCounts[prefix] || 0) + 1;
    }
  }

  return { counts, prefixCounts, total: tokens.length };
}

// evaluate sentence probability and perplexity
function evaluateSentence(model, tokens, n) {
  let prob = 1;
  let countGrams = 0;

  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i,i+n).join(' ');
    let p;
    if (n === 1) {
      const c = model.counts[gram] || 0;
      p = c / model.total;
    } else {
      const prefix = tokens.slice(i,i+n-1).join(' ');
      const c = model.counts[gram] || 0;
      const denom = model.prefixCounts[prefix] || 0;
      p = denom > 0 ? c/denom : 0;
    }

    if (p === 0) {
      prob = 0;
      break;
    } else {
      prob *= p;
    }
    countGrams++;
  }

  const perplexity = prob > 0 && countGrams>0 ? Math.pow(1/prob, 1/countGrams) : Infinity;
  return { prob, perplexity };
}

// PPT-style Smoothing Demo (unsmoothed/MLE, Laplace, Good-Turing global GT)
function runPptSmoothingDemo() {
  const rawTrain = document.getElementById('ppt-train').value.trim();
  const rawTest = document.getElementById('ppt-test').value.trim();
  const n = parseInt(document.getElementById('ppt-n').value, 10);

  if (!rawTrain || !rawTest) { alert('Please provide both training corpus and test sentence.'); return; }
  document.getElementById('ppt-loading').style.display = 'block';
  document.getElementById('ppt-results').style.display = 'none';

  setTimeout(() => {
    const trainTokens = (typeof tokenize === 'function') ? tokenize(rawTrain) : rawTrain.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(Boolean);
    const testTokens = (typeof tokenize === 'function') ? tokenize(rawTest) : rawTest.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(Boolean);

    // Build global ngram counts (strings joined by space)
    const trainNgrams = generateNgrams(trainTokens, n);
    const counts = {};
    trainNgrams.forEach(g => counts[g] = (counts[g]||0) + 1);
    const totalNgrams = trainNgrams.length; // N in Good-Turing slides
    const vocab = new Set(trainTokens);
    const V = vocab.size;

    // All possible n-gram types (theoretical) = V^n
    const totalPossibleTypes = Math.pow(Math.max(1,V), n);
    const observedTypes = Object.keys(counts).length;
    const unseenTypes = Math.max(0, totalPossibleTypes - observedTypes);

    // counts-of-counts Nc
    const countsOfCounts = {};
    Object.values(counts).forEach(c => countsOfCounts[c] = (countsOfCounts[c]||0)+1);
    const N1 = countsOfCounts[1] || 0;

    // Precompute Good-Turing c* when possible
    const cstar = {}; // for observed counts
    Object.keys(counts).forEach(g => {
      const c = counts[g];
      const Nc = countsOfCounts[c] || 0;
      const Nc1 = countsOfCounts[c+1] || 0;
      if (Nc > 0 && Nc1 > 0) {
        cstar[g] = ( (c + 1) * Nc1 ) / Nc; // c* = (c+1) * N_{c+1} / N_c
      } else {
        cstar[g] = null; // not computable reliably; will fallback
      }
    });

    // build test ngrams (sliding)
    const testNgrams = generateNgrams(testTokens, n);

    // Evaluate MLE, Laplace, Good-Turing (global GT) step-by-step traces
    const mleTrace = evaluateStepwise(testNgrams, counts, totalNgrams, V, {method:'mle', countsOfCounts, totalPossibleTypes, unseenTypes, N1});
    const laplaceTrace = evaluateStepwise(testNgrams, counts, totalNgrams, V, {method:'laplace'});
    const gtTrace = evaluateStepwise(testNgrams, counts, totalNgrams, V, {method:'goodturing', countsOfCounts, unseenTypes, N1});

    // Render HTML
    let html = `<h3>Results (n=${n})</h3>`;
    html += `<div class="result-item"><strong>Training stats:</strong> total n-grams N = ${totalNgrams}, observed types = ${observedTypes}, V = ${V}, total possible types = ${totalPossibleTypes}</div>`;
    html += `<div class="result-item ppt-step"><strong>Counts-of-counts (Nc):</strong> <span class="ppt-code">${JSON.stringify(countsOfCounts)}</span> (N1 = ${N1})</div>`;

    html += `<div class="result-item ppt-step"><h4>1) Uns moothed (MLE) — step-by-step</h4>${renderTraceHtml(mleTrace)}</div>`;
    html += `<div class="result-item ppt-step"><h4>2) Laplace (Add-1) — step-by-step</h4>${renderTraceHtml(laplaceTrace)}</div>`;
    html += `<div class="result-item ppt-step"><h4>3) Good-Turing (global) — step-by-step</h4>${renderTraceHtml(gtTrace)}</div>`;

    html += `<div class="result-item" style="margin-top:10px;"><strong>Notes :</strong> Laplace = add 1 to all counts and divide by N + V (for unigrams) or C(prefix)+V (for conditionals). Good-Turing redistributes mass of singletons; unseen events get mass proportional to N1/N.</div>`;

    document.getElementById('ppt-loading').style.display = 'none';
    const out = document.getElementById('ppt-results');
    out.innerHTML = html;
    out.style.display = 'block';
  }, 350);
}

// --- helpers ---

function generateNgrams(tokens, n) {
  const grams = [];
  if (tokens.length < n) return grams;
  for (let i = 0; i <= tokens.length - n; i++) grams.push(tokens.slice(i, i+n).join(' '));
  return grams;
}

// Evaluate with full step trace; method = 'mle' | 'laplace' | 'goodturing'
function evaluateStepwise(testNgrams, counts, totalNgrams, V, opts) {
  const traces = [];
  let logProb = 0;
  let zeroFound = false;
  const method = opts.method;

  // For Laplace we use add-1 on counts and denom = N + V (for unigrams) or (for conditional we'd use prefix denom - here we are doing global n-gram MLE as slide examples)
  // For Good-Turing we use global Nc: unseen mass p0 = N1 / N and c* = (c+1) * Nc+1 / Nc

  const countsOfCounts = opts.countsOfCounts || {};
  const N1 = opts.N1 || 0;
  const unseenTypes = (typeof opts.unseenTypes !== 'undefined') ? opts.unseenTypes : 0;

  testNgrams.forEach(ng => {
    const c = counts[ng] || 0;
    const step = { ngram: ng, c, steps: [] };
    if (method === 'mle') {
      // MLE: p = c / N
      step.steps.push(`MLE: P(${ng}) = C(${ng}) / N`);
      step.steps.push(`Counts: C = ${c}, N = ${totalNgrams}`);
      const p = totalNgrams > 0 ? (c / totalNgrams) : 0;
      step.steps.push(`=> P = ${p}`);
      step.p = p;
      if (p === 0) zeroFound = true; else logProb += Math.log(p);
    } else if (method === 'laplace') {
      // Laplace add-1 global: p = (c+1) / (N + V^n)
      const totalPossibleTypes = Math.max(1, Math.pow(V, ng.split(' ').length));
      const denom = totalNgrams + totalPossibleTypes;
      step.steps.push(`Laplace (Add-1) global: P = (C + 1) / (N + V^n)`);
      step.steps.push(`C=${c}, N=${totalNgrams}, V^n=${totalPossibleTypes} -> denom=${denom}`);
      const p = denom>0 ? (c + 1) / denom : 0;
      step.steps.push(`=> P = (${c}+1)/${denom} = ${p}`);
      step.p = p;
      logProb += Math.log(p);
    } else if (method === 'goodturing') {
      step.steps.push(`Good-Turing global: use counts-of-counts Nc`);
      step.steps.push(`Observed count C=${c}, N1=${N1}, N (total ngrams)=${totalNgrams}`);
      if (c > 0) {
        const Nc = countsOfCounts[c] || 0;
        const Nc1 = countsOfCounts[c+1] || 0;
        step.steps.push(`Nc = N_${c} = ${Nc}, N_{c+1} = ${Nc1}`);
        if (Nc > 0 && Nc1 > 0) {
          const cstar = ((c + 1) * Nc1) / Nc;
          const p = cstar / totalNgrams;
          step.steps.push(`c* = (c+1)*N_{c+1}/N_c = (${c+1})*${Nc1}/${Nc} = ${round(cstar,6)}`);
          step.steps.push(`P = c* / N = ${round(cstar,6)} / ${totalNgrams} = ${round(p,8)}`);
          step.p = p; logProb += Math.log(p);
        } else {
          // fallback to raw MLE if we cannot compute c*
          const p = c / totalNgrams;
          step.steps.push(`Nc or N_{c+1} missing; fallback to MLE: P = C/N = ${c}/${totalNgrams} = ${round(p,8)}`);
          step.p = p;
          if (p === 0) zeroFound = true; else logProb += Math.log(p);
        }
      } else {
        // unseen ngram: allocate mass p0 = N1 / N, divide by unseenTypes
        step.steps.push(`Unseen n-gram (c=0). Good-Turing gives total unseen mass p0 = N1/N = ${N1}/${totalNgrams}`);
        const p0_total = totalNgrams > 0 ? (N1 / totalNgrams) : 0;
        if (unseenTypes > 0) {
          const p_each = p0_total / unseenTypes;
          step.steps.push(`Unseen types = ${unseenTypes}. Distribute p0 equally -> p_each = ${round(p_each,10)}`);
          step.p = p_each;
          logProb += Math.log(p_each);
        } else {
          step.steps.push(`No unseen types (or V^n == observed types). Fallback to tiny mass 1/N_total.`);
          const p = 1 / Math.max(1,totalNgrams);
          step.p = p;
          logProb += Math.log(p);
        }
      }
    }
    traces.push(step);
  });

  const M = testNgrams.length;
  const perplexity = (zeroFound || M === 0) ? Infinity : Math.exp(- (logProb / M));
  return { method, traces, logProb, M, perplexity };
}

function renderTraceHtml(evalObj) {
  let html = `<div class="ppt-small"><strong>Method:</strong> ${evalObj.method}</div>`;
  evalObj.traces.forEach((t, i) => {
    html += `<div style="margin-top:8px;padding:10px;border-radius:6px;background:#fff">`;
    html += `<div><strong>n-gram ${i+1}:</strong> <span class="ppt-code">${t.ngram}</span></div>`;
    html += `<div style="margin-top:6px;">`;
    t.steps.forEach(s => html += `<div>• ${escapeHtml(s)}</div>`);
    html += `</div>`;
    html += `<div style="margin-top:8px;"><strong>Probability:</strong> ${typeof t.p === 'number' ? (t.p === 0 ? '0' : t.p.toExponential ? t.p.toExponential(6) : t.p) : '—'}</div>`;
    html += `</div>`;
  });
  html += `<div style="margin-top:10px;"><strong>Sentence log-prob sum:</strong> ${evalObj.logProb.toFixed(6)}</div>`;
  html += `<div style="margin-top:6px;"><strong>M (# n-grams):</strong> ${evalObj.M}</div>`;
  html += `<div style="margin-top:6px;"><strong>Perplexity:</strong> ${evalObj.perplexity === Infinity ? '∞ (zero prob encountered)' : evalObj.perplexity.toFixed(6)}</div>`;
  return html;
}

function round(x, d=6){ return Number.parseFloat(x).toFixed(d); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

// Hover Definitions - data, UI generation and event handlers

// 1) Data for every required term: definition, example, and an inline SVG diagram string
const hoverDefinitions = {
  // Module 2: Tokenization, Stemming, Lemmatization
  "Tokenization": {
    title: "Tokenization",
    definition: "Splitting raw text into atomic units (tokens) such as words, punctuation, or subwords. It's the first step in most NLP pipelines.",
    example: `Input: "The children were playing." → Tokens: ["The", "children", "were", "playing", "."]`,
    svg: tokenizationSvg()
  },
  "Stemming": {
    title: "Stemming",
    definition: "Rule-based process that chops word endings to produce a crude root (stem). Not dictionary-based; may produce non-words.",
    example: `playing → play, happily → happili, modernized → modern`,
    svg: stemmingSvg()
  },
  "Lemmatization": {
    title: "Lemmatization",
    definition: "Dictionary-aware mapping of words to their lemma (dictionary headword) considering POS and morphology. Produces real lemmas.",
    example: `children → child, was → be, running → run`,
    svg: lemmatizationSvg()
  },

  // Regex and Unknown words
  "Regular Expressions": {
    title: "Regular Expressions (types)",
    definition: "Pattern language to match text. Building blocks include literals, character classes, quantifiers, anchors, groups/alternation and lookarounds.",
    example: `Pattern: \\b[A-Z][a-z]+\\b matches 'John' in 'John went home'.`,
    svg: regexSvg()
  },
  "Unknown Words (Open vs Closed Vocabulary)": {
    title: "Unknown Words — Open vs Closed Vocabulary",
    definition: "Closed vocabulary: model has fixed lexicon; unseen words mapped to <UNK>. Open vocabulary: uses subword/char models or copy mechanisms so unseen words can be handled.",
    example: `Closed: 'Tejashiri' → <UNK>. Open (subword): 'Te|jash|iri' can be handled via subword tokens.`,
    svg: unknownWordsSvg()
  },

  // Morphology
  "Survey of English Morphology": {
    title: "Survey of English Morphology",
    definition: "The study of word formation and internal structure. English uses affixation, compounding and conversion as common morphological processes.",
    example: `happy → happiness (derivation); cat → cats (inflection)`,
    svg: morphologySurveySvg()
  },
  "Inflectional Morphology": {
    title: "Inflectional Morphology",
    definition: "Adds grammatical information to a word without changing its core meaning or category (tense, number, person).",
    example: `talk → talks (3rd person), walk → walked (past tense)`,
    svg: inflectionSvg()
  },
  "Derivational Morphology": {
    title: "Derivational Morphology",
    definition: "Creates new words by adding affixes that change the word's meaning and often its POS (part of speech).",
    example: `happy (adj) → happiness (noun); modern (adj) → modernize (verb)`,
    svg: derivationalSvg()
  },
  "Dictionary lookup": {
    title: "Morphological model: Dictionary lookup",
    definition: "Find a word's lemma and morphological features by searching a lexicon (fast, precise but limited coverage).",
    example: `Lookup 'ran' → lemma: 'run', POS: VERB, features: {tense:past}`,
    svg: dictLookupSvg()
  },
  "Finite State Morphology": {
    title: "Finite-state Morphology",
    definition: "Uses finite-state automata/transducers (FSA/FST) to model surface ↔ lexical form mappings efficiently — ideal for concatenative morphologies.",
    example: `play + ed → played via suffix rule; FST maps 'played' -> 'play' + 'PAST'`,
    svg: fstSvg()
  },
  "Morphological parsing with FST": {
    title: "Morphological parsing with FST",
    definition: "Transducers take a surface form and produce a sequence of lexemes + morphological tags by traversing states and generating output strings.",
    example: `Input: "modernized" → FST parse: modern + ize (DERIV) + ed (PAST)`,
    svg: fstParsingSvg()
  },

  // Porter Stemmer
  "Lexicon-free FST Porter Stemmer algorithm": {
    title: "Porter Stemmer (lexicon-free)",
    definition: "A rule-based multi-step suffix-stripping stemmer (Porter 1980). It applies ordered rewrite rules to produce stems without a lexicon.",
    example: `happily → happili, playing → play`,
    svg: porterSvg()
  },

  // N-grams & Perplexity
  "Evaluating N-grams: Perplexity": {
    title: "Perplexity (evaluating N-grams)",
    definition: "Perplexity measures how well a probability model predicts a sample, computed as the exponentiated negative average log-probability of the test set.",
    example: `Perplexity = exp(- (1/M) Σ log P(w_i | context)) — lower is better.`,
    svg: perplexitySvg()
  },
  "Grams and its variation": {
    title: "N-gram variations (Bigram, Trigram)",
    definition: "N-grams model local context: unigram (single words), bigram (pairs), trigram (triplets). Higher n captures more context but needs more data.",
    example: `Bigram sequence for 'I love NLP': ['I love', 'love NLP']`,
    svg: ngramSvg()
  },
  "Simple (Unsmoothed) N-grams": {
    title: "Simple (Unsmoothed) N-grams",
    definition: "Maximum-likelihood estimates: P(w|context) = count(context,w)/count(context). Unseen events get zero probability.",
    example: `If bigram 'on moon' unseen in training → P = 0`,
    svg: unsmoothedSvg()
  },
  "N-gram Sensitivity to the Training Corpus": {
    title: "N-gram Sensitivity to the Training Corpus",
    definition: "N-gram models depend heavily on training data: rare contexts cause many zero-probability events; domain mismatch reduces performance.",
    example: `Model trained on news may fail on tweets (slang, hashtags).`,
    svg: sensitivitySvg()
  },

  // Smoothing
  "Laplace Smoothing": {
    title: "Laplace Smoothing (Add-1)",
    definition: "Add-1 smoothing adds one to every count: P = (C + 1) / (N + V). Prevents zeros but biases probabilities for frequent tokens.",
    example: `If C('the cat')=0, P = (0+1)/(N + V)`,
    svg: laplaceSvg()
  },
  "Good-Turing Discounting": {
    title: "Good-Turing Discounting",
    definition: "Estimates adjusted counts c* = (c+1) * N_{c+1} / N_c and redistributes mass from seen to unseen events; needs counts-of-counts Nc.",
    example: `If singletons N1=10 and N2=5, adjust c=1 → c* = 2 * N2 / N1 = 2 * 5 / 10 = 1`,
    svg: goodTuringSvg()
  }
};

// 2) UI generation: place one button for each term
// 2) UI generation: place one button for each term
const container = document.getElementById('hover-buttons');

// list the terms you want to **exclude**
const excluded = [
  "Regular Expressions",
  "Unknown Words (Open vs Closed Vocabulary)",
  "N-gram Sensitivity to the Training Corpus",
  "Grams and its variation"
];

// then build only allowed buttons
Object.keys(hoverDefinitions)
  .filter(key => !excluded.includes(key))
  .forEach(key => {
    const wrapper = document.createElement('div');
    wrapper.className = 'def-item';

    const label = document.createElement('div');
    label.style.fontWeight = '600';
    label.textContent = key;

    const btn = document.createElement('button');
    btn.className = 'view-btn';
    btn.textContent = 'View';
    btn.setAttribute('aria-label', `View definition for ${key}`);
    btn.dataset.term = key;

    btn.addEventListener('mouseenter', onHoverShow);
    btn.addEventListener('mouseleave', onHoverHide);
    btn.addEventListener('focus', onHoverShow);
    btn.addEventListener('blur', onHoverHide);

    wrapper.appendChild(label);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  });


// panel elements
const panel = document.getElementById('hover-panel');
const backdrop = document.getElementById('hover-panel-backdrop');

// show panel on hover/focus
function onHoverShow(e) {
  const term = e.currentTarget.dataset.term;
  showPanelFor(term);
}

// hide on leave (with small delay to allow moving into panel)
let hideTimer = null;
function onHoverHide(e) {
  // if leaving to the panel itself, do not close immediately
  hideTimer = setTimeout(() => hidePanel(), 180);
}

// show content for a term in the panel
function showPanelFor(term) {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  const data = hoverDefinitions[term];
  if (!data) return;

  // build HTML
  const html = `
    <button class="hpanel-close" aria-label="Close">✕</button>
    <h4>${escapeHtml(data.title)}</h4>
    <div class="hpanel-section"><strong>Definition</strong>
      <div class="hpanel-example" style="margin-top:8px;">${escapeHtml(data.definition)}</div>
    </div>
    <div class="hpanel-section"><strong>Example</strong>
      <div class="hpanel-example" style="margin-top:8px;">${escapeHtml(data.example)}</div>
    </div>
    <div class="hpanel-section"><strong>Diagram</strong>
      <div class="hpanel-diagram">${data.svg}</div>
    </div>
    <div style="margin-top:12px; font-size:13px; color:#444;">Tip: hover other buttons to quickly switch panels. Press Esc or the close button to dismiss.</div>
  `;

  panel.innerHTML = html;
  // open
  backdrop.style.display = 'block';
  panel.style.display = 'block';
  panel.setAttribute('aria-hidden','false');

  // close handlers
  document.querySelector('.hpanel-close').addEventListener('click', hidePanel);
  backdrop.onclick = hidePanel;
  // hide on Escape
  document.addEventListener('keydown', escHandler);

  // keep panel open while mouse moves over it
  panel.addEventListener('mouseenter', () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } });
  panel.addEventListener('mouseleave', () => { hideTimer = setTimeout(() => hidePanel(), 160); });
}

// hide panel
function hidePanel() {
  panel.style.display = 'none';
  backdrop.style.display = 'none';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML = '';
  document.removeEventListener('keydown', escHandler);
}
function escHandler(e) { if (e.key === 'Escape') hidePanel(); }

// small html escape to avoid injection
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

/* ---------------------------
   SVG diagram generators
   (kept as small functions returning inline SVG markup)
   --------------------------- */

function tokenizationSvg(){
  return `
  <svg width="420" height="90" viewBox="0 0 420 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="6" width="408" height="78" rx="8" fill="#fff" stroke="#e6eefc"/>
    <text x="18" y="30" font-family="Segoe UI, Arial" font-size="14" fill="#333">Input:</text>
    <rect x="70" y="12" width="320" height="28" rx="6" fill="#f1f6ff"/>
    <text x="82" y="32" font-family="Segoe UI, Arial" font-size="13" fill="#0b2b4a">The children were playing.</text>

    <!-- tokens -->
    <g transform="translate(18,54)">
      <rect x="0" y="0" width="70" height="26" rx="6" fill="#667eea"/><text x="8" y="18" font-family="Segoe UI" font-size="13" fill="#fff">The</text>
      <rect x="82" y="0" width="110" height="26" rx="6" fill="#764ba2"/><text x="92" y="18" font-family="Segoe UI" font-size="13" fill="#fff">children</text>
      <rect x="206" y="0" width="70" height="26" rx="6" fill="#20c997"/><text x="210" y="18" font-family="Segoe UI" font-size="13" fill="#0b2b4a">were</text>
      <rect x="288" y="0" width="78" height="26" rx="6" fill="#ffb86b"/><text x="298" y="18" font-family="Segoe UI" font-size="13" fill="#2d3436">playing</text>
    </g>
  </svg>`;
}

function stemmingSvg(){
  return `
  <svg width="420" height="110" viewBox="0 0 420 110" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="20" font-family="Segoe UI" font-size="14" fill="#333">Stemming (suffix stripping)</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="150" height="32" rx="6" fill="#74b9ff"/><text x="8" y="22" font-family="Segoe UI" font-size="13" fill="#06223a">playing</text>
      <path d="M170 16 h40" stroke="#667eea" stroke-width="3" stroke-linecap="round"/>
      <polygon points="214,12 228,16 214,20" fill="#667eea"/>
      <rect x="240" y="0" width="120" height="32" rx="6" fill="#ffeaa7"/><text x="252" y="22" font-family="Segoe UI" font-size="13" fill="#2d3436">play</text>
      <text x="12" y="68" font-family="Segoe UI" font-size="12" fill="#666">Porter-like rules remove suffixes such as -ing, -ed, -s.</text>
    </g>
  </svg>`;
}

function lemmatizationSvg(){
  return `
  <svg width="420" height="120" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Lemmatization (dictionary + POS aware)</text>
    <g transform="translate(12,28)">
      <rect x="0" y="0" width="110" height="30" rx="6" fill="#ffd6e0"/><text x="8" y="20" font-family="Segoe UI" font-size="13" fill="#6c2a3e">children</text>
      <path d="M130 15 h48" stroke="#764ba2" stroke-width="3" stroke-linecap="round"/>
      <polygon points="178,11 193,15 178,19" fill="#764ba2"/>
      <rect x="200" y="0" width="100" height="30" rx="6" fill="#dff0d8"/><text x="210" y="20" font-family="Segoe UI" font-size="13" fill="#173f2f">child</text>

      <text x="8" y="62" font-family="Segoe UI" font-size="12" fill="#444">Lemmatizer consults lexicon & POS: 'children' (NOUN) → 'child'.</text>
    </g>
  </svg>`;
}

function regexSvg(){
  return `
  <svg width="420" height="160" viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Regex building blocks</text>

    <g transform="translate(12,34)">
      <rect x="0" y="0" width="120" height="28" rx="6" fill="#fef3c7"/><text x="8" y="19" font-family="Segoe UI" font-size="12">Literals: cat</text>
      <rect x="140" y="0" width="140" height="28" rx="6" fill="#e8f3ff"><text x="148" y="19" font-family="Segoe UI" font-size="12">Character class: [A-Z]</text>
      </rect>
      <rect x="0" y="46" width="170" height="28" rx="6" fill="#ffd6e0"><text x="8" y="66" font-family="Segoe UI" font-size="12">Quantifiers: \d+  (one/more)</text></rect>
      <rect x="190" y="46" width="180" height="28" rx="6" fill="#dff0d8"><text x="198" y="66" font-family="Segoe UI" font-size="12">Anchors: ^ and $</text></rect>

      <text x="8" y="110" font-family="Segoe UI" font-size="12" fill="#444">Example pattern <tspan font-family="monospace">\\b[A-Z][a-z]+\\b</tspan> matches capitalized words.</text>
    </g>
  </svg>`;
}

function unknownWordsSvg(){
  return `
  <svg width="420" height="150" viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Open vs Closed Vocabulary</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="190" height="38" rx="8" fill="#f1f6ff" stroke="#667eea"/>
      <text x="12" y="24" font-family="Segoe UI" font-size="13">Closed Vocab (fixed dictionary)</text>
      <text x="12" y="44" font-family="Segoe UI" font-size="12" fill="#666">Unseen → &lt;UNK&gt;</text>

      <rect x="220" y="0" width="190" height="38" rx="8" fill="#fff3e0" stroke="#ffb86b"/>
      <text x="232" y="24" font-family="Segoe UI" font-size="13">Open Vocab (subwords)</text>
      <text x="232" y="44" font-family="Segoe UI" font-size="12" fill="#666">Byte-Pair / WordPiece / char-level</text>

      <text x="12" y="96" font-family="Segoe UI" font-size="12" fill="#444">Example: 'Tejashiri' — closed → &lt;UNK&gt;, open → 'Te|jash|iri' (handled).</text>
    </g>
  </svg>`;
}

function morphologySurveySvg(){
  return `
  <svg width="420" height="140" viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">English Morphology (overview)</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="170" height="30" rx="6" fill="#e0f7fa"/><text x="8" y="20" font-family="Segoe UI" font-size="12">Inflection</text>
      <rect x="190" y="0" width="200" height="30" rx="6" fill="#fce4ec"/><text x="198" y="20" font-family="Segoe UI" font-size="12">Derivation</text>

      <text x="8" y="70" font-family="Segoe UI" font-size="12" fill="#444">Inflection: cat → cats (number). Derivation: happy → happiness (new word).</text>
      <text x="8" y="92" font-family="Segoe UI" font-size="12" fill="#444">Processes: affixation, compounding, conversion, suppletion.</text>
    </g>
  </svg>`;
}

function inflectionSvg(){
  return `
  <svg width="420" height="110" viewBox="0 0 420 110" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Inflectional example</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="110" height="30" rx="6" fill="#dff0d8"/><text x="8" y="20" font-family="Segoe UI" font-size="13">walk</text>
      <rect x="140" y="0" width="120" height="30" rx="6" fill="#dff0d8"/><text x="150" y="20" font-family="Segoe UI" font-size="13">walked (PAST)</text>
      <text x="8" y="60" font-family="Segoe UI" font-size="12" fill="#444">Inflection preserves POS; only changes grammatical features.</text>
    </g>
  </svg>`;
}

function derivationalSvg(){
  return `
  <svg width="420" height="120" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Derivational example</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="110" height="30" rx="6" fill="#ffd6e0"/><text x="8" y="20" font-family="Segoe UI" font-size="13">happy (ADJ)</text>
      <rect x="140" y="0" width="140" height="30" rx="6" fill="#ffeaa7"/><text x="150" y="20" font-family="Segoe UI" font-size="13">happiness (NOUN)</text>
      <text x="8" y="64" font-family="Segoe UI" font-size="12" fill="#444">Derivation can change POS and core meaning.</text>
    </g>
  </svg>`;
}

function dictLookupSvg(){
  return `
  <svg width="420" height="120" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Dictionary lookup</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="280" height="40" rx="6" fill="#fff3e0" stroke="#ffb86b"/><text x="10" y="26" font-family="Segoe UI" font-size="13">Lookup 'ran' → lemma: 'run' | POS: VERB | features: {tense: past}</text>
      <rect x="0" y="56" width="160" height="28" rx="6" fill="#f1f6ff"/><text x="10" y="76" font-family="Segoe UI" font-size="12">Fast & accurate, limited by lexicon coverage.</text>
    </g>
  </svg>`;
}

function fstSvg(){
  return `
  <svg width="420" height="150" viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Finite-state morphology (FST)</text>
    <g transform="translate(12,34)">
      <!-- simple FST: states and transitions -->
      <circle cx="40" cy="30" r="18" fill="#e8f3ff"/><text x="31" y="35" font-family="Segoe UI" font-size="12">q0</text>
      <circle cx="160" cy="30" r="18" fill="#fff3e0"/><text x="152" y="35" font-family="Segoe UI" font-size="12">q1</text>
      <circle cx="280" cy="30" r="18" fill="#dff0d8"/><text x="272" y="35" font-family="Segoe UI" font-size="12">q2</text>

      <path d="M58 30 C 110 30 110 30 140 30" stroke="#667eea" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
      <path d="M178 30 C 220 30 240 30 258 30" stroke="#20c997" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

      <defs><marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#667eea"></path></marker></defs>

      <text x="40" y="70" font-family="Segoe UI" font-size="12" fill="#444">Transitions: q0 -[play]-> q1 -[ed]-> q2: surface 'played' = 'play' + PAST</text>
    </g>
  </svg>`;
}

function fstParsingSvg(){
  return `
  <svg width="420" height="170" viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Morphological parsing with FST</text>
    <g transform="translate(12,36)">
      <rect x="0" y="0" width="160" height="34" rx="6" fill="#f1f6ff"/><text x="8" y="22" font-family="Segoe UI" font-size="13">Input: "modernized"</text>
      <path d="M180 18 h44" stroke="#764ba2" stroke-width="3" stroke-linecap="round"/>
      <polygon points="224,14 238,18 224,22" fill="#764ba2"/>
      <rect x="250" y="0" width="150" height="34" rx="6" fill="#fff3e0"/><text x="258" y="22" font-family="Segoe UI" font-size="13">Parse: modern + ize (DER) + ed (PAST)</text>
      <text x="8" y="66" font-family="Segoe UI" font-size="12" fill="#444">FST maps surface forms to sequences of base + affix tags by traversing transitions.</text>
    </g>
  </svg>`;
}

function porterSvg(){
  return `
  <svg width="420" height="150" viewBox="0 0 420 150" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Porter Stemmer (rules pipeline)</text>
    <g transform="translate(12,36)">
      <rect x="0" y="0" width="120" height="30" rx="6" fill="#ffd6e0"/><text x="8" y="20" font-family="Segoe UI" font-size="13">playing</text>
      <rect x="144" y="0" width="120" height="30" rx="6" fill="#ffeaa7"/><text x="154" y="20" font-family="Segoe UI" font-size="13">Step1: strip -ing</text>
      <rect x="288" y="0" width="100" height="30" rx="6" fill="#dff0d8"/><text x="300" y="20" font-family="Segoe UI" font-size="13">play</text>
      <text x="8" y="66" font-family="Segoe UI" font-size="12" fill="#444">Porter applies ordered steps (1a,1b,1c,2,3,4,5) of suffix rules.</text>
    </g>
  </svg>`;
}

function perplexitySvg(){
  return `
  <svg width="420" height="140" viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Perplexity (N-gram evaluation)</text>
    <g transform="translate(12,34)">
      <text x="0" y="18" font-family="Segoe UI" font-size="13" fill="#444">Perplexity = exp(- (1/M) Σ log P(w_i | context) )</text>
      <rect x="0" y="34" width="400" height="60" rx="8" fill="#f7fbff"><text x="10" y="60" font-family="monospace" font-size="13" fill="#0b2b4a">Example: P(sentence) = 0.001 → Perplexity = 0.001^(-1/M)</text></rect>
    </g>
  </svg>`;
}

function ngramSvg(){
  return `
  <svg width="420" height="140" viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">N-gram sliding window</text>
    <g transform="translate(12,34)">
      <rect x="0" y="0" width="360" height="28" rx="6" fill="#f1f6ff"/><text x="8" y="20" font-family="Segoe UI" font-size="13">I love natural language processing</text>
      <text x="10" y="66" font-family="Segoe UI" font-size="13" fill="#444">Bigrams: [I love], [love natural], [natural language], [language processing]</text>
    </g>
  </svg>`;
}

function unsmoothedSvg(){
  return `
  <svg width="420" height="110" viewBox="0 0 420 110" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Unsmoothed N-grams (MLE)</text>
    <g transform="translate(12,34)">
      <text x="0" y="18" font-family="Segoe UI" font-size="12" fill="#444">P(w|context) = C(context,w) / C(context)</text>
      <text x="0" y="44" font-family="Segoe UI" font-size="12" fill="#444">If C(context,w) = 0 (unseen) → P = 0 (problematic!)</text>
    </g>
  </svg>`;
}

function sensitivitySvg(){
  return `
  <svg width="420" height="140" viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Sensitivity to training corpus</text>
    <g transform="translate(12,34)">
      <text x="0" y="18" font-family="Segoe UI" font-size="12" fill="#444">Small / mismatched corpora → many unseen n-grams → poor generalisation</text>
      <rect x="0" y="40" width="180" height="28" rx="6" fill="#fff0f6"><text x="8" y="60" font-family="Segoe UI" font-size="12">News-only training</text></rect>
      <rect x="200" y="40" width="180" height="28" rx="6" fill="#f0fff4"><text x="208" y="60" font-family="Segoe UI" font-size="12">Test: tweets (slang)</text></rect>
    </g>
  </svg>`;
}

function laplaceSvg(){
  return `
  <svg width="420" height="140" viewBox="0 0 420 140" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Laplace (Add-1)</text>
    <g transform="translate(12,34)">
      <text x="0" y="18" font-family="Segoe UI" font-size="12" fill="#444">P = (C + 1) / (N + V)</text>
      <text x="0" y="42" font-family="Segoe UI" font-size="12" fill="#444">Prevents zero probs but biases small counts.</text>
    </g>
  </svg>`;
}

function goodTuringSvg(){
  return `
  <svg width="420" height="160" viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg">
    <text x="14" y="18" font-family="Segoe UI" font-size="14" fill="#333">Good-Turing Discounting</text>
    <g transform="translate(12,34)">
      <text x="0" y="18" font-family="Segoe UI" font-size="12" fill="#444">c* = (c+1) * N_{c+1} / N_c</text>
      <text x="0" y="36" font-family="Segoe UI" font-size="12" fill="#444">Unseen total mass p0 = N1 / N</text>
      <text x="0" y="64" font-family="Segoe UI" font-size="12" fill="#444">Nc = counts-of-counts table: {1:10, 2:5, 3:2}</text>
      <text x="0" y="92" font-family="Segoe UI" font-size="12" fill="#444">Adjust counts, then normalize to probabilities.</text>
    </g>
  </svg>`;
}



// Porter Stemmer widget (step-by-step trace)
// Uses a faithful Porter implementation instrumented with trace logs.

function runPorterFull() {
  const raw = document.getElementById('porter-full-input').value || '';
  if (!raw.trim()) { alert('Please enter a word or sentence.'); return; }

  document.getElementById('porter-full-loading').style.display = 'block';
  document.getElementById('porter-full-results').style.display = 'none';

  setTimeout(() => {
    const tokens = tokenizeText(raw);
    let html = `<h3>Porter Stemmer — Results (${tokens.length} token${tokens.length>1?'s':''})</h3>`;
    tokens.forEach(tok => {
      const res = porterStemWithTrace(tok);
      html += `<div class="porter-full-row">`;
      html += `<div><span class="porter-word">${escapeHtml(tok)}</span> → <span style="background:#ffeaa7;padding:6px 10px;border-radius:8px;font-weight:700;">${escapeHtml(res.stem)}</span></div>`;
      html += `<div class="porter-trace"><strong>Step-by-step trace:</strong><ol style="margin-top:6px;">`;
      res.trace.forEach(step => html += `<li>${escapeHtml(step)}</li>`);
      html += `</ol></div>`;
      html += `</div>`;
    });

    html += `<div class="porter-note"><strong>Notes:</strong> This is the classic Porter stemmer (rule-based, lexicon-free). Stems are not always dictionary lemmas (e.g. 'happily' → 'happili').</div>`;

    document.getElementById('porter-full-loading').style.display = 'none';
    const out = document.getElementById('porter-full-results');
    out.innerHTML = html;
    out.style.display = 'block';
  }, 200);
}

// helper tokenizer (keeps alphabetic tokens)
function tokenizeText(text) {
  return text.split(/\s+/).map(t => t.trim()).filter(Boolean);
}

// escape html
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

// Porter stemmer with trace (instrumented)
function porterStemWithTrace(inputWord) {
  const wordOrig = inputWord;
  const trace = [];
  let w = inputWord.toLowerCase();

  function isConsonant(word, i) {
    const ch = word[i];
    if ('aeiou'.includes(ch)) return false;
    if (ch === 'y') return (i === 0) ? true : !isConsonant(word, i - 1);
    return true;
  }
  function measureOf(s) {
    // compute m for string s (in Porter notation)
    let m = 0, i = 0, len = s.length;
    while (i < len) {
      while (i < len && isConsonant(s, i)) i++;
      if (i >= len) break;
      while (i < len && !isConsonant(s, i)) i++;
      m++;
    }
    return m;
  }
  function containsVowel(s) {
    for (let i = 0; i < s.length; i++) if (!isConsonant(s, i)) return true;
    return false;
  }
  function endsWithDoubleConsonant(s) {
    return s.length >= 2 && s[s.length-1] === s[s.length-2] && isConsonant(s, s.length-1);
  }
  function cvc(s) {
    if (s.length < 3) return false;
    const a = s[s.length-3], b = s[s.length-2], c = s[s.length-1];
    return isConsonant(s, s.length-3) && !isConsonant(s, s.length-2) && isConsonant(s, s.length-1) && !('wxy'.includes(c));
  }

  trace.push(`Original: "${wordOrig}" (lower: "${w}")`);
  // Step 1a
  if (w.endsWith('sses')) { w = w.slice(0, -2); trace.push(`Step1a: 'sses' → remove 2 -> ${w}`); }
  else if (w.endsWith('ies')) { w = w.slice(0, -2); trace.push(`Step1a: 'ies' -> replace with 'i' (implemented as remove 'es' -> ${w})`); }
  else if (w.endsWith('ss')) { trace.push(`Step1a: ends with 'ss' -> keep as is (${w})`); }
  else if (w.endsWith('s')) { w = w.slice(0, -1); trace.push(`Step1a: trailing 's' removed -> ${w}`); }
  else trace.push('Step1a: no change');

  // Step 1b
  let flagStep1b = false;
  if (w.endsWith('eed')) {
    const base = w.slice(0, -3);
    if (measureOf(base) > 0) { w = base + 'ee'; trace.push(`Step1b(1): 'eed' and m(base)>0 -> replace with 'ee' => ${w}`); } 
    else trace.push(`Step1b(1): 'eed' but m(base)=${measureOf(base)} -> no change`);
  } else {
    const m1 = w.endsWith('ed') ? w.slice(0,-2) : (w.endsWith('ing') ? w.slice(0,-3) : null);
    if (m1 !== null && containsVowel(m1)) {
      trace.push(`Step1b(2): 'ed'/'ing' case and base contains vowel -> reduce to base: ${m1}`);
      w = m1; flagStep1b = true;
      if (w.endsWith('at') || w.endsWith('bl') || w.endsWith('iz')) {
        w = w + 'e'; trace.push(`Step1b(2a): base ends with at/bl/iz -> append 'e' => ${w}`);
      } else if (endsWithDoubleConsonant(w) && !('lsz'.includes(w[w.length-1]))) {
        w = w.slice(0, -1); trace.push(`Step1b(2b): ends with double consonant (not l/s/z) -> drop last => ${w}`);
      } else if (measureOf(w) === 1 && cvc(w)) {
        w = w + 'e'; trace.push(`Step1b(2c): measure=1 and cvc -> append 'e' => ${w}`);
      } else {
        trace.push(`Step1b(2d): no orthographic special-case applied => ${w}`);
      }
    } else {
      trace.push('Step1b: no ed/ing change');
    }
  }

  // Step 1c
  if (w.endsWith('y') && containsVowel(w.slice(0, -1))) {
    w = w.slice(0, -1) + 'i';
    trace.push(`Step1c: ends-with 'y' with vowel in stem -> y -> i => ${w}`);
  } else trace.push('Step1c: no change');

  // Step 2 (suffix -> replacement if m(stem) > 0)
  const step2list = {
    'ational':'ate','tional':'tion','enci':'ence','anci':'ance','izer':'ize','abli':'able','alli':'al','entli':'ent',
    'eli':'e','ousli':'ous','ization':'ize','ation':'ate','ator':'ate','alism':'al','iveness':'ive','fulness':'ful',
    'ousness':'ous','aliti':'al','iviti':'ive','biliti':'ble','logi':'log'
  };
  let applied2 = false;
  for (const [suf, rep] of Object.entries(step2list)) {
    if (w.endsWith(suf)) {
      const base = w.slice(0, -suf.length);
      if (measureOf(base) > 0) {
        w = base + rep;
        trace.push(`Step2: matched '${suf}', m(base)=${measureOf(base)}>0 -> replace with '${rep}' => ${w}`);
        applied2 = true;
      } else {
        trace.push(`Step2: matched '${suf}', but m(base)=${measureOf(base)} -> no change`);
      }
      break;
    }
  }
  if (!applied2) trace.push('Step2: no suffix matched');

  // Step 3
  const step3list = {'icate':'ic','ative':'','alize':'al','iciti':'ic','ical':'ic','ful':'','ness':''};
  let applied3 = false;
  for (const [suf, rep] of Object.entries(step3list)) {
    if (w.endsWith(suf)) {
      const base = w.slice(0, -suf.length);
      if (measureOf(base) > 0) {
        w = base + rep;
        trace.push(`Step3: matched '${suf}', m(base)=${measureOf(base)}>0 -> replace with '${rep}' => ${w}`);
        applied3 = true;
      } else {
        trace.push(`Step3: matched '${suf}', but m(base)=${measureOf(base)} -> no change`);
      }
      break;
    }
  }
  if (!applied3) trace.push('Step3: no suffix matched');

  // Step 4
  const step4list = ['al','ance','ence','er','ic','able','ible','ant','ement','ment','ent','ion','ou','ism','ate','iti','ous','ive','ize'];
  let applied4 = false;
  for (const suf of step4list) {
    if (w.endsWith(suf)) {
      const base = w.slice(0, -suf.length);
      if (measureOf(base) > 1) {
        if (suf === 'ion') {
          const ch = base[base.length -1];
          if (ch === 's' || ch === 't') {
            w = base; trace.push(`Step4: matched 'ion' and base ends with ${ch}, m(base)=${measureOf(base)}>1 -> delete suffix => ${w}`);
            applied4 = true;
            break;
          } else {
            trace.push(`Step4: matched 'ion' but preceding char '${ch}' not s/t -> no delete`);
            applied4 = true;
            break;
          }
        } else {
          w = base; trace.push(`Step4: matched '${suf}', m(base)=${measureOf(base)}>1 -> delete suffix => ${w}`);
          applied4 = true;
          break;
        }
      } else {
        trace.push(`Step4: matched '${suf}' but m(base)=${measureOf(base)}<=1 -> no change`);
        applied4 = true;
        break;
      }
    }
  }
  if (!applied4) trace.push('Step4: no suffix matched');

  // Step 5a
  if (w.endsWith('e')) {
    const base = w.slice(0,-1);
    const mbase = measureOf(base);
    if (mbase > 1 || (mbase === 1 && !cvc(base))) {
      w = base;
      trace.push(`Step5a: ends with 'e', m(base)=${mbase} -> delete 'e' => ${w}`);
    } else {
      trace.push(`Step5a: ends with 'e', but m(base)=${mbase} and cvc(base)=${cvc(base)} -> keep 'e'`);
    }
  } else trace.push('Step5a: no trailing e');

  // Step 5b
  if (measureOf(w) > 1 && w.endsWith('ll')) {
    w = w.slice(0, -1);
    trace.push(`Step5b: ends with 'll' and m(w)>1 -> delete one 'l' => ${w}`);
  } else trace.push('Step5b: no change');

  // final
  trace.push(`Final stem: ${w}`);
  return { stem: w, trace };
}

// helper: fill pdf examples quickly
function fillPorterExamples() {
  document.getElementById('porter-full-input').value = "MULTIDIMENSIONAL\nCHARACTERIZATION\nplaying\nhappily\nchildren";
}

// N-gram MLE & Perplexity widget (Compute button only, auto-save + persistent storage)

// Main function
function runNgramFull() {
  const train = (document.getElementById('ngram-train').value || '').trim();
  const test = (document.getElementById('ngram-test').value || '').trim();
  const n = parseInt(document.getElementById('ngram-order').value, 10);

  if (!train || !test) { 
    document.getElementById('ngram-full-results').innerHTML = "<em>Enter training corpus and test sentence...</em>";
    return;
  }

  document.getElementById('ngram-full-loading').style.display = 'block';
  document.getElementById('ngram-full-results').style.display = 'none';

  setTimeout(() => {
    const trainTokens = tokenizeText(train).map(t => t.toLowerCase());
    const testTokens = tokenizeText(test).map(t => t.toLowerCase());

    const unigramCounts = {};
    trainTokens.forEach(t => unigramCounts[t] = (unigramCounts[t]||0)+1);
    const totalTokens = trainTokens.length;

    function buildNgramCounts(tokens, k) {
      const counts = {}, prefixCounts = {};
      for (let i=0;i<=tokens.length-k;i++) {
        const gram = tokens.slice(i,i+k).join(' ');
        counts[gram] = (counts[gram]||0)+1;
        if (k>1) {
          const prefix = tokens.slice(i,i+k-1).join(' ');
          prefixCounts[prefix] = (prefixCounts[prefix]||0)+1;
        }
      }
      return {counts, prefixCounts};
    }

    const ngramModel = buildNgramCounts(trainTokens, n);
    const vocab = new Set(trainTokens);
    const V = vocab.size;

    const testNgrams = [];
    for (let i=0;i<=testTokens.length - n;i++) {
      const prefix = (n>1) ? testTokens.slice(i, i+n-1).join(' ') : '<>';
      const cont = testTokens[i + n - 1];
      testNgrams.push({prefix, cont, gram: (n>1) ? (prefix + ' ' + cont) : cont});
    }

    const traces = [];
    let logProbSum = 0;
    let zeroEncountered = false;
    testNgrams.forEach((g, idx) => {
      const gramCount = ngramModel.counts[g.gram] || 0;
      const prefixCount = (n===1) ? totalTokens : (ngramModel.prefixCounts[g.prefix] || 0);
      let p = 0;
      const step = { index: idx+1, gram: g.gram, prefix: g.prefix, cont: g.cont, gramCount, prefixCount };

      if (prefixCount > 0) {
        p = gramCount / prefixCount;
        step.note = `P(${g.cont} | ${g.prefix}) = C(${g.gram}) / C(${g.prefix}) = ${gramCount} / ${prefixCount} = ${p}`;
      } else {
        step.note = `Prefix "${g.prefix}" not seen -> MLE probability 0`;
        p = 0;
      }
      step.p = p;
      traces.push(step);
      if (p === 0) zeroEncountered = true;
      else logProbSum += Math.log(p);
    });

    const M = testNgrams.length;
    const perplexity = (zeroEncountered || M===0) ? Infinity : Math.exp(- (logProbSum / M));

    // render output
    let html = `<h3>Results (n=${n})</h3>`;
    html += `<div class="ng-row"><strong>Training tokens (N):</strong> ${totalTokens} &nbsp;&nbsp; <strong>Vocab (V):</strong> ${V}</div>`;
    html += `<div class="ng-row"><strong>Top ${n}-gram counts (training)</strong>`;
    const top = Object.entries(ngramModel.counts).sort((a,b)=>b[1]-a[1]).slice(0,15);
    if (top.length === 0) html += `<div class="ng-step">No ${n}-grams in training (too small corpus).</div>`;
    else {
      html += `<table class="ng-table"><thead><tr><th>${n}-gram</th><th>Count</th></tr></thead><tbody>`;
      top.forEach(([g,c]) => { html += `<tr><td class="ng-code">${escapeHtml(g)}</td><td>${c}</td></tr>`; });
      html += `</tbody></table>`;
    }
    html += `</div>`;

    html += `<div class="ng-row"><strong>Step-by-step conditional MLE for test (${M} ${n}-grams)</strong>`;
    traces.forEach(t => {
      html += `<div class="ng-step"><strong>Step ${t.index} — n-gram:</strong> <code>${escapeHtml(t.gram)}</code>`;
      html += `<div style="margin-top:6px;">Counts: C(${t.gram}) = ${t.gramCount}, C(${t.prefix}) = ${t.prefixCount}</div>`;
      html += `<div style="margin-top:6px;"><strong>Formula:</strong> P = C(${t.gram}) / C(${t.prefix})</div>`;
      html += `<div style="margin-top:6px;"><strong>Value:</strong> ${t.note}</div>`;
      if (t.p === 0) html += `<div style="margin-top:8px;color:#c0392b;"><strong>=> Zero probability</strong></div>`;
      html += `</div>`;
    });
    html += `</div>`;
    html += `<div class="ng-row"><strong>Sentence log-prob sum:</strong> ${isFinite(logProbSum) ? logProbSum.toFixed(6) : '-'}<br/><strong>Perplexity:</strong> ${perplexity===Infinity ? '∞' : perplexity.toFixed(6)}</div>`;
    html += `<div class="ng-row"><strong>Interpretation:</strong> MLE assigns zero to unseen conditionals. Use smoothing for robustness.</div>`;

    document.getElementById('ngram-full-loading').style.display = 'none';
    const out = document.getElementById('ngram-full-results');
    out.innerHTML = html;
    out.style.display = 'block';
  }, 250);
}

// Auto-fill example + save to localStorage (but do NOT run)
function autoFillExample() {
  const trainEl = document.getElementById('ngram-train');
  const testEl = document.getElementById('ngram-test');
  const orderEl = document.getElementById('ngram-order');

  const storedTrain = localStorage.getItem('ngram-train');
  const storedTest = localStorage.getItem('ngram-test');
  const storedOrder = localStorage.getItem('ngram-order');

  trainEl.value = storedTrain || "the cat sat on the mat the cat ate a rat";
  testEl.value = storedTest || "the cat sat on the rat";
  orderEl.value = storedOrder || "2";
}

// Auto-save on input changes
function initAutoSave() {
  ['ngram-train','ngram-test','ngram-order'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => {
      localStorage.setItem(id, el.value);
      // do not auto-run
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  autoFillExample();
  initAutoSave();
});

// Compute button click handler
document.getElementById('compute-btn').addEventListener('click', () => {
  runNgramFull();
});

// MODULE 3: Syntax Analysis
function analyzeSyntax() {
    const text = document.getElementById('m3-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(3);

    setTimeout(() => {
        const tokens = tokenize(text);
        const posTags = performPOSTagging(tokens);
        const phrases = identifyPhrases(tokens, posTags);

        const results = `
            <h3>🌳 Syntax Analysis Results</h3>
            <div class="result-item">
                <strong>POS Tags:</strong>
                <div class="tag-container">
                    ${posTags.map(([word, tag]) => `<span class="tag">${word}/${tag}</span>`).join('')}
                </div>
            </div>
            <div class="result-item">
                <strong>Identified Phrases:</strong>
                ${phrases.map(phrase => `
                    <div style="margin-bottom: 10px;">
                        <strong>${phrase.type}:</strong> ${phrase.words.join(' ')}
                    </div>
                `).join('')}
            </div>
            <div class="result-item">
                <strong>Syntax Statistics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Nouns: ${posTags.filter(([,tag]) => tag.startsWith('NN')).length}</div>
                    <div class="feature-item">Verbs: ${posTags.filter(([,tag]) => tag.startsWith('VB')).length}</div>
                    <div class="feature-item">Adjectives: ${posTags.filter(([,tag]) => tag.startsWith('JJ')).length}</div>
                    <div class="feature-item">Phrases: ${phrases.length}</div>
                </div>
            </div>
        `;

        showResults(3, results);
    }, 1500);
}

function generateParseTree() {
    const text = document.getElementById('m3-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(3);

    setTimeout(() => {
        const tokens = tokenize(text);
        const posTags = performPOSTagging(tokens);
        const parseTree = generateSimpleParseTree(tokens, posTags);

        const results = `
            <h3>🏗️ Parse Tree Generation Results</h3>
            <div class="result-item">
                <strong>Constituency Parse Tree:</strong>
                <div style="background:#f8f9fa; padding:15px; border-radius:5px; font-family:monospace; margin-top:10px;">
                    ${parseTree}
                </div>
            </div>
            <div class="result-item">
                <strong>Grammatical Structure:</strong>
                <p>The sentence has been parsed into its constituent phrases following English grammar rules.</p>
            </div>
        `;

        showResults(3, results);
    }, 1500);
}

// MODULE 4: Semantic Analysis
function analyzeSemantics() {
    const text = document.getElementById('m4-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(4);

    setTimeout(() => {
        const entities = extractNamedEntities(text);
        const ambiguousWords = findAmbiguousWords(text);
        const wordSenses = disambiguateWordsInText(text, ambiguousWords);

        const results = `
            <h3>🧠 Semantic Analysis Results</h3>
            <div class="result-item">
                <strong>Named Entities:</strong>
                ${Object.entries(entities).map(([type, entityList]) => 
                    entityList.length > 0 ? `
                        <div style="margin-bottom: 10px;">
                            <strong>${type}:</strong> 
                            <div class="tag-container">
                                ${entityList.map(entity => `<span class="tag">${entity}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''
                ).join('')}
            </div>
            <div class="result-item">
                <strong>Word Sense Disambiguation:</strong>
                ${Object.entries(wordSenses).map(([word, sense]) => `
                    <div style="margin-bottom: 5px;">
                        <strong>${word}:</strong> ${sense}
                    </div>
                `).join('')}
                ${Object.keys(wordSenses).length === 0 ? '<p>No ambiguous words requiring disambiguation found.</p>' : ''}
            </div>
        `;

        showResults(4, results);
    }, 1500);
}

function findEntities() {
    const text = document.getElementById('m4-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(4);

    setTimeout(() => {
        const entities = extractNamedEntities(text);
        const totalEntities = Object.values(entities).reduce((sum, arr) => sum + arr.length, 0);

        const results = `
            <h3>👤 Named Entity Recognition Results</h3>
            <div class="result-item">
                <strong>Entity Summary (${totalEntities} entities found):</strong>
                <div class="feature-grid">
                    <div class="feature-item">Persons: ${entities.PERSON.length}</div>
                    <div class="feature-item">Locations: ${entities.LOCATION.length}</div>
                    <div class="feature-item">Organizations: ${entities.ORGANIZATION.length}</div>
                    <div class="feature-item">Dates: ${entities.DATE.length}</div>
                </div>
            </div>
            ${Object.entries(entities).map(([type, entityList]) => 
                entityList.length > 0 ? `
                    <div class="result-item">
                        <strong>${type} Entities:</strong>
                        <div class="tag-container">
                            ${entityList.map(entity => `<span class="tag">${entity}</span>`).join('')}
                        </div>
                    </div>
                ` : ''
            ).join('')}
        `;

        showResults(4, results);
    }, 1500);
}

function disambiguateWords() {
    const text = document.getElementById('m4-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(4);

    setTimeout(() => {
        const ambiguousWords = findAmbiguousWords(text);
        const wordSenses = disambiguateWordsInText(text, ambiguousWords);
        const similarities = calculateWordSimilarities(ambiguousWords);

        const results = `
            <h3>🎯 Word Sense Disambiguation Results</h3>
            <div class="result-item">
                <strong>Disambiguated Words:</strong>
                ${Object.entries(wordSenses).map(([word, sense]) => `
                    <div style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <strong>${word}:</strong> ${sense}
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">
                            Context-based disambiguation using Lesk algorithm
                        </div>
                    </div>
                `).join('')}
                ${Object.keys(wordSenses).length === 0 ? '<p>No ambiguous words found that require disambiguation.</p>' : ''}
            </div>
            <div class="result-item">
                <strong>Word Similarities:</strong>
                ${similarities.length > 0 ? similarities.map(sim => `
                    <div style="margin-bottom: 5px;">
                        ${sim.word1} ↔ ${sim.word2}: ${(sim.similarity * 100).toFixed(1)}% similar
                    </div>
                `).join('') : '<p>No similar words found for comparison.</p>'}
            </div>
        `;

        showResults(4, results);
    }, 1500);
}

// MODULE 5: Discourse Processing
function analyzeDiscourse() {
    const text = document.getElementById('m5-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(5);

    setTimeout(() => {
        const references = resolveAnaphoricReferences(text);
        const coherence = calculateCoherence(text);
        const sentences = text.split('.').filter(s => s.trim());

        const results = `
            <h3>💬 Discourse Analysis Results</h3>
            <div class="result-item">
                <strong>Anaphora Resolution:</strong>
                ${Object.entries(references).map(([pronoun, antecedent]) => `
                    <div style="margin-bottom: 5px;">
                        <span class="tag">${pronoun}</span> → <span class="tag">${antecedent}</span>
                    </div>
                `).join('')}
                ${Object.keys(references).length === 0 ? '<p>No anaphoric references found to resolve.</p>' : ''}
            </div>
            <div class="result-item">
                <strong>Coherence Analysis:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Coherence Score: ${(coherence.score * 100).toFixed(1)}%</div>
                    <div class="feature-item">Sentences: ${sentences.length}</div>
                    <div class="feature-item">Lexical Cohesion: ${coherence.lexicalCohesion.toFixed(2)}</div>
                </div>
                <div style="margin-top: 10px;">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${coherence.score * 100}%"></div>
                    </div>
                </div>
            </div>
        `;

        showResults(5, results);
    }, 1500);
}

function resolveReferences() {
    const text = document.getElementById('m5-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(5);

    setTimeout(() => {
        const references = resolveAnaphoricReferences(text);
        const pronouns = findPronouns(text);

        const results = `
            <h3>🔗 Reference Resolution Results</h3>
            <div class="result-item">
                <strong>Pronouns Detected:</strong>
                <div class="tag-container">
                    ${pronouns.map(p => `<span class="tag">${p}</span>`).join('')}
                </div>
            </div>
            <div class="result-item">
                <strong>Reference Resolutions:</strong>
                ${Object.entries(references).map(([pronoun, antecedent]) => `
                    <div style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                        <strong>Pronoun:</strong> "${pronoun}" → <strong>Refers to:</strong> "${antecedent}"
                    </div>
                `).join('')}
                ${Object.keys(references).length === 0 ? '<p>No clear anaphoric references found in the text.</p>' : ''}
            </div>
        `;

        showResults(5, results);
    }, 1500);
}

function checkCoherence() {
    const text = document.getElementById('m5-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(5);

    setTimeout(() => {
        const coherence = calculateCoherence(text);
        const sentences = text.split('.').filter(s => s.trim());

        const results = `
            <h3>📏 Coherence Analysis Results</h3>
            <div class="result-item">
                <strong>Overall Coherence Assessment:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Score: ${(coherence.score * 100).toFixed(1)}%</div>
                    <div class="feature-item">Quality: ${getCoherenceQuality(coherence.score)}</div>
                    <div class="feature-item">Sentences: ${sentences.length}</div>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Coherence Level:</strong>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${coherence.score * 100}%"></div>
                    </div>
                </div>
            </div>
            <div class="result-item">
                <strong>Detailed Analysis:</strong>
                <p><strong>Lexical Cohesion:</strong> ${coherence.lexicalCohesion.toFixed(2)} - ${getLexicalCohesionDescription(coherence.lexicalCohesion)}</p>
                <p><strong>Interpretation:</strong> ${getCoherenceInterpretation(coherence.score)}</p>
            </div>
        `;

        showResults(5, results);
    }, 1500);
}

// MODULE 6: Applications
function analyzeSentiment() {
    const text = document.getElementById('m6-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const sentiment = performSentimentAnalysis(text);
        const emotionalWords = findEmotionalWords(text);

        const results = `
            <h3>😊 Sentiment Analysis Results</h3>
            <div class="result-item">
                <strong>Overall Sentiment:</strong>
                <div class="feature-grid">
                    <div class="feature-item sentiment-${sentiment.label}">
                        ${sentiment.label.toUpperCase()}
                    </div>
                    <div class="feature-item">Score: ${sentiment.score.toFixed(2)}</div>
                    <div class="feature-item">Confidence: ${(sentiment.confidence * 100).toFixed(1)}%</div>
                </div>
            </div>
            <div class="result-item">
                <strong>Emotional Indicators:</strong>
                <div style="margin-bottom: 10px;">
                    <strong>Positive words:</strong>
                    <div class="tag-container">
                        ${emotionalWords.positive.map(word => `<span class="tag" style="background:#28a745">${word}</span>`).join('')}
                    </div>
                </div>
                <div>
                    <strong>Negative words:</strong>
                    <div class="tag-container">
                        ${emotionalWords.negative.map(word => `<span class="tag" style="background:#dc3545">${word}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="result-item">
                <strong>Sentiment Distribution:</strong>
                <div style="margin-top: 10px;">
                    <div style="margin-bottom: 5px;">Positive: ${emotionalWords.positive.length} words</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.max(10, (emotionalWords.positive.length / (emotionalWords.positive.length + emotionalWords.negative.length) * 100))}%; background: #28a745;"></div>
                    </div>
                    <div style="margin: 10px 0 5px 0;">Negative: ${emotionalWords.negative.length} words</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.max(10, (emotionalWords.negative.length / (emotionalWords.positive.length + emotionalWords.negative.length) * 100))}%; background: #dc3545;"></div>
                    </div>
                </div>
            </div>
        `;

        showResults(6, results);
    }, 1500);
}


/* ---------------------------
   Advanced Hybrid Summarizer
   --------------------------- */

// Helper: build word frequency map (ignores stopwords)
function buildWordFreq(text) {
    const freq = {};
    const words = tokenize(text).filter(w => !isStopWord(w) && /^[a-zA-Z]+$/.test(w));
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    return freq;
}

// Helper: get noun/key phrase candidates using compromise if available, fallback to high-frequency words
function getKeyNounPhrases(text, topK = 8) {
    try {
        if (window.nlp) {
            const doc = nlp(text);
            const npArr = doc.nouns().out('array') || [];
            const npCounts = {};
            npArr.forEach(np => {
                let clean = np.toLowerCase().replace(/[^\w\s]/g, '').trim();
                if (clean && clean.length > 2) npCounts[clean] = (npCounts[clean] || 0) + 1;
            });
            const keys = Object.entries(npCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topK)
                .map(([k]) => k);
            if (keys.length) return keys;
        }
    } catch (e) {
        // fallback silently
    }

    // FALLBACK: frequency-based but filter common verbs & uninformative tokens
    const freq = buildWordFreq(text); // uses tokenize() and isStopWord()
    const verbBlacklist = new Set([
        'be','is','are','was','were','have','has','had','do','does','did','will','would','could','should',
        'say','says','said','think','thinks','thought','announce','announced','announces',
        'provide','provides','providing','provided','aim','aims','aimed','plan','plans','planned',
        'believe','believes','believed','boost','boosts','boosted','revolutionize','revolutionized','revolutionizes'
    ]);
    const ignore = new Set(['these','this','that','those','new','also','many','such','will','could','may','might','the','a','an']);

    const candidates = Object.entries(freq)
        .filter(([w]) => w.length > 3 && !ignore.has(w.toLowerCase()) && !verbBlacklist.has(w.toLowerCase()))
        .sort((a, b) => b[1] - a[1])
        .slice(0, topK)
        .map(([w]) => w);

    return candidates;
}


// Helper: tokenize a sentence (uses existing tokenize)
function sentenceTokens(sentence) {
    return tokenize(sentence).filter(w => !isStopWord(w) && /^[a-zA-Z]+$/.test(w));
}

// Jaccard similarity (for diversity)
function jaccardSim(setA, setB) {
    const a = new Set(setA);
    const b = new Set(setB);
    const inter = [...a].filter(x => b.has(x)).length;
    const uni = new Set([...a, ...b]).size || 1;
    return inter / uni;
}

// Score sentences by combined features
function scoreSentences(sentences, wordFreq, keyNouns, entityList) {
    const maxFreq = Math.max(...Object.values(wordFreq), 1);
    const totalSentences = sentences.length;

    return sentences.map((s, idx) => {
        const tokens = sentenceTokens(s);
        // TF-like score normalized
        const tfRaw = tokens.reduce((sum, w) => sum + (wordFreq[w] || 0), 0);
        const tfScore = tfRaw / (maxFreq * Math.max(1, tokens.length)); // 0..1-ish

        // topic overlap: count keyNouns which appear in sentence
        let topicCount = 0;
        keyNouns.forEach(kp => {
            // match if all words of kp present in tokens
            const kpTokens = kp.split(/\s+/).map(x => x.toLowerCase());
            if (kpTokens.every(p => tokens.includes(p))) topicCount++;
        });
        const topicOverlap = keyNouns.length ? (topicCount / keyNouns.length) : 0;

        // entity score: how many named entities present
        let eCount = 0;
        entityList.forEach(ent => {
            if (ent && s.toLowerCase().includes(ent.toLowerCase())) eCount++;
        });
        const entityScore = Math.min(1, eCount / 2); // 0..1 (cap)

        // position score (favor early sentences)
        const posScore = (totalSentences - idx) / totalSentences;

        // length score (avoid tiny fragments, cap at 1)
        const lengthScore = Math.min(1, tokens.length / 20);

        // combine with fixed weights
        const combined = (0.35 * topicOverlap) + (0.30 * tfScore) + (0.15 * entityScore) + (0.10 * posScore) + (0.10 * lengthScore);

        return {
            sentence: s,
            index: idx,
            tokens,
            tfScore,
            topicOverlap,
            entityScore,
            posScore,
            lengthScore,
            score: combined
        };
    });
}

// MMR-based sentence selection (for diversity + relevance)
function selectSentencesMMR(sentenceObjs, k = 2, lambda = 0.7) {
    if (sentenceObjs.length <= k) return sentenceObjs.sort((a,b)=>a.index-b.index);

    // clone list sorted by score desc
    const candidates = sentenceObjs.slice().sort((a, b) => b.score - a.score);
    const selected = [];
    // pick first (highest score)
    selected.push(candidates.shift());

    while (selected.length < k && candidates.length) {
        let bestIdx = 0;
        let bestVal = -Infinity;

        for (let i = 0; i < candidates.length; i++) {
            const cand = candidates[i];
            // compute max similarity to already selected
            const maxSim = Math.max(...selected.map(s => jaccardSim(s.tokens, cand.tokens)), 0);
            const val = lambda * cand.score - (1 - lambda) * maxSim;
            if (val > bestVal) {
                bestVal = val;
                bestIdx = i;
            }
        }
        selected.push(candidates.splice(bestIdx, 1)[0]);
    }

    // return in original text order
    return selected.sort((a, b) => a.index - b.index);
}

// Light rewrite and merge rules (pseudo-abstractive)
function rewriteSelected(selectedObjs, fullText) {
    if (!selectedObjs || selectedObjs.length === 0) return '';

    // Get plain sentence strings in original order
    const sArr = selectedObjs.map(s => s.sentence.trim());

    // If only one sentence selected, return it (with small cleanup)
    if (sArr.length === 1) {
        let out = sArr[0].replace(/\s{2,}/g, ' ').trim();
        // minor cleanups
        out = out.replace(/\s+\./g, '.');
        if (out && !/[.!?]$/.test(out)) out += '.';
        return out.charAt(0).toUpperCase() + out.slice(1);
    }

    // If at least two sentences, attempt targeted merging for common patterns:
    let out = '';
    const first = sArr[0];
    const second = sArr[1];
    const third = sArr[2] || '';

    // Pattern: first contains announce/launch and second contains provide/aim -> merge into ", providing ..."
    if (/(announce|launch|launche?d)/i.test(first) &&
        /(provide|provides|providing|aim|aims|intend|offer|deliver|bring)/i.test(second)) {

        // derive clause2: remove "These programs aim to", "These programs provide", leading pronouns
        let clause2 = second.replace(/^(these|this|the)\s+(programs?|initiatives?|projects?)\s*(aims?|aim|intend|plan|seek|seeks)?\s*(to)?\s*/i, '');
        clause2 = clause2.replace(/^\s*to\s*/i, '');
        // force gerund if it is provide/aim -> "providing ..."
        clause2 = clause2.replace(/^(provide|provides|providing)\b/i, (m) => 'providing');

        out = first.replace(/\.$/, '') + ', ' + clause2.replace(/\.$/, '');

        // If third sentence contains 'experts' and 'revolutionize' or similar, append an "and ..." clause transformed to gerund
        if (third && /(expert|critic|analyst)/i.test(third) && /(revolutioniz|transform|improv)/i.test(third)) {
            let clause3 = third.replace(/^(technology\s+)?(experts?|some experts?|analysts?)\s+(believe|say|think|claim)\s*(that\s*)?/i, '');
            clause3 = clause3.replace(/\bwill\s+/i, '');
            // turn 'revolutionize' -> 'revolutionizing', 'transform' -> 'transforming', 'improve' -> 'improving'
            clause3 = clause3.replace(/\brevolutionize\b/gi, 'revolutionizing');
            clause3 = clause3.replace(/\btransform\b/gi, 'transforming');
            clause3 = clause3.replace(/\bimprove\b/gi, 'improving');
            clause3 = clause3.replace(/\.$/, '');
            out = out.replace(/\.$/, '') + ' and ' + clause3;
        }

        // final cleanup and punctuation
        out = out.replace(/\s{2,}/g, ' ').trim();
        if (out && !/[.!?]$/.test(out)) out += '.';
        return out.charAt(0).toUpperCase() + out.slice(1);
    }

    // Fallback: join selected sentences with commas for compactness, then run general cleanup rules
    out = sArr.join('. ');
    // Remove filler phrases and simplify connectors (same rules as earlier)
    const fillerPatterns = [
        /\b(it is (very )?(important|necessary) to note that)\b/gi,
        /\b(experts (believe|say|think) that)\b/gi,
        /\b(in order to)\b/gi,
        /\b(programs? (aim|aims) to)\b/gi,
        /\b(these programs?)\b/gi,
        /\b(the results (show|indicate) that)\b/gi,
        /\b(it was found that)\b/gi
    ];
    fillerPatterns.forEach(r => out = out.replace(r, ''));

    out = out.replace(/\bannounced\b([^.]*)\bto\b/gi, 'launched$1to');
    out = out.replace(/\bprograms? (?:aim|aims) to\b/gi, 'programs to');
    const connectorSimplify = {
        'and also': 'and',
        'because of the fact that': 'because',
        'due to the fact that': 'because',
        'as a result of': 'because of',
        'in order': 'to'
    };
    Object.entries(connectorSimplify).forEach(([from, to]) => {
        out = out.replace(new RegExp(from, 'gi'), to);
    });

    out = out.replace(/\b(\w+)\s+\1\b/gi, '$1');
    out = out.replace(/\s{2,}/g, ' ').trim();
    out = out.replace(/\s+\./g, '.');

    if (out && !/[.!?]$/.test(out)) out += '.';
    return out.charAt(0).toUpperCase() + out.slice(1);
}


// Main entry: advanced hybrid summary
// preferredSentences: desired number of sentences in output (adapter will decide)
function generateHybridSummaryAdvanced(text, preferredSentences = 2) {
    const sentences = text.split('.').map(s => s.trim()).filter(s => s.length > 0);
    const totalSentences = sentences.length;
    if (totalSentences === 0) return { summary: '', keyTerms: [], numSentences: 0, totalSentences: 0 };

    // ADAPTIVE: choose number of sentences to pick
    let k;
    if (totalSentences <= 3) {
        // for 1 -> 1, 2 -> 1, 3 -> 2 (keeps context)
        k = Math.min(preferredSentences, Math.max(1, totalSentences - 1));
    } else {
        k = Math.min(preferredSentences, Math.max(1, Math.round(totalSentences * 0.35)));
    }

    // Compute resources
    const wordFreq = buildWordFreq(text);
    const keyNouns = getKeyNounPhrases(text, 10);
    const ents = extractNamedEntities(text);
    const entityList = [].concat(...Object.values(ents)).filter(x => x);

    // Score sentences
    const scored = scoreSentences(sentences, wordFreq, keyNouns, entityList);

    // Boost sentences that contain strong subject keys (improves including 'Indian government')
    const subjectBoostKeys = new Set([...keyNouns.slice(0,3).map(k => k.toLowerCase()), 'government', 'india']);
    scored.forEach(s => {
        const low = s.sentence.toLowerCase();
        subjectBoostKeys.forEach(kp => {
            if (kp && low.includes(kp)) s.score += 0.12;
        });
    });

    // Select with MMR (diversity)
    const selectedObjs = selectSentencesMMR(scored, k, 0.75);

    // If selected starts with pronoun and first sentence carries subject, ensure first sentence is present
    const startsWithPronoun = selectedObjs.some(s => /^\s*(these|this|they|it|those)\b/i.test(s.sentence));
    const firstSentenceObj = scored.find(s => s.index === 0);
    if (startsWithPronoun && firstSentenceObj && !selectedObjs.find(s => s.index === 0)) {
        // replace lowest scored selected sentence by first sentence to preserve context
        selectedObjs.sort((a,b) => a.score - b.score);
        selectedObjs[0] = firstSentenceObj;
        selectedObjs.sort((a,b) => a.index - b.index);
    }

    // Rewritten summary
    const rewritten = rewriteSelected(selectedObjs, text);

    // Key terms: prefer noun phrases, but fallback to filtered high-frequency words
    const topTerms = (keyNouns && keyNouns.length) ? keyNouns.slice(0, 8) :
        Object.entries(wordFreq)
            .filter(([w]) => w.length > 3)
            .sort((a,b) => b[1] - a[1])
            .slice(0,8)
            .map(([w]) => w);

    return {
        summary: rewritten,
        keyTerms: topTerms,
        numSentences: selectedObjs.length,
        totalSentences
    };
}


// Replace the summarizeText() in your file with this call to the advanced summarizer
function summarizeText() {
    const text = document.getElementById('m6-text').value.trim();
    if (!text) { alert('Please enter some text to summarize.'); return; }

    showLoading(6);
    setTimeout(() => {
        const preferred = 2; // default preference; change if you want to expose dropdown
        const result = generateHybridSummaryAdvanced(text, preferred);

        const summary = result.summary || '<em>No concise summary could be generated.</em>';
        const originalLen = text.length;
        const summaryLen = (result.summary || '').length;
        const compressionRatio = originalLen ? ((1 - (summaryLen / originalLen)) * 100).toFixed(1) : '0.0';
        const totalSentences = result.totalSentences;
        const usedSentences = result.numSentences;

        const resultsHTML = `
            <h3>📝 Text Summarization Results</h3>
            <div class="result-item">
                <strong>Generated Summary:</strong>
                <div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-top:10px; border-left:4px solid #667eea;">
                    ${summary}
                </div>
            </div>
            <div class="result-item">
                <strong>Summary Statistics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Original: ${originalLen} chars</div>
                    <div class="feature-item">Summary: ${summaryLen} chars</div>
                    <div class="feature-item">Compression: ${compressionRatio}%</div>
                    <div class="feature-item">Sentences: ${totalSentences} → ${usedSentences}</div>
                </div>
            </div>
            <div class="result-item">
                <strong>Key Terms:</strong>
                <div class="tag-container">
                    ${ (result.keyTerms || []).map(t => `<span class="tag">${t}</span>`).join('') || '<span style="color:#666">No key terms</span>'}
                </div>
            </div>
        `;
        showResults(6, resultsHTML);
    }, 600);
}

/*function summarizeText() {
    const text = document.getElementById('m6-text').value.trim();
    if (!text) {
        alert('Please enter some text to summarize.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const summary = generateExtractiveSummary(text, 2);
        const sentences = text.split('.').filter(s => s.trim());
        const compressionRatio = ((text.length - summary.length) / text.length * 100).toFixed(1);

        const results = `
            <h3>📝 Text Summarization Results</h3>
            <div class="result-item">
                <strong>Generated Summary:</strong>
                <div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-top:10px; border-left:4px solid #667eea;">
                    ${summary}
                </div>
            </div>
            <div class="result-item">
                <strong>Summary Statistics:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Original: ${text.length} chars</div>
                    <div class="feature-item">Summary: ${summary.length} chars</div>
                    <div class="feature-item">Compression: ${compressionRatio}%</div>
                    <div class="feature-item">Sentences: ${sentences.length} → 2</div>
                </div>
            </div>
        `;

        showResults(6, results);
    }, 1500);
}
*/

function comprehensiveAnalysis() {
    const text = document.getElementById('m6-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const sentiment = analyzeSentiment(text);
        const summary = summarizeText(text);
        const entities = extractNamedEntities(text);
        const language = detectLanguage(text);
        const wordCount = text.split(/\s+/).length;

        const results = `
            <h3>🎯 Comprehensive Analysis Results</h3>
            <div class="result-item">
                <strong>Document Overview:</strong>
                <div class="feature-grid">
                    <div class="feature-item">Language: ${languageNames[language]}</div>
                    <div class="feature-item">Words: ${wordCount}</div>
                    <div class="feature-item">Sentiment: ${sentiment.label}</div>
                    <div class="feature-item">Entities: ${Object.values(entities).reduce((sum, arr) => sum + arr.length, 0)}</div>
                </div>
            </div>
            <div class="result-item">
                <strong>Key Summary:</strong>
                <div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-top:10px;">
                    ${summary}
                </div>
            </div>
            <div class="result-item">
                <strong>Sentiment Analysis:</strong>
                <div class="sentiment-${sentiment.label}" style="padding:10px; border-radius:5px; background:#f8f9fa;">
                    ${sentiment.label.toUpperCase()} (Score: ${sentiment.score.toFixed(2)}, Confidence: ${(sentiment.confidence * 100).toFixed(1)}%)
                </div>
            </div>
            <div class="result-item">
                <strong>Key Entities:</strong>
                ${Object.entries(entities).map(([type, entityList]) => 
                    entityList.length > 0 ? `
                        <div style="margin-bottom: 8px;">
                            <strong>${type}:</strong> ${entityList.join(', ')}
                        </div>
                    ` : ''
                ).join('')}
            </div>
        `;

        showResults(6, results);
    }, 2000);
}

function answerQuestion() {
    const question = document.getElementById('m6-question').value.trim();
    const context = document.getElementById('m6-text').value.trim();
    
    if (!question) {
        alert('Please enter a question.');
        return;
    }
    
    if (!context) {
        alert('Please enter some context text.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const answer = performQuestionAnswering(question, context);
        const questionType = identifyQuestionType(question);

        const results = `
            <h3>❓ Question Answering Results</h3>
            <div class="result-item">
                <strong>Question:</strong> ${question}
            </div>
            <div class="result-item">
                <strong>Question Type:</strong> ${questionType}
            </div>
            <div class="result-item">
                <strong>Answer:</strong>
                <div style="background:#f8f9fa; padding:15px; border-radius:5px; margin-top:10px; border-left:4px solid #28a745;">
                    ${answer}
                </div>
            </div>
        `;

        showResults(6, results);
    }, 1500);
}

function searchDocuments() {
    const query = document.getElementById('m6-search').value.trim();
    
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const documents = [
            demoData.module6.news,
            demoData.module6.sentiment,
            demoData.module6.qa,
            document.getElementById('m6-text').value.trim() || "Sample document for search demonstration."
        ];

        const searchResults = performDocumentSearch(query, documents);

        const results = `
            <h3>🔍 Document Search Results</h3>
            <div class="result-item">
                <strong>Search Query:</strong> "${query}"
            </div>
            <div class="result-item">
                <strong>Results (${searchResults.length} documents):</strong>
                ${searchResults.map((result, index) => `
                    <div style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #667eea;">
                        <div style="margin-bottom: 10px;">
                            <strong>Document ${index + 1}</strong> - Relevance: ${(result.score * 100).toFixed(1)}%
                        </div>
                        <div style="font-size: 14px;">
                            ${result.document.substring(0, 200)}${result.document.length > 200 ? '...' : ''}
                        </div>
                        <div style="margin-top: 10px;">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${result.score * 100}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        showResults(6, results);
    }, 1500);
}

// Helper functions for NLP processing
function tokenize(text) {
    return text.toLowerCase()
              .replace(/[^\w\s]/g, ' ')
              .split(/\s+/)
              .filter(token => token.length > 0);
}

function porterStem(word) {
    // Simplified Porter stemmer
    if (word.endsWith('ing') && word.length > 4) return word.slice(0, -3);
    if (word.endsWith('ed') && word.length > 3) return word.slice(0, -2);
    if (word.endsWith('s') && word.length > 2) return word.slice(0, -1);
    return word;
}

function isStopWord(word) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    return stopWords.includes(word.toLowerCase());
}

function generateNgramList(tokens, n) {
    const ngrams = [];
    for (let i = 0; i <= tokens.length - n; i++) {
        ngrams.push(tokens.slice(i, i + n).join(' '));
    }
    return ngrams;
}

function countNgrams(ngrams) {
    const counts = {};
    ngrams.forEach(ngram => {
        counts[ngram] = (counts[ngram] || 0) + 1;
    });
    return counts;
}

function calculateTextPerplexity(tokens) {
    // Simplified perplexity calculation
    const uniqueTokens = new Set(tokens);
    const vocabularySize = uniqueTokens.size;
    const textLength = tokens.length;
    return Math.pow(vocabularySize, textLength / vocabularySize);
}

function getModelQuality(perplexity) {
    if (perplexity < 50) return 'Excellent';
    if (perplexity < 100) return 'Good';
    if (perplexity < 200) return 'Fair';
    return 'Poor';
}

function getPerplexityInterpretation(perplexity) {
    if (perplexity < 50) return 'Very predictable text with consistent patterns.';
    if (perplexity < 100) return 'Moderately predictable text with some variation.';
    if (perplexity < 200) return 'Somewhat unpredictable text with diverse vocabulary.';
    return 'Highly unpredictable text with very diverse vocabulary.';
}

function performPOSTagging(tokens) {
    // Simplified POS tagging
    const posTags = [];
    const posPatterns = {
        'DT': /^(the|a|an|this|that|these|those)$/i,
        'NN': /^[a-z]+$/i,
        'VB': /^(is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|can|may|might)$/i,
        'JJ': /^(good|bad|big|small|new|old|young|high|low|long|short|important|major|recent)$/i,
        'IN': /^(in|on|at|by|for|with|from|to|of|about|under|over|through)$/i,
        'RB': /^(very|really|quite|highly|extremely|quickly|slowly|carefully|easily)$/i,
        'CC': /^(and|or|but|nor|yet|so)$/i,
        'PRP': /^(i|you|he|she|it|we|they|me|him|her|us|them)$/i
    };

    tokens.forEach(token => {
        let tag = 'NN'; // Default to noun
        for (const [pos, pattern] of Object.entries(posPatterns)) {
            if (pattern.test(token)) {
                tag = pos;
                break;
            }
        }
        posTags.push([token, tag]);
    });

    return posTags;
}

function identifyPhrases(tokens, posTags) {
    const phrases = [];
    let currentPhrase = [];
    let currentType = null;

    for (let i = 0; i < posTags.length; i++) {
        const [word, tag] = posTags[i];

        if (tag === 'DT' || tag === 'JJ' || tag === 'NN') {
            if (currentType !== 'NP') {
                if (currentPhrase.length > 0) {
                    phrases.push({ type: currentType, words: [...currentPhrase] });
                }
                currentPhrase = [word];
                currentType = 'NP';
            } else {
                currentPhrase.push(word);
            }
        } else if (tag === 'VB' || tag === 'RB') {
            if (currentType !== 'VP') {
                if (currentPhrase.length > 0) {
                    phrases.push({ type: currentType, words: [...currentPhrase] });
                }
                currentPhrase = [word];
                currentType = 'VP';
            } else {
                currentPhrase.push(word);
            }
        } else {
            if (currentPhrase.length > 0) {
                phrases.push({ type: currentType, words: [...currentPhrase] });
                currentPhrase = [];
                currentType = null;
            }
        }
    }

    if (currentPhrase.length > 0) {
        phrases.push({ type: currentType, words: currentPhrase });
    }

    return phrases;
}

function generateSimpleParseTree(tokens, posTags) {
    let tree = 'S\n';
    const phrases = identifyPhrases(tokens, posTags);
    
    phrases.forEach((phrase, index) => {
        tree += `├── ${phrase.type}\n`;
        phrase.words.forEach((word, wordIndex) => {
            const isLast = wordIndex === phrase.words.length - 1;
            tree += `│   ${isLast ? '└──' : '├──'} ${word}\n`;
        });
    });

    return tree;
}

// ===== MODULE 4: IMPROVED RULE-BASED NER =====
function extractNamedEntities(text) {
    const TITLES = ['Mr','Mrs','Ms','Dr','Prof','Sir','Madam','Mx','Miss','Rev'];
    const ORG_SUFFIXES = ['Inc','Corp','Ltd','LLC','PLC','Company','Co','University','Institute','Systems','Technologies','Bank','Group','Association','Council','Committee','Press','Media','Studio'];
    const LOCATION_PREPS = ['in','at','near','from','to','into','across','around','throughout','within','outside','along'];

    const entities = { PERSON: [], ORGANIZATION: [], LOCATION: [], DATE: [] };

    const sentences = text.match(/[^.!?]+[.!?]?/g) || [];

    for (const sentence of sentences) {
        const words = sentence.trim().split(/\s+/);

        for (let i = 0; i < words.length; i++) {
            const word = words[i].replace(/[^A-Za-z.]/g, '');
            const nextWord = (words[i + 1] || '').replace(/[^A-Za-z.]/g, '');
            const prevWord = (words[i - 1] || '').toLowerCase();

            // PERSON detection
            if (TITLES.includes(word.replace('.', '')) && nextWord) {
                const fullName = `${word} ${nextWord}`;
                if (!entities.PERSON.includes(fullName)) entities.PERSON.push(fullName);
            } 
            else if (/^[A-Z][a-z]+$/.test(word) && /^[A-Z][a-z]+$/.test(nextWord)) {
                const name = `${word} ${nextWord}`;
                if (!entities.PERSON.includes(name)) entities.PERSON.push(name);
            }

            // --- ORGANIZATION detection (enhanced) ---
const joined = [word, nextWord, words[i + 2] || ''].join(' ').replace(/[^A-Za-z\s.]/g, '').trim();
for (const suffix of ORG_SUFFIXES) {
    const regex = new RegExp(`\\b([A-Z][a-zA-Z\\s]+\\s${suffix}\\.?)(?!\\w)`, 'g');
    const match = regex.exec(joined);
    if (match && !entities.ORGANIZATION.includes(match[1].trim())) {
        entities.ORGANIZATION.push(match[1].trim());
    }
}


            // LOCATION detection
            if (LOCATION_PREPS.includes(prevWord) && /^[A-Z]/.test(word)) {
                if (!entities.LOCATION.includes(word)) entities.LOCATION.push(word);
            }
        }
    }

    // DATE detection (simple year pattern)
    const datePattern = /\b(19|20)\d{2}\b/g;
    const foundDates = text.match(datePattern);
    if (foundDates) {
        entities.DATE = [...new Set(foundDates)];
    }

    return entities;
}




function disambiguateWordsInText(text, ambiguousWords) {
    const wordSenses = {};
    const tokens = tokenize(text);

    const senseContexts = {
        'bank': {
            'financial_institution': ['money', 'account', 'loan', 'credit', 'deposit', 'financial', 'cash'],
            'river_edge': ['water', 'river', 'stream', 'shore', 'fishing', 'boat', 'flow']
        },
        'bark': {
            'dog_sound': ['dog', 'loud', 'noise', 'animal', 'pet', 'sound'],
            'tree_covering': ['tree', 'wood', 'forest', 'rough', 'brown', 'trunk']
        },
        'bat': {
            'animal': ['fly', 'cave', 'night', 'wing', 'mammal', 'dark'],
            'sports_equipment': ['baseball', 'cricket', 'hit', 'game', 'sport', 'player']
        }
    };

    ambiguousWords.forEach(word => {
        if (senseContexts[word]) {
            let bestSense = 'default';
            let maxOverlap = 0;

            Object.entries(senseContexts[word]).forEach(([sense, contextWords]) => {
                const overlap = contextWords.filter(cw => tokens.includes(cw)).length;
                if (overlap > maxOverlap) {
                    maxOverlap = overlap;
                    bestSense = sense;
                }
            });

            wordSenses[word] = bestSense;
        }
    });

    return wordSenses;
}

function calculateWordSimilarities(words) {
    const similarities = [];
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const sim = Math.random() * 0.8; // Simplified similarity
            similarities.push({
                word1: words[i],
                word2: words[j],
                similarity: sim
            });
        }
    }
    return similarities.slice(0, 3); // Return top 3
}

function resolveAnaphoricReferences(text) {
    const references = {};
    const sentences = text.split('.').map(s => s.trim()).filter(s => s);
    const pronouns = ['it', 'he', 'she', 'they', 'this', 'that', 'these', 'those'];
    
    sentences.forEach((sentence, sentIndex) => {
        const words = sentence.toLowerCase().split(/\s+/);
        
        words.forEach((word, wordIndex) => {
            if (pronouns.includes(word)) {
                // Simple heuristic: find the most recent noun
                let antecedent = 'unknown';
                
                // Look backwards in current and previous sentences
                for (let si = sentIndex; si >= 0; si--) {
                    const sentWords = sentences[si].split(/\s+/);
                    const startIndex = si === sentIndex ? wordIndex - 1 : sentWords.length - 1;
                    
                    for (let wi = startIndex; wi >= 0; wi--) {
                        const w = sentWords[wi];
                        if (w && w[0] && w[0].toUpperCase() === w[0] && w.length > 1) {
                            antecedent = w;
                            break;
                        }
                    }
                    if (antecedent !== 'unknown') break;
                }
                
                references[`${word}_${sentIndex}_${wordIndex}`] = antecedent;
            }
        });
    });

    return references;
}

function findPronouns(text) {
    const pronouns = ['it', 'he', 'she', 'they', 'this', 'that', 'these', 'those', 'him', 'her', 'them', 'its', 'his', 'hers', 'their'];
    const words = text.toLowerCase().split(/\W+/);
    return pronouns.filter(p => words.includes(p));
}

function calculateCoherence(text) {
    const sentences = text.split('.').filter(s => s.trim());
    if (sentences.length < 2) {
        return { score: 1.0, lexicalCohesion: 1.0 };
    }

    let totalOverlap = 0;
    let comparisons = 0;

    for (let i = 0; i < sentences.length - 1; i++) {
        const words1 = new Set(tokenize(sentences[i]));
        const words2 = new Set(tokenize(sentences[i + 1]));
        
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        if (union.size > 0) {
            totalOverlap += intersection.size / union.size;
            comparisons++;
        }
    }

    const lexicalCohesion = comparisons > 0 ? totalOverlap / comparisons : 0;
    const score = Math.min(1.0, lexicalCohesion * 2); // Normalize to 0-1

    return { score, lexicalCohesion };
}

function getCoherenceQuality(score) {
    if (score > 0.7) return 'Excellent';
    if (score > 0.5) return 'Good';
    if (score > 0.3) return 'Fair';
    return 'Poor';
}

function getLexicalCohesionDescription(cohesion) {
    if (cohesion > 0.4) return 'Strong lexical connections between sentences';
    if (cohesion > 0.2) return 'Moderate lexical connections between sentences';
    return 'Weak lexical connections between sentences';
}

function getCoherenceInterpretation(score) {
    if (score > 0.7) return 'The text flows very well with strong logical connections between ideas.';
    if (score > 0.5) return 'The text has good coherence with clear relationships between sentences.';
    if (score > 0.3) return 'The text has moderate coherence but could benefit from stronger connections.';
    return 'The text lacks coherence and would benefit from better organization and linking.';
}

function performSentimentAnalysis(text) {
    const words = tokenize(text);
    const totalWords = words.length;

    const positiveCount = words.filter(word => SENTIMENT_LEXICON.positive.includes(word)).length;
    const negativeCount = words.filter(word => SENTIMENT_LEXICON.negative.includes(word)).length;
    const totalEmotionalWords = positiveCount + negativeCount;

    let label = 'neutral';
    let score = 0;

    // If very few emotional words, keep as neutral
    const emotionalDensity = totalWords > 0 ? totalEmotionalWords / totalWords : 0;

    if (emotionalDensity > 0.05) { // at least 5% emotional words to count
        if (positiveCount > negativeCount) {
            label = 'positive';
            score = (positiveCount - negativeCount) / totalEmotionalWords;
        } else if (negativeCount > positiveCount) {
            label = 'negative';
            score = -(negativeCount - positiveCount) / totalEmotionalWords;
        }
    }

    // Confidence depends on both density and polarity strength
    const confidence = Math.min(1, emotionalDensity * 2); // Cap at 100%

    return { label, score, confidence };
}



function findEmotionalWords(text) {
    const words = tokenize(text);
    return {
        positive: words.filter(word => SENTIMENT_LEXICON.positive.includes(word)),
        negative: words.filter(word => SENTIMENT_LEXICON.negative.includes(word))
    };
}


/*function generateExtractiveSummary(text, numSentences = 2) {
    const sentences = text.split('.').filter(s => s.trim()).map(s => s.trim());
    
    if (sentences.length <= numSentences) {
        return text;
    }

    // Score sentences based on word frequency
    const wordFreq = {};
    const allWords = tokenize(text).filter(word => !isStopWord(word));
    
    allWords.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sentenceScores = sentences.map((sentence, index) => {
        const sentWords = tokenize(sentence).filter(word => !isStopWord(word));
        const score = sentWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
        return { sentence, score, index };
    });

    // Select top sentences and maintain order
    const topSentences = sentenceScores
        .sort((a, b) => b.score - a.score)
        .slice(0, numSentences)
        .sort((a, b) => a.index - b.index)
        .map(item => item.sentence);

    return topSentences.join('. ') + '.';
}
*/
function performQuestionAnswering(question, context) {
    const questionWords = tokenize(question).filter(word => !isStopWord(word));
    const sentences = context.split('.').filter(s => s.trim());
    
    let bestSentence = '';
    let maxOverlap = 0;

    sentences.forEach(sentence => {
        const sentWords = tokenize(sentence);
        const overlap = questionWords.filter(word => sentWords.includes(word)).length;
        
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestSentence = sentence.trim();
        }
    });

    return bestSentence || "I couldn't find a relevant answer in the provided context.";
}

function identifyQuestionType(question) {
    const q = question.toLowerCase();
    if (q.includes('what')) return 'WHAT (Definition/Description)';
    if (q.includes('who')) return 'WHO (Person)';
    if (q.includes('when')) return 'WHEN (Time)';
    if (q.includes('where')) return 'WHERE (Location)';
    if (q.includes('why')) return 'WHY (Reason)';
    if (q.includes('how')) return 'HOW (Method/Process)';
    return 'GENERAL (Other)';
}

function performDocumentSearch(query, documents) {
    const queryWords = tokenize(query);
    const results = [];

    documents.forEach(doc => {
        if (!doc.trim()) return;
        
        const docWords = tokenize(doc);
        let score = 0;

        // Calculate relevance score
        queryWords.forEach(qword => {
            const count = docWords.filter(dword => dword === qword).length;
            score += count;
        });

        // Normalize score
        score = score / Math.max(queryWords.length, 1);
        
        if (score > 0) {
            results.push({ document: doc, score });
        }
    });

    return results.sort((a, b) => b.score - a.score);
}

// Load compromise.js via CDN in index.html
// <script src="https://unpkg.com/compromise"></script>

function lemmatizeText() {
  const text = document.getElementById("m2-text").value.trim();
  if (!text) {
    alert("Please enter text for lemmatization!");
    return;
  }

  const doc = nlp(text);

  const verbs = doc.verbs().toInfinitive().out('array');
  const adjectives = doc.adjectives().out('array');
  const nouns = doc.nouns().toSingular().out('array');

  const output =
    `<h3>Lemmatization Results</h3>
     <p><b>Original:</b> ${text}</p>
     <p><b>Verbs (to infinitive):</b> ${verbs.join(', ') || '-'}</p>
     <p><b>Adjectives (base form):</b> ${adjectives.join(', ') || '-'}</p>
     <p><b>Nouns (singular):</b> ${nouns.join(', ') || '-'}</p>`;

  const resultsDiv = document.getElementById("m2-lemma-results");
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = output;
}

function runPOSTagging(){
  const text = document.getElementById('pos-text').value.trim();
  const out = document.getElementById('pos-results');
  if(!text){ out.innerHTML = "<p>Please enter a sentence.</p>"; return; }

  const lexicon = {
    'the':'DT','a':'DT','an':'DT','dog':'NN','cat':'NN','mat':'NN',
    'runs':'VBZ','sat':'VBD','ate':'VBD','on':'IN','in':'IN',
    'beautiful':'JJ','quick':'JJ','slowly':'RB','and':'CC'
  };
  const words = text.split(/\s+/);
  let tagged = words.map(w=>{
    const tag = lexicon[w.toLowerCase()] || 'NN';
    return `<span class="tooltip">${w}<span class="tooltiptext">Tag: ${tag}</span></span> (${tag})`;
  }).join(' ');
  out.innerHTML = `<p><b>Tagged Sentence:</b><br>${tagged}</p>`;
}

function runViterbi(){
  const words = document.getElementById('hmm-text').value.trim().split(/\s+/);
  const out = document.getElementById('hmm-results');
  if(!words.length){ out.innerHTML="Enter words."; return; }

  const states=['N','V'];
  const startP={'N':0.6,'V':0.4};
  const trans={'N':{'N':0.1,'V':0.9},'V':{'N':0.8,'V':0.2}};
  const emit={'N':{'cat':0.5,'mat':0.4,'dog':0.3},'V':{'sat':0.6,'runs':0.5}};
  const V=[{}], path={};

  states.forEach(s=>{
    V[0][s]=Math.log(startP[s]*(emit[s][words[0]]||1e-6));
    path[s]=[s];
  });

  for(let t=1;t<words.length;t++){
    V.push({});const newPath={};
    for(const s of states){
      let best,prob=-Infinity;
      for(const ps of states){
        const p=V[t-1][ps]+Math.log(trans[ps][s]*(emit[s][words[t]]||1e-6));
        if(p>prob){prob=p;best=ps;}
      }
      V[t][s]=prob;newPath[s]=path[best].concat(s);
    }
    Object.assign(path,newPath);
  }

  const final = states.reduce((a,b)=>V[words.length-1][a]>V[words.length-1][b]?a:b);
  out.innerHTML=`<p><b>Best tag path:</b> ${path[final].join(' → ')}</p>`;
}

function runCRF(){
  const text = document.getElementById('crf-text').value.trim();
  const words = text.split(/\s+/);
  const out = document.getElementById('crf-results');
  if(!text){ out.innerHTML="<p>Enter a sentence.</p>"; return; }

  const tags = ['NN','VB','DT','IN','JJ'];
  const results = words.map(w=>{
    const tag = tags[Math.floor(Math.random()*tags.length)];
    return `${w}(${tag})`;
  });
  out.innerHTML=`<p><b>Predicted tags (simulated):</b><br>${results.join(' ')}</p>
  <p><b>Explanation:</b> The MaxEnt/CRF models use feature weights to choose the best tags for the entire sentence jointly.</p>`;
}

function runParser(){
  const text = document.getElementById('parser-text').value.trim();
  const out = document.getElementById('parser-results');
  if(!text){ out.innerHTML="<p>Enter a sentence.</p>"; return; }

  const words = text.split(/\s+/);
  const parseTree = `
  <pre>
        S
       / \\
     NP   VP
     |    / \\
     ${words[0]||'The'}   ${words[1]||'cat'}   ${words[2]||'sat'}
  </pre>`;

  out.innerHTML=`<p><b>Top-down parser</b> builds from root (S → NP VP) downward.<br>
  <b>Bottom-up parser</b> starts from tokens and combines into phrases.<br>
  Example parse for: "${text}"</p>${parseTree}`;
}

function runCYK(){
  const words = document.getElementById('cyk-text').value.trim().split(/\s+/);
  const out = document.getElementById('cyk-results');
  if(words.length<1){out.innerHTML="Enter at least 3 words.";return;}

  const grammar={
    'S':[ ['NP','VP'] ],
    'NP':[ ['DT','NN'] ],
    'VP':[ ['VBD'], ['VBZ'] ],
    'DT':[ ['the'] ],
    'NN':[ ['cat'], ['dog'], ['mat'] ],
    'VBD':[ ['sat'], ['ate'] ],
    'VBZ':[ ['runs'] ]
  };

  let table = Array(words.length).fill().map(()=>Array(words.length).fill([]));
  for(let i=0;i<words.length;i++){
    const w=words[i];
    for(const [lhs,rules] of Object.entries(grammar))
      rules.forEach(r=>{ if(r.length===1 && r[0]===w) table[i][i].push(lhs);});
  }

  let html="<p><b>CYK Table:</b></p><table border='1' cellpadding='5'>";
  for(let i=0;i<words.length;i++){
    html+="<tr>";
    for(let j=0;j<words.length;j++)
      html+=`<td>${(table[i][j]||[]).join(', ')}</td>`;
    html+="</tr>";
  }
  html+="</table>";
  out.innerHTML=html;
}

function runPCFG(){
  const text = document.getElementById('pcfg-text').value.trim();
  const out = document.getElementById('pcfg-results');
  if(!text){out.innerHTML="Enter a sentence.";return;}
  const prob = (Math.random()*0.5+0.5).toFixed(2);
  out.innerHTML=`<p><b>Sentence:</b> "${text}"<br>
  <b>Parse Probability (example):</b> ${prob}</p>
  <p>PCFG assigns probabilities to grammar rules and picks the most likely parse tree.</p>`;
}

// === PARSING MODULE (Top-Down + CYK) ===

// Grammar for Top-Down Parsing
const grammarTD = {
  'S': [['NP', 'VP']],
  'NP': [['DT', 'NN'], ['DT', 'JJ', 'NN'], ['NN']],
  'VP': [['VBD', 'NP'], ['VBD'], ['VBD', 'PP']],
  'PP': [['IN', 'NP']],
  'DT': [['the'], ['a']],
  'JJ': [['quick'], ['brown'], ['lazy']],
  'NN': [['cat'], ['dog'], ['mat'], ['fox']],
  'VBD': [['sat'], ['ate'], ['saw']],
  'IN': [['on'], ['in'], ['with']]
};
const nontermsTD = new Set(Object.keys(grammarTD));

// CNF Grammar for CYK
const grammarCNF = {
  'S': [['NP', 'VP']],
  'NP': [['DT', 'NN'], ['NP', 'PP']],
  'VP': [['VBD', 'NP'], ['VBD', 'PP']],
  'PP': [['IN', 'NP']]
};
const lexiconCNF = {
  'DT': { 'the': 1, 'a': 1 },
  'NN': { 'cat': 1, 'dog': 1, 'mat': 1, 'fox': 1 },
  'VBD': { 'sat': 1, 'ate': 1, 'saw': 1 },
  'IN': { 'on': 1, 'in': 1, 'with': 1 },
  'JJ': { 'quick': 1, 'brown': 1, 'lazy': 1 }
};

// Clean user text → token array
function cleanTokens(s) {
  return s.trim().split(/\s+/).map(t => t.toLowerCase().replace(/[^a-z]+/g, '')).filter(Boolean);
}

// ---- Top-Down Parsing ----
function parseTopDownTry(symbol, words, pos, trace) {
  if (nontermsTD.has(symbol)) {
    const rules = grammarTD[symbol] || [];
    for (const prod of rules) {
      trace.push(`Try ${symbol} → ${prod.join(' ')}`);
      let cur = pos;
      const children = [];
      let failed = false;
      for (const sym of prod) {
        if (nontermsTD.has(sym)) {
          const res = parseTopDownTry(sym, words, cur, trace);
          if (res) {
            children.push(res.node);
            cur = res.pos;
          } else {
            failed = true;
            break;
          }
        } else {
          const w = words[cur];
          if (w === sym) {
            children.push({ type: 'term', word: w });
            cur++;
          } else {
            failed = true;
            break;
          }
        }
      }
      if (!failed) {
        trace.push(`✔ Success: ${symbol} → ${prod.join(' ')}`);
        return { node: { type: 'NT', symbol, children }, pos: cur };
      } else {
        trace.push(`✖ Fail: ${symbol} → ${prod.join(' ')}`);
      }
    }
    return null;
  } else {
    const w = words[pos];
    return (w === symbol) ? { node: { type: 'term', word: w }, pos: pos + 1 } : null;
  }
}

function runTopDown(words) {
  const trace = [];
  const res = parseTopDownTry('S', words, 0, trace);
  return { trace, tree: res && res.pos === words.length ? res.node : null };
}

// ---- CYK Parsing ----
function runCYK(words) {
  const n = words.length;
  const table = Array.from({ length: n }, () => Array.from({ length: n }, () => new Set()));
  const back = {};
  const log = [];

  const setBack = (A, i, j, data) => {
    back[A] = back[A] || {};
    back[A][i] = back[A][i] || {};
    back[A][i][j] = data;
  };

  // init lexical
  for (let i = 0; i < n; i++) {
    const w = words[i];
    for (const [A, dict] of Object.entries(lexiconCNF)) {
      if (dict[w]) {
        table[i][i].add(A);
        setBack(A, i, i, { type: 'lex', word: w });
        log.push(`Init: [${i},${i}] ← ${A} because ${A} → '${w}'`);
      }
    }
  }

  // fill table
  for (let span = 2; span <= n; span++) {
    for (let i = 0; i <= n - span; i++) {
      const j = i + span - 1;
      for (let k = i; k < j; k++) {
        for (const [A, rules] of Object.entries(grammarCNF)) {
          for (const [B, C] of rules) {
            if (table[i][k].has(B) && table[k + 1][j].has(C)) {
              table[i][j].add(A);
              setBack(A, i, j, { type: 'binary', B, C, split: k });
              log.push(`Combine: [${i},${k}] has ${B} & [${k + 1},${j}] has ${C} → add ${A} to [${i},${j}]`);
            }
          }
        }
      }
    }
  }

  return { table, back, trace: log, accepted: table[0][n - 1].has('S') };
}

function buildCYKTree(A, i, j, back) {
  const info = (back[A] && back[A][i] && back[A][i][j]) || null;
  if (!info) return { type: 'NT', symbol: A, children: [] };
  if (info.type === 'lex') return { type: 'NT', symbol: A, children: [{ type: 'term', word: info.word }] };
  const left = buildCYKTree(info.B, i, info.split, back);
  const right = buildCYKTree(info.C, info.split + 1, j, back);
  return { type: 'NT', symbol: A, children: [left, right] };
}

function renderTreeHTML(node) {
  if (!node) return '<p>No tree available.</p>';
  const rec = n => {
    if (n.type === 'term') return `<li class="leaf">${n.word}</li>`;
    return `<li>${n.symbol}<ul>${(n.children || []).map(rec).join('')}</ul></li>`;
  };
  return `<div class="tree"><ul>${rec(node)}</ul></div>`;
}

function renderCYKTableHTML(table, words) {
  const n = words.length;
  let html = '<table class="cyk-table">';
  for (let i = 0; i < n; i++) {
    html += '<tr>';
    for (let j = 0; j < n; j++) {
      if (j < i) html += '<td></td>';
      else html += `<td>[${i},${j}]<br>${[...table[i][j]].join(', ')}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

// === Main Runner ===
function runParsingAll() {
  const text = document.getElementById('parser-text').value.trim();
  const out = document.getElementById('parser-results');
  if (!text) return (out.innerHTML = '<p>Please enter a sentence.</p>');
  const words = cleanTokens(text);

  const td = runTopDown(words);
  const cyk = runCYK(words);

  let html = `<div class="parse-area">
    <div class="parse-panel">
      <h4>🔝 Top-Down Parsing (Backtracking)</h4>
      <div class="trace"><pre>${td.trace.join('\n')}</pre></div>
      ${td.tree ? `<h5>Final Parse Tree:</h5>${renderTreeHTML(td.tree)}` : `<p style="color:#b33;">No complete parse found.</p>`}
    </div>

    <div class="parse-panel">
      <h4>⬇️ Bottom-Up Parsing (CYK)</h4>
      <div class="trace"><pre>${cyk.trace.join('\n')}</pre></div>
      <h5>CYK Table:</h5>${renderCYKTableHTML(cyk.table, words)}
      ${cyk.accepted ? `<h5>Final Tree (S)</h5>${renderTreeHTML(buildCYKTree('S', 0, words.length - 1, cyk.back))}` : `<p style="color:#b33;">Sentence not accepted by grammar.</p>`}
    </div>
  </div>`;
  out.innerHTML = html;
}










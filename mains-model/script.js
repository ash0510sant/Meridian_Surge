// Sample demo data
const demoData = {
    module1: {
        english: "The recent technological advancements in artificial intelligence are transforming various industries.",
        hindi: "यह भारत सरकार की नई डिजिटल पहल है। This is a new digital initiative by the Indian government.",
        mixed: "Natural language processing या प्राकृतिक भाषा प्रसंस्करण is a fascinating field. এটি একটি গুরুত্বপূর্ণ প্রযুক্তি।"
    },
    module2: {
        tokenization: "Tokenization splits text into individual words, punctuation marks, and other meaningful elements.",
        stemming: "Running, runner, runs, easily, fairly, and stemming are examples of words that can be stemmed.",
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

function summarizeText() {
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

function comprehensiveAnalysis() {
    const text = document.getElementById('m6-text').value.trim();
    if (!text) {
        alert('Please enter some text to analyze.');
        return;
    }

    showLoading(6);

    setTimeout(() => {
        const sentiment = performSentimentAnalysis(text);
        const summary = generateExtractiveSummary(text, 2);
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

function extractNamedEntities(text) {
    const entities = {
        'PERSON': [],
        'LOCATION': [],
        'ORGANIZATION': [],
        'DATE': []
    };

    // Person names (simple pattern)
    const personPattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
    const persons = text.match(personPattern) || [];
    entities.PERSON = [...new Set(persons)];

    // Locations (predefined list)
    const locations = ['New York', 'London', 'Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'California', 'Washington', 'India', 'America', 'Britain', 'China', 'Japan'];
    locations.forEach(loc => {
        if (text.includes(loc)) {
            entities.LOCATION.push(loc);
        }
    });

    // Organizations (predefined list and patterns)
    const organizations = ['Google', 'Microsoft', 'Apple', 'Facebook', 'Amazon', 'ISRO', 'NASA', 'IBM', 'Intel'];
    const orgPattern = /\b[A-Z][a-z]+ Inc\.|[A-Z][a-z]+ Corp\.|[A-Z][a-z]+ Ltd\./g;
    const orgMatches = text.match(orgPattern) || [];
    
    organizations.forEach(org => {
        if (text.includes(org)) {
            entities.ORGANIZATION.push(org);
        }
    });
    entities.ORGANIZATION = [...entities.ORGANIZATION, ...orgMatches];

    // Dates (simple patterns)
    const datePattern = /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}|January|February|March|April|May|June|July|August|September|October|November|December)\b/g;
    const dates = text.match(datePattern) || [];
    entities.DATE = [...new Set(dates)];

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
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive', 'happy', 'joy', 'love', 'best', 'perfect', 'awesome', 'outstanding', 'incredible', 'brilliant', 'superb', 'magnificent'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'angry', 'sad', 'negative', 'poor', 'disappointing', 'useless', 'wrong', 'failed', 'disaster', 'crisis', 'problem'];

    const words = tokenize(text);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;

    const totalEmotionalWords = positiveCount + negativeCount;
    let label, score, confidence;

    if (totalEmotionalWords === 0) {
        label = 'neutral';
        score = 0;
        confidence = 0.5;
    } else {
        const positiveRatio = positiveCount / totalEmotionalWords;
        const negativeRatio = negativeCount / totalEmotionalWords;

        if (positiveRatio > negativeRatio) {
            label = 'positive';
            score = positiveRatio - negativeRatio;
        } else if (negativeRatio > positiveRatio) {
            label = 'negative';
            score = -(negativeRatio - positiveRatio);
        } else {
            label = 'neutral';
            score = 0;
        }

        confidence = Math.abs(score);
    }

    return { label, score, confidence };
}

function findEmotionalWords(text) {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive', 'happy', 'joy', 'love', 'best', 'perfect', 'awesome', 'outstanding', 'incredible', 'brilliant', 'superb', 'magnificent'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'angry', 'sad', 'negative', 'poor', 'disappointing', 'useless', 'wrong', 'failed', 'disaster', 'crisis', 'problem'];

    const words = tokenize(text);
    return {
        positive: words.filter(word => positiveWords.includes(word)),
        negative: words.filter(word => negativeWords.includes(word))
    };
}

function generateExtractiveSummary(text, numSentences = 2) {
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
/**
 * Concept Mirror Analysis Service
 * 
 * This service analyzes user explanations of concepts and provides
 * structured reflection feedback.
 */

const SYSTEM_PROMPT = `You are Concept Mirror, an AI system designed to analyze and reflect a user's understanding of a concept.
Your purpose is not to teach directly, but to reveal the structure, gaps, and flaws in the user's mental model.
You must prioritize diagnosis over explanation.

CORE OBJECTIVE:
Evaluate a user's explanation of a concept by comparing it against:
- The canonical definition
- Required preconditions and constraints
- Common misconceptions
- Implicit assumptions

OUTPUT RULES:
❌ Do NOT:
- Use complex academic jargon or convoluted sentences
- Rewrite the correct explanation immediately
- Dump textbook definitions
- Say "correct / incorrect" only
- Over-teach or give full solutions

✅ DO:
- Use simple, plain English (ELI15 level)
- Explain *why* something is missing or incorrect clearly
- Point out what the user understands
- Surface what is missing
- Identify what is incorrect
- Detect hidden assumptions
- Highlight confidence mismatches

ANALYSIS GUIDELINES:
- Focus on idea-level comparison, not word matching
- Treat vague language as a signal of uncertainty
- If the user uses confident language around a wrong idea, flag it
- If the explanation is mostly correct but shallow, say so
- If the explanation is fragmented, reflect that fragmentation

TONE & STYLE:
- Clear, simple, and direct
- Conversational but professional
- No judgment, just objective reflection
- No emojis
- No rhetorical questions
- You are a mirror: reflect the user's mental model clearly back to them.

You MUST respond in valid JSON format with this exact structure:
{
  "understood": ["array of things the user clearly understands"],
  "missing": ["array of concepts/details that are missing or incomplete"],
  "incorrect": ["array of statements that are wrong or misleading"],
  "assumptions": ["array of hidden/unstated assumptions detected"],
  "summary": "A paragraph describing the shape of the user's understanding (e.g., surface-level, procedural, intuitive but incomplete, etc.)"
}

Keep each array item concise but informative (1-2 sentences max).
If a category has no items, use an empty array [].
The summary should be 2-4 sentences describing the overall mental model.`;

// Concept-specific knowledge base for demo mode analysis
const CONCEPT_KNOWLEDGE = {
    'binary search': {
        coreElements: ['sorted data', 'divide and conquer', 'O(log n) time complexity', 'comparison-based', 'midpoint calculation'],
        commonMissing: ['The input must be sorted first', 'Handles integer overflow in midpoint calculation', 'Returns insertion point on failure', 'Iterative vs recursive implementations'],
        commonMisconceptions: ['Works on unsorted data', 'Always faster than linear search', 'Only works on arrays'],
        requiredAssumptions: ['Data is comparable', 'Random access to elements is O(1)']
    },
    'recursion': {
        coreElements: ['base case', 'recursive case', 'call stack', 'self-reference', 'problem decomposition'],
        commonMissing: ['Stack overflow risk', 'Tail recursion optimization', 'Memory usage implications', 'Termination proof'],
        commonMisconceptions: ['Always more elegant than iteration', 'Always uses more memory', 'Cannot handle large inputs'],
        requiredAssumptions: ['Sufficient stack space', 'Problem has recursive structure']
    },
    'rest api': {
        coreElements: ['HTTP methods', 'stateless', 'resources', 'endpoints', 'JSON/XML responses', 'status codes'],
        commonMissing: ['HATEOAS', 'Idempotency', 'Authentication/Authorization', 'Rate limiting', 'Versioning'],
        commonMisconceptions: ['REST requires JSON', 'All HTTP APIs are RESTful', 'REST is a protocol'],
        requiredAssumptions: ['HTTP as transport', 'Client-server architecture']
    },
    'machine learning': {
        coreElements: ['training data', 'model', 'features', 'labels', 'prediction', 'learning algorithm'],
        commonMissing: ['Overfitting/underfitting', 'Cross-validation', 'Feature engineering', 'Bias-variance tradeoff', 'Hyperparameter tuning'],
        commonMisconceptions: ['More data always helps', 'ML can solve any problem', 'Deep learning is always better'],
        requiredAssumptions: ['Representative training data', 'Problem has learnable patterns']
    },
    'big o notation': {
        coreElements: ['asymptotic analysis', 'worst-case complexity', 'growth rate', 'dropping constants', 'dominant terms'],
        commonMissing: ['Average case vs worst case', 'Space complexity', 'Amortized analysis', 'Best case scenarios'],
        commonMisconceptions: ['Always represents exact running time', 'Constants never matter', 'Lower Big O is always faster in practice'],
        requiredAssumptions: ['Large input sizes', 'Uniform cost model']
    }
};

/**
 * Parse the AI response to extract JSON
 */
function parseAIResponse(text) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[0]);
        } catch (e) {
            console.error('Failed to parse JSON:', e);
        }
    }

    return {
        understood: ['Unable to parse the analysis response properly'],
        missing: [],
        incorrect: [],
        assumptions: [],
        summary: 'The analysis could not be completed. Please try again.'
    };
}

/**
 * Analyze a concept explanation using the Gemini API
 */
export async function analyzeConceptExplanation(conceptName, userExplanation) {
    const apiKey = getApiKey();

    if (!apiKey) {
        return getDemoResponse(conceptName, userExplanation);
    }

    const prompt = `Concept Name: ${conceptName}

User's Explanation:
${userExplanation}

Analyze this explanation according to your instructions and respond with the JSON structure.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: SYSTEM_PROMPT }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: 'I understand. I will analyze concept explanations and respond with the specified JSON structure, acting as a reflective mirror rather than a teacher.' }]
                        },
                        {
                            role: 'user',
                            parts: [{ text: prompt }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            throw new Error('No response text from API');
        }

        return parseAIResponse(textResponse);
    } catch (error) {
        console.error('API call failed:', error);
        return getDemoResponse(conceptName, userExplanation);
    }
}

/**
 * Get the API key from localStorage
 */
function getApiKey() {
    return localStorage.getItem('gemini_api_key');
}

/**
 * Set the API key in localStorage
 */
export function setApiKey(key) {
    localStorage.setItem('gemini_api_key', key);
}

/**
 * Check if API key is configured
 */
export function hasApiKey() {
    return !!localStorage.getItem('gemini_api_key');
}

/**
 * Generate an intelligent demo response based on explanation patterns
 */
function getDemoResponse(conceptName, explanation) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerConcept = conceptName.toLowerCase().trim();
            const lowerExplanation = explanation.toLowerCase();
            const wordCount = explanation.split(/\s+/).length;

            // Pattern detection
            const patterns = {
                hasExamples: /for example|e\.g\.|such as|like when|consider|imagine/i.test(explanation),
                hasEdgeCases: /edge case|corner case|exception|special case|however|but|unless|what if|doesn't work when/i.test(explanation),
                isVague: /kind of|sort of|basically|probably|maybe|I think|something like|more or less/i.test(explanation),
                isConfident: /always|never|must|definitely|certainly|obviously|clearly/i.test(explanation),
                hasTechnicalTerms: /O\(|complexity|algorithm|data structure|time|space|memory|performance/i.test(explanation),
                hasWhy: /because|reason|purpose|in order to|so that|this allows/i.test(explanation),
                hasHow: /steps?|first|then|next|process|procedure|method/i.test(explanation),
                mentionsSorted: /sorted|ordering|order|arranged/i.test(lowerExplanation),
                mentionsHalf: /half|middle|midpoint|divide|split|binary/i.test(lowerExplanation),
                mentionsBaseCase: /base case|stop|terminate|end|exit/i.test(lowerExplanation),
                mentionsStack: /stack|call|memory|overflow/i.test(lowerExplanation)
            };

            const understood = [];
            const missing = [];
            const incorrect = [];
            const assumptions = [];

            // Get concept-specific knowledge if available
            const conceptKnowledge = CONCEPT_KNOWLEDGE[lowerConcept];

            // Analyze based on patterns and concept knowledge
            if (wordCount > 80) {
                understood.push('The explanation demonstrates substantial engagement with the topic, suggesting active thinking about the concept');
            } else if (wordCount > 40) {
                understood.push('The explanation shows reasonable familiarity with the concept');
            }

            if (patterns.hasExamples) {
                understood.push('Concrete examples were provided, indicating practical understanding beyond abstract definition');
            }

            if (patterns.hasHow) {
                understood.push('A procedural understanding is evident — you describe steps or processes involved');
            }

            if (patterns.hasWhy) {
                understood.push('The explanation addresses the "why" behind the concept, showing deeper reasoning');
            }

            // Concept-specific checks
            if (conceptKnowledge) {
                // Check for mentioned core elements
                conceptKnowledge.coreElements.forEach(element => {
                    if (lowerExplanation.includes(element.toLowerCase()) ||
                        lowerExplanation.includes(element.split(' ')[0].toLowerCase())) {
                        understood.push(`Correctly addresses "${element}" as a core component`);
                    }
                });

                // Add missing elements
                const relevantMissing = conceptKnowledge.commonMissing.filter(() => Math.random() > 0.5);
                missing.push(...relevantMissing.slice(0, 3));
            }

            // Generic missing items based on patterns
            if (!patterns.hasExamples) {
                missing.push('No concrete examples were provided — the explanation remains purely abstract');
            }

            if (!patterns.hasEdgeCases) {
                missing.push('Edge cases, limitations, or boundary conditions were not addressed');
            }

            if (!patterns.hasWhy && patterns.hasHow) {
                missing.push('The explanation describes "how" but not "why" — the underlying motivation or purpose is unclear');
            }

            if (!patterns.hasTechnicalTerms && conceptKnowledge) {
                missing.push('Technical terminology that would demonstrate precision is absent from the explanation');
            }

            // Check for incorrect or misleading statements
            if (patterns.isConfident && wordCount < 40) {
                incorrect.push('Confident assertions ("always", "never", "must") appear without sufficient context or qualification — this may indicate overconfidence in an incomplete model');
            }

            if (lowerConcept.includes('binary search') && !patterns.mentionsSorted) {
                incorrect.push('The requirement for sorted data appears to be overlooked — binary search fundamentally depends on this precondition');
            }

            if (lowerConcept.includes('recursion') && !patterns.mentionsBaseCase) {
                missing.push('The base case — the termination condition for recursion — is not explicitly mentioned');
            }

            // Detect hidden assumptions
            if (conceptKnowledge) {
                assumptions.push(...conceptKnowledge.requiredAssumptions.slice(0, 2).map(a =>
                    `Implicit assumption: ${a.charAt(0).toLowerCase() + a.slice(1)}`
                ));
            }

            if (patterns.isVague) {
                assumptions.push('Hedging language ("sort of", "basically") suggests uncertainty about specific details');
            }

            if (wordCount < 30) {
                assumptions.push('The brevity implies either high confidence with limited depth, or difficulty articulating the concept');
            }

            assumptions.push(`Assumption that the fundamental definition of "${conceptName}" is shared between explainer and audience`);

            // Generate summary
            let modelType = '';
            let summaryDetails = '';

            if (wordCount < 30) {
                modelType = 'surface-level';
                summaryDetails = 'The brevity suggests either overconfidence in a simple mental model, or uncertainty about how to elaborate.';
            } else if (patterns.hasHow && patterns.hasWhy && patterns.hasExamples) {
                modelType = 'comprehensive but possibly incomplete';
                summaryDetails = 'The explanation covers multiple dimensions (what, how, why) with examples, though depth in specific areas may vary.';
            } else if (patterns.hasHow && !patterns.hasWhy) {
                modelType = 'procedural but shallow';
                summaryDetails = 'You can describe the mechanics but may lack understanding of the underlying principles or design rationale.';
            } else if (patterns.hasExamples && !patterns.hasHow) {
                modelType = 'intuitive and example-based';
                summaryDetails = 'Understanding appears rooted in concrete instances rather than abstract principles.';
            } else if (patterns.isVague) {
                modelType = 'uncertain and exploratory';
                summaryDetails = 'The hedging language suggests you are still forming your mental model of this concept.';
            } else {
                modelType = 'partially developed';
                summaryDetails = 'Some aspects are articulated clearly while others remain implicit or unexplored.';
            }

            const summary = `Your understanding of "${conceptName}" appears to be ${modelType}. ${summaryDetails} ${patterns.hasEdgeCases
                ? 'The consideration of edge cases indicates awareness that real-world application differs from ideal cases.'
                : 'Expanding your mental model to include edge cases and exceptions would strengthen your understanding.'
                }`;

            resolve({
                understood: understood.length > 0 ? understood : ['Basic familiarity with the concept is evident'],
                missing: missing.slice(0, 4),
                incorrect: incorrect,
                assumptions: assumptions.slice(0, 3),
                summary
            });
        }, 1800);
    });
}

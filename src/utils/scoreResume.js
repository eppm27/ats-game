import keywordBanks from './keywordBanks';

export const scoreResume = (resumeText, selectedRole) => {
  const text = resumeText.toLowerCase();
  let score = 50; // Start with 50
  const feedback = [];

  if (!resumeText.trim()) {
    return { score: 0, feedback: ['Your resume is empty! Add content to get scored.'] };
  }

  // 1. Length check (optimal: 400-800 words)
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 100) {
    score -= 15;
    feedback.push('⚠️ Resume too short (< 100 words). Add more details!');
  } else if (wordCount > 1000) {
    score -= 10;
    feedback.push('⚠️ Resume too long (> 1000 words). Keep it concise.');
  } else if (wordCount >= 400 && wordCount <= 800) {
    score += 10;
    feedback.push('✅ Good resume length (400-800 words).');
  }

  // 2. Format checks
  const hasBulletPoints = /\n\s*[-•*]\s/.test(resumeText);
  if (hasBulletPoints) {
    score += 8;
    feedback.push('✅ Nice use of bullet points.');
  } else {
    score -= 5;
    feedback.push('⚠️ No bullet points detected. Use bullet points for readability.');
  }

  const hasDates = /\b(20\d{2}|19\d{2})\b/.test(text);
  if (hasDates) {
    score += 5;
    feedback.push('✅ Dates included (good for timeline clarity).');
  } else {
    score -= 3;
    feedback.push('⚠️ Consider adding dates for clarity.');
  }

  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(text);
  const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text);
  if (hasEmail && hasPhone) {
    score += 10;
    feedback.push('✅ Contact info included (email & phone).');
  } else if (hasEmail || hasPhone) {
    score += 5;
    feedback.push('💡 Consider adding both email and phone.');
  } else {
    score -= 10;
    feedback.push('❌ No contact information found!');
  }

  // 3. Role-specific keywords
  const roleKeywords = keywordBanks[selectedRole] || [];
  let matchedKeywords = 0;

  roleKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
    const matches = text.match(regex) || [];
    matchedKeywords += matches.length;
  });

  const keywordScore = Math.min(25, matchedKeywords * 2);
  score += keywordScore;

  if (matchedKeywords >= 8) {
    feedback.push(`✅ Great keyword match (${matchedKeywords} role-specific terms found)!`);
  } else if (matchedKeywords >= 4) {
    feedback.push(`💡 Found ${matchedKeywords} relevant keywords. Could use more.`);
  } else {
    feedback.push(`❌ Only ${matchedKeywords} relevant keywords found. Add more role-specific skills!`);
  }

  // 4. GPA mention (optional bonus)
  if (/gpa|3\.\d|4\.0/i.test(text)) {
    score += 3;
    feedback.push('💡 GPA mentioned (nice touch for internships).');
  }

  // 5. Action verbs check
  const actionVerbs = [
    'developed', 'created', 'built', 'led', 'managed', 'designed',
    'implemented', 'optimized', 'analyzed', 'collaborated', 'improved'
  ];
  let actionVerbCount = 0;
  actionVerbs.forEach((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'gi');
    actionVerbCount += (text.match(regex) || []).length;
  });

  if (actionVerbCount >= 5) {
    score += 8;
    feedback.push('✅ Strong action verbs used throughout.');
  } else if (actionVerbCount > 0) {
    score += 3;
    feedback.push('💡 Try using more action verbs (built, led, optimized, etc).');
  } else {
    feedback.push('❌ No action verbs detected. Start with power words!');
  }

  // 6. Quantifiable results
  const hasNumbers = /\b\d+(?:%|x|times?|results?|users?|seconds?|days?|months?|years?)\b/i.test(text);
  if (hasNumbers) {
    score += 8;
    feedback.push('✅ Quantifiable results included (numbers/metrics).');
  } else {
    feedback.push('💡 Add quantifiable metrics (e.g., "improved by 25%", "served 500+ users").');
  }

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  return { score: Math.round(score), feedback };
};

import keywordBanks from './keywordBanks';

export const scoreResume = (resumeText, selectedRole) => {
  const text = resumeText.toLowerCase();
  let score = 50; // Start with 50
  const feedback = [];

  if (!resumeText.trim()) {
    return { score: 0, feedback: ['❌ Resume content is required for evaluation.'] };
  }

  // 1. Length check (optimal: 400-800 words)
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 100) {
    score -= 15;
    feedback.push('⚠️ This resume is a haiku. Add more detail.');
  } else if (wordCount > 1000) {
    score -= 10;
    feedback.push('⚠️ This resume has novel energy. Recruiters want a short story.');
  } else if (wordCount >= 400 && wordCount <= 800) {
    score += 10;
    feedback.push('✅ Length is perfect. Goldilocks vibes.');
  }

  // 2. Format checks
  const hasBulletPoints = /\n\s*[-•*]\s/.test(resumeText);
  if (hasBulletPoints) {
    score += 8;
    feedback.push('✅ Bullet points found. ATS is happy.');
  } else {
    score -= 5;
    feedback.push('⚠️ Add bullets. Wall of text looks like a paragraph enemy.');
  }

  const hasDates = /\b(20\d{2}|19\d{2})\b/.test(text);
  if (hasDates) {
    score += 5;
    feedback.push('✅ Dates included. Recruiters can follow your career arc.');
  } else {
    score -= 3;
    feedback.push('⚠️ Add dates. When did you do this stuff?');
  }

  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(text);
  const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text);
  if (hasEmail && hasPhone) {
    score += 10;
    feedback.push('✅ Recruiter can reach you. Both email and phone detected.');
  } else if (hasEmail || hasPhone) {
    score += 5;
    feedback.push('⚠️ Missing either email or phone. Recruiters hate guessing.');
  } else {
    score -= 10;
    feedback.push('❌ No contact info found. How will they call you?');
  }

  // 3. Role-specific keywords
  const roleKeywords = keywordBanks[selectedRole] || [];
  let matchedKeywords = 0;

  roleKeywords.forEach((keyword) => {
    // Escape special regex characters in the keyword
    const escapedKeyword = keyword.toLowerCase().replace(/[+*?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'g');
    const matches = text.match(regex) || [];
    matchedKeywords += matches.length;
  });

  const keywordScore = Math.min(25, matchedKeywords * 2);
  score += keywordScore;

  if (matchedKeywords >= 8) {
    feedback.push(`✅ Keyword alignment is fire. ${matchedKeywords} role terms matched.`);
  } else if (matchedKeywords >= 4) {
    feedback.push(`⚠️ Only ${matchedKeywords} keywords matched. Recruiters will get the vibe check wrong.`);
  } else {
    feedback.push(`❌ ${matchedKeywords} keywords? The ATS has no idea what you do.`);
  }

  // 4. GPA mention (optional bonus)
  if (/gpa|3\.\d|4\.0/i.test(text)) {
    score += 3;
    feedback.push('✅ GPA included. Flexing the academics.');
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
    feedback.push('✅ Action verbs everywhere. This resume moves.');
  } else if (actionVerbCount > 0) {
    score += 3;
    feedback.push('⚠️ Need more power. Replace "worked on" with "led" or "built".');
  } else {
    feedback.push('❌ No action verbs detected. Recruiters will assume you observed things happen.');
  }

  // 6. Quantifiable results
  const hasNumbers = /\b\d+(?:%|x|times?|results?|users?|seconds?|days?|months?|years?)\b/i.test(text);
  if (hasNumbers) {
    score += 8;
    feedback.push('✅ Metrics found. Proof that you actually did things.');
  } else {
    feedback.push('⚠️ Add numbers. "Increased engagement" > "increased engagement by 40%".');
  }

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  return { score: Math.round(score), feedback };
};

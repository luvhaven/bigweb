export type LeadScoreFactors = {
    budget?: string
    company?: string
    messageLength: number
    hasInspiration: boolean
}

export function calculateLeadScore(factors: LeadScoreFactors): { score: number; tier: 'Low' | 'Medium' | 'High' | 'Elite' } {
    let score = 0

    // Budget Scoring
    if (factors.budget) {
        if (factors.budget.includes('$50,000+')) score += 50
        else if (factors.budget.includes('$25,000')) score += 30
        else if (factors.budget.includes('$10,000')) score += 20
        else if (factors.budget.includes('$5,000')) score += 10
    }

    // Company Information
    if (factors.company && factors.company.length > 2) {
        score += 15
    }

    // Message Detail
    if (factors.messageLength > 200) score += 20
    else if (factors.messageLength > 100) score += 10

    // Inspiration/Research
    if (factors.hasInspiration) {
        score += 15
    }

    // Determine Tier
    let tier: 'Low' | 'Medium' | 'High' | 'Elite' = 'Low'
    if (score >= 80) tier = 'Elite'
    else if (score >= 50) tier = 'High'
    else if (score >= 30) tier = 'Medium'

    return { score, tier }
}

/**
 * Dynamic Stats Calculator
 * Generates realistic, time-based stats for a medium-sized digital agency
 * 
 * Baseline Date: December 29, 2025
 */

const BASELINE_DATE = new Date('2025-12-29T00:00:00Z')

interface DynamicStatConfig {
    baselineValue: number
    incrementPer: 'day' | 'week' | 'month' | 'year'
    incrementAmount: number
}

/**
 * Calculate stats based on time elapsed since baseline
 */
export function calculateDynamicStats() {
    const now = new Date()
    const daysSinceBaseline = Math.floor((now.getTime() - BASELINE_DATE.getTime()) / (1000 * 60 * 60 * 24))
    const weeksSinceBaseline = Math.floor(daysSinceBaseline / 7)
    const monthsSinceBaseline = Math.floor(daysSinceBaseline / 30)
    const yearsSinceBaseline = Math.floor(daysSinceBaseline / 365)

    // Projects Completed: +1 every week
    const projectsCompleted = 247 + weeksSinceBaseline

    // Happy Clients: +1 every month  
    const happyClients = 89 + monthsSinceBaseline

    // Lines of Code: Start at 12,253,216, +500 lines per day (realistic for medium agency)
    const linesOfCode = 12253216 + (daysSinceBaseline * 500)

    // Coffees Consumed: +12 per day (team of ~10 people)
    const coffeesConsumed = 8547 + (daysSinceBaseline * 12)

    return {
        projectsCompleted,
        happyClients,
        linesOfCode,
        coffeesConsumed,
        // Metadata for debugging
        _meta: {
            daysSinceBaseline,
            weeksSinceBaseline,
            monthsSinceBaseline,
            baselineDate: BASELINE_DATE.toISOString()
        }
    }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
    return num.toLocaleString('en-US')
}

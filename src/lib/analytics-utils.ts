
/**
 * Analytics Utility Functions
 * Handles User-Agent parsing and other analytics helpers without external dependencies.
 */

export interface UserAgentInfo {
    browser: string;
    os: string;
    device: 'mobile' | 'tablet' | 'desktop';
}

export function parseUserAgent(ua: string): UserAgentInfo {
    const lowerUA = ua.toLowerCase();

    // Detect Device
    let device: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(lowerUA)) {
        device = 'tablet';
    } else if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        device = 'mobile';
    }

    // Detect OS
    let os = 'Unknown OS';
    if (lowerUA.includes('windows')) os = 'Windows';
    else if (lowerUA.includes('mac os')) os = 'macOS';
    else if (lowerUA.includes('linux')) os = 'Linux';
    else if (lowerUA.includes('android')) os = 'Android';
    else if (lowerUA.includes('ios') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) os = 'iOS';

    // Detect Browser
    let browser = 'Unknown Browser';
    if (lowerUA.includes('firefox')) browser = 'Firefox';
    else if (lowerUA.includes('samsung')) browser = 'Samsung Internet';
    else if (lowerUA.includes('opera') || lowerUA.includes('opr')) browser = 'Opera';
    else if (lowerUA.includes('edge')) browser = 'Edge';
    else if (lowerUA.includes('chrome')) browser = 'Chrome';
    else if (lowerUA.includes('safari')) browser = 'Safari';
    else if (lowerUA.includes('trident') || lowerUA.includes('msie')) browser = 'Internet Explorer';

    return { browser, os, device };
}

export function getCountryFromHeaders(headers: Headers): string | null {
    // Check standard headers used by Vercel, Cloudflare, Netlify, etc.
    return (
        headers.get('x-vercel-ip-country') ||
        headers.get('cf-ipcountry') ||
        headers.get('x-country-code') ||
        null
    );
}

export function getCityFromHeaders(headers: Headers): string | null {
    return (
        headers.get('x-vercel-ip-city') ||
        headers.get('x-city') ||
        null
    );
}

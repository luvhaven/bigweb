'use client';

import { useState, useEffect } from 'react';

type Industry = 'generic' | 'ecommerce' | 'saas' | 'fintech' | 'healthcare' | 'agency';

interface PersonalizationData {
  industry: Industry;
  headlineNoun: string;
}

const INDUSTRY_DATA: Record<Industry, PersonalizationData> = {
  generic: { industry: 'generic', headlineNoun: 'website' },
  ecommerce: { industry: 'ecommerce', headlineNoun: 'eCommerce store' },
  saas: { industry: 'saas', headlineNoun: 'SaaS product' },
  fintech: { industry: 'fintech', headlineNoun: 'Fintech app' },
  healthcare: { industry: 'healthcare', headlineNoun: 'Healthcare portal' },
  agency: { industry: 'agency', headlineNoun: 'Agency website' },
};

export function usePersonalization() {
  const [data, setData] = useState<PersonalizationData>(INDUSTRY_DATA.generic);

  useEffect(() => {
    // Run entirely on the client to avoid Next.js Suspense requirements
    const searchParams = new URLSearchParams(window.location.search);
    const urlIndustry = searchParams.get('industry')?.toLowerCase() as Industry;
    
    if (urlIndustry && INDUSTRY_DATA[urlIndustry]) {
      setData(INDUSTRY_DATA[urlIndustry]);
      localStorage.setItem('bigweb_industry', urlIndustry);
      return;
    }

    // 2. Fallback to localStorage if available
    const savedIndustry = localStorage.getItem('bigweb_industry') as Industry;
    if (savedIndustry && INDUSTRY_DATA[savedIndustry]) {
      setData(INDUSTRY_DATA[savedIndustry]);
    }
  }, []);

  return data;
}

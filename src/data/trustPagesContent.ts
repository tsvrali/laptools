import { siteConfig } from './siteConfig';

export interface TrustPageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  lastUpdated: string;
  sections: { heading?: string; content: string[] }[];
}

export const trustPages: Record<string, TrustPageContent> = {
  about: {
    slug: 'about',
    title: `About ${siteConfig.siteName} - Our Quantitative Methodology & Team`,
    metaDescription: `Learn about ${siteConfig.siteName}, operated by ${siteConfig.ownerName}. Discover our mathematical review process, data verification standards, and editorial independence.`,
    h1: `About ${siteConfig.siteName}`,
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: 'Our Mission & Identity',
        content: [
          `${siteConfig.siteName} is an independent, authoritative mathematical reference and interactive computing platform published by ${siteConfig.ownerName}, based in the ${siteConfig.ownerCountry}.`,
          'Our mission is straightforward: empower American households, freelancers, small business owners, and learners with rigorous, lightning-fast, and completely private calculation tools. We believe fundamental financial, tax, and measurement calculations should be transparent, mathematically verifiable, and accessible to anyone without subscriptions, paywalls, or invasive personal data harvesting.'
        ]
      },
      {
        heading: 'How Our Tools Are Built and Audited',
        content: [
          `Every calculator and converter on ${siteConfig.siteName} undergoes a strict three-phase engineering and editorial verification process before publication:`,
          '1. Primary Source Grounding: We never guess or rely on secondary forum posts. Tax brackets and standard deductions are cross-referenced directly with official IRS revenue procedures (such as Rev. Proc. 2025-32 and Form 1040 instructions). Consumer loan equations adhere strictly to Consumer Financial Protection Bureau (CFPB) Truth in Lending regulations (Regulation Z). Unit conversions utilize exact National Institute of Standards and Technology (NIST) constants.',
          '2. Client-Side Browser Privacy: All calculation algorithms execute entirely inside your local web browser. Your confidential financial figures—such as your mortgage balance, credit card APR, business profits, and paycheck amounts—never leave your device or touch our servers.',
          '3. Algorithmic Unit Testing: Our quantitative engine is maintained with automated test suites validating edge cases (such as zero interest, leap years, negative amortization thresholds, and boundary tax brackets) against published government benchmarks.'
        ]
      },
      {
        heading: 'Primary Authoritative Reference Sources',
        content: [
          'We maintain active citation links to primary institutional authorities across all domains:',
          '• Internal Revenue Service (IRS): Federal tax brackets, FICA payroll caps, and Schedule SE self-employment procedures.',
          '• Consumer Financial Protection Bureau (CFPB): Mortgage disclosure rules, APR calculation standards, and debt repayment models.',
          '• European Central Bank (ECB) & Federal Reserve: Foreign exchange benchmark reference feeds.',
          '• National Institute of Standards and Technology (NIST): International physical constants and metric/imperial conversion coefficients.',
          '• United States Department of Agriculture (USDA) FoodData Central: Volumetric density tables for baking and culinary conversions.',
          '• Centers for Disease Control and Prevention (CDC) & American Council on Exercise (ACE): Clinical energy expenditure and body composition standards.'
        ]
      },
      {
        heading: 'Commitment to Transparency & Corrections',
        content: [
          'Calculators require continuous maintenance as tax codes evolve and fee schedules adjust. We publish a visible "Last updated" date and "Reviewed by" attribution on every single tool page.',
          `If you notice any discrepancy, regulatory change, or potential calculation bug, our quantitative review team welcomes your feedback. Please contact us directly at ${siteConfig.contactEmail}. Inquiries and error reports are acknowledged and investigated within 24 to 48 business hours.`
        ]
      }
    ]
  },

  contact: {
    slug: 'contact',
    title: `Contact Us - ${siteConfig.siteName}`,
    metaDescription: `Get in touch with the editorial and technical team at ${siteConfig.siteName}. Submit bug reports, formula corrections, partnership inquiries, or feedback.`,
    h1: 'Contact Our Editorial & Engineering Team',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: 'We Value Your Feedback & Inquiries',
        content: [
          `Whether you have identified an IRS regulatory update, discovered an edge-case calculation discrepancy, or have an editorial suggestion, the ${siteConfig.siteName} team is here to assist.`,
          `Our direct editorial desk can be reached via email at ${siteConfig.contactEmail}. For convenience, you may also use the interactive inquiry form below.`
        ]
      },
      {
        heading: 'Response Time & Inquiry Topics',
        content: [
          'Our team operates Monday through Friday during standard US business hours (9:00 AM - 5:00 PM Eastern Time). We prioritize inquiries as follows:',
          '• Mathematical & Calculation Corrections: Reviewed by our quantitative team within 24 hours.',
          '• General Questions & Feedback: Typically answered within 1-2 business days.',
          '• Commercial & Advertising Inquiries: Addressed within 2-3 business days.'
        ]
      }
    ]
  },

  'privacy-policy': {
    slug: 'privacy-policy',
    title: `Privacy Policy - ${siteConfig.siteName}`,
    metaDescription: `Privacy Policy for ${siteConfig.siteName}. Explains our strict zero-server calculation data storage, cookie usage, Google AdSense compliance, CCPA/CPRA, and GDPR rights.`,
    h1: 'Privacy Policy',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: '1. Introduction & Core Principle: Local Browser Processing',
        content: [
          `This Privacy Policy governs your use of ${siteConfig.siteName} (${siteConfig.domain}), operated by ${siteConfig.ownerName} ("we," "us," or "our"). We are committed to transparency and respect for your personal privacy.`,
          'CRITICAL PRIVACY GUARANTEE: All numerical inputs, financial parameters, debts, wages, and measurements entered into our calculators are processed locally in your client-side browser runtime. We do not transmit, log, record, or store your private calculator numbers on our servers or in any external database.'
        ]
      },
      {
        heading: '2. Information Automatically Collected & Cookies',
        content: [
          'When you access our website, standard web server logs may automatically record non-personally identifiable technical information such as your IP address, browser user-agent, operating system, referring URL, and page request timestamps to ensure server security and performance.',
          'Cookies are small text files placed on your device to maintain user preferences (such as dark mode toggle and cookie consent status).'
        ]
      },
      {
        heading: '3. Google AdSense & Third-Party Advertising Vendors',
        content: [
          'Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to our website or other websites on the Internet.',
          'Google\'s use of advertising cookies enables it and its partners to serve personalized ads to our visitors based on their visit to our sites and/or other sites on the Internet.',
          'Users in the United States and globally may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or through the Digital Advertising Alliance Consumer Choice tool at https://www.aboutads.info/choices/.',
          'For visitors located in the European Economic Area (EEA), the United Kingdom, or Switzerland, we provide a Google-certified Consent Management Platform (CMP) allowing you to consent to or decline non-essential and advertising cookies.'
        ]
      },
      {
        heading: '4. California Consumer Privacy Rights (CCPA / CPRA)',
        content: [
          'If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) grant you specific statutory rights regarding your personal information, including the right to know what personal data is collected, request deletion, and opt out of the "sale" or "sharing" of personal information for cross-context behavioral advertising.',
          'We do not sell personal information for monetary compensation. You may exercise your statutory rights by contacting us at ' + siteConfig.contactEmail + '.'
        ]
      },
      {
        heading: '5. European Economic Area (GDPR) & UK GDPR Rights',
        content: [
          'Under the EU General Data Protection Regulation (GDPR) and UK Data Protection Act 2018, individuals located in the EEA and UK possess the right to access, rectify, or erase personal data, restrict processing, and lodge complaints with national supervisory authorities.',
          'Our legal basis for processing essential server logs is legitimate interest (security and availability). Any non-essential cookies or personalized advertising require your explicit affirmative consent.'
        ]
      },
      {
        heading: '6. Children\'s Privacy Protection (COPPA)',
        content: [
          'Our website and calculation tools are designed for general audiences and are not directed to children under the age of 13. We do not knowingly collect personal identifiable information from children under 13 years of age.'
        ]
      },
      {
        heading: '7. Contact for Privacy Inquiries',
        content: [
          `If you have questions or concerns regarding this Privacy Policy or our data practices, please contact our Data Protection Coordinator at ${siteConfig.contactEmail}.`
        ]
      }
    ]
  },

  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: `Terms and Conditions - ${siteConfig.siteName}`,
    metaDescription: `Terms and Conditions of use for ${siteConfig.siteName}. Understand intellectual property, acceptable use, limitation of liability, and governing law.`,
    h1: 'Terms and Conditions',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: '1. Agreement to Terms',
        content: [
          `By accessing or using ${siteConfig.siteName} (${siteConfig.domain}), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please discontinue use of the site immediately.`
        ]
      },
      {
        heading: '2. Permitted Use & Intellectual Property',
        content: [
          'All software, calculation engines, interface designs, textual content, worked examples, and graphics on this website are the intellectual property of ' + siteConfig.ownerName + ' and protected by United States and international copyright and trademark laws.',
          'You are granted a limited, non-exclusive, non-transferable license to access and use the tools for personal, educational, and internal business calculations. You may not scrape, frame, reproduce, reverse engineer, or redistribute our calculators or content without prior written authorization.'
        ]
      },
      {
        heading: '3. No Warranty & "As-Is" Provision',
        content: [
          'The tools, calculators, tables, and guides on this website are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          'While we strive for 100% mathematical accuracy and ground our tools in authoritative regulations, we do not warrant that calculations will be error-free or that services will be uninterrupted.'
        ]
      },
      {
        heading: '4. Limitation of Liability',
        content: [
          `Under no circumstances shall ${siteConfig.ownerName}, its officers, directors, employees, or contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your access to, use of, or inability to use this site or reliance on any calculation result.`
        ]
      },
      {
        heading: '5. Governing Law',
        content: [
          `These Terms shall be governed by and construed in accordance with the laws of the ${siteConfig.ownerCountry}, without giving effect to any principles of conflicts of law.`
        ]
      }
    ]
  },

  disclaimer: {
    slug: 'disclaimer',
    title: `General Financial, Tax & Medical Disclaimer - ${siteConfig.siteName}`,
    metaDescription: `Important legal and financial disclaimer for ${siteConfig.siteName}. Explains that calculators provide informational estimates only and do not constitute professional advice.`,
    h1: 'General Legal & Professional Disclaimer',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: 'Informational & Educational Estimates Only',
        content: [
          `The calculators, unit converters, tables, worked examples, and written guides provided on ${siteConfig.siteName} are developed strictly for general informational and educational purposes. All outputs generated by our software represent estimates based on mathematical models and user-supplied parameters.`
        ]
      },
      {
        heading: 'Not Financial, Investment, or Legal Advice',
        content: [
          'Nothing on this website constitutes professional financial planning, certified mortgage underwriting, investment advice, legal counsel, or banking recommendations.',
          'Mortgage terms, loan approval criteria, private mortgage insurance rates, and APR financing fees vary substantially between lending institutions based on individual creditworthiness, debt-to-income ratios, and geographic underwriting standards. You should always consult with a licensed mortgage broker, CFP® (Certified Financial Planner), or banking officer before making significant real estate or debt commitments.'
        ]
      },
      {
        heading: 'Not Certified Tax Advice',
        content: [
          'Tax calculations—including self-employment taxes, 1099 contractor comparisons, standard deductions, and federal withholding—are estimates based on general IRS tax brackets and standard statutory provisions. Tax laws are complex, subject to frequent legislative amendments, and heavily dependent on personal circumstances, municipal jurisdictions, and deductions not modeled in generalized tools.',
          'Use of our tax tools does not establish a CPA-client relationship. Always consult a Certified Public Accountant (CPA), Enrolled Agent (EA), or qualified tax attorney when filing returns or making quarterly tax payments.'
        ]
      },
      {
        heading: 'Not Medical or Nutritional Advice',
        content: [
          'Calculators in our Health and Fitness section (such as TDEE, Protein Intake, and Body Fat estimators) are based on published statistical equations (e.g., Mifflin-St Jeor and US Navy circumference standards). They do not account for individual metabolic disorders, cardiovascular status, pregnancy, medications, or clinical conditions.',
          'Never begin an aggressive caloric deficit, intense fitness regimen, or significant dietary change without first consulting a qualified physician or registered dietitian.'
        ]
      },
      {
        heading: 'Currency Rates Are Reference Benchmarks',
        content: [
          'Foreign exchange conversions reflect indicative mid-market wholesale reference rates published by central banks (such as the European Central Bank). They do not represent tradable retail quotes, real-time FX trading spreads, or guaranteed wire transfer rates offered by commercial banking networks.'
        ]
      }
    ]
  },

  'cookie-policy': {
    slug: 'cookie-policy',
    title: `Cookie Policy - ${siteConfig.siteName}`,
    metaDescription: `Understand how ${siteConfig.siteName} uses cookies, local browser storage, and privacy controls in compliance with ePrivacy, GDPR, and US state privacy regulations.`,
    h1: 'Cookie Policy',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: 'What Are Cookies & Local Storage?',
        content: [
          `This Cookie Policy explains how ${siteConfig.siteName} uses cookies and similar client-side technologies when you visit our website.`,
          'Cookies are small data files placed on your computer or mobile device. Local Storage is a modern web browser technology allowing websites to store preferences directly in your browser without transmitting them back to the web server on every page request.'
        ]
      },
      {
        heading: 'Categories of Cookies We Use',
        content: [
          '1. Strictly Necessary & Functional Cookies: These are essential for website operation, such as remembering your chosen color theme (light or dark mode) and recording your cookie consent preferences. These cannot be disabled.',
          '2. Analytics Cookies (Optional): Used to understand aggregated visitor trends, popular calculators, and navigation flows so we can improve site usability. All analytics data is aggregated and anonymized.',
          '3. Advertising Cookies (Third-Party / Google AdSense): When active, Google and third-party advertising vendors use cookies to serve ads based on your prior visits to this site or other websites. These cookies measure ad effectiveness and prevent the same ad from repeatedly appearing.'
        ]
      },
      {
        heading: 'Managing Your Cookie Preferences',
        content: [
          'You have the right to accept or decline non-essential cookies at any time using our on-page consent banner. Additionally, all major web browsers allow you to modify cookie settings to block or delete cookies entirely:',
          '• Google Chrome: Settings > Privacy and Security > Third-Party Cookies',
          '• Apple Safari: Preferences > Privacy > Block all cookies',
          '• Mozilla Firefox: Options > Privacy & Security > Enhanced Tracking Protection',
          '• Microsoft Edge: Settings > Cookies and site permissions'
        ]
      }
    ]
  },

  'editorial-policy': {
    slug: 'editorial-policy',
    title: `Editorial Policy & Methodology - ${siteConfig.siteName}`,
    metaDescription: `Our editorial standards, mathematical verification methodology, source attribution policies, and rate update schedule at ${siteConfig.siteName}.`,
    h1: 'Editorial Policy & Quantitative Methodology',
    lastUpdated: siteConfig.lastUpdated,
    sections: [
      {
        heading: 'Our Core Editorial Principles',
        content: [
          `${siteConfig.siteName} was founded on the conviction that utility tools must be accurate, transparent, and completely free of misleading marketing gimmicks. We adhere to four non-negotiable editorial tenets:`,
          '1. Algorithmic Transparency: We show the exact mathematical equation, state all underlying assumptions, and provide worked examples with real numbers for every tool.',
          '2. Primary Source Reliance: We only build tools grounded in primary statutory codes (IRS, CFPB, SSA, NIST, USDA, ECB) rather than secondary web summaries.',
          '3. Objectivity & Independence: Our calculators never artificially inflate estimates to steer users into affiliate partnerships or predatory loans.',
          '4. Continuous Auditing: We review our federal tax tables annually upon IRS publication, update fee schedules when platforms adjust pricing, and refresh reference benchmarks regularly.'
        ]
      },
      {
        heading: 'Versioned Data Management',
        content: [
          'To ensure mathematical integrity across time, our software isolates all financial and tax parameters in versioned, typed configuration files.',
          'Tax brackets, standard deductions, and Social Security wage limits are version-tagged to the active tax year (currently 2026). As the IRS releases annual cost-of-living adjustments (COLA), our review board updates the versioned dataset, executes automated test suites, and increments the on-page "Last updated" timestamp.'
        ]
      },
      {
        heading: 'Correction Procedure',
        content: [
          `We take accuracy seriously. If a calculation error, out-of-date fee, or typographic mistake is identified, we follow a strict correction protocol:`,
          `1. The report is logged and independently reviewed by two quantitative engineers within 24 hours.`,
          `2. If a discrepancy exists, the underlying logic or data schedule is updated and regression tests are executed.`,
          `3. The update is deployed to production with an updated review timestamp. You can report any issue to ${siteConfig.contactEmail}.`
        ]
      }
    ]
  }
};

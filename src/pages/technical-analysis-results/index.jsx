import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PrimaryTabNav from '../../components/navigation/PrimaryTabNav';
import AnalysisProgressIndicator from '../../components/navigation/AnalysisProgressIndicator';
import QuickActionToolbar from '../../components/navigation/QuickActionToolbar';
import AchievementNotificationSystem from '../../components/navigation/AchievementNotificationSystem';
import RiskScoreCard from './components/RiskScoreCard';
import TechnicalFlagCard from './components/TechnicalFlagCard';
import DomainAnalysisPanel from './components/DomainAnalysisPanel';
import ComparisonToolCard from './components/ComparisonToolCard';

const TechnicalAnalysisResults = () => {
  const navigate = useNavigate();

  const mockAnalysisData = {
    riskScore: 87,
    severity: "critical",
    contributingFactors: [
      {
        name: "Suspicious Domain",
        icon: "Globe",
        severity: "error",
        points: 25,
        description: "Domain registered recently with privacy protection enabled"
      },
      {
        name: "Spoofed Sender",
        icon: "Mail",
        severity: "error",
        points: 20,
        description: "Email header shows mismatch between display name and actual sender"
      },
      {
        name: "Malicious Links",
        icon: "Link",
        severity: "error",
        points: 18,
        description: "Multiple shortened URLs detected pointing to suspicious domains"
      },
      {
        name: "Urgent Language",
        icon: "AlertTriangle",
        severity: "warning",
        points: 12,
        description: "Content contains high-pressure tactics and time-sensitive demands"
      },
      {
        name: "Poor Grammar",
        icon: "FileText",
        severity: "warning",
        points: 8,
        description: "Multiple spelling and grammatical errors throughout message"
      },
      {
        name: "Suspicious Attachment",
        icon: "Paperclip",
        severity: "error",
        points: 4,
        description: "Executable file disguised with double extension"
      }
    ],
    emailHeaders: [
      {
        label: "Return-Path Mismatch",
        status: "detected",
        details: "The return-path email address does not match the sender's display address, indicating potential email spoofing.",
        value: "Return-Path: <phishing@malicious-domain.xyz>\nFrom: IT Support <support@university.edu>",
        explanation: "Legitimate emails from your university will have matching return-path and from addresses. This mismatch is a red flag that someone is impersonating your IT department."
      },
      {
        label: "SPF Authentication Failed",
        status: "detected",
        details: "Sender Policy Framework (SPF) check failed, meaning the sending server is not authorized to send emails on behalf of this domain.",
        value: "Received-SPF: fail (domain does not designate sending server)",
        explanation: "SPF is like a guest list for email servers. When it fails, it means the email is coming from an unauthorized server, similar to an uninvited guest at a party."
      },
      {
        label: "DKIM Signature Missing",
        status: "detected",
        details: "No DomainKeys Identified Mail (DKIM) signature found, which is used to verify email authenticity.",
        value: "DKIM-Signature: none",
        explanation: "DKIM is like a digital seal on an envelope. Legitimate organizations always seal their emails. Missing DKIM suggests the email may be forged."
      },
      {
        label: "Suspicious X-Mailer",
        status: "suspicious",
        details: "The email client identifier appears to be spoofed or uses an uncommon mail client.",
        value: "X-Mailer: Microsoft Outlook 15.0 (spoofed)",
        explanation: "This header tells us what program sent the email. Attackers often fake this to make their emails look legitimate."
      }
    ],
    linkAnalysis: [
      {
        label: "URL Shortener Detected",
        status: "detected",
        details: "Multiple shortened URLs found that hide the actual destination, a common phishing tactic.",
        value: "bit.ly/3xK9mP2 → redirects to → malicious-phishing-site.xyz/login",
        explanation: "URL shorteners hide where links really go. It\'s like following a sign that says \'University Portal\' but actually leads to a fake building. Always hover over links to see the real destination."
      },
      {
        label: "Typosquatting Domain",
        status: "detected",
        details: "Link domain closely resembles legitimate university domain but contains subtle misspellings.",
        value: "unversity-portal.com (missing 'i' in university)",
        explanation: "Attackers register domains that look almost identical to real ones. It's like a fake store with a slightly misspelled name hoping you won't notice."
      },
      {
        label: "HTTPS Missing",
        status: "suspicious",
        details: "Links use HTTP instead of secure HTTPS protocol for sensitive login pages.",
        value: "http://account-verify.xyz/login",
        explanation: "Legitimate login pages always use HTTPS (the padlock icon). HTTP is like sending your password on a postcard instead of in a sealed envelope."
      },
      {
        label: "Suspicious Parameters",
        status: "suspicious",
        details: "URL contains encoded parameters that may be used for tracking or credential harvesting.",
        value: "?user=encoded_email&redirect=phishing_site",
        explanation: "These URL parameters can pre-fill your information or redirect you after stealing credentials. Legitimate sites don't need to encode your email in links."
      }
    ],
    domainInfo: {
      domain: "unversity-portal.com",
      age: "3 days",
      registrationDate: "02/23/2026",
      registrar: "NameCheap (Privacy Protected)",
      country: "Panama",
      reputationScore: 12,
      whoisData: [
        { label: "Registrant", value: "REDACTED FOR PRIVACY" },
        { label: "Admin Contact", value: "REDACTED FOR PRIVACY" },
        { label: "Tech Contact", value: "REDACTED FOR PRIVACY" },
        { label: "Name Servers", value: "ns1.suspicious-hosting.xyz, ns2.suspicious-hosting.xyz" },
        { label: "Creation Date", value: "2026-02-23T14:32:18Z" },
        { label: "Expiration Date", value: "2027-02-23T14:32:18Z" }
      ],
      blacklists: [
        { name: "Spamhaus", listed: true },
        { name: "SURBL", listed: true },
        { name: "PhishTank", listed: true },
        { name: "Google Safe Browsing", listed: false }
      ],
      securityFeatures: [
        {
          name: "SSL Certificate",
          enabled: false,
          description: "No valid SSL certificate found for secure connections"
        },
        {
          name: "DNSSEC",
          enabled: false,
          description: "Domain Name System Security Extensions not implemented"
        },
        {
          name: "CAA Records",
          enabled: false,
          description: "No Certification Authority Authorization records found"
        },
        {
          name: "DMARC Policy",
          enabled: false,
          description: "No Domain-based Message Authentication policy configured"
        }
      ]
    },
    senderVerification: [
      {
        label: "Email Address Spoofing",
        status: "detected",
        details: "Display name shows 'IT Support' but actual email address is from external domain.",
        value: "Display: IT Support <support@university.edu>\nActual: phishing@malicious-domain.xyz",
        explanation: "Anyone can set a display name to anything they want. It's like wearing a name tag that says 'Bank Manager' - it doesn't make you one. Always check the actual email address."
      },
      {
        label: "Reply-To Mismatch",
        status: "detected",
        details: "Reply-to address differs from sender address, redirecting responses to attacker.",
        value: "Reply-To: collect-credentials@attacker-server.xyz",
        explanation: "When you hit reply, your response goes to this different address. It's like mailing a letter to one address but the return address sends replies somewhere else."
      },
      {
        label: "Sender Reputation",
        status: "detected",
        details: "Sending IP address has poor reputation and is listed on multiple spam blacklists.",
        value: "IP: 185.234.xxx.xxx (Blacklisted on 5 RBLs)",
        explanation: "Email servers keep track of which IP addresses send spam. This sender has a bad reputation, like a store with many customer complaints."
      }
    ],
    attachmentAnalysis: [
      {
        label: "Double Extension",
        status: "detected",
        details: "File uses double extension to disguise executable as document.",
        value: "account_verification.pdf.exe",
        explanation: "This file pretends to be a PDF but is actually an executable program. It\'s like a wolf in sheep\'s clothing - the .pdf part is just camouflage."
      },
      {
        label: "Macro Enabled",
        status: "suspicious",
        details: "Document contains macros that could execute malicious code.",
        value: "Contains VBA macros with suspicious API calls",
        explanation: "Macros are mini-programs inside documents. Attackers hide malicious code in them. Legitimate university documents rarely need macros."
      }
    ],
    legitimatePatterns: {
      headers: [
        {
          label: "Matching Domains",
          description: "Return-path and from address both use official university domain",
          example: "From: support@university.edu\nReturn-Path: support@university.edu"
        },
        {
          label: "Valid Authentication",
          description: "SPF, DKIM, and DMARC all pass authentication checks",
          example: "Received-SPF: pass\nDKIM-Signature: valid\nDMARC: pass"
        },
        {
          label: "Consistent Headers",
          description: "All email headers show consistent routing through official servers",
          example: "Received: from mail.university.edu by mx.university.edu"
        }
      ],
      links: [
        {
          label: "Official Domain",
          description: "Links use the verified university domain with proper spelling",
          example: "https://portal.university.edu/login"
        },
        {
          label: "HTTPS Enabled",
          description: "All links use secure HTTPS protocol with valid certificates",
          example: "https:// (with padlock icon in browser)"
        },
        {
          label: "No Redirects",
          description: "Direct links without URL shorteners or multiple redirects",
          example: "Direct link to destination without intermediary services"
        }
      ],
      content: [
        {
          label: "Professional Tone",
          description: "Clear, professional language without urgency or threats",
          example: "Please review your account settings at your convenience"
        },
        {
          label: "Proper Grammar",
          description: "Correct spelling, grammar, and formatting throughout",
          example: "Well-structured sentences with proper punctuation"
        },
        {
          label: "Contact Information",
          description: "Includes official contact details and support channels",
          example: "Contact IT Support: support@university.edu or ext. 1234"
        }
      ],
      sender: [
        {
          label: "Verified Sender",
          description: "Email comes from official university email system",
          example: "From: IT Support <support@university.edu>"
        },
        {
          label: "Known Contact",
          description: "Sender appears in university directory or previous correspondence",
          example: "Sender matches known IT department staff"
        },
        {
          label: "Consistent Signature",
          description: "Professional email signature with official branding",
          example: "University IT Department | Phone: xxx-xxxx | Office: Building A"
        }
      ]
    },
    suspiciousPatterns: {
      headers: [
        {
          label: "Domain Mismatch",
          description: "Display name shows university but actual address is external",
          example: "Display: IT Support <support@university.edu>\nActual: phishing@external.com"
        },
        {
          label: "Failed Authentication",
          description: "SPF, DKIM, or DMARC checks fail indicating spoofing",
          example: "Received-SPF: fail\nDKIM: none\nDMARC: fail"
        },
        {
          label: "Suspicious Routing",
          description: "Email routed through unexpected or foreign servers",
          example: "Received: from unknown-server.xyz via suspicious-relay.com"
        }
      ],
      links: [
        {
          label: "Typosquatting",
          description: "Domain looks similar to official but contains subtle misspellings",
          example: "https://unversity-portal.com (missing 'i')"
        },
        {
          label: "No HTTPS",
          description: "Login or sensitive pages use insecure HTTP protocol",
          example: "http://account-verify.xyz/login (no padlock)"
        },
        {
          label: "URL Shorteners",
          description: "Uses bit.ly, tinyurl, or other services to hide destination",
          example: "bit.ly/3xK9mP2 (hides real destination)"
        }
      ],
      content: [
        {
          label: "Urgent Threats",
          description: "Creates false urgency with account suspension or deadline threats",
          example: "Your account will be suspended in 24 hours unless you act now!"
        },
        {
          label: "Poor Quality",
          description: "Contains spelling errors, grammar mistakes, or awkward phrasing",
          example: "You\'re account has been compromise and need immediate action"
        },
        {
          label: "Generic Greeting",
          description: "Uses \'Dear User\' instead of your actual name",
          example: "Dear Valued Customer (instead of your name)"
        }
      ],
      sender: [
        {
          label: "Spoofed Display",
          description: "Display name impersonates official department but email doesn't match",
          example: "IT Support <random@external.com>"
        },
        {
          label: "Unknown Sender",
          description: "Email address not found in university directory or systems",
          example: "From: admin@suspicious-domain.xyz"
        },
        {
          label: "No Signature",
          description: "Missing professional signature or uses generic template",
          example: "Sent from my iPhone (on official IT communication)"
        }
      ]
    }
  };

  const handleNavigateToPsychology = () => {
    navigate('/psychology-results');
  };

  const handleNavigateToTimeline = () => {
    navigate('/attack-timeline');
  };

  const handleNavigateToAnalysis = () => {
    navigate('/message-analysis');
  };

  return (
    <div className="min-h-screen bg-background">
      <PrimaryTabNav />
      <AnalysisProgressIndicator currentStep={1} />
      <AchievementNotificationSystem />
      <QuickActionToolbar />
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Code" size={32} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Technical Analysis Results</h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                Detailed cybersecurity assessment and threat indicators
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border rounded-lg">
              <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
              <span className="text-xs md:text-sm text-muted-foreground">Analyzed: 02/26/2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border rounded-lg">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className="text-xs md:text-sm text-muted-foreground">5:45 PM</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-card border border-border rounded-lg">
              <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
              <span className="text-xs md:text-sm text-muted-foreground">Email Analysis</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 lg:space-y-12">
          <RiskScoreCard 
            score={mockAnalysisData?.riskScore}
            severity={mockAnalysisData?.severity}
            factors={mockAnalysisData?.contributingFactors}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <TechnicalFlagCard 
              title="Email Headers"
              icon="Mail"
              flags={mockAnalysisData?.emailHeaders}
              category="critical"
            />
            <TechnicalFlagCard 
              title="Link Analysis"
              icon="Link"
              flags={mockAnalysisData?.linkAnalysis}
              category="critical"
            />
          </div>

          <DomainAnalysisPanel 
            domain={mockAnalysisData?.domainInfo?.domain}
            analysis={mockAnalysisData?.domainInfo}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <TechnicalFlagCard 
              title="Sender Verification"
              icon="User"
              flags={mockAnalysisData?.senderVerification}
              category="warning"
            />
            <TechnicalFlagCard 
              title="Attachment Analysis"
              icon="Paperclip"
              flags={mockAnalysisData?.attachmentAnalysis}
              category="critical"
            />
          </div>

          <ComparisonToolCard 
            legitimatePatterns={mockAnalysisData?.legitimatePatterns}
            suspiciousPatterns={mockAnalysisData?.suspiciousPatterns}
          />

          <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
            <div className="flex items-start gap-3 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">Key Takeaways</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Understanding these technical indicators helps you identify threats before they cause harm
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base font-medium text-foreground">Always verify sender domains</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground ml-6">
                  Check that email addresses match official university domains
                </p>
              </div>

              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base font-medium text-foreground">Hover over links before clicking</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground ml-6">
                  Preview the actual destination URL to spot typosquatting
                </p>
              </div>

              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base font-medium text-foreground">Look for HTTPS on login pages</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground ml-6">
                  Legitimate sites always use secure connections for sensitive data
                </p>
              </div>

              <div className="p-3 md:p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Icon name="Check" size={18} color="var(--color-success)" className="flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base font-medium text-foreground">Be cautious with attachments</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground ml-6">
                  Verify file extensions and avoid opening unexpected attachments
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="Brain"
              iconPosition="left"
              onClick={handleNavigateToPsychology}
              fullWidth
              className="sm:flex-1"
            >
              View Psychology Analysis
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Clock"
              iconPosition="left"
              onClick={handleNavigateToTimeline}
              fullWidth
              className="sm:flex-1"
            >
              View Attack Timeline
            </Button>
            <Button
              variant="secondary"
              size="lg"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleNavigateToAnalysis}
              fullWidth
              className="sm:flex-1"
            >
              Back to Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysisResults;
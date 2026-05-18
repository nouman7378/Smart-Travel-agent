/**
 * AI Chat Service
 *
 * Intelligent travel assistant with context management, follow-up questions,
 * and travel-specific logic for personalized recommendations.
 */

import { API_PREFIX } from '../config/env.config';

export interface ConversationContext {
  budget?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  destination?: {
    name?: string;
    type?: 'beach' | 'mountain' | 'city' | 'adventure' | 'cultural' | 'relaxation';
  };
  dates?: {
    start?: string;
    end?: string;
    duration?: number; // days
    flexible?: boolean;
  };
  travelers?: {
    adults?: number;
    children?: number;
    total?: number;
  };
  preferences?: {
    accommodation?: 'hotel' | 'resort' | 'budget' | 'luxury';
    activities?: string[];
    transport?: 'flight' | 'train' | 'bus' | 'car';
  };
  intent?: 'plan_trip' | 'find_package' | 'book_flight' | 'find_hotel' | 'get_recommendations' | 'general';
  missingInfo?: string[];
}

export interface ChatResponse {
  message: string;
  quickReplies?: string[];
  needsFollowUp: boolean;
  context: ConversationContext;
  recommendations?: {
    type: 'package' | 'destination' | 'hotel' | 'flight';
    items: any[];
  };
  sessionId?: string;
}

// Mock travel data for recommendations
const mockDestinations = [
  { name: 'Paris, France', type: 'city', priceRange: 'mid', description: 'Romantic city with iconic landmarks' },
  { name: 'Bali, Indonesia', type: 'beach', priceRange: 'budget', description: 'Tropical paradise with beautiful beaches' },
  { name: 'Tokyo, Japan', type: 'city', priceRange: 'mid', description: 'Modern metropolis with rich culture' },
  { name: 'Swiss Alps', type: 'mountain', priceRange: 'luxury', description: 'Breathtaking mountain scenery' },
  { name: 'Dubai, UAE', type: 'city', priceRange: 'luxury', description: 'Luxury shopping and modern architecture' },
  { name: 'Santorini, Greece', type: 'beach', priceRange: 'mid', description: 'Stunning sunsets and white-washed buildings' },
  { name: 'New York, USA', type: 'city', priceRange: 'mid', description: 'The city that never sleeps' },
  { name: 'Maldives', type: 'beach', priceRange: 'luxury', description: 'Pristine beaches and overwater villas' },
];

const mockPackages = [
  { id: 1, name: 'Paris Getaway', destination: 'Paris', price: 1250, duration: 5, type: 'city' },
  { id: 2, name: 'Bali Paradise', destination: 'Bali', price: 980, duration: 7, type: 'beach' },
  { id: 3, name: 'Tokyo Adventure', destination: 'Tokyo', price: 2100, duration: 6, type: 'city' },
  { id: 4, name: 'Swiss Alps Escape', destination: 'Swiss Alps', price: 3200, duration: 4, type: 'mountain' },
];

class ChatService {
  private context: ConversationContext = {};
  private sessionId?: string;

  /**
   * Process user message and generate intelligent response.
   * First tries the backend AI/RAG API. If that fails, falls back
   * to the local heuristic implementation so the UI still works.
   */
  async processMessage(userMessage: string): Promise<ChatResponse> {
    // Try backend AI API first
    const backendResponse = await this.callBackend(userMessage);
    if (backendResponse) {
      this.context = backendResponse.context || {};
      if (backendResponse.sessionId) {
        this.sessionId = backendResponse.sessionId;
      }
      return backendResponse;
    }

    // Fallback: existing frontend-only heuristic logic
    const lowerMessage = userMessage.toLowerCase().trim();

    // Update context based on user message
    this.extractContext(userMessage);

    // Determine what information is missing
    const missingInfo = this.getMissingInfo();

    // If we have enough info, provide recommendations
    if (missingInfo.length === 0 && this.context.intent) {
      return this.generateRecommendations();
    }

    // Generate response with follow-up questions
    return this.generateResponseWithFollowUp(missingInfo, lowerMessage);
  }

  /**
   * Call backend AI chat API. Returns null on error so callers can
   * gracefully fall back to local logic.
   */
  private async callBackend(userMessage: string): Promise<ChatResponse | null> {
    try {
      // Direct call to new RAG ChatView at /api/chat/
      const response = await fetch(`${API_PREFIX}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          session_id: this.sessionId ? parseInt(this.sessionId) : null,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Backend AI chat error', data);
        return null;
      }

      const payload: ChatResponse = {
        message: data.answer,
        quickReplies: [],
        needsFollowUp: false,
        context: {},
        sessionId: data.session_id ? String(data.session_id) : undefined,
      };

      return payload;
    } catch (error) {
      console.error('Failed to call backend AI chat API', error);
      return null;
    }
  }

  /**
   * Extract context from user message
   */
  private extractContext(message: string): void {
    const lower = message.toLowerCase();

    // Extract budget - improved pattern matching
    const budgetPatterns = [
      /(?:budget|price|cost|spend|afford|around|about)\s*(?:of|is|:)?\s*\$?(\d+)(?:\s*-\s*\$?(\d+))?(?:\s*(?:to|and)\s*\$?(\d+))?/,
      /\$(\d+)(?:\s*-\s*\$?(\d+))?(?:\s*(?:to|and)\s*\$?(\d+))?/,
      /(?:under|below|less than|max|maximum)\s*\$?(\d+)/,
      /(?:over|above|more than|min|minimum)\s*\$?(\d+)/,
    ];

    for (const pattern of budgetPatterns) {
      const match = lower.match(pattern);
      if (match) {
        if (pattern.source.includes('under') || pattern.source.includes('below') || pattern.source.includes('max')) {
          this.context.budget = {
            max: parseInt(match[1]),
            currency: 'PKR',
          };
        } else if (pattern.source.includes('over') || pattern.source.includes('above') || pattern.source.includes('min')) {
          this.context.budget = {
            min: parseInt(match[1]),
            currency: 'PKR',
          };
        } else {
          const min = parseInt(match[1]);
          const max = match[2] ? parseInt(match[2]) : match[3] ? parseInt(match[3]) : min;
          this.context.budget = {
            min: Math.min(min, max || min),
            max: max || min,
            currency: 'PKR',
          };
        }
        break;
      }
    }

    // Handle budget keywords
    if (!this.context.budget) {
      if (lower.includes('budget') && (lower.includes('friendly') || lower.includes('cheap') || lower.includes('low'))) {
        this.context.budget = { max: 50000, currency: 'PKR' };
      } else if (lower.includes('luxury') || lower.includes('premium') || lower.includes('high-end')) {
        this.context.budget = { min: 300000, currency: 'PKR' };
      } else if (lower.includes('mid') || lower.includes('moderate') || lower.includes('medium')) {
        this.context.budget = { min: 100000, max: 300000, currency: 'PKR' };
      }
    }

    // Extract number of travelers - improved patterns
    const travelerPatterns = [
      /(\d+)\s*(?:people|persons|travelers|adults|guests|family|members)/,
      /(?:for|with)\s*(\d+)/,
      /(?:solo|alone|single)/,
      /(?:couple|two|pair)/,
      /(?:family|families)/,
      /(?:group|groups)/,
    ];

    for (const pattern of travelerPatterns) {
      const match = lower.match(pattern);
      if (match) {
        if (pattern.source.includes('solo') || pattern.source.includes('alone') || pattern.source.includes('single')) {
          this.context.travelers = { adults: 1, total: 1 };
        } else if (pattern.source.includes('couple') || pattern.source.includes('two') || pattern.source.includes('pair')) {
          this.context.travelers = { adults: 2, total: 2 };
        } else if (pattern.source.includes('family')) {
          this.context.travelers = { adults: 2, children: 2, total: 4 };
        } else if (pattern.source.includes('group')) {
          this.context.travelers = { adults: 6, total: 6 };
        } else if (match[1]) {
          this.context.travelers = {
            adults: parseInt(match[1]),
            total: parseInt(match[1]),
          };
        }
        break;
      }
    }

    // Extract dates
    const dateMatch = lower.match(/(?:in|on|from|starting|departure)\s+(\w+\s+\d+|\d+\/\d+|\d+-\d+-\d+)/);
    if (dateMatch) {
      // Simplified date extraction
      this.context.dates = {
        flexible: lower.includes('flexible') || lower.includes('anytime'),
      };
    }

    // Extract duration
    const durationMatch = lower.match(/(\d+)\s*(?:days|nights|week|weeks)/);
    if (durationMatch) {
      this.context.dates = {
        ...this.context.dates,
        duration: parseInt(durationMatch[1]),
      };
    }

    // Extract destination type
    const destinationTypes: { [key: string]: ConversationContext['destination']['type'] } = {
      beach: 'beach',
      mountain: 'mountain',
      city: 'city',
      adventure: 'adventure',
      cultural: 'cultural',
      relax: 'relaxation',
      relaxation: 'relaxation',
    };

    for (const [key, type] of Object.entries(destinationTypes)) {
      if (lower.includes(key)) {
        this.context.destination = {
          ...this.context.destination,
          type,
        };
        break;
      }
    }

    // Extract destination name
    for (const dest of mockDestinations) {
      if (lower.includes(dest.name.toLowerCase().split(',')[0])) {
        this.context.destination = {
          name: dest.name,
          type: dest.type as any,
        };
        break;
      }
    }

    // Determine intent
    if (lower.includes('trip') || lower.includes('vacation') || lower.includes('holiday')) {
      this.context.intent = 'plan_trip';
    } else if (lower.includes('package') || lower.includes('deal')) {
      this.context.intent = 'find_package';
    } else if (lower.includes('flight') || lower.includes('fly')) {
      this.context.intent = 'book_flight';
    } else if (lower.includes('hotel') || lower.includes('accommodation') || lower.includes('stay')) {
      this.context.intent = 'find_hotel';
    } else if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('where')) {
      this.context.intent = 'get_recommendations';
    }
  }

  /**
   * Determine what information is missing
   */
  private getMissingInfo(): string[] {
    const missing: string[] = [];

    if (!this.context.budget) {
      missing.push('budget');
    }
    if (!this.context.destination?.name && !this.context.destination?.type) {
      missing.push('destination');
    }
    if (!this.context.dates?.start && !this.context.dates?.flexible) {
      missing.push('dates');
    }
    if (!this.context.travelers) {
      missing.push('travelers');
    }

    return missing;
  }

  /**
   * Generate response with intelligent follow-up questions
   */
  private generateResponseWithFollowUp(
    missingInfo: string[],
    userMessage: string
  ): ChatResponse {
    let message = '';
    let quickReplies: string[] = [];

    // If this is the first interaction or very vague
    if (missingInfo.length >= 3 || userMessage.length < 10) {
      const missingSummary = missingInfo
        .map((field) => this.describeMissingField(field))
        .join(', ');

      message = `I still need a bit more info (${missingSummary}) to tailor the trip. Share whatever details you already know and I'll guide you through the rest.`;

      const primaryField = missingInfo[0];
      quickReplies = this.getQuickReplySuggestions(primaryField);

      if (!quickReplies.length) {
        quickReplies = ['Share budget', 'Pick a destination', 'Travel dates', 'Travelers'];
      }
    } else if (missingInfo.includes('budget')) {
      message = "Great! To find the best options for you, what's your budget range? For example:\n\n";
      message += "• Budget-friendly: Under PKR 50,000\n";
      message += "• Mid-range: PKR 100,000 - 300,000\n";
      message += "• Luxury: PKR 300,000+";
      
      quickReplies = ['Under 50k', '100k-300k', '300k+', 'Flexible'];
    } else if (missingInfo.includes('destination')) {
      message = "Where would you like to travel? I can help you find:\n\n";
      message += "• Beach destinations (Bali, Maldives, Santorini)\n";
      message += "• City breaks (Paris, Tokyo, New York)\n";
      message += "• Mountain escapes (Swiss Alps, Himalayas)\n";
      message += "• Adventure trips\n";
      message += "• Cultural experiences";
      
      quickReplies = ['Beach', 'City', 'Mountain', 'Adventure'];
    } else if (missingInfo.includes('dates')) {
      message = "When are you planning to travel? You can tell me:\n\n";
      message += "• Specific dates (e.g., 'June 2025')\n";
      message += "• Duration (e.g., '5 days')\n";
      message += "• If your dates are flexible";
      
      quickReplies = ['This month', 'Next month', 'In 3 months', 'Flexible dates'];
    } else if (missingInfo.includes('travelers')) {
      message = "How many people will be traveling? This helps me find the right accommodation and package deals.";
      
      quickReplies = ['1 person', '2 people', 'Family (4+)', 'Group (6+)'];
    } else {
      // We have most info, provide preliminary suggestions
      message = "Perfect! Based on what you've told me, let me find some great options for you...";
    }

    return {
      message,
      quickReplies,
      needsFollowUp: missingInfo.length > 0,
      context: { ...this.context },
    };
  }

  /**
   * Generate recommendations based on context
   */
  private generateRecommendations(): ChatResponse {
    const { budget, destination, dates, travelers } = this.context;
    
    let message = "Based on your preferences, here are some great options:\n\n";
    const recommendations: any[] = [];

    // Filter destinations based on context
    let filteredDestinations = [...mockDestinations];
    
    if (destination?.type) {
      filteredDestinations = filteredDestinations.filter(
        (d) => d.type === destination.type
      );
    }

    if (budget) {
      filteredDestinations = filteredDestinations.filter((d) => {
        if (budget.max && budget.max < 1000) {
          return d.priceRange === 'budget';
        } else if (budget.max && budget.max < 3000) {
          return d.priceRange === 'budget' || d.priceRange === 'mid';
        }
        return true;
      });
    }

    // Filter packages
    let filteredPackages = [...mockPackages];
    if (budget) {
      filteredPackages = filteredPackages.filter(
        (p) => !budget.max || p.price <= budget.max
      );
    }
    if (destination?.type) {
      filteredPackages = filteredPackages.filter(
        (p) => p.type === destination.type
      );
    }

    // Build recommendation message
    if (filteredDestinations.length > 0) {
      message += "**Top Destinations:**\n";
      filteredDestinations.slice(0, 3).forEach((dest, idx) => {
        message += `${idx + 1}. ${dest.name} - ${dest.description}\n`;
      });
      message += "\n";
    }

    if (filteredPackages.length > 0) {
      message += "**Travel Packages:**\n";
      filteredPackages.slice(0, 3).forEach((pkg, idx) => {
        message += `${idx + 1}. ${pkg.name} - PKR ${pkg.price.toLocaleString()} for ${pkg.duration} days\n`;
      });
      message += "\n";
    }

    message += "Would you like me to:\n";
    message += "• Show more details about any of these?\n";
    message += "• Search for specific dates?\n";
    message += "• Find hotels in these destinations?";

    return {
      message,
      quickReplies: [
        'Show package details',
        'Search flights',
        'Find hotels',
        'Start over',
      ],
      needsFollowUp: false,
      context: { ...this.context },
      recommendations: {
        type: 'package',
        items: filteredPackages.slice(0, 3),
      },
    };
  }

  /**
   * Reset conversation context
   */
  resetContext(): void {
    this.context = {};
    this.sessionId = undefined;
  }

  /**
   * Get current context
   */
  getContext(): ConversationContext {
    return { ...this.context };
  }

  /**
   * Map internal context keys to user-friendly labels.
   */
  private describeMissingField(field: string): string {
    const labels: Record<string, string> = {
      budget: 'budget range',
      destination: 'destination',
      dates: 'travel dates',
      travelers: 'number of travelers',
    };

    return labels[field] || field;
  }

  /**
   * Provide contextual quick reply suggestions for a missing field.
   */
  private getQuickReplySuggestions(field?: string): string[] {
    switch (field) {
      case 'budget':
        return ['Under 50k', '100k-300k', '300k+', 'Flexible'];
      case 'destination':
        return ['Beach', 'City', 'Mountain', 'Adventure'];
      case 'dates':
        return ['This month', 'Next month', 'In 3 months', 'Flexible dates'];
      case 'travelers':
        return ['1 person', '2 people', 'Family (4+)', 'Group (6+)'];
      default:
        return [];
    }
  }
}

export const chatService = new ChatService();

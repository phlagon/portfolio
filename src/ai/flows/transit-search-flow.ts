'use server';
/**
 * @fileOverview A transit search AI agent.
 *
 * - getTransitOptions - A function that fetches transit routes and times.
 * - TransitSearchInput - The input type for the transit search.
 * - TransitSearchOutput - The return type for the transit search.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransitOptionSchema = z.object({
  type: z.enum(['Train', 'Bus', 'Flight', 'Taxi']),
  number: z.string().describe('Identification number, e.g., "16595", "AI-102"'),
  provider: z.string().describe('Name of the service provider, e.g., "PANCHAGANGA EXP", "IndiGo"'),
  departureTime: z.string().describe('Format: HH:MM'),
  departureDate: z.string().describe('Format: Day, Date Month'),
  arrivalTime: z.string().describe('Format: HH:MM'),
  arrivalDate: z.string().describe('Format: Day, Date Month'),
  duration: z.string().describe('e.g., "09 h 26 min"'),
  price: z.string().describe('Estimated price in INR, e.g., "₹1,200"'),
  origin: z.string().describe('Short origin name'),
  destination: z.string().describe('Short destination name'),
  status: z.string().optional().describe('e.g., "On time"'),
});

const TransitSearchInputSchema = z.object({
  pickup: z.string(),
  drop: z.string(),
});
export type TransitSearchInput = z.infer<typeof TransitSearchInputSchema>;

const TransitSearchOutputSchema = z.object({
  options: z.array(TransitOptionSchema),
});
export type TransitSearchOutput = z.infer<typeof TransitSearchOutputSchema>;

export async function getTransitOptions(input: TransitSearchInput): Promise<TransitSearchOutput> {
  return transitSearchFlow(input);
}

const transitSearchFlow = ai.defineFlow(
  {
    name: 'transitSearchFlow',
    inputSchema: TransitSearchInputSchema,
    outputSchema: TransitSearchOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      prompt: `You are a transit assistant. Provide 3 realistic transit options (exactly one Train, one Flight, and one Bus) between ${input.pickup} and ${input.drop}. 
      Return a list of options with realistic identification numbers, provider names, precise departure/arrival times, duration, and prices. 
      Format the dates like 'Fri, 23 Jan'. Ensure origin and destination are short codes or names.`,
      output: {schema: TransitSearchOutputSchema},
    });
    return output!;
  }
);

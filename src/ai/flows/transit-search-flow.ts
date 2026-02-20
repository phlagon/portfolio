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
  provider: z.string().describe('Name of the service provider, e.g., "Indigo", "Shatabdi Express", "RedBus"'),
  departureTime: z.string().describe('Format: HH:MM AM/PM'),
  arrivalTime: z.string().describe('Format: HH:MM AM/PM'),
  duration: z.string().describe('e.g., "2h 30m"'),
  price: z.string().describe('Estimated price in INR, e.g., "₹1,200"'),
  status: z.string().optional().describe('e.g., "On time", "2 mins late"'),
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
      prompt: `You are a Google Maps transit assistant specializing in travel within India. 
      Provide 4-5 realistic transit options (Train, Bus, Flight, Taxi) between ${input.pickup} and ${input.drop}. 
      Return a list of options with provider names, departure/arrival times, duration, and estimated price in INR. 
      If the distance is short (e.g., within a city), prefer Taxis and Buses. If long distance, include Flights and Trains. 
      Make the times and status updates look realistic.`,
      output: {schema: TransitSearchOutputSchema},
    });
    return output!;
  }
);

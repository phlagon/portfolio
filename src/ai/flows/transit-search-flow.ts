// Gemini AI integration removed. Static mock used for Rapido case study compatibility.
export async function getTransitOptions(input: any): Promise<any> {
  return {
    options: [
      { type: 'Train', number: '16595', provider: 'PANCHAGANGA EXP', departureTime: '18:50', departureDate: 'Fri, 23 Jan', arrivalTime: '04:15', arrivalDate: 'Sat, 24 Jan', duration: '09 h 25 min', price: '₹1,200', origin: 'SBC', destination: 'UD' },
      { type: 'Flight', number: '6E-2134', provider: 'IndiGo', departureTime: '14:20', departureDate: 'Fri, 23 Jan', arrivalTime: '15:45', arrivalDate: 'Fri, 23 Jan', duration: '01 h 25 min', price: '₹3,450', origin: 'BLR', destination: 'IXE' },
      { type: 'Bus', number: 'KSR-998', provider: 'KSRTC Ambaari', departureTime: '22:30', departureDate: 'Fri, 23 Jan', arrivalTime: '06:00', arrivalDate: 'Sat, 24 Jan', duration: '07 h 30 min', price: '₹850', origin: 'MBS', destination: 'UD' }
    ]
  };
}

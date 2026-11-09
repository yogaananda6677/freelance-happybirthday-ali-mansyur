export interface BirthdayConfig {
  recipientName: string;
  birthDate: string; // YYYY-MM-DD
  musicUrl: string; // audio mp3 url or preset
  musicTitle: string;
  musicArtist: string;
  coverGreeting: string; // "Happy Birthday Sayang!"
  envelopeNote: string;
  cakeMessage: string;
  littleLetterText: string;
  longMessageText: string;
  mirrorClosingText: string;
  moonQuote: string;
  // Photos
  scrapbookPhoto: string;
  mirrorPhoto: string;
  polaroidPhotos: string[];
}

/* SentiQ 21 configuration.
 *
 * The app works fully offline with SUPABASE_* left empty - results are kept
 * on the device. Fill both in to also sync results to Supabase; run
 * supabase/schema.sql in the Supabase SQL editor first.
 *
 * The anon key is meant to be public. Keep the service_role key out of here.
 */
window.SENTIQ_CONFIG = {
  SUPABASE_URL: 'https://reithunbexblzqxqahln.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaXRodW5iZXhibHpxeHFhaGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzQwMTQsImV4cCI6MjEwNTgxMDAxNH0.osG1OpyAt6GQmHh6zHQOm-uJ-CwGkkyuJFCm2Ga909I',
  SUPABASE_TABLE: 'dass_results',

  /* ------------------------------------------------------------------
   * COUNSELLING UNIT
   *
   * COUNSELLOR_WHATSAPP is the number the "chat with a counsellor" button
   * opens. Write it however you like - 012-345 6789, +60 12 345 6789,
   * 60123456789 all work; the app strips the punctuation and turns a
   * leading 0 into 60 before building the wa.me link.
   *
   * Leave it empty and the button stays hidden, rather than opening a
   * chat with nobody.
   *
   * Use a number the counselling unit actually watches during working
   * hours, and tell the person who owns it that students will message it.
   * This is not a crisis line - the 24-hour helplines in js/advice.js are.
   * ------------------------------------------------------------------ */
  COUNSELLOR_WHATSAPP: '0195772706',
  COUNSELLOR_NAME: 'Unit Kaunseling IKM Lumut',
};

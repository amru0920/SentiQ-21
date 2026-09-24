/* SentiQ 21 configuration.
 *
 * The app works fully offline with this left empty - results are kept on the
 * device. Fill both fields in to also sync results to Supabase; run
 * supabase/schema.sql in the Supabase SQL editor first.
 *
 * The anon key is meant to be public. Keep the service_role key out of here.
 */
window.SENTIQ_CONFIG = {
  SUPABASE_URL: 'https://reithunbexblzqxqahln.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaXRodW5iZXhibHpxeHFhaGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzQwMTQsImV4cCI6MjEwNTgxMDAxNH0.osG1OpyAt6GQmHh6zHQOm-uJ-CwGkkyuJFCm2Ga909I',
  SUPABASE_TABLE: 'dass_results',
};

/* SentiQ 21 configuration.
 *
 * The app works fully offline with this left empty - results are kept on the
 * device. Fill both fields in to also sync results to Supabase; run
 * supabase/schema.sql in the Supabase SQL editor first.
 *
 * The anon key is meant to be public. Keep the service_role key out of here.
 */
window.SENTIQ_CONFIG = {
  SUPABASE_URL: '',
  SUPABASE_ANON_KEY: '',
  SUPABASE_TABLE: 'dass_results',
};

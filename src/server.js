import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
//const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient('https://ehdqdvcwzsqdwxffghow.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZHFkdmN3enNxZHd4ZmZnaG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM4NjkxNDksImV4cCI6MTk4OTQ0NTE0OX0.ay1w7O1tyFvGUeNGURFjODHAB6shMD3pr0DpCjwfaa8')
export default supabase
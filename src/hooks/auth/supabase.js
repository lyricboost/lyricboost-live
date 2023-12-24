import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksaxwqypsnomsulgkhrq.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzYXh3cXlwc25vbXN1bGdraHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxODQ4MDEsImV4cCI6MjAxODc2MDgwMX0.mtNW9vHElPxaG0-9A6Td4OvCixwW_XbYMZWiv_CiWxQ'
export const supabase = createClient(supabaseUrl, supabaseKey)

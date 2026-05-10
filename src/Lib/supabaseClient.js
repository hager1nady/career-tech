import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://cjoojbqmaqifjifqtzlf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqb29qYnFtYXFpZmppZnF0emxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MjYxODAsImV4cCI6MjA5NDAwMjE4MH0.3e-iCiRIMV9DLEsWWoo2t_bjUc9REtAJPU2YoUCRDM0"
)
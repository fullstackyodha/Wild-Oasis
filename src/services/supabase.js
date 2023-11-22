import { createClient } from "@supabase/supabase-js";

// WildOasis31@
export const supabaseUrl = "https://nfkwtcbqtysabrfszmdq.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3d0Y2JxdHlzYWJyZnN6bWRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA3OTg5MjMsImV4cCI6MjAwNjM3NDkyM30.kxDfPRT2qfDv8ZmvMYeJFuW66aBgeC_A3t2MHf6tvPo
`;
export const supabase = createClient(supabaseUrl, supabaseKey);

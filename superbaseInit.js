import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txxjtlrnmxsxpnwaemti.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzkxMjAzNCwiZXhwIjoxOTQzNDg4MDM0fQ.vxGyYCwLx5RaGF8UZbLxWv1ccZIiT4cwVTxss3nF0y4'
export const supabase = createClient(supabaseUrl, supabaseKey)

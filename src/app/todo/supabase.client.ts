import { createClient } from '@supabase/supabase-js';

// ใช้ URL และ API Key ที่ได้จาก Supabase
const supabaseUrl = 'https://txdcigwvumgszkqtsmtg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZGNpZ3d2dW1nc3prcXRzbXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDM1MTEsImV4cCI6MjA2MTY3OTUxMX0.lSS0yY7ZfQNwJTNMPYXbCRO_aE0-TG_MRIKZ72HenIo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const checkConnection = async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connected successfully:', data);
    }
  };
  
  // เรียกใช้การตรวจสอบเมื่อเริ่มต้น
  checkConnection();
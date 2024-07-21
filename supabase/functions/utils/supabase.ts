import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Alert } from 'react-native';

export const createOrRetrieveProfile = async (req: Request) => {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    console.log("Entered");
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    console.log(user);
	if (!user) Alert.alert("User not found", "User not found");
};
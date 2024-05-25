import { SupabaseClient, Session } from '@supabase/supabase-js'
declare global {
	namespace App {
		 interface PageData {
			supabase: SupabaseClient
			session:Session | null
		 }
	// 	 interface Platform {
	// 		env?: {
	// 			YOUR_KV_NAMESPACE: KVNamespace;
				
	// 		};
	// }
}
}
export {};

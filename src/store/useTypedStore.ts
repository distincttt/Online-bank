import { useStore } from "vuex";
import { Store } from "vuex/types/index.js";

import type { RootState } from "@/types/store";

export function useTypedStore() {
   return useStore() as Store<RootState>;
}

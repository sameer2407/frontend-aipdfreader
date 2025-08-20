import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function MessageSkeleton() {
  return (
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-4 w-3/4 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded animate-[shimmer_1.5s_ease-in-out_infinite]" />
      <div className="h-4 w-1/2 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded animate-[shimmer_1.5s_ease-in-out_infinite_0.2s]" />
      <div className="h-4 w-2/3 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded animate-[shimmer_1.5s_ease-in-out_infinite_0.4s]" />
    </div>
  );
}

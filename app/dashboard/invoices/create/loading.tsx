
//   Renders a skeleton placeholder for the invoice creation form while the actual content is loading.
//  This component is used as a loading UI in Next.js 15 route segments (loading.tsx file).
//  It provides a visual indication that the form is being loaded, improving perceived performance.
//  @returns {JSX.Element} A skeleton component styled to fill the available space.
 
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFormCreation() {
  return <Skeleton className="w-full h-full flex-1" />;
}

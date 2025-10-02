import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function ResultsLoading() {
  return (
    <div className="container mx-auto max-w-3xl py-8 md:py-12 animate-pulse">
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto mt-4" />
      </div>

      <Card className="mb-8">
        <CardHeader className="items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-8 w-1/2 mt-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-6">
        <Skeleton className="h-8 w-2/3 mx-auto" />
      </div>

      <div className="space-y-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4 p-4 rounded-lg border">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-secondary/30 border-secondary">
        <CardHeader>
          <Skeleton className="h-6 w-full" />
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-12 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

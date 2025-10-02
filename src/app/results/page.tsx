import { Suspense } from 'react';
import ResultsClient from './ResultsClient';
import ResultsLoading from './loading';

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsClient />
    </Suspense>
  );
}

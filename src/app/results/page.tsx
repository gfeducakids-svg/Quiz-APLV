import { redirect } from "next/navigation";

export default function ResultsPage() {
    // This is a catch-all in case someone lands on /results directly.
    // The actual results are on dynamic routes.
    redirect('/quiz');
}

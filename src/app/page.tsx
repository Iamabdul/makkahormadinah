import { quranClient } from "@/lib/quranClient";
import QuizGame from "../components/QuizGame";

export default async function Home() {
  const {getChapters} = quranClient();
  const chapters = await getChapters();
  return <QuizGame chapters={chapters}/>;
}
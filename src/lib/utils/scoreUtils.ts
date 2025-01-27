import { questions, calculatePillarScore } from "@/lib/questions";

export const calculateScores = (answers: Record<string, number>) => {
  const pillarScores = questions.map(pillar => ({
    name: pillar.name,
    score: calculatePillarScore(pillar, answers)
  }));

  const overallScore = Math.round(
    pillarScores.reduce((acc, pillar) => acc + pillar.score, 0) / pillarScores.length
  );

  return {
    pillarScores,
    overallScore
  };
};

export const getPillarColor = (pillarName: string): string => {
  switch (pillarName) {
    case "Financial":
      return "#17BEBB";
    case "Health":
      return "#EDB88B";
    case "Relationships":
      return "#EF3E36";
    default:
      return "#FFFFFF";
  }
};
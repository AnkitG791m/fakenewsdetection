import { useState } from "react";
import { FactCheckInput } from "@/components/FactCheckInput";
import { FactCheckResults } from "@/components/FactCheckResults";
import { useToast } from "@/hooks/use-toast";

interface Evidence {
  url: string;
  snippet: string;
}

interface Claim {
  id: string;
  claim: string;
  label: string;
  confidence: number;
  explanation: string;
  evidence: Evidence[];
}

interface FactCheckResponse {
  claims: Claim[];
  final_summary: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FactCheckResponse | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (content: string) => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fact-check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze content');
      }

      const data = await response.json();
      setResults(data);

      toast({
        title: "Analysis Complete",
        description: "Fact-checking results are ready",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="space-y-8">
        <FactCheckInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        {results && (
          <FactCheckResults 
            claims={results.claims} 
            finalSummary={results.final_summary} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;

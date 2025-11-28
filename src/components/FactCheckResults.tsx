import { ClaimCard } from "./ClaimCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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

interface FactCheckResultsProps {
  claims: Claim[];
  finalSummary: string;
}

export const FactCheckResults = ({ claims, finalSummary }: FactCheckResultsProps) => {
  if (!claims || claims.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in-50 duration-500">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="font-medium">
          {finalSummary}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Claims Analysis</h2>
        {claims.map((claim) => (
          <ClaimCard key={claim.id} {...claim} />
        ))}
      </div>
    </div>
  );
};

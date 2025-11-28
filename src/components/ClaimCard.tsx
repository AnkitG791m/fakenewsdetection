import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Evidence {
  url: string;
  snippet: string;
}

interface ClaimCardProps {
  claim: string;
  label: string;
  confidence: number;
  explanation: string;
  evidence: Evidence[];
}

const getLabelColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "true":
      return "bg-[hsl(142,76%,36%)] text-white hover:bg-[hsl(142,76%,36%)]/90";
    case "false":
      return "bg-[hsl(0,72%,51%)] text-white hover:bg-[hsl(0,72%,51%)]/90";
    case "possibly false":
      return "bg-[hsl(25,95%,53%)] text-white hover:bg-[hsl(25,95%,53%)]/90";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const ClaimCard = ({ claim, label, confidence, explanation, evidence }: ClaimCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-tight">{claim}</CardTitle>
          <Badge className={getLabelColor(label)}>
            {label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Confidence</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{(confidence * 100).toFixed(0)}%</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Explanation</p>
          <p className="text-sm">{explanation}</p>
        </div>

        {evidence && evidence.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Evidence Sources</p>
            <div className="space-y-2">
              {evidence.map((ev, idx) => (
                <a
                  key={idx}
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-2 rounded-lg border hover:bg-accent transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{ev.url}</p>
                    <p className="text-sm mt-1">{ev.snippet}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface FactCheckInputProps {
  onAnalyze: (content: string) => void;
  isLoading: boolean;
}

export const FactCheckInput = ({ onAnalyze, isLoading }: FactCheckInputProps) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleAnalyze = () => {
    const content = text || url;
    if (content.trim()) {
      onAnalyze(content);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Fake News Detector</h1>
        <p className="text-muted-foreground">AI-powered fact checking in Hinglish</p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="space-y-4">
          <Textarea
            placeholder="Paste the text you want to fact-check..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={!text.trim() || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Text"
            )}
          </Button>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <Input
            type="url"
            placeholder="Enter article URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={!url.trim() || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze URL"
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

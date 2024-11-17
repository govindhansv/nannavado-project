"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function MoodDetectionPage() {
  const router = useRouter();
  const [responses, setResponses] = useState({
    happiness: null,
    sadness: null,
    anger: null,
    stress: null,
  });
  const [mood, setMood] = useState('');

  const handleInputChange = (name, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value,
    }));
  };

  const detectMood = () => {
    let detectedMood = '';

    if (responses.happiness === 'yes') {
      detectedMood = 'Happy';
    } 
    if (responses.sadness === 'yes') {
      detectedMood = 'Sad';
    } 
    if (responses.anger === 'yes') {
      detectedMood = 'Angry';
    } 
    if (responses.stress === 'yes') {
      detectedMood = 'Stressed';
    }

    if (detectedMood === '') {
      detectedMood = 'Feeling Neutral';
    }

    setMood(detectedMood);
  };

  const questions = [
    {
      name: 'happiness',
      label: 'Did anything make you smile today?'
    },
    {
      name: 'sadness',
      label: "Is there anything that's been weighing on you?"
    },
    {
      name: 'anger',
      label: 'Have you been feeling angry or frustrated lately?'
    },
    {
      name: 'stress',
      label: 'Have you been feeling stressed or overwhelmed?'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">How Are You Feeling?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question) => (
            <div key={question.name} className="space-y-2">
              <Label className="text-base">{question.label}</Label>
              <RadioGroup
                onValueChange={(value) => handleInputChange(question.name, value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${question.name}-yes`} />
                  <Label htmlFor={`${question.name}-yes`}>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.name}-no`} />
                  <Label htmlFor={`${question.name}-no`}>No</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button 
            onClick={detectMood} 
            className="w-full"
          >
            Detect Mood
          </Button>

          {mood && (
            <div className="mt-6 text-center space-y-4">
              <p className="text-lg font-semibold">
                Detected Mood: {mood}
              </p>
              
              {mood === 'Sad' && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    It seems you&apos;re feeling sad. How about some biryani?
                  </p>
                  <Button 
                    onClick={() => router.push('/biryani')}
                    variant="default"
                  >
                    Suggestion
                  </Button>
                </div>
              )}

              {mood === 'Angry' && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    It seems you&apos;re feeling angry. Let&apos;s go to gym!
                  </p>
                  <Button 
                    onClick={() => router.push('/gym')}
                    variant="destructive"
                  >
                    Suggestion
                  </Button>
                </div>
              )}

              {mood === 'Stressed' && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    It seems you&apos;re feeling stressed. Take a break!
                  </p>
                  <Button 
                    onClick={() => router.push('/rest')}
                    variant="secondary"
                  >
                    Suggestion
                  </Button>
                </div>
              )}

              {mood === 'Happy' && (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    It seems you&apos;re feeling happy! Maybe it&apos;s a good time to explore matrimony 
                  </p>
                  <Button 
                    asChild
                    variant="outline"
                  >
                    <a 
                      href="https://www.keralamatrimony.com"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      Suggestion
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, Home, XCircle } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const phrases = [
  {
    sentence: "The page you're looking for was ___ found.",
    answer: 'not',
    hint: "opposite of 'found'",
  },
  {
    sentence: 'This content is ______ available.',
    answer: 'rarely',
    hint: 'seldom or not often',
  },
  {
    sentence: 'You seem to be ________ lost.',
    answer: 'completely',
    hint: 'totally or utterly',
  },
  {
    sentence: 'This is ____ a test.',
    answer: 'only',
    hint: 'just a single instance',
  },
];

export const NotFound = () => {
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = () => {
    const correct =
      userAnswer.toLowerCase().trim() ===
      phrases[currentPhrase].answer.toLowerCase();
    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      setScore(score + 1);
      toast.success('Bom trabalho! você acertou a palavra!');

      setTimeout(() => {
        if (currentPhrase < phrases.length - 1) {
          setCurrentPhrase(currentPhrase + 1);
          setUserAnswer('');
          setIsCorrect(null);
        } else {
          toast.success(
            `Sua pontuação final foi ${score + 1}/${phrases.length}. Redirecionando...`,
          );
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      }, 1500);
    } else {
      setTimeout(() => setIsCorrect(null), 4000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const currentSentence = phrases[currentPhrase].sentence;
  const placeholderMatch = currentSentence.match(/(_+)/);
  const placeholder = placeholderMatch ? placeholderMatch[0] : '___';
  const inputWidth = `${placeholder.length + 4}ch`;
  const sentenceParts = currentSentence.split(placeholder);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="animate-slide-in w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-primary text-4xl font-bold">
              Página não encontrada
            </h1>
          </div>
          <p className="mb-4 text-lg text-zinc-500">
            Já que você se perdeu, que tal aproveitar para praticar um pouco?!
          </p>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <div className="space-x-0.5 text-lg">
                <span className="mr-2">Pontuação:</span>
                <span className="text-primary font-bold">{score}</span>
                <span>/</span>
                <span className="text-primary font-bold">{phrases.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-lg">
                <span>Fase</span>{' '}
                <span className="text-primary font-bold">
                  {currentPhrase + 1}
                </span>{' '}
                de{' '}
                <span className="text-primary font-bold">{phrases.length}</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-card p-8 shadow-xl">
          <div className="space-y-6">
            <div className="h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentPhrase + 1) / phrases.length) * 100}%`,
                }}
              />
            </div>

            <div className="space-y-4 text-center">
              <h2 className="text-foreground text-2xl font-semibold">
                Complete a sentença:
              </h2>
              <p className="text-foreground/90 bg-secondary/50 rounded-lg p-4 text-xl leading-relaxed">
                {sentenceParts.map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="relative mx-2 inline-block">
                        <Input
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          onKeyDown={handleKeyPress}
                          style={{ width: inputWidth, minWidth: '6ch' }}
                          className={`inline-block text-center text-xl font-semibold transition-all duration-300 ${
                            isCorrect === true
                              ? 'border-success bg-success/10'
                              : isCorrect === false
                                ? 'border-destructive bg-destructive/10'
                                : 'border-primary focus:border-primary'
                          }`}
                          placeholder={'?'}
                        />
                        {isCorrect === true && (
                          <CheckCircle className="text-success absolute -top-2 -right-2 h-6 w-6 animate-bounce" />
                        )}
                        {isCorrect === false && (
                          <XCircle className="text-destructive absolute -top-2 -right-2 h-6 w-6 animate-bounce" />
                        )}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {isCorrect === false && (
              <div className="bg-warning/10 border-warning/20 animate-slide-in rounded-lg border p-4 text-center">
                <p className="text-warning-foreground">
                  💡 <strong>Dica:</strong> {phrases[currentPhrase].hint}
                </p>
              </div>
            )}

            <div className="flex flex-col justify-center gap-4 sm:flex-row-reverse sm:justify-start">
              <Button
                onClick={handleSubmit}
                disabled={!userAnswer.trim() || isCorrect !== null}
                className="bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer p-7 text-lg font-semibold transition-all duration-300"
              >
                Enviar resposta
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer p-7 text-lg transition-all duration-300"
              >
                <Home className="mr-1 size-5" />
                Voltar para o menu
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

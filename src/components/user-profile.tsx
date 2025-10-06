import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Star, Trophy, User } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Progress } from './ui/progress';
import { Tabs } from './ui/tabs';

export const UserProfile = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const userData = {
    name: 'Vinícius Piotto',
    level: 45,
    currentXP: 12830,
    maxXP: 18000,
    avatar:
      'https://t3.ftcdn.net/jpg/00/65/75/68/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I.jpg',
  };

  const xpPercentage = (userData.currentXP / userData.maxXP) * 100;

  return (
    <div className="flex gap-5">
      <div className="hidden w-65 flex-col lg:flex">
        <div className="flex items-end gap-2">
          <span className="text-foreground text-md font-semibold">
            {userData.name}
          </span>
          <Badge variant="outline" className="bg-level-bg border-level/20">
            <Star className="mr-1 h-3 w-3" />
            Lvl {userData.level}
          </Badge>
        </div>
        <div className="mt-2 flex flex-col">
          <Progress value={xpPercentage} className="h-2 w-full" />
          <span className="mt-1 text-right text-sm">
            {userData.currentXP.toLocaleString()} /{' '}
            {userData.maxXP.toLocaleString()} XP
          </span>
        </div>
      </div>

      <Popover open={openProfile} onOpenChange={setOpenProfile}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="group relative"
            onClick={() => setOpenProfile(true)}
          >
            <Avatar className="border-primary/20 group-hover:border-primary/40 size-14 cursor-pointer border-2 transition-colors">
              <AvatarImage src={userData.avatar} />
            </Avatar>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" align="end">
          <Tabs defaultValue="profile" className="w-full">
            <div className="border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar className="border-primary/20 size-16 border-2">
                  <AvatarImage src={userData.avatar} />
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-foreground text-lg font-semibold">
                    {userData.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-level-bg text-level border-level/20"
                    >
                      <Trophy className="mr-1 h-3 w-3" />
                      Nível {userData.level}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experiência</span>
                  <span className="text-foreground font-medium">
                    {userData.currentXP.toLocaleString()} /{' '}
                    {userData.maxXP.toLocaleString()}
                  </span>
                </div>
                <Progress value={xpPercentage} className="bg-muted h-2" />
              </div>
            </div>

            <div className="space-y-2 p-4">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Ver perfil
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  setOpenProfile(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

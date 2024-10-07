import Card from "../components/Common/Card.tsx";
import {Theme, useThemes} from "../hooks/useThemes.ts";
import Button from "../components/Common/Button.tsx";

export const ThemeSelect = () => {
  const activityId = "";
  const themes: Theme[] = useThemes(activityId);

  // const [choseThemeId, setChoseThemeId] = useState<number | undefined>();

  return (
    <div className="flex flex-wrap justify-center items-start gap-4 p-4">
      {themes.map((theme) => (
        <Card key={theme.id} className="flex-1 basis-1/3">
          <div className="w-full h-[300px] bg-slate-50"></div>
          {theme.name}
          <Button>Elegir</Button>
        </Card>
      ))}
    </div>
  );
};

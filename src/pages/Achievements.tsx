import { VolumeButton } from "../components/common/buttons/VolumeButton";
import { useSpeakText } from "../hooks/useSpeakText";

interface Achievement {
    id: number;
    image: string;
    bgColor?: string;
}

const achievementsData: Achievement[] = [
    { id: 1, image: "/pines/huevo.png", bgColor: "#f2c160" },
    { id: 2, image: "/pines/huevo.png", bgColor: "#f2c160" },
    { id: 3, image: "/pines/huevo.png", bgColor: "#f2c160" },
    { id: 4, image: "/pines/huevo.png", bgColor: "#f2c160" },
    { id: 5, image: "/pines/huevo.png", bgColor: "#f2c160" },
    { id: 6, image: "/pines/taza.png", bgColor: "#D1D1D1" },
    { id: 7, image: "/pines/taza.png", bgColor: "#D1D1D1" },
    { id: 8, image: "/pines/taza.png", bgColor: "#D1D1D1" },
    { id: 9, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 10, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 11, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 12, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 13, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 14, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 15, image: "/pines/medalla.png", bgColor: "#cbe0fa" },
    { id: 16, image: "/pines/gema.png", bgColor: "#f472b9" },
    { id: 17, image: "/pines/gema.png", bgColor: "#f472b9" },
    { id: 18, image: "/pines/gema.png", bgColor: "#f472b9" },
    { id: 19, image: "/pines/bateria.png", bgColor: "#f5b501" },
    { id: 20, image: "/pines/bateria.png", bgColor: "#f5b501" },
    { id: 21, image: "/pines/bateria.png", bgColor: "#f5b501" },
    { id: 22, image: "/pines/bolsa.png", bgColor: "#e78519" },
    { id: 23, image: "/pines/bolsa.png", bgColor: "#e78519" },
    { id: 24, image: "/pines/corona.png", bgColor: "#506bdb" },
    { id: 25, image: "/pines/corona.png", bgColor: "#506bdb" },
    { id: 26, image: "/pines/medallin.png", bgColor: "#9d1750" },
    { id: 27, image: "/pines/medallin.png", bgColor: "#9d1750" },
    { id: 28, image: "/pines/bateria.png", bgColor: "#f5b501" },
    { id: 29, image: "/pines/bolsa.png", bgColor: "#e78519" },
    { id: 30, image: "/pines/corona-1.png", bgColor: "#506bdb" },
    { id: 31, image: "/pines/diadema.png", bgColor: "#D1D1D1" },
    { id: 32, image: "/pines/diamante.png", bgColor: "#1d4ed8" },
    { id: 33, image: "/pines/espada.png", bgColor: "#ff4d00" },
    { id: 34, image: "/pines/estrella.png", bgColor: "#fbbf24" },
    { id: 35, image: "/pines/gema-verde.png", bgColor: "#3bbf77" },
    { id: 36, image: "/pines/hojas.png", bgColor: "#16a34a" },
    { id: 37, image: "/pines/huesos.png", bgColor: "#f8fafc" },
    { id: 38, image: "/pines/llave.png", bgColor: "#9e7b5a" },
    { id: 39, image: "/pines/medalla-1.png", bgColor: "#60a5fa" },
    { id: 40, image: "/pines/posion.png", bgColor: "#22c55e" },
    { id: 41, image: "/pines/regalo.png", bgColor: "#fca5a1" },
    { id: 42, image: "/pines/regalo.png", bgColor: "#fca5a1" },
    { id: 43, image: "/pines/gema-verde.png", bgColor: "#3bbf77" },
    { id: 44, image: "/pines/espada.png", bgColor: "#ff4d00" },
    { id: 45, image: "/pines/huesos.png", bgColor: "#f8fafc" },
    { id: 46, image: "/pines/huesos.png", bgColor: "#f8fafc" },
];



interface AchievementCount {
    [key: string]: number;
}

const groupAchievements = (achievements: Achievement[]): AchievementCount => {
    return achievements.reduce((acc: AchievementCount, achievement: Achievement) => {
        acc[achievement.image] = (acc[achievement.image] || 0) + 1;
        return acc;
    }, {});
};

const AchievementsPage = () => {
    const speakText = useSpeakText();

    const achievementCount = groupAchievements(achievementsData);
    
    const uniqueAchievements = Object.keys(achievementCount).map((image, index) => ({
        id: index + 1,
        image,
        count: achievementCount[image],
        bgColor: achievementsData.find((ach) => ach.image === image)?.bgColor || "#fff"
    }));

    return (
        <div className="flex flex-col items-center justify-start lg:pt-28 pt-16 w-full h-screen lg:px-32 px-10">
            <div className="flex-center gap-4">
                <h1 className="text-4xl font-bold">Logros</h1>
                <VolumeButton onClick={() => speakText("Logros")} />
            </div>
            <div className="flex flex-wrap justify-center mt-4">
                {uniqueAchievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className="relative m-2 rounded-3xl p-4"
                        style={{ backgroundColor: achievement.bgColor }}
                    >
                        <img
                            src={achievement.image}
                            alt={`Achievement ${achievement.id}`}
                            className="w-36 h-40"
                        />
                        {achievement.count > 1 && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center transform translate-x-2 -translate-y-2">
                                {achievement.count}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsPage;

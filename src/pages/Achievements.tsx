import { VolumeButton } from "../components/common/buttons/VolumeButton";
import { useSpeakText } from "../hooks/useSpeakText";
import { Achievement, achievementsData } from "../testData/achievementsData";

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

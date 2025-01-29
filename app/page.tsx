import Footer from "./ui/components/footer";
import Header from "./ui/components/header";
import SoundButton from "./ui/components/sound-button";
import Timer from "./ui/components/timer";

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <main className="flex flex-col items-center gap-24">
        <Timer />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <SoundButton iconName="FlameKindling" size={56}>
            Flame tripping
          </SoundButton>
          <SoundButton iconName="Leaf" size={56}>
            Forest
          </SoundButton>
          <SoundButton iconName="CloudRain" size={56}>
            Rain
          </SoundButton>
          <SoundButton iconName="Coffee" size={56}>
            Coffee Shop
          </SoundButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}

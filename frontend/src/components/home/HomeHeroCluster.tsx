import { MediaFrame } from "~/components/ui/MediaFrame";

export function HomeHeroCluster() {
  return (
    <div
      className="hero-cluster"
      role="group"
      aria-label="Photos de biofertilisant, de biodigesteur et de récolte"
    >
      <div className="hero-cluster__layer hero-cluster__layer--primary">
        <MediaFrame
          src="/images/jacigreen-biofertilisant-niger.webp"
          alt="Du biofertilisant est recueilli dans un bassin sur un site maraîcher."
          aspect="4/3"
          priority
          className="border-0"
        />
      </div>
      <div className="hero-cluster__layer hero-cluster__layer--team">
        <MediaFrame
          src="/images/jacigreen-equipe-biodigesteur.webp"
          alt="Une équipe pose devant un biodigesteur JACIBIOGAZ."
          aspect="3/2"
          className="border-0"
        />
      </div>
      <div className="hero-cluster__layer hero-cluster__layer--harvest">
        <MediaFrame
          src="/images/jacigreen-pesee-recolte.webp"
          alt="Une productrice pèse une récolte de tomates sur un site maraîcher."
          aspect="3/2"
          className="border-0"
        />
      </div>
    </div>
  );
}

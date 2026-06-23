import { SponsorLogo } from "@/components/SponsorLogo";

export function SponsorCard({ sponsor, config, index }) {
  return (
    <div className="relative flex-1 cursor-pointer">
      <div className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500" />

      <div className="relative h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500">
        <div className="absolute top-0 left-0 w-6 h-6 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 transition-all duration-300" />

        <div className="flex items-center justify-center rounded-xl mb-5 transition-all duration-300 shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
          <SponsorLogo type={sponsor.logoType} />
        </div>

        <h3 className="font-display font-black tracking-tight transition-colors duration-300 leading-none">
          {sponsor.name}
        </h3>

        <p className="mt-2 font-mono uppercase tracking-widest transition-colors duration-300">
          {sponsor.tier}
        </p>

        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500" />
      </div>
    </div>
  );
}

import { SectionHeader } from "../ui/SectionHeader";
import intersectPoster from "/intersect-poster.png";

export function IntersectTalk() {
  return (
    <section className="py-20 md:py-28 border-t border-border/20">
      <div className="mx-auto max-w-400 px-6 lg:px-12">
        <SectionHeader
          tag="/ 02.5 — Talk Session"
          title={
            <>
              INTERSECT: <span className="text-primary">Building Bharat.</span>
            </>
          }
          description="Voices shaping India's entrepreneurial culture. Join us on 22nd August from 16:00 to 18:30 at CLT 106 for a flagship keynote & panel session hosted by IIC, IIT Dharwad & dhaRti Foundation."
        />

        <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/30 bg-card/30">
          <img
            src={intersectPoster}
            alt="INTERSECT: Building Bharat - Talk Session Poster"
            loading="lazy"
            className="w-full h-auto object-contain block mx-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
